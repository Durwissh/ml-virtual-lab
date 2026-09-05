-- ============================================================
-- SRM MACHINE LEARNING VIRTUAL LABORATORY
-- Supabase PostgreSQL Schema & Row Level Security (RLS) Policies
-- ============================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  institution TEXT DEFAULT 'SRM Institute of Science and Technology',
  department TEXT DEFAULT 'Department of Computing Technologies',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert/update their own profile" 
  ON public.profiles FOR ALL 
  USING (auth.uid() = id) 
  WITH CHECK (auth.uid() = id);


-- 2. Experiment Progress Table
CREATE TABLE IF NOT EXISTS public.experiment_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  experiment_id TEXT NOT NULL,
  aim BOOLEAN DEFAULT FALSE,
  theory BOOLEAN DEFAULT FALSE,
  pretest BOOLEAN DEFAULT FALSE,
  procedure BOOLEAN DEFAULT FALSE,
  results BOOLEAN DEFAULT FALSE,
  posttest BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, experiment_id)
);

ALTER TABLE public.experiment_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own experiment progress" 
  ON public.experiment_progress FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can modify their own experiment progress" 
  ON public.experiment_progress FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);


-- 3. Quiz Results Table
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quiz_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  answers INTEGER[] NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, quiz_id)
);

ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own quiz results" 
  ON public.quiz_results FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert/update their own quiz results" 
  ON public.quiz_results FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);


-- 4. Bookmarks Table
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  experiment_id TEXT NOT NULL,
  type TEXT DEFAULT 'section',
  title TEXT NOT NULL,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id, user_id)
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks" 
  ON public.bookmarks FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can modify their own bookmarks" 
  ON public.bookmarks FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);


-- 5. Notes Table
CREATE TABLE IF NOT EXISTS public.notes (
  key TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (key, user_id)
);

ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notes" 
  ON public.notes FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can modify their own notes" 
  ON public.notes FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);
