// src/pages/LearningPath.tsx
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import './LearningPath.css';

export interface JourneyStep {
  id: number;
  title: string;
  shortTitle: string;
  icon: string;
  estimatedTime: string;
  description: string;
  topics: string[];
  actionLabel: string;
  route: string;
  lockRequirement: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    shortTitle: 'Intro to ML',
    icon: '📘',
    estimatedTime: '20 min',
    description: 'Build a solid conceptual foundation by exploring what Machine Learning is, why it matters, the core paradigms (Supervised, Unsupervised, Reinforcement), and how intelligent algorithms solve real-world problems.',
    topics: [
      'What is Machine Learning and how it differs from traditional programming',
      'Why Machine Learning is important across industries',
      'Core types of Machine Learning: Supervised, Unsupervised, Reinforcement',
      'Real-world applications: Predictive healthcare, computer vision, recommendation systems',
      'The standard ML lifecycle: From raw data to deployed model'
    ],
    actionLabel: 'Start Learning',
    route: '/experiment/1#aim',
    lockRequirement: 'Available to all students',
  },
  {
    id: 2,
    title: 'Dataset & Feature Engineering',
    shortTitle: 'Dataset & Features',
    icon: '📊',
    estimatedTime: '30 min',
    description: 'Master the anatomy of machine learning datasets. Learn how raw tables are transformed into feature matrices, how categorical text is encoded, how missing values are imputed, and how feature scaling prevents numerical dominance.',
    topics: [
      'Understanding tabular datasets: Rows (samples) and Columns (features & targets)',
      'Input features (X) vs. Output labels (y)',
      'Categorical vs. Numerical variables and encoding strategies (One-Hot & Label)',
      'Handling missing values through statistical imputation (Mean, Median, Mode)',
      'Feature scaling: Standardisation (Z-score) vs. Min-Max Normalisation',
      'Train-test splitting and preventing catastrophic data leakage'
    ],
    actionLabel: 'Continue Learning',
    route: '/experiment/1#theory',
    lockRequirement: 'Complete Step 1 or start Data Pre-processing',
  },
  {
    id: 3,
    title: 'Run Your First Experiment',
    shortTitle: 'Run Experiment 1',
    icon: '⚙️',
    estimatedTime: '45 min',
    description: 'Put theory into practice by executing Experiment 01: Data Pre-processing for Machine Learning. Step through the interactive procedure, configure parameters, scale numerical features, encode categorical columns, and verify transformation outputs.',
    topics: [
      'Select and inspect raw input datasets in the Virtual Lab',
      'Configure pre-processing pipeline parameters interactively',
      'Execute step-by-step data cleaning, encoding, and scaling procedures',
      'Observe transformed dataset matrices in real time',
      'Verify pipeline execution without data leakage'
    ],
    actionLabel: 'Start Experiment 1 →',
    route: '/experiment/1',
    lockRequirement: 'Available to all students',
  },
  {
    id: 4,
    title: 'Analyze Results & Performance Metrics',
    shortTitle: 'Analyze Results',
    icon: '📈',
    estimatedTime: '35 min',
    description: 'Deep dive into model evaluation. Learn to interpret performance indicators including Mean Absolute Error, Root Mean Squared Error, R² scores, Confusion Matrices, Precision, Recall, and F1-Scores across classification and regression tasks.',
    topics: [
      'Understanding regression metrics: MAE, MSE, RMSE, and R² Goodness-of-Fit',
      'Classification performance diagnosis: Confusion Matrix breakdown',
      'Balancing Precision vs. Recall and interpreting the F1-Score',
      'Detecting Underfitting (High Bias) vs. Overfitting (High Variance)',
      'Validating model stability across cross-validation folds'
    ],
    actionLabel: 'Analyze Results →',
    route: '/experiment/1#results',
    lockRequirement: 'Complete Experiment 01 pre-processing procedure or Quiz',
  },
  {
    id: 5,
    title: 'Compare Experiments & Model Families',
    shortTitle: 'Compare Experiments',
    icon: '⚖️',
    estimatedTime: '40 min',
    description: 'Benchmark and compare different machine learning models. Analyze the strengths, weaknesses, assumptions, and decision boundaries of Linear Regression, Logistic Regression, SVM, Decision Trees, Random Forests, and K-Means clustering.',
    topics: [
      'Compare Experiment 01 (Pre-processing) with Experiment 02 (Linear Regression)',
      'Benchmark Linear models vs. Non-linear Tree ensembles and SVM kernels',
      'Analyze the effect of hyperparameter tuning (learning rate, tree depth, regularisation C)',
      'Identify which model configuration delivers optimal test generalisation',
      'Trade-offs between model interpretability and predictive complexity'
    ],
    actionLabel: 'Explore Visual Lab & Comparisons →',
    route: '/visual-lab',
    lockRequirement: 'Complete at least 1 experiment in the laboratory',
  },
  {
    id: 6,
    title: 'Final Mastery Assessment',
    shortTitle: 'Final Assessment',
    icon: '🏆',
    estimatedTime: '30 min',
    description: 'Consolidate and test your overall machine learning knowledge with the comprehensive laboratory assessment covering all pre-processing, regression, classification, and validation principles.',
    topics: [
      'Comprehensive multiple-choice assessment covering core ML theory',
      'Scenario-based questions on algorithm selection and data leakage prevention',
      'Evaluation metric calculation and interpretation challenges',
      'Receive instant scored feedback, mastery certification review, and detailed explanations'
    ],
    actionLabel: 'Take Assessment →',
    route: '/experiment/1#posttest',
    lockRequirement: 'Complete the foundational experiments and results analysis',
  },
];

export default function LearningPath() {
  const { progress, getCompletionPercent, getOverallPercent } = useProgress();
  const overallPercent = getOverallPercent();
  const navigate = useNavigate();

  // Determine step completion and locked status based on live progress
  const exp1Percent = getCompletionPercent('1');
  const exp2Percent = getCompletionPercent('2');
  const hasStartedExp1 = exp1Percent > 0;
  const isExp1Complete = exp1Percent === 100;
  const hasAnyQuizAttempt = Object.keys(progress.quizResults || {}).length > 0;

  // Determine state for each of the 6 steps
  const stepStates = useMemo(() => {
    // Step 1: Always Available / Completed if exp1 started
    const s1Complete = hasStartedExp1 || overallPercent > 0;
    
    // Step 2: Completed if Exp 1 procedure/theory has progress
    const s2Complete = progress.experiments['1']?.theory || exp1Percent >= 30;

    // Step 3: Complete if Exp 1 is 100% finished, or In Progress if >0
    const s3Complete = isExp1Complete;
    const s3InProgress = hasStartedExp1 && !isExp1Complete;

    // Step 4: Unlocked if exp1 has started; complete if posttest or results marked
    const s4Unlocked = hasStartedExp1 || hasAnyQuizAttempt;
    const s4Complete = progress.experiments['1']?.results || progress.experiments['1']?.posttest || isExp1Complete;

    // Step 5: Unlocked if Exp 1 completed or Exp 2 started; complete if exp2 has progress
    const s5Unlocked = s4Complete || exp1Percent >= 50 || exp2Percent > 0;
    const s5Complete = exp2Percent > 0 || overallPercent >= 20;

    // Step 6: Unlocked if previous steps finished
    const s6Unlocked = s4Complete || s5Complete || overallPercent >= 20;
    const s6Complete = hasAnyQuizAttempt && overallPercent >= 30;

    return {
      1: { status: s1Complete ? 'completed' : 'available', isLocked: false },
      2: { status: s2Complete ? 'completed' : 'available', isLocked: false },
      3: { status: s3Complete ? 'completed' : s3InProgress ? 'in-progress' : 'available', isLocked: false },
      4: { status: s4Complete ? 'completed' : s4Unlocked ? 'in-progress' : 'locked', isLocked: !s4Unlocked },
      5: { status: s5Complete ? 'completed' : s5Unlocked ? 'available' : 'locked', isLocked: !s5Unlocked },
      6: { status: s6Complete ? 'completed' : s6Unlocked ? 'available' : 'locked', isLocked: !s6Unlocked },
    };
  }, [hasStartedExp1, isExp1Complete, exp1Percent, exp2Percent, overallPercent, hasAnyQuizAttempt, progress.experiments]);

  // Count completed steps out of 6
  const completedStepsCount = Object.values(stepStates).filter(s => s.status === 'completed').length;
  const progressPercentage = Math.round((completedStepsCount / 6) * 100);

  // Default active step to first in-progress or available step
  const initialStepId = useMemo(() => {
    for (let i = 1; i <= 6; i++) {
      const s = stepStates[i as keyof typeof stepStates];
      if (s.status === 'in-progress' || (s.status === 'available' && !s.isLocked)) {
        return i;
      }
    }
    return 1;
  }, [stepStates]);

  const [activeStepId, setActiveStepId] = useState<number>(initialStepId);

  const activeStep = JOURNEY_STEPS.find(s => s.id === activeStepId) || JOURNEY_STEPS[0];
  const activeStepState = stepStates[activeStep.id as keyof typeof stepStates];

  const handleStepClick = (stepId: number) => {
    const s = stepStates[stepId as keyof typeof stepStates];
    // If not locked, allow clicking to view details
    if (!s.isLocked) {
      setActiveStepId(stepId);
    }
  };

  const handleActionClick = () => {
    if (!activeStepState.isLocked) {
      navigate(activeStep.route);
    }
  };

  return (
    <div className="lp-page-container animate-fade-in">
      {/* ─── Top Header ─── */}
      <header className="lp-header-banner">
        <div className="lp-header-main">
          <div className="lp-header-badge">🎓 Learning Path</div>
          <h1 className="lp-header-title">Structured Machine Learning Journey</h1>
          <p className="lp-header-subtitle">
            Follow a structured journey to master Machine Learning through concepts, experiments, and analysis.
          </p>
        </div>

        <div className="lp-header-progress-box">
          <div className="lp-header-progress-top">
            <span className="lp-header-progress-label">Journey Progression</span>
            <span className="lp-header-progress-val">
              <strong>{completedStepsCount}</strong> of 6 Steps Completed
            </span>
          </div>
          <div className="lp-header-progress-track">
            <div
              className="lp-header-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="lp-header-progress-pct">{progressPercentage}% Complete</span>
        </div>
      </header>

      {/* ─── Main 2-Column Stepper & Detail Panel Layout ─── */}
      <div className="lp-roadmap-layout">
        {/* Left Column: Vertical Interactive Stepper Timeline */}
        <nav className="lp-timeline-sidebar" aria-label="Learning Path Steps">
          <div className="lp-timeline-header">Curriculum Steps</div>
          <div className="lp-timeline-track">
            {JOURNEY_STEPS.map((step, idx) => {
              const state = stepStates[step.id as keyof typeof stepStates];
              const isSelected = step.id === activeStepId;
              const isLocked = state.isLocked;
              const isCompleted = state.status === 'completed';
              const isInProgress = state.status === 'in-progress';

              return (
                <div key={step.id} className="lp-timeline-node-wrapper">
                  {/* Step Button */}
                  <button
                    type="button"
                    className={`lp-timeline-step-btn${isSelected ? ' lp-timeline-step-btn--active' : ''}${isCompleted ? ' lp-timeline-step-btn--completed' : ''}${isInProgress ? ' lp-timeline-step-btn--in-progress' : ''}${isLocked ? ' lp-timeline-step-btn--locked' : ''}`}
                    onClick={() => handleStepClick(step.id)}
                    disabled={isLocked}
                    aria-current={isSelected ? 'step' : undefined}
                    title={isLocked ? step.lockRequirement : `Step ${step.id}: ${step.title}`}
                  >
                    {/* Node Circle Indicator */}
                    <div className="lp-timeline-marker">
                      {isCompleted ? (
                        <span className="lp-marker-check">✓</span>
                      ) : isLocked ? (
                        <span className="lp-marker-lock">🔒</span>
                      ) : isInProgress ? (
                        <span className="lp-marker-dot">●</span>
                      ) : (
                        <span className="lp-marker-num">{step.id}</span>
                      )}
                    </div>

                    {/* Step Label Info */}
                    <div className="lp-timeline-step-info">
                      <div className="lp-timeline-step-tag">
                        Step {step.id} {isCompleted && '· Done'}
                      </div>
                      <div className="lp-timeline-step-title">{step.shortTitle}</div>
                    </div>

                    {/* Status Pill on the right */}
                    <div className="lp-timeline-status-badge">
                      {isCompleted ? (
                        <span className="lp-status-chip completed">✓ Done</span>
                      ) : isInProgress ? (
                        <span className="lp-status-chip current">In Progress</span>
                      ) : isLocked ? (
                        <span className="lp-status-chip locked">Locked</span>
                      ) : (
                        <span className="lp-status-chip available">Available</span>
                      )}
                    </div>
                  </button>

                  {/* Connecting line between steps */}
                  {idx < JOURNEY_STEPS.length - 1 && (
                    <div className={`lp-timeline-connector${isCompleted ? ' lp-timeline-connector--completed' : ''}`} />
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Right Column: Active Step Detail Card */}
        <main className="lp-detail-container" aria-live="polite">
          <article className="lp-detail-card animate-fade-in" key={activeStep.id}>
            {/* Detail Card Header */}
            <div className="lp-detail-header">
              <div className="lp-detail-header-left">
                <div className="lp-detail-icon-circle">{activeStep.icon}</div>
                <div>
                  <div className="lp-detail-step-badge">
                    Step {activeStep.id} of 6
                  </div>
                  <h2 className="lp-detail-title">{activeStep.title}</h2>
                </div>
              </div>

              <div className="lp-detail-header-right">
                <span className={`lp-status-pill ${activeStepState.status}`}>
                  {activeStepState.status === 'completed'
                    ? '✓ Completed'
                    : activeStepState.status === 'in-progress'
                    ? '● Current / In Progress'
                    : activeStepState.status === 'locked'
                    ? '🔒 Locked'
                    : '○ Available'}
                </span>
                <span className="lp-detail-time">⏱ {activeStep.estimatedTime}</span>
              </div>
            </div>

            {/* Description */}
            <p className="lp-detail-desc">{activeStep.description}</p>

            {/* Learning Objectives / Key Concepts */}
            <div className="lp-detail-objectives-box">
              <h3 className="lp-detail-objectives-title">Learning Objectives & Content:</h3>
              <ul className="lp-detail-checklist">
                {activeStep.topics.map((topic, i) => (
                  <li key={i} className="lp-detail-check-item">
                    <span className="lp-detail-check-icon">✓</span>
                    <span className="lp-detail-check-text">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locked Notice or Action Footer */}
            {activeStepState.isLocked ? (
              <div className="lp-locked-notice">
                <div className="lp-locked-icon">🔒</div>
                <div>
                  <div className="lp-locked-title">This Step is Currently Locked</div>
                  <div className="lp-locked-desc">{activeStep.lockRequirement}</div>
                </div>
              </div>
            ) : (
              <div className="lp-detail-footer">
                <button
                  type="button"
                  className="btn btn-primary btn-lg lp-main-cta"
                  onClick={handleActionClick}
                >
                  {activeStepState.status === 'completed'
                    ? `Review ${activeStep.shortTitle} →`
                    : activeStep.actionLabel}
                </button>

                <div className="lp-detail-quick-links">
                  {activeStep.id === 3 && (
                    <Link to="/experiment/1" className="lp-quick-link">
                      Direct Link: Experiment 01 (Data Pre-processing) →
                    </Link>
                  )}
                  {activeStep.id === 5 && (
                    <Link to="/visual-lab" className="lp-quick-link">
                      Direct Link: Visual Lab & D3 Simulations →
                    </Link>
                  )}
                  {activeStep.id === 6 && (
                    <Link to="/glossary" className="lp-quick-link">
                      Review Master Glossary (102 Concepts) →
                    </Link>
                  )}
                </div>
              </div>
            )}
          </article>
        </main>
      </div>
    </div>
  );
}
