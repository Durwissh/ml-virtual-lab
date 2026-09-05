// src/pages/ExperimentsIndex.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { experiments } from '../data/experiments';
import { useProgress } from '../context/ProgressContext';
import './Home.css'; // reuse home experiment card styles

export default function ExperimentsIndex() {
  const { getCompletionPercent } = useProgress();

  return (
    <div className="page-layout">
      <main className="page-main">
        <div style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto' }}>
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <div className="section-label">All Experiments</div>
            <h1 className="section-title">Experiment Explorer</h1>
            <p className="section-description">
              10 structured experiments covering the fundamentals of machine learning.
            </p>
          </div>

          <div className="home-experiments-grid">
            {experiments.map(exp => {
              const percent = getCompletionPercent(exp.id);
              return (
                <Link
                  key={exp.id}
                  to={`/experiment/${exp.id}`}
                  className="home-exp-card"
                  style={{ '--exp-accent': exp.accentColor } as React.CSSProperties}
                >
                  <div className="home-exp-header">
                    <span className="home-exp-number">
                      {String(exp.number).padStart(2, '0')}
                    </span>
                    <div className="home-exp-meta">
                      <span className="badge badge-navy">{exp.category}</span>
                    </div>
                  </div>
                  <h3 className="home-exp-title">{exp.title}</h3>
                  <p className="home-exp-desc">{exp.description}</p>
                  <div className="home-exp-footer">
                    <span className="home-exp-time">⏱ {exp.estimatedTime}</span>
                    <span className="badge badge-navy">{exp.difficulty}</span>
                    {percent > 0 && (
                      <div className="home-exp-progress">
                        <div className="home-exp-progress-fill" style={{ width: `${percent}%` }} />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
