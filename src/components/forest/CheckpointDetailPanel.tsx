// src/components/forest/CheckpointDetailPanel.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ForestCheckpoint } from './forestData';
import { CheckpointStatus } from './CheckpointNode';
import { experiments } from '../../data/experiments';

interface CheckpointDetailPanelProps {
  checkpoint: ForestCheckpoint;
  status: CheckpointStatus;
  onClose?: () => void;
  onNextCheckpoint?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export default function CheckpointDetailPanel({
  checkpoint,
  status,
  onClose,
}: CheckpointDetailPanelProps) {
  const navigate = useNavigate();
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';

  const handleActionClick = () => {
    if (!isLocked) {
      navigate(checkpoint.route);
    }
  };

  return (
    <article className="forest-detail-panel animate-fade-in" aria-live="polite">
      {/* Top Bar with Badges and Close Button */}
      <div className="forest-detail-top">
        <div className="forest-detail-badges">
          <span className="forest-detail-num">STEP {checkpoint.number} OF 06</span>
          <span className="forest-detail-cat">{checkpoint.category}</span>
          <span className="forest-detail-growth">🌱 {checkpoint.growthStage}</span>
          {isCompleted && <span className="forest-status-badge completed">✓ Completed</span>}
          {isCurrent && <span className="forest-status-badge current">● Current Stage</span>}
          {status === 'available' && <span className="forest-status-badge available">○ Available</span>}
          {isLocked && <span className="forest-status-badge locked">🔒 Locked</span>}
        </div>

        {onClose && (
          <button
            type="button"
            className="forest-detail-close-btn"
            onClick={onClose}
            title="Minimize checkpoint details"
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>

      {/* Main Header with Technical Icon & Title */}
      <div className="forest-detail-header">
        <div className="forest-detail-icon-circle">
          <span className="forest-detail-emoji">{checkpoint.icon}</span>
        </div>
        <div className="forest-detail-title-wrap">
          <div className="forest-detail-location-tag">📍 {checkpoint.locationName}</div>
          <h2 className="forest-detail-title">{checkpoint.name}</h2>
          <p className="forest-detail-subtitle">{checkpoint.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <p className="forest-detail-desc">{checkpoint.description}</p>

      {/* Learning Objectives Box */}
      <div className="forest-detail-objectives">
        <div className="forest-objectives-header">
          <span className="forest-objectives-icon">🎯</span>
          <span className="forest-objectives-title">Core Learning Objectives & Technical Milestones</span>
        </div>
        <ul className="forest-objectives-list">
          {checkpoint.learnObjectives.map((obj, i) => (
            <li key={i} className="forest-objective-item">
              <span className="forest-objective-check">✓</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Laboratory Experiments */}
      {checkpoint.relatedExpIds.length > 0 && (
        <div className="forest-detail-experiments">
          <span className="forest-exp-title">LABORATORY EXPERIMENTS LINKED TO THIS STAGE:</span>
          <div className="forest-exp-chips">
            {checkpoint.relatedExpIds.map((expId) => {
              const expData = experiments.find((e) => e.id === expId);
              const expNum = String(expData?.number || expId).padStart(2, '0');
              return (
                <Link
                  key={expId}
                  to={`/experiment/${expId}`}
                  className="forest-exp-chip"
                  title={`Open Experiment ${expNum}: ${expData?.title || ''}`}
                >
                  <span className="forest-chip-num">EXP {expNum}</span>
                  <span className="forest-chip-name">{expData?.shortTitle || `Exp ${expNum}`}</span>
                  <span className="forest-chip-arrow">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Action or Locked Notice */}
      <div className="forest-detail-footer">
        {isLocked ? (
          <div className="forest-locked-box">
            <div className="forest-locked-icon">🔒</div>
            <div className="forest-locked-text-wrap">
              <div className="forest-locked-title">Stage Currently Locked</div>
              <div className="forest-locked-desc">{checkpoint.lockMessage}</div>
            </div>
          </div>
        ) : (
          <div className="forest-action-row">
            <button
              type="button"
              className="btn btn-primary btn-lg forest-main-cta"
              onClick={handleActionClick}
            >
              {isCompleted ? `Review ${checkpoint.name} →` : checkpoint.ctaLabel}
            </button>

            <span className="forest-action-hint">
              {isCompleted
                ? 'You have already completed this stage. Click to review theory & experiment.'
                : 'Ready to proceed? Click to open the active laboratory module.'}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
