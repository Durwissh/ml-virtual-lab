// src/pages/Dashboard.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { experiments } from '../data/experiments';
import './Dashboard.css';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const {
    progress,
    getOverallPercent,
    getCompletionPercent,
    getExperimentProgress,
    deleteNote,
    toggleBookmark,
    syncing
  } = useProgress();
  const navigate = useNavigate();

  const overallPercent = getOverallPercent();

  // Calculate statistics
  let completedCount = 0;
  let inProgressCount = 0;
  experiments.forEach(exp => {
    const pct = getCompletionPercent(exp.id);
    if (pct === 100) completedCount++;
    else if (pct > 0) inProgressCount++;
  });

  const quizKeys = Object.keys(progress.quizResults);
  const totalQuizzesAttempted = quizKeys.length;
  let avgQuizScore = 0;
  if (totalQuizzesAttempted > 0) {
    const sumPct = quizKeys.reduce((acc, k) => {
      const q = progress.quizResults[k];
      return acc + (q.total > 0 ? (q.score / q.total) * 100 : 0);
    }, 0);
    avgQuizScore = Math.round(sumPct / totalQuizzesAttempted);
  }

  const bookmarksList = progress.bookmarks || [];
  const notesEntries = Object.entries(progress.notes || {});

  return (
    <div className="page-layout">
      <main className="page-main">
        <div className="dashboard-container">
          {/* Header Profile Section */}
          <div className="dashboard-header-card animate-fade-in">
            <div className="dashboard-profile-info">
              <div className="dashboard-avatar">
                {user ? user.fullName.charAt(0).toUpperCase() : 'S'}
              </div>
              <div>
                <div className="dashboard-badge-row">
                  <span className="badge badge-navy">Student Portal</span>
                  {syncing && <span className="badge badge-gold">Syncing with Cloud…</span>}
                </div>
                <h1 className="dashboard-name">
                  {user ? user.fullName : 'Guest Student'}
                </h1>
                <p className="dashboard-email">
                  {user ? user.email : 'Local session (Log in to sync progress across devices)'}
                </p>
                <div className="dashboard-dept">
                  SRM Institute of Science and Technology · Machine Learning Virtual Lab
                </div>
              </div>
            </div>

            <div className="dashboard-header-actions">
              {user ? (
                <button
                  onClick={async () => {
                    await signOut();
                    navigate('/');
                  }}
                  className="btn btn-secondary"
                >
                  Sign Out
                </button>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="dashboard-metrics-grid">
            <div className="metric-card">
              <div className="metric-label">Laboratory Completion</div>
              <div className="metric-value-row">
                <div className="metric-value">{overallPercent}%</div>
                <span className="metric-sub">of curriculum</span>
              </div>
              <div className="metric-progress-bar">
                <div className="metric-progress-fill" style={{ width: `${overallPercent}%` }}></div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Experiments Completed</div>
              <div className="metric-value-row">
                <div className="metric-value">{completedCount} <span className="metric-denom">/ 10</span></div>
              </div>
              <p className="metric-caption">
                {inProgressCount} in progress · {10 - completedCount - inProgressCount} remaining
              </p>
            </div>

            <div className="metric-card">
              <div className="metric-label">Quiz Evaluations</div>
              <div className="metric-value-row">
                <div className="metric-value">{totalQuizzesAttempted > 0 ? `${avgQuizScore}%` : '—'}</div>
                <span className="metric-sub">avg accuracy</span>
              </div>
              <p className="metric-caption">
                {totalQuizzesAttempted} quizzes taken
              </p>
            </div>

            <div className="metric-card">
              <div className="metric-label">Saved Lab Artifacts</div>
              <div className="metric-value-row">
                <div className="metric-value">{bookmarksList.length + notesEntries.length}</div>
              </div>
              <p className="metric-caption">
                {bookmarksList.length} bookmarks · {notesEntries.length} notes
              </p>
            </div>
          </div>

          {/* Two-Column Section: Experiments Status & Activity */}
          <div className="dashboard-columns">
            {/* Left: Experiment Progress Table */}
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Curriculum Progress (10 Experiments)</h2>
                <Link to="/experiments" className="dashboard-card-link">View All →</Link>
              </div>

              <div className="exp-progress-list">
                {experiments.map(exp => {
                  const pct = getCompletionPercent(exp.id);
                  const expProgress = getExperimentProgress(exp.id);
                  const isDone = pct === 100;

                  return (
                    <div key={exp.id} className="exp-progress-item">
                      <div className="exp-progress-info">
                        <div className="exp-progress-num">
                          {String(exp.number).padStart(2, '0')}
                        </div>
                        <div>
                          <Link to={`/experiment/${exp.id}`} className="exp-progress-title">
                            {exp.title}
                          </Link>
                          <div className="exp-progress-meta">
                            <span>{exp.category}</span> · <span>{exp.difficulty}</span> · <span>{exp.estimatedTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="exp-progress-actions">
                        <div className="exp-progress-status-bar">
                          <div className="exp-progress-status-fill" style={{ width: `${pct}%` }}></div>
                        </div>
                        <span className="exp-progress-pct">{pct}%</span>
                        <Link
                          to={`/experiment/${exp.id}`}
                          className={`btn ${isDone ? 'btn-ghost' : pct > 0 ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                        >
                          {isDone ? 'Review' : pct > 0 ? 'Resume' : 'Start'}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Bookmarks & Notes */}
            <div className="dashboard-sidebar-column">
              {/* Bookmarks */}
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  <h3 className="dashboard-card-title">Saved Bookmarks</h3>
                  <span className="badge badge-navy">{bookmarksList.length}</span>
                </div>

                {bookmarksList.length === 0 ? (
                  <div className="dashboard-empty-state">
                    <p className="empty-title">No bookmarks saved yet</p>
                    <p className="empty-desc">Click the bookmark icon on any experiment section to save quick references here.</p>
                  </div>
                ) : (
                  <div className="dashboard-items-list">
                    {bookmarksList.map(bm => (
                      <div key={bm.id} className="dashboard-item-card">
                        <div className="dashboard-item-info">
                          <Link to={`/experiment/${bm.experimentId}`} className="dashboard-item-title">
                            {bm.title}
                          </Link>
                          <span className="dashboard-item-date">
                            Added {new Date(bm.addedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleBookmark({ id: bm.id, type: bm.type, experimentId: bm.experimentId, title: bm.title })}
                          className="btn-icon-danger"
                          title="Remove bookmark"
                          aria-label="Remove bookmark"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Personal Notes */}
              <div className="dashboard-card" style={{ marginTop: 'var(--space-6)' }}>
                <div className="dashboard-card-header">
                  <h3 className="dashboard-card-title">Laboratory Notes</h3>
                  <span className="badge badge-navy">{notesEntries.length}</span>
                </div>

                {notesEntries.length === 0 ? (
                  <div className="dashboard-empty-state">
                    <p className="empty-title">No notes written yet</p>
                    <p className="empty-desc">Use the Notes button in any experiment to record observations, equations, and reminders.</p>
                  </div>
                ) : (
                  <div className="dashboard-items-list">
                    {notesEntries.map(([key, noteText]) => (
                      <div key={key} className="dashboard-item-card">
                        <div className="dashboard-item-info">
                          <div className="dashboard-note-key">{key}</div>
                          <p className="dashboard-note-snippet">{noteText}</p>
                        </div>
                        <button
                          onClick={() => deleteNote(key)}
                          className="btn-icon-danger"
                          title="Delete note"
                          aria-label="Delete note"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
