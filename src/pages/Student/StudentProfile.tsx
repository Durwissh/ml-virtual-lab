import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import './StudentDashboard.css';

export default function StudentProfile() {
  const { user, logout } = useAuth();
  const { getOverallPercent } = useProgress();

  return (
    <div className="dash-container animate-fade-in" style={{ maxWidth: '700px' }}>
      <div className="dash-header">
        <div>
          <div className="dash-welcome-label">Account Settings</div>
          <h1 className="dash-title">Student Profile</h1>
        </div>
        <Link to="/student/dashboard" className="btn btn-secondary">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="dash-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-primary)' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-primary), #805ad5)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            fontWeight: 700,
          }}>
            {user?.name?.charAt(0).toUpperCase() || 'S'}
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>{user?.name}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
              {user?.role === 'teacher' ? 'Faculty Instructor' : `Student · ${user?.studentId || 'N/A'}`}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="dash-list-item">
            <span style={{ color: 'var(--text-secondary)' }}>Full Name</span>
            <span style={{ fontWeight: 600 }}>{user?.name}</span>
          </div>

          <div className="dash-list-item">
            <span style={{ color: 'var(--text-secondary)' }}>Student ID / Reg No</span>
            <span style={{ fontWeight: 600 }}>{user?.studentId || 'N/A'}</span>
          </div>

          <div className="dash-list-item">
            <span style={{ color: 'var(--text-secondary)' }}>Institutional Email</span>
            <span style={{ fontWeight: 600 }}>{user?.email}</span>
          </div>

          <div className="dash-list-item">
            <span style={{ color: 'var(--text-secondary)' }}>Account Role</span>
            <span className="dash-status-badge in-progress" style={{ textTransform: 'capitalize' }}>
              {user?.role}
            </span>
          </div>

          <div className="dash-list-item">
            <span style={{ color: 'var(--text-secondary)' }}>Lab Overall Completion</span>
            <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{getOverallPercent()}%</span>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border-primary)' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Authentication managed securely via JSON Web Tokens
          </span>
          <button onClick={logout} className="btn btn-ghost" style={{ color: 'var(--error, #e53e3e)' }}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
