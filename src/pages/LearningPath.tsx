// src/pages/LearningPath.tsx
import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const exp10Percent = getCompletionPercent('10');
  const hasStartedExp1 = exp1Percent > 0;
  const isExp1Complete = exp1Percent === 100;
  const hasAnyQuizAttempt = Object.keys(progress.quizResults || {}).length > 0;

  // Determine dynamic status for each of the 6 forest checkpoints
  const checkpointStates: Record<number, { status: CheckpointStatus; isLocked: boolean }> = useMemo(() => {
    // 1. Foundations: Available from start / Complete if exp1 started or any progress made
    const s1Complete = hasStartedExp1 || overallPercent > 0;

    // 2. Dataset Grove: Complete if Exp 1 theory/procedure done
    const s2Complete = progress.experiments['1']?.theory || exp1Percent >= 30;

    // 3. Experiment Clearing: Complete if Exp 1 is 100% finished
    const s3Complete = isExp1Complete;
    const s3Current = hasStartedExp1 && !isExp1Complete;

    // 4. Results Observatory: Unlocked if exp1 has started; Complete if results marked or 100%
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
        {/* ─── The Interactive Digital Forest Map ─── */}
        <section className="forest-map-section" aria-label="Interactive Forest Map">
          <ForestMap
            checkpointStates={checkpointStates}
            selectedCheckpoint={selectedCheckpoint}
            onSelectCheckpoint={handleSelectCheckpoint}
            completedCount={completedCount}
            journeyProgressPct={journeyProgressPct}
            nextCheckpoint={nextCheckpoint}
            onContinue={handleContinueLearning}
          />
        </section>

        {/* ─── Selected Checkpoint Detail Panel ─── */}
        <section ref={detailPanelRef} className="forest-detail-section" aria-label="Checkpoint Details">
          <CheckpointDetailPanel
            checkpoint={selectedCheckpoint}
            status={checkpointStates[selectedCheckpoint.id]?.status || 'available'}
          />
        </section>
      </div>
    </div>
  );
}
