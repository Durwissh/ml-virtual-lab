// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import srmLogo from '../assets/srm-logo.png';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signUp, loading, error, clearError, isConfigured } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [localMsg, setLocalMsg] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalMsg(null);

    if (mode === 'signin') {
      const res = await signIn(email, password);
      if (!res.error) {
        navigate(from, { replace: true });
      }
    } else {
      if (!fullName.trim()) {
        setLocalMsg('Please enter your full name.');
        return;
      }
      const res = await signUp(email, password, fullName);
      if (!res.error) {
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card animate-fade-in-up">
        <div className="login-header">
          <img src={srmLogo} alt="SRM Logo" className="login-logo" />
          <h1 className="login-title">
            {mode === 'signin' ? 'Student Sign In' : 'Register Student Account'}
          </h1>
          <p className="login-subtitle">
            SRM Machine Learning Virtual Laboratory · Academic Portal
          </p>
        </div>

        <div className="login-tabs" role="tablist">
          <button
            className={`login-tab ${mode === 'signin' ? 'active' : ''}`}
            onClick={() => { setMode('signin'); clearError(); setLocalMsg(null); }}
            role="tab"
            aria-selected={mode === 'signin'}
          >
            Sign In
          </button>
          <button
            className={`login-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => { setMode('signup'); clearError(); setLocalMsg(null); }}
            role="tab"
            aria-selected={mode === 'signup'}
          >
            Create Account
          </button>
        </div>

        {(error || localMsg) && (
          <div className="login-alert login-alert-error" role="alert">
            <span className="login-alert-icon">⚠️</span>
            <span>{error || localMsg}</span>
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="full-name" className="form-label">Full Name</label>
              <input
                id="full-name"
                type="text"
                required
                className="form-input"
                placeholder="e.g. Arun Kumar"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">SRM Email / University ID</label>
            <input
              id="email"
              type="email"
              required
              className="form-input"
              placeholder="e.g. student@srmist.edu.in"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              className="form-input"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg login-submit-btn"
          >
            {loading ? (
              <span className="login-spinner-container">
                <span className="login-spinner"></span>
                <span>{mode === 'signin' ? 'Authenticating…' : 'Registering…'}</span>
              </span>
            ) : (
              mode === 'signin' ? 'Sign In to Laboratory' : 'Create Student Profile'
            )}
          </button>
        </form>

        <div className="login-footer">
          <div className="login-note">
            🛡 Protected by Row-Level Security (RLS). Your laboratory bookmarks, notes, and quiz submissions are encrypted and isolated.
          </div>
          <div style={{ marginTop: 'var(--space-3)' }}>
            <Link to="/experiments" className="login-link">
              Continue exploring as guest →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
