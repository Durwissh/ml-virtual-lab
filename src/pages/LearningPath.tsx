// src/pages/LearningPath.tsx
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { learningPathLevels, LearningPathLevel } from '../data/learningPathData';
import { experiments } from '../data/experiments';
import './LearningPath.css';

export interface JourneyStep {
  id: number;
  stepNumber: string;
  title: string;
  category: string;
  icon: string;
  estimatedTime: string;
  description: string;
  topics: string[];
  actionLabel: string;
  route: string;
  lockRequirement: string;
  quickLink?: { label: string; route: string };
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    stepNumber: '01',
    title: 'Introduction to Machine Learning',
    category: 'Foundations',
    icon: '📘',
    estimatedTime: '20 min',
    description:
      'Build a solid conceptual foundation by exploring what Machine Learning is, why it matters, the core paradigms (Supervised, Unsupervised, Reinforcement), and how intelligent algorithms solve real-world problems across industries.',
    topics: [
      'What is Machine Learning and how it differs from traditional rule-based programming',
      'Why Machine Learning is critical in modern science and industry',
      'Core paradigms: Supervised, Unsupervised, and Reinforcement Learning',
      'Real-world applications: Predictive healthcare, computer vision, recommendation engines',
      'The standard ML lifecycle: From raw data ingestion to deployed inference'
    ],
    actionLabel: 'Start Learning',
    route: '/experiment/1#aim',
    lockRequirement: 'Available to all students',
    quickLink: { label: 'Explore Master Glossary (102 Terms)', route: '/glossary' }
  },
  {
    id: 2,
    stepNumber: '02',
    title: 'Dataset & Feature Engineering',
    category: 'Data Engineering',
    icon: '📊',
    estimatedTime: '30 min',
    description:
      'Master the anatomy of machine learning datasets. Learn how raw tabular matrices are structured, how categorical values are encoded, how missing values are imputed, and how feature scaling prevents numerical dominance.',
    topics: [
      'Understanding tabular data: Samples (rows) vs. Features & Targets (columns)',
      'Input feature matrices (X) vs. Ground-truth label vectors (y)',
      'Categorical encoding strategies: One-Hot Encoding vs. Label Encoding',
      'Handling missing values: Mean, Median, and Mode statistical imputation',
      'Feature scaling: Z-Score Standardisation vs. Min-Max Normalisation',
      'Train-test splitting and preventing catastrophic data leakage'
    ],
    actionLabel: 'Study Feature Engineering',
    route: '/experiment/1#theory',
    lockRequirement: 'Complete Step 1 or start Data Pre-processing',
    quickLink: { label: 'Go to Experiment 01 Theory', route: '/experiment/1#theory' }
  },
  {
    id: 3,
    stepNumber: '03',
    title: 'Run Your First Experiment',
    category: 'Hands-On Laboratory',
    icon: '⚙️',
    estimatedTime: '45 min',
    description:
      'Put theory into practice by running Experiment 01: Data Pre-processing for Machine Learning. Interactively configure parameters, clean missing values, scale numerical features, encode categorical columns, and verify transformation matrices in real time.',
    topics: [
      'Select and inspect raw student & housing datasets in the Virtual Lab',
      'Interactively tune pre-processing parameters and scaling methods',
      'Execute step-by-step data cleaning, encoding, and normalisation procedures',
      'Inspect transformed dataset tables and output distributions',
      'Verify pipeline execution without data leakage between train & test sets'
    ],
    actionLabel: 'Start Experiment 1 →',
    route: '/experiment/1',
    lockRequirement: 'Available to all students',
    quickLink: { label: 'Direct Link: Experiment 01 Virtual Lab', route: '/experiment/1' }
  },
  {
    id: 4,
    stepNumber: '04',
    title: 'Analyze Results & Performance Metrics',
    category: 'Model Evaluation',
    icon: '📈',
    estimatedTime: '35 min',
    description:
      'Deep dive into model evaluation. Learn to interpret performance indicators including Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), R² Goodness-of-Fit, Confusion Matrices, Precision, Recall, and F1-Scores across tasks.',
    topics: [
      'Understanding regression metrics: MAE, MSE, RMSE, and R² scores',
      'Classification diagnosis: True Positives, False Positives, and Confusion Matrices',
      'Balancing Precision vs. Recall and interpreting the harmonic F1-Score',
      'Detecting Underfitting (High Bias) vs. Overfitting (High Variance)',
      'Validating model stability across K-Fold cross-validation splits'
    ],
    actionLabel: 'Analyze Results →',
    route: '/experiment/1#results',
    lockRequirement: 'Complete Experiment 01 procedure or posttest quiz',
    quickLink: { label: 'Review Experiment 01 Results', route: '/experiment/1#results' }
  },
  {
    id: 5,
    stepNumber: '05',
    title: 'Compare Experiments & Model Families',
    category: 'Ensemble & Benchmarking',
    icon: '⚖️',
    estimatedTime: '40 min',
    description:
      'Benchmark and compare different machine learning models. Analyze the strengths, weaknesses, assumptions, and decision boundaries of Linear Regression, Logistic Regression, SVM, Decision Trees, Random Forests, and K-Means clustering.',
    topics: [
      'Compare Experiment 01 (Pre-processing) with Experiment 02 (Linear Regression)',
      'Benchmark Linear models against Non-linear SVM kernels and Tree Ensembles',
      'Analyze the effect of hyperparameter tuning (learning rate, tree depth, regularisation C)',
      'Interactive D3 simulations: Decision boundaries and cluster centroid movement',
      'Trade-offs between model interpretability and predictive complexity'
    ],
    actionLabel: 'Explore Visual Lab & Comparisons →',
    route: '/visual-lab',
    lockRequirement: 'Complete at least 1 experiment in the laboratory',
    quickLink: { label: 'Interactive Visual Lab (8 D3 Sandboxes)', route: '/visual-lab' }
  },
  {
    id: 6,
    stepNumber: '06',
    title: 'Final Mastery Assessment',
    category: 'Mastery & Certification',
    icon: '🏆',
    estimatedTime: '30 min',
    description:
      'Consolidate and evaluate your complete machine learning knowledge with the comprehensive laboratory assessment covering all pre-processing, regression, classification, clustering, and neural network principles.',
    topics: [
      'Comprehensive multiple-choice assessment covering core ML theory',
      'Scenario-based questions on algorithm selection and data leakage prevention',
      'Evaluation metric calculation and interpretation challenges',
      'Instant scored feedback, mastery certification review, and detailed explanations'
    ],
    actionLabel: 'Take Assessment →',
    route: '/experiment/1#posttest',
    lockRequirement: 'Complete the foundational experiments and results analysis',
    quickLink: { label: 'Direct Link: Experiment 01 Posttest', route: '/experiment/1#posttest' }
  }
];

export default function LearningPath() {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'curriculum'>('roadmap');
  const { progress, getCompletionPercent, getOverallPercent } = useProgress();
  const overallPercent = getOverallPercent();
  const navigate = useNavigate();

  // Progress metrics
  const exp1Percent = getCompletionPercent('1');
  const exp2Percent = getCompletionPercent('2');
  const hasStartedExp1 = exp1Percent > 0;
  const isExp1Complete = exp1Percent === 100;
  const hasAnyQuizAttempt = Object.keys(progress.quizResults || {}).length > 0;

  // Determine state for each of the 6 steps
  const stepStates = useMemo(() => {
    const s1Complete = hasStartedExp1 || overallPercent > 0;
    const s2Complete = progress.experiments['1']?.theory || exp1Percent >= 30;
    const s3Complete = isExp1Complete;
    const s3InProgress = hasStartedExp1 && !isExp1Complete;
    const s4Unlocked = hasStartedExp1 || hasAnyQuizAttempt;
    const s4Complete = progress.experiments['1']?.results || progress.experiments['1']?.posttest || isExp1Complete;
    const s5Unlocked = s4Complete || exp1Percent >= 50 || exp2Percent > 0;
    const s5Complete = exp2Percent > 0 || overallPercent >= 20;
    const s6Unlocked = s4Complete || s5Complete || overallPercent >= 20;
    const s6Complete = hasAnyQuizAttempt && overallPercent >= 30;

    return {
      1: { status: s1Complete ? 'completed' : 'available', isLocked: false },
      2: { status: s2Complete ? 'completed' : 'available', isLocked: false },
      3: { status: s3Complete ? 'completed' : s3InProgress ? 'in-progress' : 'available', isLocked: false },
      4: { status: s4Complete ? 'completed' : s4Unlocked ? 'in-progress' : 'locked', isLocked: !s4Unlocked },
      5: { status: s5Complete ? 'completed' : s5Unlocked ? 'available' : 'locked', isLocked: !s5Unlocked },
      6: { status: s6Complete ? 'completed' : s6Unlocked ? 'available' : 'locked', isLocked: !s6Unlocked }
    };
  }, [hasStartedExp1, isExp1Complete, exp1Percent, exp2Percent, overallPercent, hasAnyQuizAttempt, progress.experiments]);

  const completedStepsCount = Object.values(stepStates).filter(s => s.status === 'completed').length;
  const roadmapProgressPct = Math.round((completedStepsCount / 6) * 100);

  // Completed experiments count
  const completedExpCount = Object.keys(progress.experiments || {}).filter(
    id => getCompletionPercent(id) === 100
  ).length;

  return (
    <div className="lp-page-wrapper animate-fade-in">
      <div className="lp-container">
        {/* ─── Hero Header ─── */}
        <header className="lp-hero">
          <div className="lp-hero-badge">🎓 Interactive Curriculum</div>
          <h1 className="lp-hero-title">Machine Learning Journey & Roadmap</h1>
          <p className="lp-hero-subtitle">
            A guided, step-by-step roadmap through the ML Virtual Lab. Master foundational concepts,
            run interactive experiments, evaluate metrics, and test your mastery.
          </p>

          {/* Progress Overview Card */}
          <div className="lp-overview-card">
            <div className="lp-stats-grid">
              <div className="lp-stat-item">
                <span className="lp-stat-label">Roadmap Steps</span>
                <div className="lp-stat-value">
                  <strong>{completedStepsCount}</strong> / 6 Done
                </div>
              </div>
              <div className="lp-stat-item">
                <span className="lp-stat-label">Lab Experiments</span>
                <div className="lp-stat-value">
                  <strong>{completedExpCount}</strong> / 10 Completed
                </div>
              </div>
              <div className="lp-stat-item">
                <span className="lp-stat-label">Overall Completion</span>
                <div className="lp-stat-value">
                  <strong>{overallPercent}%</strong>
                </div>
              </div>
            </div>

            <div className="lp-progress-section">
              <div className="lp-progress-header">
                <span className="lp-progress-title">Roadmap Progression</span>
                <span className="lp-progress-pct">{roadmapProgressPct}% Complete</span>
              </div>
              <div className="lp-progress-bar-bg">
                <div
                  className="lp-progress-bar-fill"
                  style={{ width: `${roadmapProgressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* View Mode Switcher Tabs */}
          <div className="lp-tab-switcher" role="tablist" aria-label="Learning Path View Mode">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'roadmap'}
              className={`lp-tab-btn${activeTab === 'roadmap' ? ' lp-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('roadmap')}
            >
              🗺️ 6-Step Interactive Roadmap
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'curriculum'}
              className={`lp-tab-btn${activeTab === 'curriculum' ? ' lp-tab-btn--active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              📚 Complete 10-Experiment Curriculum (Levels 1–6)
            </button>
          </div>
        </header>

        {/* ─── TAB 1: 6-Step Interactive Roadmap ─── */}
        {activeTab === 'roadmap' && (
          <section className="lp-roadmap-section animate-fade-in" aria-label="6-Step Roadmap">
            <div className="lp-steps-stack">
              {JOURNEY_STEPS.map((step) => {
                const state = stepStates[step.id as keyof typeof stepStates];
                const isCompleted = state.status === 'completed';
                const isInProgress = state.status === 'in-progress';
                const isLocked = state.isLocked;

                return (
                  <article
                    key={step.id}
                    className={`lp-step-card${isCompleted ? ' lp-step-card--completed' : ''}${isInProgress ? ' lp-step-card--in-progress' : ''}${isLocked ? ' lp-step-card--locked' : ''}`}
                  >
                    {/* Top Row: Badges, Number, Status */}
                    <div className="lp-step-top">
                      <div className="lp-step-meta-left">
                        <span className="lp-step-num-badge">STEP {step.stepNumber}</span>
                        <span className="lp-step-cat-badge">{step.category}</span>
                        <span className="lp-step-time">⏱ {step.estimatedTime}</span>
                      </div>

                      <div className="lp-step-meta-right">
                        {isCompleted && (
                          <span className="lp-status-badge completed">✓ Completed</span>
                        )}
                        {isInProgress && (
                          <span className="lp-status-badge in-progress">● Current Step</span>
                        )}
                        {!isCompleted && !isInProgress && !isLocked && (
                          <span className="lp-status-badge available">○ Available</span>
                        )}
                        {isLocked && (
                          <span className="lp-status-badge locked">🔒 Locked</span>
                        )}
                      </div>
                    </div>

                    {/* Main Title & Icon */}
                    <div className="lp-step-heading-row">
                      <span className="lp-step-icon">{step.icon}</span>
                      <h2 className="lp-step-title">{step.title}</h2>
                    </div>

                    {/* Description */}
                    <p className="lp-step-desc">{step.description}</p>

                    {/* Learning Objectives Chips / Checklist */}
                    <div className="lp-step-topics-box">
                      <div className="lp-step-topics-label">Key Concepts & Topics Covered:</div>
                      <div className="lp-step-topics-grid">
                        {step.topics.map((topic, i) => (
                          <div key={i} className="lp-topic-pill">
                            <span className="lp-topic-check">✓</span>
                            <span className="lp-topic-text">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="lp-step-footer">
                      {isLocked ? (
                        <div className="lp-locked-banner">
                          <span className="lp-locked-banner-icon">🔒</span>
                          <span className="lp-locked-banner-text">
                            <strong>Requirement:</strong> {step.lockRequirement}
                          </span>
                        </div>
                      ) : (
                        <div className="lp-step-actions-row">
                          <button
                            type="button"
                            className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'} lp-step-cta`}
                            onClick={() => navigate(step.route)}
                          >
                            {isCompleted ? `Review ${step.title} →` : step.actionLabel}
                          </button>

                          {step.quickLink && (
                            <Link to={step.quickLink.route} className="lp-step-quick-link">
                              {step.quickLink.label} →
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── TAB 2: Complete 10-Experiment Curriculum ─── */}
        {activeTab === 'curriculum' && (
          <section className="lp-curriculum-section animate-fade-in" aria-label="Complete Curriculum">
            <div className="lp-levels-stack">
              {learningPathLevels.map((level: LearningPathLevel) => {
                return (
                  <div key={level.levelNumber} className="lp-level-card">
                    <div className="lp-level-header">
                      <div className="lp-level-tag">{level.levelTitle}</div>
                      <h2 className="lp-level-name">{level.tagline}</h2>
                      <p className="lp-level-desc">{level.description}</p>
                    </div>

                    <div className="lp-level-exps-grid">
                      {level.experiments.map((exp) => {
                        const percent = getCompletionPercent(exp.id);
                        const isExpComplete = percent === 100;
                        const expMeta = experiments.find(e => e.id === exp.id);

                        return (
                          <div
                            key={exp.id}
                            className="lp-curriculum-exp-card"
                            style={{ '--exp-accent': exp.accentColor } as React.CSSProperties}
                          >
                            <div className="lp-c-card-header">
                              <span className="lp-c-card-num">
                                EXP {String(exp.number).padStart(2, '0')}
                              </span>
                              <div className="lp-c-card-tags">
                                <span className="badge badge-navy">{exp.category}</span>
                                <span className="badge badge-navy">{exp.difficulty}</span>
                              </div>
                            </div>

                            <h3 className="lp-c-card-title">{exp.title}</h3>
                            <p className="lp-c-card-desc">{exp.shortDescription}</p>

                            {/* Topics */}
                            <div className="lp-c-topics-wrapper">
                              <span className="lp-c-topics-title">Topics:</span>
                              <div className="lp-c-topics-list">
                                {exp.topics.slice(0, 6).map((t, idx) => (
                                  <span key={idx} className="lp-c-topic-badge">
                                    {t}
                                  </span>
                                ))}
                                {exp.topics.length > 6 && (
                                  <span className="lp-c-topic-badge more">
                                    +{exp.topics.length - 6} more
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Key Takeaway */}
                            <div className="lp-c-takeaway">
                              <strong>Takeaway:</strong> {exp.keyTakeaway}
                            </div>

                            {/* Footer */}
                            <div className="lp-c-card-footer">
                              <div className="lp-c-footer-left">
                                <span className="lp-c-time">⏱ {exp.estimatedTime}</span>
                                {percent > 0 && (
                                  <span className="lp-c-progress-tag">
                                    {percent}% Complete
                                  </span>
                                )}
                              </div>

                              <Link
                                to={`/experiment/${exp.id}`}
                                className="btn btn-secondary btn-sm lp-c-btn"
                              >
                                {isExpComplete ? 'Review Lab →' : 'Open Experiment →'}
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
