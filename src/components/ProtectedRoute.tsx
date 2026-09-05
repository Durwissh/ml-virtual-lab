import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'student' | 'teacher';
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: 'var(--text-muted)',
      }}>
        Verifying authorization…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    // If student tries to access teacher route, redirect to student dashboard
    if (user?.role === 'student' && role === 'teacher') {
      return <Navigate to="/student/dashboard" replace />;
    }
    // If teacher tries to access student specific private page, redirect to teacher dashboard
    if (user?.role === 'teacher' && role === 'student') {
      return <Navigate to="/teacher/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
