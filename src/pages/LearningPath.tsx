// src/pages/LearningPath.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { learningPathLevels } from '../data/learningPathData';
import './LearningPath.css';

export default function LearningPath() {
  const { getCompletionPercent, getOverallPercent } = useProgress();
  const overallPercent = getOverallPercent();
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');

  const filteredLevels = selectedLevel === 'all'
    ? learningPathLevels
    : learningPathLevels.filter(lvl => lvl.levelNumber === selectedLevel);

  // Compute total completed experiments
  let totalCompleted = 0;
  for (const lvl of learningPathLevels) {
    for (const exp of lvl.experiments) {
      if (getCompletionPercent(exp.id) === 100) {
        totalCompleted++;
      }
    }
  }

  return (
    <div className="lp-container animate-fade-in">
      {/* ─── Hero Header ─── */}
      <div className="lp-hero">
        <div className="lp-hero-content">
          <div className="lp-badge">SRM Department of Computing Technologies</div>
          <h1 className="lp-title">Machine Learning Curriculum Path</h1>
          <p className="lp-subtitle">
            A comprehensive 6-level pedagogical journey covering 10 foundational experiments from data pre-processing and linear models to deep neural network foundations.
          </p>

          <div className="lp-progress-card">
            <div className="lp-progress-info">
              <div>
                <span className="lp-progress-label">Curriculum Progress</span>
                <span className="lp-progress-stat">
                  <strong>{totalCompleted}</strong> of 10 Experiments Mastered
                </span>
              </div>
              <div className="lp-progress-percent">{overallPercent}%</div>
            </div>
            <div className="lp-progress-track">
              <div className="lp-progress-fill" style={{ width: `${overallPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Level Filter Navigation ─── */}
      <div className="lp-filters-bar" role="navigation" aria-label="Level filters">
        <button
          className={`lp-filter-btn${selectedLevel === 'all' ? ' lp-filter-btn--active' : ''}`}
          onClick={() => setSelectedLevel('all')}
        >
          All 6 Levels
        </button>
        {learningPathLevels.map(lvl => (
          <button
            key={lvl.levelNumber}
            className={`lp-filter-btn${selectedLevel === lvl.levelNumber ? ' lp-filter-btn--active' : ''}`}
            onClick={() => setSelectedLevel(lvl.levelNumber)}
          >
            Level {lvl.levelNumber}
          </button>
        ))}
      </div>

      {/* ─── Level Progression ─── */}
      <div className="lp-levels-wrapper">
        {filteredLevels.map((lvl) => {
          // Compute level completion
          const levelExpCount = lvl.experiments.length;
          const levelCompletedCount = lvl.experiments.filter(e => getCompletionPercent(e.id) === 100).length;
          const isLevelComplete = levelCompletedCount === levelExpCount;

          return (
            <section key={lvl.levelNumber} className="lp-level-section">
              <div className="lp-level-header">
                <div className="lp-level-header-left">
                  <span className="lp-level-num-pill">
                    Level {lvl.levelNumber}
                  </span>
                  <div>
                    <h2 className="lp-level-heading">{lvl.levelTitle}</h2>
                    <p className="lp-level-tagline">{lvl.tagline} — {lvl.description}</p>
                  </div>
                </div>
                <div className="lp-level-header-right">
                  <span className={`lp-level-status-tag ${isLevelComplete ? 'complete' : levelCompletedCount > 0 ? 'in-progress' : 'available'}`}>
                    {isLevelComplete ? '✓ Level Mastered' : `${levelCompletedCount}/${levelExpCount} Finished`}
                  </span>
                </div>
              </div>

              {/* Experiments Grid for this Level */}
              <div className="lp-exp-grid">
                {lvl.experiments.map(exp => {
                  const percent = getCompletionPercent(exp.id);
                  let statusLabel = 'Available';
                  let statusClass = 'available';
                  if (percent === 100) {
                    statusLabel = 'Completed';
                    statusClass = 'completed';
                  } else if (percent > 0) {
                    statusLabel = `${percent}% In Progress`;
                    statusClass = 'in-progress';
                  }

                  return (
                    <article
                      key={exp.id}
                      className="lp-exp-card"
                      style={{ '--exp-color': exp.accentColor } as React.CSSProperties}
                    >
                      <div className="lp-exp-card-header">
                        <div className="lp-exp-number-tag">
                          Exp {String(exp.number).padStart(2, '0')}
                        </div>
                        <div className="lp-exp-meta-tags">
                          <span className="badge badge-navy">{exp.category}</span>
                          <span className={`badge ${exp.difficulty === 'Beginner' ? 'badge-navy' : 'badge-navy'}`}>
                            {exp.difficulty}
                          </span>
                          <span className={`lp-status-badge ${statusClass}`}>
                            {percent === 100 ? '✓ Completed' : statusLabel}
                          </span>
                        </div>
                      </div>

                      <h3 className="lp-exp-title">{exp.title}</h3>
                      <p className="lp-exp-short-desc">{exp.shortDescription}</p>

                      {/* Concepts / Topics Chips */}
                      <div className="lp-topics-container">
                        <div className="lp-topics-header">Core Topics & Concepts:</div>
                        <div className="lp-topics-list">
                          {exp.topics.map((topic, ti) => (
                            <span key={ti} className="lp-topic-chip">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Prerequisites */}
                      {exp.prerequisites && exp.prerequisites.length > 0 && (
                        <div className="lp-prereq-bar">
                          <span className="lp-prereq-label">Prerequisites:</span>
                          <span className="lp-prereq-text">{exp.prerequisites.join(' · ')}</span>
                        </div>
                      )}

                      {/* Key Takeaway */}
                      <div className="lp-takeaway-bar">
                        <span className="lp-takeaway-icon">💡</span>
                        <span className="lp-takeaway-text">{exp.keyTakeaway}</span>
                      </div>

                      {/* Card Footer with Progress & Action Link */}
                      <div className="lp-exp-footer">
                        <div className="lp-exp-footer-left">
                          <span className="lp-exp-time">⏱ {exp.estimatedTime}</span>
                          {percent > 0 && (
                            <div className="lp-mini-progress">
                              <div className="lp-mini-progress-fill" style={{ width: `${percent}%` }} />
                            </div>
                          )}
                        </div>
                        <Link to={`/experiment/${exp.id}`} className="btn btn-primary btn-sm lp-action-btn">
                          {percent === 100 ? 'Review Experiment →' : percent > 0 ? 'Resume Experiment →' : 'Start Experiment →'}
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
