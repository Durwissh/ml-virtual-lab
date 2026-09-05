// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  institution?: string;
  department?: string;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string; message?: string }>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const LOCAL_USER_KEY = 'ml-vlab-auth-user';
const LOCAL_USERS_DB_KEY = 'ml-vlab-registered-users';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize session
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session }, error: sessionErr } = await supabase.auth.getSession();
          if (sessionErr) throw sessionErr;

          if (session?.user && mounted) {
            // Fetch profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            setUser({
              id: session.user.id,
              email: session.user.email || '',
              fullName: profile?.full_name || session.user.user_metadata?.full_name || 'SRM Student',
              institution: profile?.institution || 'SRM Institute of Science and Technology',
              department: profile?.department || 'Department of Computing Technologies',
              createdAt: profile?.created_at || session.user.created_at,
            });
          }
        } catch (err: any) {
          console.warn('Supabase auth initialization notice:', err?.message || err);
        } finally {
          if (mounted) setLoading(false);
        }

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              fullName: session.user.user_metadata?.full_name || 'SRM Student',
              institution: 'SRM Institute of Science and Technology',
              department: 'Department of Computing Technologies',
              createdAt: session.user.created_at,
            });
          } else {
            setUser(null);
          }
          setLoading(false);
        });

        return () => {
          subscription.unsubscribe();
        };
      } else {
        // Fallback local session for demo/offline resilience
        try {
          const savedUser = localStorage.getItem(LOCAL_USER_KEY);
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        } catch {
          // ignore
        }
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const signIn = useCallback(async (email: string, password: string): Promise<{ error?: string }> => {
    setError(null);
    setLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) {
          setError(authError.message);
          return { error: authError.message };
        }

        if (data.user) {
          const profileUser: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || 'SRM Student',
            institution: 'SRM Institute of Science and Technology',
            department: 'Department of Computing Technologies',
            createdAt: data.user.created_at,
          };
          setUser(profileUser);
          return {};
        }
      } catch (err: any) {
        const msg = err?.message || 'Failed to sign in. Please try again.';
        setError(msg);
        return { error: msg };
      } finally {
        setLoading(false);
      }
    } else {
      // Local simulated auth for offline demo
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const usersDbStr = localStorage.getItem(LOCAL_USERS_DB_KEY);
        const usersDb: Record<string, { email: string; pass: string; fullName: string; id: string; createdAt: string }> =
          usersDbStr ? JSON.parse(usersDbStr) : {};

        const existing = usersDb[email.toLowerCase().trim()];
        if (!existing || existing.pass !== password) {
          // Allow automatic login for demo accounts or registered users
          if (!existing && password.length >= 6) {
            const newUser: UserProfile = {
              id: 'usr_' + Math.random().toString(36).substring(2, 9),
              email: email.trim(),
              fullName: email.split('@')[0] || 'SRM Student',
              institution: 'SRM Institute of Science and Technology',
              department: 'Department of Computing Technologies',
              createdAt: new Date().toISOString(),
            };
            localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
            setUser(newUser);
            return {};
          }
          const msg = 'Invalid email or password (password must be at least 6 characters).';
          setError(msg);
          return { error: msg };
        }

        const loggedInUser: UserProfile = {
          id: existing.id,
          email: existing.email,
          fullName: existing.fullName,
          institution: 'SRM Institute of Science and Technology',
          department: 'Department of Computing Technologies',
          createdAt: existing.createdAt,
        };
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        return {};
      } catch (err: any) {
        const msg = 'Error processing login request.';
        setError(msg);
        return { error: msg };
      } finally {
        setLoading(false);
      }
    }
    return {};
  }, []);

  const signUp = useCallback(async (
    email: string,
    password: string,
    fullName: string
  ): Promise<{ error?: string; message?: string }> => {
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      const msg = 'Password must be at least 6 characters long.';
      setError(msg);
      setLoading(false);
      return { error: msg };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              institution: 'SRM Institute of Science and Technology',
            },
          },
        });

        if (authError) {
          setError(authError.message);
          return { error: authError.message };
        }

        if (data.user) {
          // Save profile in database
          await supabase.from('profiles').upsert({
            id: data.user.id,
            email,
            full_name: fullName,
            institution: 'SRM Institute of Science and Technology',
            department: 'Department of Computing Technologies',
            updated_at: new Date().toISOString(),
          });

          const profileUser: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: fullName || 'SRM Student',
            institution: 'SRM Institute of Science and Technology',
            department: 'Department of Computing Technologies',
            createdAt: data.user.created_at,
          };
          setUser(profileUser);
          return { message: 'Account successfully registered and signed in!' };
        }
      } catch (err: any) {
        const msg = err?.message || 'Failed to sign up. Please try again.';
        setError(msg);
        return { error: msg };
      } finally {
        setLoading(false);
      }
    } else {
      // Local simulated registration
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const usersDbStr = localStorage.getItem(LOCAL_USERS_DB_KEY);
        const usersDb: Record<string, { email: string; pass: string; fullName: string; id: string; createdAt: string }> =
          usersDbStr ? JSON.parse(usersDbStr) : {};

        const normEmail = email.toLowerCase().trim();
        const newId = 'usr_' + Math.random().toString(36).substring(2, 9);
        const createdAt = new Date().toISOString();

        usersDb[normEmail] = {
          id: newId,
          email: normEmail,
          pass: password,
          fullName: fullName.trim() || 'SRM Student',
          createdAt,
        };
        localStorage.setItem(LOCAL_USERS_DB_KEY, JSON.stringify(usersDb));

        const loggedInUser: UserProfile = {
          id: newId,
          email: normEmail,
          fullName: fullName.trim() || 'SRM Student',
          institution: 'SRM Institute of Science and Technology',
          department: 'Department of Computing Technologies',
          createdAt,
        };
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        return { message: 'Registration successful!' };
      } catch (err: any) {
        const msg = 'Error processing registration.';
        setError(msg);
        return { error: msg };
      } finally {
        setLoading(false);
      }
    }
    return {};
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Signout error:', err);
      }
    }
    localStorage.removeItem(LOCAL_USER_KEY);
    setUser(null);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      isConfigured: isSupabaseConfigured,
      signIn,
      signUp,
      signOut,
      clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
