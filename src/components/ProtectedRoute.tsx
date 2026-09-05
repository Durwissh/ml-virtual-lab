// src/components/ProtectedRoute.tsx
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'student' | 'teacher';
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return <>{children}</>;
}
