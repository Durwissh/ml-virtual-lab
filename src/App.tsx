// src/App.tsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const ExperimentsIndex = lazy(() => import('./pages/ExperimentsIndex'));
const ExperimentPage = lazy(() => import('./pages/ExperimentPage'));
const LearningPath = lazy(() => import('./pages/LearningPath'));
const VisualLab = lazy(() => import('./pages/VisualLab'));
const Glossary = lazy(() => import('./pages/Glossary'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)',
    }}>
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ProgressProvider>
          <Header />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experiments" element={<ExperimentsIndex />} />
              <Route path="/experiment/:id" element={<ExperimentPage />} />
              <Route path="/learning-path" element={<LearningPath />} />
              <Route path="/visual-lab" element={<VisualLab />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
