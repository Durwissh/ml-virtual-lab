// src/pages/LearningPath.tsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { experiments } from '../data/experiments';
import './LearningPath.css';

export interface MilestoneStage {
  id: number;
  stepNumber: string;
  category: string;
  title: string;
  purpose: string;
  learnPoints: string[];
  relatedExpIds: string[];
  ctaLabel: string;
  route: string;
}

const MILESTONES: MilestoneStage[] = [
  {
    id: 1,
    stepNumber: '01',
    category: 'FOUNDATIONS',
    title: 'Introduction to Machine Learning',
    purpose: 'Understand core ML paradigms and the end-to-end data-to-decision workflow.',
    learnPoints: [
      'What ML is & how it differs from rule-based code',
      'Supervised, Unsupervised, and Reinforcement paradigms',
      'The standard end-to-end ML lifecycle'
    ],
    relatedExpIds: ['1'],
    ctaLabel: 'Start Foundations →',
    route: '/experiment/1#aim'
  },
  {
    id: 2,
    stepNumber: '02',
    category: 'DATA & FEATURES',
    title: 'Data Preparation & Feature Engineering',
    purpose: 'Transform raw tables into clean numerical matrices without data leakage.',
    learnPoints: [
      'Missing value handling & statistical imputation',
      'One-Hot & Label categorical encoding',
      'Feature scaling: Standardisation & Normalisation',
      'Train-test splitting hygiene'
    ],
    relatedExpIds: ['1'],
    ctaLabel: 'Explore Data & Pre-processing →',
    route: '/experiment/1'
  },
  {
    id: 3,
    stepNumber: '03',
    category: 'SUPERVISED LEARNING',
    title: 'Learning from Labeled Data',
    purpose: 'Fit linear and non-linear decision boundaries to predict continuous and discrete outcomes.',
    learnPoints: [
      'Linear & Logistic Regression',
      'Support Vector Machines (SVM)',
      'Decision Trees & Ensemble Random Forests'
    ],
    relatedExpIds: ['2', '4', '6', '8', '9'],
    ctaLabel: 'Explore Supervised Models →',
    route: '/experiment/2'
  },
  {
    id: 4,
    stepNumber: '04',
    category: 'UNSUPERVISED LEARNING',
    title: 'Discovering Hidden Patterns',
    purpose: 'Identify natural groupings and compress high-dimensional feature spaces without labels.',
    learnPoints: [
      'K-Means centroid clustering & inertia',
      'Principal Component Analysis (PCA)',
      'Explained variance & scree plot analysis'
    ],
    relatedExpIds: ['5', '7'],
    ctaLabel: 'Explore Unsupervised Learning →',
    route: '/experiment/7'
  },
  {
    id: 5,
    stepNumber: '05',
    category: 'MODEL EVALUATION',
    title: 'Evaluating Machine Learning Models',
    purpose: 'Diagnose bias vs. variance and measure generalisation with rigorous cross-validation.',
    learnPoints: [
      'Regression: MAE, MSE, RMSE, R²',
      'Classification: Confusion matrix, Precision, Recall, F1',
      'K-Fold & Stratified Cross-Validation'
    ],
    relatedExpIds: ['3'],
    ctaLabel: 'Evaluate Models →',
    route: '/experiment/3'
  },
  {
    id: 6,
    stepNumber: '06',
    category: 'APPLICATION & MASTERY',
    title: 'Neural Foundations & Lab Mastery',
    purpose: 'Connect classical models to neural perceptrons and master the complete Virtual Lab.',
    learnPoints: [
      'Artificial neurons & perceptron learning rule',
      'Linear separability & step activation functions',
      'Complete 10-experiment virtual laboratory synthesis'
    ],
    relatedExpIds: ['10'],
    ctaLabel: 'Master Laboratory →',
    route: '/experiment/10'
  }
];

export default function LearningPath() {
  const navigate = useNavigate();
  const { progress, getCompletionPercent } = useProgress();
  const [activeMilestoneId, setActiveMilestoneId] = useState<number>(1);
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate live completion state for each milestone
  const milestoneStates = useMemo(() => {
    const exp1Pct = getCompletionPercent('1');
    const exp2Pct = getCompletionPercent('2');
    const exp3Pct = getCompletionPercent('3');
    const exp5Pct = getCompletionPercent('5');
    const exp7Pct = getCompletionPercent('7');
    const exp10Pct = getCompletionPercent('10');

    return {
      1: { isCompleted: exp1Pct > 0, isUnlocked: true },
      2: { isCompleted: exp1Pct === 100, isUnlocked: exp1Pct > 0 },
      3: { isCompleted: exp2Pct === 100, isUnlocked: exp1Pct >= 50 },
      4: { isCompleted: exp5Pct > 0 || exp7Pct > 0, isUnlocked: exp2Pct > 0 },
      5: { isCompleted: exp3Pct === 100, isUnlocked: exp2Pct > 0 || exp5Pct > 0 },
      6: { isCompleted: exp10Pct === 100, isUnlocked: exp3Pct > 0 }
    };
  }, [getCompletionPercent]);

  // Scroll observer to highlight active milestone as user travels down the road
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute('data-milestone-id'));
          if (id) {
            setActiveMilestoneId(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    milestoneRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToRoad = () => {
    const roadElem = document.getElementById('learning-road-start');
    if (roadElem) {
      roadElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMilestoneClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="lp-journey-page">
      {/* ─── Compact Sticky Stage Indicator ─── */}
      <aside className="lp-sticky-tracker" aria-label="Journey Progress">
        <div className="lp-tracker-inner">
          <span className="lp-tracker-label">STAGE {activeMilestoneId} OF 6</span>
          <div className="lp-tracker-dots">
            {MILESTONES.map((m) => (
              <span
                key={m.id}
                className={`lp-tracker-dot${m.id === activeMilestoneId ? ' active' : ''}${milestoneStates[m.id as keyof typeof milestoneStates]?.isCompleted ? ' completed' : ''}`}
                title={`Stage ${m.id}: ${m.title}`}
              />
            ))}
          </div>
        </div>
      </aside>

      <div className="lp-journey-container">
        {/* ─── Compact Hero (No bulky stats) ─── */}
        <header className="lp-journey-hero">
          <span className="lp-hero-tag">SRM VIRTUAL LAB · CURRICULUM ROADMAP</span>
          <h1 className="lp-hero-headline">Machine Learning Journey</h1>
          <p className="lp-hero-subline">
            From data foundations to intelligent neural models. Follow the road through each milestone.
          </p>
          <button
            type="button"
            className="lp-hero-start-btn"
            onClick={scrollToRoad}
            aria-label="Start Journey"
          >
            Start Journey ↓
          </button>
        </header>

        {/* ─── The Winding Road Container ─── */}
        <main id="learning-road-start" className="lp-road-wrapper">
          {/* Central Connecting Road SVG Path */}
          <div className="lp-road-svg-layer" aria-hidden="true">
            <svg
              className="lp-road-svg"
              viewBox="0 0 1000 2400"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Outer Roadbed Glow */}
              <path
                d="M 500 40 
                   C 500 160, 260 220, 260 360
                   C 260 520, 740 600, 740 760
                   C 740 920, 260 1000, 260 1160
                   C 260 1320, 740 1400, 740 1560
                   C 740 1720, 260 1800, 260 1960
                   C 260 2120, 500 2200, 500 2340"
                className="lp-road-bed"
              />
              {/* Active Road Surface */}
              <path
                d="M 500 40 
                   C 500 160, 260 220, 260 360
                   C 260 520, 740 600, 740 760
                   C 740 920, 260 1000, 260 1160
                   C 260 1320, 740 1400, 740 1560
                   C 740 1720, 260 1800, 260 1960
                   C 260 2120, 500 2200, 500 2340"
                className="lp-road-surface"
              />
              {/* Center Line Markings */}
              <path
                d="M 500 40 
                   C 500 160, 260 220, 260 360
                   C 260 520, 740 600, 740 760
                   C 740 920, 260 1000, 260 1160
                   C 260 1320, 740 1400, 740 1560
                   C 740 1720, 260 1800, 260 1960
                   C 260 2120, 500 2200, 500 2340"
                className="lp-road-dash"
              />
            </svg>
          </div>

          {/* Road Start Marker */}
          <div className="lp-road-start-marker">
            <span className="lp-start-badge">START JOURNEY</span>
            <div className="lp-start-node" />
          </div>

          {/* ─── 6 Milestone Stops along the Road ─── */}
          <div className="lp-milestones-track">
            {MILESTONES.map((m, index) => {
              const isLeft = index % 2 === 0;
              const isActive = m.id === activeMilestoneId;
              const state = milestoneStates[m.id as keyof typeof milestoneStates];
              const isCompleted = state?.isCompleted;

              return (
                <div
                  key={m.id}
                  ref={(el) => {
                    milestoneRefs.current[index] = el;
                  }}
                  data-milestone-id={m.id}
                  className={`lp-milestone-row ${isLeft ? 'lp-row-left' : 'lp-row-right'}${isActive ? ' lp-row--active' : ''}${isCompleted ? ' lp-row--completed' : ''}`}
                >
                  {/* Road Stop Node Pin */}
                  <div className="lp-road-node-anchor">
                    <div className="lp-node-pulse-ring" />
                    <div className="lp-node-core">
                      {isCompleted ? (
                        <span className="lp-node-check">✓</span>
                      ) : (
                        <span className="lp-node-num">{m.stepNumber}</span>
                      )}
                    </div>
                  </div>

                  {/* Connector Line from Node to Card */}
                  <div className="lp-node-connector" aria-hidden="true" />

                  {/* Compact Milestone Card */}
                  <article className="lp-milestone-card">
                    {/* Card Top Meta */}
                    <div className="lp-card-header">
                      <span className="lp-step-label">STEP {m.stepNumber}</span>
                      <span className="lp-category-label">{m.category}</span>
                      {isCompleted && (
                        <span className="lp-completed-pill">✓ Done</span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="lp-card-title">{m.title}</h2>

                    {/* 1-Sentence Purpose */}
                    <p className="lp-card-purpose">{m.purpose}</p>

                    {/* Concise Learn List */}
                    <div className="lp-card-learn-block">
                      <span className="lp-learn-heading">Learn:</span>
                      <ul className="lp-learn-list">
                        {m.learnPoints.map((point, i) => (
                          <li key={i} className="lp-learn-item">
                            <span className="lp-learn-bullet">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Related Experiments Connection */}
                    <div className="lp-card-experiments">
                      <span className="lp-exp-label">RELATED EXPERIMENTS:</span>
                      <div className="lp-exp-chips">
                        {m.relatedExpIds.map((expId) => {
                          const expData = experiments.find((e) => e.id === expId);
                          const expNum = String(expData?.number || expId).padStart(2, '0');
                          return (
                            <Link
                              key={expId}
                              to={`/experiment/${expId}`}
                              className="lp-exp-chip"
                              title={`Open Experiment ${expNum}: ${expData?.title || ''}`}
                            >
                              <span className="lp-chip-num">{expNum}</span>
                              <span className="lp-chip-name">{expData?.shortTitle || `Exp ${expNum}`}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Primary Action Button */}
                    <div className="lp-card-footer">
                      <button
                        type="button"
                        className="lp-card-cta-btn"
                        onClick={() => handleMilestoneClick(m.route)}
                      >
                        {m.ctaLabel}
                      </button>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* ─── Terminus / Finish Line ─── */}
          <footer className="lp-road-terminus">
            <div className="lp-finish-node" />
            <div className="lp-finish-card">
              <span className="lp-finish-tag">JOURNEY COMPLETE</span>
              <h2 className="lp-finish-title">Ready for Hands-On Laboratory Practice</h2>
              <p className="lp-finish-desc">
                Step into all 10 virtual experiments with interactive datasets, parameter tuning, and evaluation quizzes.
              </p>
              <div className="lp-finish-actions">
                <Link to="/experiments" className="btn btn-primary btn-lg">
                  Explore 10 Experiments →
                </Link>
                <Link to="/glossary" className="btn btn-secondary btn-lg">
                  Review Master Glossary (102 Terms)
                </Link>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
