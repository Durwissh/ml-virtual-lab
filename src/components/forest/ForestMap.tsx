// src/components/forest/ForestMap.tsx
import React from 'react';
import { FOREST_CHECKPOINTS, ForestCheckpoint } from './forestData';
import CheckpointNode, { CheckpointStatus } from './CheckpointNode';

interface ForestMapProps {
  checkpointStates: Record<number, { status: CheckpointStatus; isLocked: boolean }>;
  selectedCheckpoint: ForestCheckpoint;
  onSelectCheckpoint: (checkpoint: ForestCheckpoint) => void;
}

export default function ForestMap({
  checkpointStates,
  selectedCheckpoint,
  onSelectCheckpoint,
}: ForestMapProps) {
  return (
    <div className="forest-map-container" role="region" aria-label="Interactive Digital Forest Map">
      {/* ─── Ambient Landscape Layers ─── */}
      <div className="forest-ambient-layer" aria-hidden="true">
        {/* Soft Background Hills */}
        <div className="forest-hill hill-back" />
        <div className="forest-hill hill-mid" />

        {/* Ambient Fireflies / Glowing Particles */}
        <div className="forest-firefly ff-1" />
        <div className="forest-firefly ff-2" />
        <div className="forest-firefly ff-3" />
        <div className="forest-firefly ff-4" />
        <div className="forest-firefly ff-5" />
        <div className="forest-firefly ff-6" />

        {/* Decorative Scenery Trees & Landmarks */}
        <div className="forest-deco-tree tree-1">🌲</div>
        <div className="forest-deco-tree tree-2">🌳</div>
        <div className="forest-deco-tree tree-3">🌲</div>
        <div className="forest-deco-tree tree-4">🌳</div>
        <div className="forest-deco-tree tree-5">🌲</div>
        <div className="forest-deco-tree tree-6">🌳</div>
        <div className="forest-deco-tree tree-7">🌲</div>
        <div className="forest-deco-tree tree-8">🌳</div>
        <div className="forest-deco-tree tree-9">🌲</div>

        {/* Summit Ridge */}
        <div className="forest-summit-peaks">⛰️ 🏔️ ⛰️</div>
      </div>

      {/* ─── SVG Winding Forest Path ─── */}
      <svg
        className="forest-path-svg"
        viewBox="0 0 1000 1200"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="forestPathActiveGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          <filter id="forestGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Pathbed Shadow */}
        <path
          d="M 200 144
             C 450 180, 750 200, 750 336
             C 750 430, 250 450, 250 552
             C 250 640, 780 660, 780 768
             C 780 880, 220 880, 220 984
             C 220 1060, 600 1050, 600 1128"
          className="forest-path-bed"
        />

        {/* Deep Forest Trail Surface */}
        <path
          d="M 200 144
             C 450 180, 750 200, 750 336
             C 750 430, 250 450, 250 552
             C 250 640, 780 660, 780 768
             C 780 880, 220 880, 220 984
             C 220 1060, 600 1050, 600 1128"
          className="forest-path-surface"
        />

        {/* Glowing Luminous Center Trail Line */}
        <path
          d="M 200 144
             C 450 180, 750 200, 750 336
             C 750 430, 250 450, 250 552
             C 250 640, 780 660, 780 768
             C 780 880, 220 880, 220 984
             C 220 1060, 600 1050, 600 1128"
          className="forest-path-active-glow"
        />
      </svg>

      {/* ─── 6 Interactive Checkpoint Nodes ─── */}
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
              onSelect={onSelectCheckpoint}
            />
          );
        })}
      </div>
    </div>
  );
}
