import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { experiments } from '../../data/experiments';
import './TeacherDashboard.css';
import '../Student/StudentDashboard.css';

interface StudentInfo {
  id: number;
  studentId: string;
  name: string;
  email: string;
  createdAt: string;
  lastLogin: string;
}

interface ExpDetail {
  experimentId: string;
  number: number;
  status: string;
  progressPercent: number;
  sections: {
    aim: boolean;
    theory: boolean;
    pretest: boolean;
    procedure: boolean;
    results: boolean;
    posttest: boolean;
  };
  completedSteps: number;
  pretest: { score: number; total: number; percentage: number; submittedAt: string } | null;
  posttest: { score: number; total: number; percentage: number; submittedAt: string } | null;
  startedAt: string | null;
  completedAt: string | null;
  lastUpdated: string | null;
}

export default function StudentDetailView() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();

  const [student, setStudent] = useState<StudentInfo | null>(null);
  const [expDetails, setExpDetails] = useState<ExpDetail[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStudent() {
      if (!token || !id) return;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/teacher/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setStudent(data.student);
          setExpDetails(data.experiments || []);
          setNotes(data.notes || []);
          setBookmarks(data.bookmarks || []);
          setQuizHistory(data.quizHistory || []);
        } else {
          setError('Student record not found.');
        }
      } catch (err) {
        setError('Error fetching student record from database.');
      } finally {
        setLoading(false);
      }
    }

    loadStudent();
  }, [id, token]);

  if (loading) {
    return (
      <div className="teacher-container">
        <div className="dash-empty-state">Loading student record…</div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="teacher-container">
        <div className="dash-empty-state" style={{ color: 'var(--error)' }}>
          {error || 'Student not found.'}
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
          <Link to="/teacher/dashboard" className="btn btn-secondary">
            ← Back to Teacher Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const completedExps = expDetails.filter(e => e.status === 'Completed').length;
  const inProgressExps = expDetails.filter(e => e.status === 'In Progress').length;

  return (
    <div className="teacher-container animate-fade-in">
      <div className="teacher-header">
        <div>
          <div className="teacher-badge">Student Assessment Record</div>
          <h1 className="dash-title">{student.name}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
            Reg No: <strong>{student.studentId || 'N/A'}</strong> · Email: <strong>{student.email}</strong> · Registered: {new Date(student.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Link to="/teacher/dashboard" className="btn btn-secondary">
          ← Back to Directory
        </Link>
      </div>

      {/* Summary Chips */}
      <div className="student-detail-header-card">
        <div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Laboratory Status
          </div>
          <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            {completedExps} Completed · {inProgressExps} In Progress
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Last Active
          </div>
          <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
            {student.lastLogin ? new Date(student.lastLogin).toLocaleString() : 'Never'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Records Mode
          </div>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--success)', marginTop: '4px', background: 'rgba(56, 161, 105, 0.1)', padding: '3px 8px', borderRadius: '4px' }}>
            🔒 Verified Read-Only
          </div>
        </div>
      </div>

      {/* 10-Experiment Detailed Breakdown */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
          Detailed Module Breakdown (All 10 Experiments)
        </h2>

        <div className="student-detail-grid">
          {expDetails.map(detail => {
            const meta = experiments.find(e => e.id === detail.experimentId);
            return (
              <div key={detail.experimentId} className="exp-detail-card">
                <div className="exp-detail-card-header">
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--accent-primary)' }}>
                      Experiment {String(detail.number).padStart(2, '0')}
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>
                      {meta?.shortTitle || `Experiment ${detail.number}`}
                    </div>
                  </div>
                  <span className={`dash-status-badge ${detail.status.toLowerCase().replace(' ', '-')}`}>
                    {detail.status}
                  </span>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                    <span>Progress</span>
                    <span style={{ fontWeight: 600 }}>{detail.progressPercent}%</span>
                  </div>
                  <div className="dash-progress-mini" style={{ width: '100%', height: '6px' }}>
                    <div className="dash-progress-mini-fill" style={{ width: `${detail.progressPercent}%` }} />
                  </div>
                </div>

                <div className="exp-section-chips">
                  <span className={`section-chip ${detail.sections.aim ? 'done' : ''}`}>Aim</span>
                  <span className={`section-chip ${detail.sections.theory ? 'done' : ''}`}>Theory</span>
                  <span className={`section-chip ${detail.sections.pretest ? 'done' : ''}`}>Pre-Test</span>
                  <span className={`section-chip ${detail.sections.procedure ? 'done' : ''}`}>Procedure</span>
                  <span className={`section-chip ${detail.sections.results ? 'done' : ''}`}>Results</span>
                  <span className={`section-chip ${detail.sections.posttest ? 'done' : ''}`}>Post-Test</span>
                </div>

                <div style={{ borderTop: '1px solid var(--border-primary)', paddingTop: 'var(--space-3)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: 'var(--text-xs)' }}>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Pre-Test: </span>
                    {detail.pretest ? (
                      <strong style={{ color: 'var(--text-primary)' }}>
                        {detail.pretest.score}/{detail.pretest.total} ({detail.pretest.percentage}%)
                      </strong>
                    ) : (
                      <span>Not Taken</span>
                    )}
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-tertiary)' }}>Post-Test: </span>
                    {detail.posttest ? (
                      <strong style={{ color: 'var(--text-primary)' }}>
                        {detail.posttest.score}/{detail.posttest.total} ({detail.posttest.percentage}%)
                      </strong>
                    ) : (
                      <span>Not Taken</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Attempts History */}
      <div className="dash-experiments-table-card">
        <div style={{ padding: 'var(--space-5)', borderBottom: '1px solid var(--border-primary)' }}>
          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Quiz Submission History ({quizHistory.length})</h3>
        </div>
        {quizHistory.length === 0 ? (
          <div className="dash-empty-state">No quiz submissions recorded yet.</div>
        ) : (
          <div className="dash-table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Experiment</th>
                  <th>Assessment</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {quizHistory.map(q => {
                  const exp = experiments.find(e => e.id === q.experiment_id);
                  return (
                    <tr key={q.id}>
                      <td>
                        <strong>Exp {q.experiment_id}: {exp?.shortTitle || 'Experiment'}</strong>
                      </td>
                      <td>
                        <span className="dash-status-badge in-progress" style={{ textTransform: 'capitalize' }}>
                          {q.quiz_type}
                        </span>
                      </td>
                      <td>{q.score} / {q.total_questions}</td>
                      <td>
                        <span style={{ fontWeight: 600, color: q.percentage >= 70 ? 'var(--success)' : 'inherit' }}>
                          {q.percentage}%
                        </span>
                      </td>
                      <td style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                        {new Date(q.submitted_at).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
