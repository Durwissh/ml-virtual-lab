import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './TeacherDashboard.css';
import '../Student/StudentDashboard.css';

interface StudentSummary {
  id: number;
  studentId: string;
  name: string;
  email: string;
  createdAt: string;
  lastLogin: string;
  overallPercent: number;
  completedExperiments: number;
  inProgressExperiments: number;
  notStartedExperiments: number;
  avgPretestScore: number | null;
  avgPosttestScore: number | null;
  avgQuizScore: number | null;
  totalQuizAttempts: number;
}

interface ClassStats {
  totalStudents: number;
  totalCompletedExperiments: number;
  avgExperimentsPerStudent: number;
  avgPretestScore: number;
  avgPosttestScore: number;
  learningGain: number;
}

export default function TeacherDashboard() {
  const { user, token } = useAuth();

  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [stats, setStats] = useState<ClassStats | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError(null);

      const [statsRes, studentsRes] = await Promise.all([
        fetch('/api/teacher/stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`/api/teacher/students?search=${encodeURIComponent(search)}`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (statsRes.ok && studentsRes.ok) {
        const statsData = await statsRes.json();
        const studentsData = await studentsRes.json();
        setStats(statsData);
        setStudents(studentsData.students || []);
      } else {
        setError('Failed to fetch class records.');
      }
    } catch (err) {
      setError('Network error connecting to instructor backend.');
    } finally {
      setLoading(false);
    }
  }, [token, search]);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      fetchData();
    }, 250);
    return () => clearTimeout(delayTimer);
  }, [fetchData]);

  return (
    <div className="teacher-container animate-fade-in">
      <div className="teacher-header">
        <div>
          <div className="teacher-badge">Faculty Portal</div>
          <h1 className="dash-title">Teacher Oversight & Records</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
            Instructor: <strong>{user?.name}</strong> · Monitoring student laboratory progress & assessments.
          </p>
        </div>
      </div>

      {/* Class Level Metrics */}
      {stats && (
        <div className="dash-metrics-grid">
          <div className="dash-metric-card">
            <div className="dash-metric-header">
              <span className="dash-metric-label">Enrolled Students</span>
              <span className="dash-metric-icon">👥</span>
            </div>
            <div className="dash-metric-val">{stats.totalStudents}</div>
            <div className="dash-metric-sub">Registered laboratory learners</div>
          </div>

          <div className="dash-metric-card">
            <div className="dash-metric-header">
              <span className="dash-metric-label">Avg Completed Exps</span>
              <span className="dash-metric-icon">📚</span>
            </div>
            <div className="dash-metric-val" style={{ color: 'var(--accent-primary)' }}>
              {stats.avgExperimentsPerStudent} / 10
            </div>
            <div className="dash-metric-sub">{stats.totalCompletedExperiments} total modules completed</div>
          </div>

          <div className="dash-metric-card">
            <div className="dash-metric-header">
              <span className="dash-metric-label">Avg Pre-Test Score</span>
              <span className="dash-metric-icon">📝</span>
            </div>
            <div className="dash-metric-val">{stats.avgPretestScore}%</div>
            <div className="dash-metric-sub">Baseline assessment average</div>
          </div>

          <div className="dash-metric-card">
            <div className="dash-metric-header">
              <span className="dash-metric-label">Avg Post-Test Score</span>
              <span className="dash-metric-icon">🏆</span>
            </div>
            <div className="dash-metric-val" style={{ color: 'var(--success, #38a169)' }}>
              {stats.avgPosttestScore}%
            </div>
            <div className="dash-metric-sub" style={{ color: stats.learningGain >= 0 ? 'var(--success)' : 'inherit' }}>
              +{stats.learningGain}% Knowledge Gain
            </div>
          </div>
        </div>
      )}

      {/* Search & Student Directory */}
      <div className="teacher-students-card">
        <div style={{ padding: 'var(--space-5)', borderBottom: '1px solid var(--border-primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Student Directory ({students.length})</h2>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                Select a student to view granular step-by-step progress, quiz breakdown, and lab history.
              </p>
            </div>
          </div>

          <div className="teacher-search-bar" style={{ marginBottom: 0 }}>
            <input
              type="text"
              className="teacher-search-input"
              placeholder="Search by student name, register number (e.g. RA2111...), or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="dash-empty-state">Loading student records…</div>
        ) : error ? (
          <div className="dash-empty-state" style={{ color: 'var(--error)' }}>{error}</div>
        ) : students.length === 0 ? (
          <div className="dash-empty-state">
            No students found matching "{search}".
          </div>
        ) : (
          <div className="dash-table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Student Info</th>
                  <th>Register No</th>
                  <th>Overall Progress</th>
                  <th>Completed Exps</th>
                  <th>Pre-Test Avg</th>
                  <th>Post-Test Avg</th>
                  <th>Last Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((st) => (
                  <tr key={st.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{st.name}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{st.email}</div>
                    </td>
                    <td>
                      <code style={{ fontSize: 'var(--text-xs)', background: 'var(--bg-primary)', padding: '2px 6px', borderRadius: '4px' }}>
                        {st.studentId || 'N/A'}
                      </code>
                    </td>
                    <td>
                      <span className="dash-progress-mini">
                        <span className="dash-progress-mini-fill" style={{ width: `${st.overallPercent}%` }} />
                      </span>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{st.overallPercent}%</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: st.completedExperiments > 0 ? 'var(--success)' : 'inherit' }}>
                        {st.completedExperiments} / 10
                      </span>
                    </td>
                    <td>
                      {st.avgPretestScore !== null ? (
                        <span>{st.avgPretestScore}%</span>
                      ) : (
                        <span style={{ color: 'var(--text-tertiary)' }}>—</span>
                      )}
                    </td>
                    <td>
                      {st.avgPosttestScore !== null ? (
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{st.avgPosttestScore}%</span>
                      ) : (
                        <span style={{ color: 'var(--text-tertiary)' }}>—</span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                        {st.lastLogin ? new Date(st.lastLogin).toLocaleDateString() : 'Never'}
                      </span>
                    </td>
                    <td>
                      <Link to={`/teacher/students/${st.id}`} className="btn btn-secondary btn-sm">
                        View Records →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
