// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-layout">
      <main className="page-main" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          maxWidth: '540px',
          width: '100%',
          textAlign: 'center',
          padding: 'var(--space-8)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{
            fontSize: 'var(--text-4xl, 48px)',
            fontWeight: 800,
            color: 'var(--primary, #1e3a8a)',
            lineHeight: 1,
            marginBottom: 'var(--space-2)',
            fontFamily: 'monospace',
          }}>
            404
          </div>
          <div className="badge badge-navy" style={{ marginBottom: 'var(--space-4)' }}>
            Page Not Found
          </div>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
            Experiment or Resource Not Found
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
            The requested page does not exist in the SRM Machine Learning Virtual Laboratory curriculum. Please check the URL or return to the laboratory directory.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/experiments" className="btn btn-primary btn-lg">
              View All 10 Experiments
            </Link>
            <Link to="/" className="btn btn-secondary btn-lg">
              Return Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
