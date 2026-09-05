// src/App.tsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';
import Header from './components/Header';

const Home = lazy(() => import('./pages/Home'));
const ExperimentsIndex = lazy(() => import('./pages/ExperimentsIndex'));
const ExperimentPage = lazy(() => import('./pages/ExperimentPage'));

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
    <ThemeProvider>
      <ProgressProvider>
        <Header />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experiments" element={<ExperimentsIndex />} />
            <Route path="/experiment/:id" element={<ExperimentPage />} />
            {/* Placeholder routes for future pages */}
            <Route path="/learning-path" element={<PlaceholderPage title="Learning Path" />} />
            <Route path="/visual-lab" element={<PlaceholderPage title="Visual Lab" />} />
            <Route path="/glossary" element={<PlaceholderPage title="Glossary" />} />
            <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
          </Routes>
        </Suspense>
      </ProgressProvider>
    </ThemeProvider>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="page-layout">
      <main className="page-main">
        <div className="page-content">
          <div className="section-label">Coming Soon</div>
          <h1 className="section-title">{title}</h1>
          <p className="section-description" style={{ marginTop: 'var(--space-4)' }}>
            This section is being built. The complete experience will be available after all 10 experiments are polished.
          </p>
        </div>
      </main>
    </div>
  );
}
