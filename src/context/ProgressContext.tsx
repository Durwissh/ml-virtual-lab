// src/context/ProgressContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
  resetAllProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType>({} as ProgressContextType);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(loadLocalProgress);

  // Keep local storage updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('LocalStorage save warning:', e);
    }
  }, [progress]);

  // Mark section complete
  const markSectionComplete = useCallback((experimentId: string, section: keyof ExperimentProgress) => {
    setProgress(prev => {
      const current = prev.experiments[experimentId] || defaultProgress;
      const updatedExp = {
        ...current,
        [section]: true,
      };

      return {
        ...prev,
        experiments: {
          ...prev.experiments,
          [experimentId]: updatedExp,
        },
      };
    });
  }, []);

  // Save quiz result
  const saveQuizResult = useCallback((quizId: string, result: QuizResult) => {
    setProgress(prev => ({
      ...prev,
      quizResults: { ...prev.quizResults, [quizId]: result },
    }));
  }, []);

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
      } else {
        const newItem: BookmarkItem = {
          ...bookmark,
          addedAt: new Date().toISOString(),
        };
        updated = [...prev.bookmarks, newItem];
      }

      return { ...prev, bookmarks: updated };
    });
  }, []);

  const isBookmarked = useCallback((id: string): boolean => {
    return progress.bookmarks.some(b => b.id === id);
  }, [progress.bookmarks]);

  const saveNote = useCallback((key: string, text: string) => {
    setProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [key]: text },
    }));
  }, []);

  const deleteNote = useCallback((key: string) => {
    setProgress(prev => {
      const nextNotes = { ...prev.notes };
      delete nextNotes[key];
      return { ...prev, notes: nextNotes };
    });
  }, []);

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

  const resetAllProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress({
      experiments: {},
      quizResults: {},
      procedureSteps: {},
      lastVisited: null,
      bookmarks: [],
      notes: {},
    });
  }, []);

  return (
    <ProgressContext.Provider value={{
      progress,
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
      resetAllProgress,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
