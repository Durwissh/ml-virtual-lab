// src/context/ProgressContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

export interface ExperimentProgress {
  aim: boolean;
  theory: boolean;
  pretest: boolean;
  procedure: boolean;
  results: boolean;
  posttest: boolean;
}

export interface QuizResult {
  score: number;
  total: number;
  answers: number[];
  submittedAt: string;
}

export interface BookmarkItem {
  id: string;
  type: string;
  experimentId: string;
  title: string;
  addedAt: string;
}

export interface ProgressState {
  experiments: Record<string, ExperimentProgress>;
  quizResults: Record<string, QuizResult>;
  procedureSteps: Record<string, boolean[]>;
  lastVisited: { experimentId: string; section: string } | null;
  bookmarks: BookmarkItem[];
  notes: Record<string, string>;
}

export const defaultProgress: ExperimentProgress = {
  aim: false,
  theory: false,
  pretest: false,
  procedure: false,
  results: false,
  posttest: false,
};

const STORAGE_KEY = 'ml-vlab-progress';

function loadLocalProgress(): ProgressState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    experiments: {},
    quizResults: {},
    procedureSteps: {},
    lastVisited: null,
    bookmarks: [],
    notes: {},
  };
}

interface ProgressContextType {
  progress: ProgressState;
  syncing: boolean;
  syncError: string | null;
  markSectionComplete: (experimentId: string, section: keyof ExperimentProgress) => void;
  saveQuizResult: (quizId: string, result: QuizResult) => void;
  getExperimentProgress: (experimentId: string) => ExperimentProgress;
  getCompletionPercent: (experimentId: string) => number;
  getOverallPercent: () => number;
  setLastVisited: (experimentId: string, section: string) => void;
  toggleBookmark: (bookmark: { id: string; type: string; experimentId: string; title: string }) => void;
  isBookmarked: (id: string) => boolean;
  saveNote: (key: string, text: string) => void;
  deleteNote: (key: string) => void;
  getNote: (key: string) => string;
  saveProcedureStep: (experimentId: string, stepIndex: number, complete: boolean) => void;
  getProcedureSteps: (experimentId: string, totalSteps: number) => boolean[];
  refreshFromCloud: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType>({} as ProgressContextType);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressState>(loadLocalProgress);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Always keep local storage updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [progress]);

  // Load from Supabase whenever authenticated user changes
  const refreshFromCloud = useCallback(async () => {
    if (!user || !isSupabaseConfigured || !supabase) return;

    setSyncing(true);
    setSyncError(null);

    try {
      // 1. Fetch experiment progress
      const { data: expData, error: expErr } = await supabase
        .from('experiment_progress')
        .select('*')
        .eq('user_id', user.id);

      if (expErr) throw expErr;

      const experimentsMap: Record<string, ExperimentProgress> = {};
      expData?.forEach(row => {
        experimentsMap[row.experiment_id] = {
          aim: !!row.aim,
          theory: !!row.theory,
          pretest: !!row.pretest,
          procedure: !!row.procedure,
          results: !!row.results,
          posttest: !!row.posttest,
        };
      });

      // 2. Fetch quiz results
      const { data: quizData, error: quizErr } = await supabase
        .from('quiz_results')
        .select('*')
        .eq('user_id', user.id);

      if (quizErr) throw quizErr;

      const quizMap: Record<string, QuizResult> = {};
      quizData?.forEach(row => {
        quizMap[row.quiz_id] = {
          score: row.score,
          total: row.total,
          answers: row.answers || [],
          submittedAt: row.submitted_at,
        };
      });

      // 3. Fetch bookmarks
      const { data: bmData, error: bmErr } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id);

      if (bmErr) throw bmErr;

      const bookmarksList: BookmarkItem[] = (bmData || []).map(row => ({
        id: row.id,
        type: row.type || 'section',
        experimentId: row.experiment_id,
        title: row.title,
        addedAt: row.added_at,
      }));

      // 4. Fetch notes
      const { data: notesData, error: notesErr } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id);

      if (notesErr) throw notesErr;

      const notesMap: Record<string, string> = {};
      notesData?.forEach(row => {
        notesMap[row.key] = row.text;
      });

      // Merge cloud data with existing local data
      setProgress(prev => ({
        ...prev,
        experiments: { ...prev.experiments, ...experimentsMap },
        quizResults: { ...prev.quizResults, ...quizMap },
        bookmarks: bookmarksList.length > 0 ? bookmarksList : prev.bookmarks,
        notes: { ...prev.notes, ...notesMap },
      }));
    } catch (err: any) {
      console.warn('Notice: Cloud progress sync error, using local fallback:', err?.message || err);
      setSyncError('Cloud sync paused (using local state)');
    } finally {
      setSyncing(false);
    }
  }, [user]);

  useEffect(() => {
    refreshFromCloud();
  }, [refreshFromCloud]);

  // Mark section complete
  const markSectionComplete = useCallback(async (experimentId: string, section: keyof ExperimentProgress) => {
    setProgress(prev => {
      const current = prev.experiments[experimentId] || defaultProgress;
      const updatedExp = {
        ...current,
        [section]: true,
      };

      const nextState = {
        ...prev,
        experiments: {
          ...prev.experiments,
          [experimentId]: updatedExp,
        },
      };

      // Background cloud sync if user is logged in
      if (user && isSupabaseConfigured && supabase) {
        supabase
          .from('experiment_progress')
          .upsert({
            user_id: user.id,
            experiment_id: experimentId,
            [section]: true,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id,experiment_id' })
          .then(({ error }) => {
            if (error) console.warn('Supabase experiment_progress sync warning:', error.message);
          });
      }

      return nextState;
    });
  }, [user]);

  // Save quiz result
  const saveQuizResult = useCallback(async (quizId: string, result: QuizResult) => {
    setProgress(prev => {
      const nextState = {
        ...prev,
        quizResults: { ...prev.quizResults, [quizId]: result },
      };

      // Background cloud sync
      if (user && isSupabaseConfigured && supabase) {
        supabase
          .from('quiz_results')
          .upsert({
            user_id: user.id,
            quiz_id: quizId,
            score: result.score,
            total: result.total,
            answers: result.answers,
            submitted_at: result.submittedAt,
          }, { onConflict: 'user_id,quiz_id' })
          .then(({ error }) => {
            if (error) console.warn('Supabase quiz_results sync warning:', error.message);
          });
      }

      return nextState;
    });
  }, [user]);

  const getExperimentProgress = useCallback((experimentId: string): ExperimentProgress => {
    return progress.experiments[experimentId] || defaultProgress;
  }, [progress.experiments]);

  const getCompletionPercent = useCallback((experimentId: string): number => {
    const p = progress.experiments[experimentId] || defaultProgress;
    const sections = Object.values(p);
    const completed = sections.filter(Boolean).length;
    return Math.round((completed / sections.length) * 100);
  }, [progress.experiments]);

  const getOverallPercent = useCallback((): number => {
    let total = 0;
    let completed = 0;
    for (let i = 1; i <= 10; i++) {
      const id = String(i);
      const p = progress.experiments[id] || defaultProgress;
      const sections = Object.values(p);
      total += sections.length;
      completed += sections.filter(Boolean).length;
    }
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [progress.experiments]);

  const setLastVisited = useCallback((experimentId: string, section: string) => {
    setProgress(prev => ({
      ...prev,
      lastVisited: { experimentId, section },
    }));
  }, []);

  const toggleBookmark = useCallback((bookmark: { id: string; type: string; experimentId: string; title: string }) => {
    setProgress(prev => {
      const exists = prev.bookmarks.find(b => b.id === bookmark.id);
      let updated: BookmarkItem[];

      if (exists) {
        updated = prev.bookmarks.filter(b => b.id !== bookmark.id);
        if (user && isSupabaseConfigured && supabase) {
          supabase
            .from('bookmarks')
            .delete()
            .match({ id: bookmark.id, user_id: user.id })
            .then(() => {});
        }
      } else {
        const newItem: BookmarkItem = {
          ...bookmark,
          addedAt: new Date().toISOString(),
        };
        updated = [...prev.bookmarks, newItem];
        if (user && isSupabaseConfigured && supabase) {
          supabase
            .from('bookmarks')
            .upsert({
              id: bookmark.id,
              user_id: user.id,
              experiment_id: bookmark.experimentId,
              type: bookmark.type,
              title: bookmark.title,
              added_at: newItem.addedAt,
            })
            .then(() => {});
        }
      }

      return { ...prev, bookmarks: updated };
    });
  }, [user]);

  const isBookmarked = useCallback((id: string): boolean => {
    return progress.bookmarks.some(b => b.id === id);
  }, [progress.bookmarks]);

  const saveNote = useCallback((key: string, text: string) => {
    setProgress(prev => {
      const nextNotes = { ...prev.notes, [key]: text };

      if (user && isSupabaseConfigured && supabase) {
        supabase
          .from('notes')
          .upsert({
            key,
            user_id: user.id,
            text,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'key,user_id' })
          .then(({ error }) => {
            if (error) console.warn('Supabase notes sync warning:', error.message);
          });
      }

      return { ...prev, notes: nextNotes };
    });
  }, [user]);

  const deleteNote = useCallback((key: string) => {
    setProgress(prev => {
      const nextNotes = { ...prev.notes };
      delete nextNotes[key];

      if (user && isSupabaseConfigured && supabase) {
        supabase
          .from('notes')
          .delete()
          .match({ key, user_id: user.id })
          .then(() => {});
      }

      return { ...prev, notes: nextNotes };
    });
  }, [user]);

  const getNote = useCallback((key: string): string => {
    return progress.notes[key] || '';
  }, [progress.notes]);

  const saveProcedureStep = useCallback((experimentId: string, stepIndex: number, complete: boolean) => {
    setProgress(prev => {
      const existing = prev.procedureSteps[experimentId] || [];
      const updated = [...existing];
      updated[stepIndex] = complete;
      return {
        ...prev,
        procedureSteps: { ...prev.procedureSteps, [experimentId]: updated },
      };
    });
  }, []);

  const getProcedureSteps = useCallback((experimentId: string, totalSteps: number): boolean[] => {
    const existing = progress.procedureSteps[experimentId] || [];
    return Array.from({ length: totalSteps }, (_, i) => existing[i] || false);
  }, [progress.procedureSteps]);

  return (
    <ProgressContext.Provider value={{
      progress,
      syncing,
      syncError,
      markSectionComplete,
      saveQuizResult,
      getExperimentProgress,
      getCompletionPercent,
      getOverallPercent,
      setLastVisited,
      toggleBookmark,
      isBookmarked,
      saveNote,
      deleteNote,
      getNote,
      saveProcedureStep,
      getProcedureSteps,
      refreshFromCloud,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
