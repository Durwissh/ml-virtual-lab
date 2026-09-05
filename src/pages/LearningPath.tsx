// src/pages/LearningPath.tsx
import React, { useState, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { FOREST_CHECKPOINTS, ForestCheckpoint } from '../components/forest/forestData';
import ForestMap from '../components/forest/ForestMap';
import CheckpointDetailPanel from '../components/forest/CheckpointDetailPanel';
import { CheckpointStatus } from '../components/forest/CheckpointNode';
import './LearningPath.css';

export default function LearningPath() {
  const navigate = useNavigate();
  const { progress, getCompletionPercent, getOverallPercent } = useProgress();
  const overallPercent = getOverallPercent();
  const detailPanelRef = useRef<HTMLDivElement | null>(null);

  // Experiment completion metrics
  const exp1Percent = getCompletionPercent('1');
  const exp2Percent = getCompletionPercent('2');
  const exp3Percent = getCompletionPercent('3');
  const exp10Percent = getCompletionPercent('10');
  const hasStartedExp1 = exp1Percent > 0;
  const isExp1Complete = exp1Percent === 100;
  const hasAnyQuizAttempt = Object.keys(progress.quizResults || {}).length > 0;

  // Determine dynamic status for each of the 6 forest checkpoints
  const checkpointStates: Record<number, { status: CheckpointStatus; isLocked: boolean }> = useMemo(() => {
    // 1. Foundations: Available from start / Complete if exp1 started
    const s1Complete = hasStartedExp1 || overallPercent > 0;

    // 2. Dataset Grove: Complete if Exp 1 theory/procedure done
    const s2Complete = progress.experiments['1']?.theory || exp1Percent >= 30;

    // 3. Experiment Clearing: Complete if Exp 1 is 100% finished
    const s3Complete = isExp1Complete;
    const s3Current = hasStartedExp1 && !isExp1Complete;

    // 4. Results Observatory: Unlocked if exp1 has started or quiz attempted; Complete if results marked or 100%
    const s4Unlocked = hasStartedExp1 || hasAnyQuizAttempt;
    const s4Complete = progress.experiments['1']?.results || progress.experiments['1']?.posttest || isExp1Complete;

    // 5. Comparison Woods: Unlocked if Exp 1 results done or Exp 2 started; Complete if Exp 2 done
    const s5Unlocked = s4Complete || exp2Percent > 0;
    const s5Complete = exp2Percent === 100 || (exp2Percent > 0 && s4Complete);

    // 6. Knowledge Summit: Unlocked if previous checkpoints completed; Complete if exp10 done or quiz passed
    const s6Unlocked = s4Complete || s5Complete || overallPercent >= 25;
    const s6Complete = (hasAnyQuizAttempt && overallPercent >= 30) || exp10Percent === 100;

    // Determine which single checkpoint is currently active
    let currentFound = false;

    const determineStatus = (isDone: boolean, isAvail: boolean): CheckpointStatus => {
      if (isDone) return 'completed';
      if (isAvail && !currentFound) {
        currentFound = true;
        return 'current';
      }
      if (isAvail) return 'available';
      return 'locked';
    };

    const c1Status = determineStatus(s1Complete, true);
    const c2Status = determineStatus(s2Complete, true);
    const c3Status = s3Complete ? 'completed' : s3Current ? 'current' : determineStatus(false, true);
    const c4Status = s4Complete ? 'completed' : s4Unlocked ? determineStatus(false, true) : 'locked';
    const c5Status = s5Complete ? 'completed' : s5Unlocked ? determineStatus(false, true) : 'locked';
    const c6Status = s6Complete ? 'completed' : s6Unlocked ? determineStatus(false, true) : 'locked';

    return {
      1: { status: c1Status, isLocked: false },
      2: { status: c2Status, isLocked: false },
      3: { status: c3Status, isLocked: false },
      4: { status: c4Status, isLocked: !s4Unlocked },
      5: { status: c5Status, isLocked: !s5Unlocked },
      6: { status: c6Status, isLocked: !s6Unlocked },
    };
  }, [hasStartedExp1, isExp1Complete, exp1Percent, exp2Percent, exp10Percent, overallPercent, hasAnyQuizAttempt, progress.experiments]);

  // Count completed checkpoints
  const completedCount = Object.values(checkpointStates).filter(s => s.status === 'completed').length;
  const journeyProgressPct = Math.round((completedCount / 6) * 100);

  // Find the next available or current checkpoint
  const nextCheckpoint = useMemo(() => {
    for (const cp of FOREST_CHECKPOINTS) {
      const state = checkpointStates[cp.id];
      if (state && (state.status === 'current' || state.status === 'available')) {
        return cp;
      }
    }
    return FOREST_CHECKPOINTS[0];
  }, [checkpointStates]);

  // Selected checkpoint for the detail panel (defaults to current/next checkpoint)
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<ForestCheckpoint>(nextCheckpoint);

  const handleSelectCheckpoint = (checkpoint: ForestCheckpoint) => {
    setSelectedCheckpoint(checkpoint);
    if (detailPanelRef.current) {
      detailPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleContinueLearning = () => {
    navigate(nextCheckpoint.route);
  };

  return (
    <div className="forest-page-wrapper animate-fade-in">
      <div className="forest-container">
        {/* ─── Top Student Progress Header ─── */}
        <header className="forest-progress-header">
          <div className="forest-header-main">
            <div className="forest-header-title-row">
              <span className="forest-brand-tag">🌲 YOUR LEARNING JOURNEY</span>
              <span className="forest-counter-tag">
                <strong>{completedCount}</strong> / 6 Checkpoints Completed
              </span>
            </div>

            <h1 className="forest-main-title">Interactive Learning Forest</h1>
            <p className="forest-main-subtitle">
              Follow the winding forest path through every core stage of Machine Learning—from foundations and feature engineering to experimental mastery.
            </p>

            {/* Progress Bar */}
            <div className="forest-progress-bar-wrap">
              <div className="forest-progress-bar-bg">
                <div
                  className="forest-progress-bar-fill"
                  style={{ width: `${journeyProgressPct}%` }}
                />
              </div>
              <span className="forest-progress-pct-badge">{journeyProgressPct}%</span>
            </div>
          </div>

          {/* Dynamic "Next Up" Banner */}
          <div className="forest-next-up-card">
            <div className="forest-next-up-left">
              <span className="forest-next-label">⚡ NEXT RECOMMENDED ACTION:</span>
              <div className="forest-next-title">
                {nextCheckpoint.icon} {nextCheckpoint.name} · {nextCheckpoint.subtitle}
              </div>
              <p className="forest-next-desc">
                {checkpointStates[nextCheckpoint.id]?.status === 'completed'
                  ? 'All foundational stages completed! Advance to higher-level algorithm benchmarking.'
                  : nextCheckpoint.description}
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-lg forest-continue-btn"
              onClick={handleContinueLearning}
            >
              Continue Learning →
            </button>
          </div>
        </header>

        {/* ─── The Interactive Digital Forest Map ─── */}
        <section className="forest-map-section" aria-label="Interactive Forest Map">
          <div className="forest-map-instruction">
            <span className="instruction-icon">👆</span>
            <span>Click on any checkpoint tree along the forest trail to view objectives & laboratory actions</span>
          </div>

          <ForestMap
            checkpointStates={checkpointStates}
            selectedCheckpoint={selectedCheckpoint}
            onSelectCheckpoint={handleSelectCheckpoint}
          />
        </section>

        {/* ─── Selected Checkpoint Detail Panel ─── */}
        <section ref={detailPanelRef} className="forest-detail-section" aria-label="Checkpoint Details">
          <CheckpointDetailPanel
            checkpoint={selectedCheckpoint}
            status={checkpointStates[selectedCheckpoint.id]?.status || 'available'}
          />
        </section>

        {/* ─── Forest Trailhead & Basecamp Links ─── */}
        <footer className="forest-footer-card">
          <div className="forest-footer-content">
            <span className="forest-camp-icon">🏕️ 🌲 🔥</span>
            <h2 className="forest-footer-title">Looking for the Complete Laboratory Index?</h2>
            <p className="forest-footer-desc">
              Access all 10 guided experiments, formulas, D3 sandboxes, and academic definitions directly from the laboratory hub.
            </p>
            <div className="forest-footer-actions">
              <Link to="/experiments" className="btn btn-primary">
                Explore All 10 Experiments →
              </Link>
              <Link to="/glossary" className="btn btn-secondary">
                Master Glossary (102 Terms)
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
