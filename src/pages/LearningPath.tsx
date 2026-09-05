// src/pages/LearningPath.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { learningPathLevels, LearningPathExperiment } from '../data/learningPathData';
import './LearningPath.css';

export default function LearningPath() {
  const { getCompletionPercent, getOverallPercent } = useProgress();
  const overallPercent = getOverallPercent();
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const toggleTopics = (expId: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [expId]: !prev[expId],
    }));
  };

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
      <header className="lp-hero">
        <div className="lp-badge">SRM Machine Learning Curriculum</div>
        <h1 className="lp-title">Curriculum Roadmap & Learning Path</h1>
        <p className="lp-subtitle">
          A structured pedagogical journey across 6 progressive milestones and 10 interactive laboratory experiments.
        </p>

        <div className="lp-progress-card">
          <div className="lp-progress-info">
            <div>
              <span className="lp-progress-label">Overall Completion</span>
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
      </header>

      {/* ─── Level Roadmap Stepper Bar ─── */}
      <nav className="lp-stepper-container" aria-label="Curriculum Milestones">
        <div className="lp-stepper-track">
          <button
            className={`lp-step-pill${selectedLevel === 'all' ? ' lp-step-pill--active' : ''}`}
            onClick={() => setSelectedLevel('all')}
          >
            <span className="lp-step-num">All</span>
            <span className="lp-step-title">Full Path</span>
          </button>
          {learningPathLevels.map((lvl) => {
            const isSelected = selectedLevel === lvl.levelNumber;
            const completedCount = lvl.experiments.filter(e => getCompletionPercent(e.id) === 100).length;
            const isDone = completedCount === lvl.experiments.length;

            return (
              <button
                key={lvl.levelNumber}
                className={`lp-step-pill${isSelected ? ' lp-step-pill--active' : ''}${isDone ? ' lp-step-pill--done' : ''}`}
                onClick={() => setSelectedLevel(lvl.levelNumber)}
              >
                <span className="lp-step-num">L{lvl.levelNumber}</span>
                <span className="lp-step-title">{lvl.levelTitle.split('—')[1]?.trim() || lvl.levelTitle}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ─── Level Progression ─── */}
      <div className="lp-levels-wrapper">
        {filteredLevels.map((lvl) => {
          const levelExpCount = lvl.experiments.length;
          const levelCompletedCount = lvl.experiments.filter(e => getCompletionPercent(e.id) === 100).length;
          const isLevelComplete = levelCompletedCount === levelExpCount;

          return (
            <section key={lvl.levelNumber} className="lp-level-section">
              {/* Level Section Header */}
              <div className="lp-level-header">
                <div className="lp-level-header-main">
                  <span className="lp-level-badge">Level 0{lvl.levelNumber}</span>
                  <div>
                    <h2 className="lp-level-heading">{lvl.levelTitle}</h2>
                    <p className="lp-level-tagline">{lvl.tagline} — {lvl.description}</p>
                  </div>
                </div>
                <div className="lp-level-header-status">
                  <span className={`lp-level-status-pill ${isLevelComplete ? 'complete' : levelCompletedCount > 0 ? 'in-progress' : 'available'}`}>
                    {isLevelComplete ? '✓ Level Complete' : `${levelCompletedCount} of ${levelExpCount} Finished`}
                  </span>
                </div>
              </div>

              {/* Experiment Cards List (Spacious & Clean) */}
              <div className="lp-exp-list">
                {lvl.experiments.map((exp: LearningPathExperiment) => {
                  const percent = getCompletionPercent(exp.id);
                  const isExpanded = !!expandedTopics[exp.id];
                  const initialTopics = exp.topics.slice(0, 4);
                  const remainingTopicsCount = exp.topics.length - 4;

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
                      {/* Top Meta Header */}
                      <div className="lp-exp-top-row">
                        <div className="lp-exp-ident">
                          <span className="lp-exp-num">
                            Experiment {String(exp.number).padStart(2, '0')}
                          </span>
                          <span className="badge badge-navy">{exp.category}</span>
                          <span className="badge badge-navy">{exp.difficulty}</span>
                          <span className="lp-exp-time">⏱ {exp.estimatedTime}</span>
                        </div>
                        <span className={`lp-status-badge ${statusClass}`}>
                          {percent === 100 ? '✓ Completed' : statusLabel}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="lp-exp-title">{exp.title}</h3>
                      <p className="lp-exp-short-desc">{exp.shortDescription}</p>

                      {/* Core Insight Callout */}
                      <div className="lp-takeaway-bar">
                        <span className="lp-takeaway-icon">💡</span>
                        <div className="lp-takeaway-content">
                          <strong>Core Insight:</strong> {exp.keyTakeaway}
                        </div>
                      </div>

                      {/* Core Topics / Concepts Section */}
                      <div className="lp-topics-block">
                        <div className="lp-topics-header-row">
                          <span className="lp-topics-label">Key Topics ({exp.topics.length}):</span>
                          <button
                            type="button"
                            className="lp-topics-toggle-btn"
                            onClick={() => toggleTopics(exp.id)}
                            aria-expanded={isExpanded}
                          >
                            {isExpanded ? '▲ Hide Full Syllabus' : `▼ View Full Syllabus (${exp.topics.length} Concepts)`}
                          </button>
                        </div>

                        <div className="lp-topics-chips">
                          {(isExpanded ? exp.topics : initialTopics).map((topic, ti) => (
                            <span key={ti} className="lp-topic-chip">
                              {topic}
                            </span>
                          ))}
                          {!isExpanded && remainingTopicsCount > 0 && (
                            <button
                              type="button"
                              className="lp-topic-more-pill"
                              onClick={() => toggleTopics(exp.id)}
                            >
                              +{remainingTopicsCount} more concepts
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Prerequisites if any */}
                      {exp.prerequisites && exp.prerequisites.length > 0 && (
                        <div className="lp-prereq-row">
                          <span className="lp-prereq-label">Prerequisites:</span>
                          <span className="lp-prereq-text">{exp.prerequisites.join(' · ')}</span>
                        </div>
                      )}

                      {/* Footer Actions */}
                      <div className="lp-exp-footer">
                        <div className="lp-exp-footer-meta">
                          {percent > 0 && (
                            <div className="lp-progress-wrapper">
                              <span className="lp-progress-num">{percent}% Complete</span>
                              <div className="lp-mini-progress">
                                <div className="lp-mini-progress-fill" style={{ width: `${percent}%` }} />
                              </div>
                            </div>
                          )}
                        </div>

                        <Link to={`/experiment/${exp.id}`} className="btn btn-primary lp-action-btn">
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
