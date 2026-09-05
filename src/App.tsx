// src/App.tsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const ExperimentsIndex = lazy(() => import('./pages/ExperimentsIndex'));
const ExperimentPage = lazy(() => import('./pages/ExperimentPage'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const StudentDashboard = lazy(() => import('./pages/Student/StudentDashboard'));
const StudentProfile = lazy(() => import('./pages/Student/StudentProfile'));
const TeacherDashboard = lazy(() => import('./pages/Teacher/TeacherDashboard'));
const StudentDetailView = lazy(() => import('./pages/Teacher/StudentDetailView'));
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

function DashboardRedirect() {
  const { isAuthenticated, isTeacher } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={isTeacher ? '/teacher/dashboard' : '/student/dashboard'} replace />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ProgressProvider>
            <Header />
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/experiments" element={<ExperimentsIndex />} />
                  <Route path="/experiment/:id" element={<ExperimentPage />} />

                  {/* Auth routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Dynamic Dashboard Redirect */}
                  <Route path="/dashboard" element={<DashboardRedirect />} />

                  {/* Protected Student routes */}
                  <Route
                    path="/student/dashboard"
                    element={
                      <ProtectedRoute role="student">
                        <StudentDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/student/profile"
                    element={
                      <ProtectedRoute role="student">
                        <StudentProfile />
                      </ProtectedRoute>
                    }
                  />

                  {/* Protected Teacher routes */}
                  <Route
                    path="/teacher/dashboard"
                    element={
                      <ProtectedRoute role="teacher">
                        <TeacherDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/teacher/students/:id"
                    element={
                      <ProtectedRoute role="teacher">
                        <StudentDetailView />
                      </ProtectedRoute>
                    }
                  />

                  {/* Placeholder routes */}
                  <Route path="/learning-path" element={<PlaceholderPage title="Learning Path" />} />
                  <Route path="/visual-lab" element={<PlaceholderPage title="Visual Lab" />} />
                  <Route path="/glossary" element={<PlaceholderPage title="Glossary" />} />

                  {/* 404 Catch-All */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </ProgressProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="page-layout">
      <main className="page-main">
        <div className="page-content">
          <div className="section-label">SRM Machine Learning Lab</div>
          <h1 className="section-title">{title}</h1>
          <p className="section-description" style={{ marginTop: 'var(--space-4)' }}>
            This resource module is part of the SRM Machine Learning curriculum. Please explore the 10 interactive laboratory experiments in the meantime.
          </p>
        </div>
      </main>
    </div>
  );
}
