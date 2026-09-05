// src/components/forest/ForestMap.tsx
import React, { useState } from 'react';
import { FOREST_CHECKPOINTS, ForestCheckpoint } from './forestData';
import CheckpointNode, { CheckpointStatus } from './CheckpointNode';
import CheckpointDetailPanel from './CheckpointDetailPanel';

interface ForestMapProps {
  checkpointStates: Record<number, { status: CheckpointStatus; isLocked: boolean }>;
  selectedCheckpoint: ForestCheckpoint;
  onSelectCheckpoint: (checkpoint: ForestCheckpoint) => void;
  completedCount: number;
  journeyProgressPct: number;
  nextCheckpoint: ForestCheckpoint;
  onContinue: () => void;
}

export default function ForestMap({
  checkpointStates,
  selectedCheckpoint,
  onSelectCheckpoint,
  completedCount,
  journeyProgressPct,
  nextCheckpoint,
  onContinue,
}: ForestMapProps) {
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  const handleNodeClick = (checkpoint: ForestCheckpoint) => {
    onSelectCheckpoint(checkpoint);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
  };

  // Find the position of the current active node for player marker
  const activeCheckpoint = nextCheckpoint || FOREST_CHECKPOINTS[0];

  return (
    <div className="forest-rpg-viewport" role="region" aria-label="Interactive Digital Forest RPG Map">
      {/* ─── Top Floating Game HUD ─── */}
      <div className="forest-floating-hud">
        <div className="forest-hud-left">
          <div className="forest-hud-badge">🌲 ML FOREST ADVENTURE</div>
          <div className="forest-hud-progress-wrap">
            <span className="forest-hud-step-text">
              <strong>{completedCount}</strong> / 6 Checkpoints Cleared
            </span>
            <div className="forest-hud-bar">
              <div className="forest-hud-fill" style={{ width: `${journeyProgressPct}%` }} />
            </div>
            <span className="forest-hud-pct">{journeyProgressPct}%</span>
          </div>
        </div>

        <div className="forest-hud-right">
          <button
            type="button"
            className="forest-hud-continue-btn"
            onClick={onContinue}
            title="Continue to your current learning quest"
          >
            <span>▶ Quest: {nextCheckpoint.name}</span>
            <span className="hud-arrow">→</span>
          </button>
        </div>
      </div>

      {/* ─── Top-Down 2D Widescreen RPG Forest Map Canvas ─── */}
      <div className="forest-rpg-canvas">
        {/* Background RPG Illustrated Forest Image */}
        <img
          src="/assets/forest_wide_rpg_map.jpg"
          alt="Top-Down Forest RPG Widescreen Map"
          className="forest-rpg-bg-image"
          loading="eager"
        />

        {/* Ambient Sunlight & Magical Forest Particles */}
        <div className="forest-ambient-effects" aria-hidden="true">
          <div className="forest-sun-shafts" />
          <div className="forest-firefly ff-1" />
          <div className="forest-firefly ff-2" />
          <div className="forest-firefly ff-3" />
          <div className="forest-firefly ff-4" />
          <div className="forest-firefly ff-5" />
          <div className="forest-firefly ff-6" />
          <div className="forest-firefly ff-7" />
          <div className="forest-firefly ff-8" />
        </div>

        {/* Player Explorer Position Indicator */}
        <div
          className="forest-player-avatar"
          style={{
            left: `${activeCheckpoint.mapX}%`,
            top: `${activeCheckpoint.mapY - 6}%`,
          }}
          title={`You are here: ${activeCheckpoint.name}`}
        >
          <div className="player-pulse-ring" />
          <div className="player-badge">
            <span className="player-icon">🧭</span>
            <span className="player-tooltip">YOU ARE HERE</span>
          </div>
        </div>

        {/* ─── 6 Interactive Checkpoint Waypoints ─── */}
        <div className="forest-nodes-layer">
          {FOREST_CHECKPOINTS.map((checkpoint) => {
            const state = checkpointStates[checkpoint.id] || { status: 'available', isLocked: false };
            const isSelected = selectedCheckpoint.id === checkpoint.id;

            return (
              <CheckpointNode
                key={checkpoint.id}
                checkpoint={checkpoint}
                status={state.status}
                isSelected={isSelected}
                onSelect={handleNodeClick}
              />
            );
          })}
        </div>
      </div>

      {/* ─── Sleek Game Quest Modal Overlay (Opens on Node Click) ─── */}
      {showDetailModal && (
        <div className="forest-quest-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="forest-quest-modal-card animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <CheckpointDetailPanel
              checkpoint={selectedCheckpoint}
              status={checkpointStates[selectedCheckpoint.id]?.status || 'available'}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
