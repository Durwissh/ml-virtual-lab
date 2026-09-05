import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-6)',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '500px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-secondary)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-8)',
        boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: 'var(--space-2)' }}>🔍</div>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
          404 - Page Not Found
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
          The requested experiment, section, or page does not exist or may have been moved.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            Laboratory Home
          </Link>
          <Link to="/experiments" className="btn btn-secondary">
            View Experiments
          </Link>
        </div>
      </div>
    </div>
  );
}
