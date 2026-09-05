// src/components/forest/ForestMap.tsx
import React from 'react';
import { FOREST_CHECKPOINTS, ForestCheckpoint } from './forestData';
import CheckpointNode, { CheckpointStatus } from './CheckpointNode';

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
  return (
    <div className="forest-map-container" role="region" aria-label="Interactive Digital Forest Map">
      {/* ─── Floating Top Controls inside Map ─── */}
      <div className="forest-floating-hud">
        <div className="forest-hud-left">
          <div className="forest-hud-badge">🌲 ML LEARNING FOREST</div>
          <div className="forest-hud-progress-wrap">
            <span className="forest-hud-step-text">
              <strong>{completedCount}</strong> / 6 Checkpoints
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
            title="Jump to current learning objective"
          >
            <span>Next: {nextCheckpoint.name}</span>
            <span className="hud-arrow">→</span>
          </button>
        </div>
      </div>

      {/* ─── Ambient Landscape Layers ─── */}
      <div className="forest-ambient-layer" aria-hidden="true">
        {/* Soft Background Hills */}
        <div className="forest-hill hill-back" />
        <div className="forest-hill hill-mid" />
        <div className="forest-hill hill-front" />

        {/* Ambient Fireflies / Glowing Particles */}
        <div className="forest-firefly ff-1" />
        <div className="forest-firefly ff-2" />
        <div className="forest-firefly ff-3" />
        <div className="forest-firefly ff-4" />
        <div className="forest-firefly ff-5" />
        <div className="forest-firefly ff-6" />
        <div className="forest-firefly ff-7" />
        <div className="forest-firefly ff-8" />

        {/* Fluttering Butterflies */}
        <div className="forest-nature-item butterfly-1">🦋</div>
        <div className="forest-nature-item butterfly-2">🦋</div>
        <div className="forest-nature-item butterfly-3">🦋</div>

        {/* Cute Forest Wildlife */}
        <div className="forest-nature-item animal-deer" title="Forest Deer">🦌</div>
        <div className="forest-nature-item animal-rabbit-1" title="Meadow Rabbit">🐇</div>
        <div className="forest-nature-item animal-rabbit-2" title="Meadow Rabbit">🐇</div>
        <div className="forest-nature-item animal-fox" title="Curious Fox">🦊</div>
        <div className="forest-nature-item animal-hedgehog" title="Hedgehog">🦔</div>
        <div className="forest-nature-item animal-owl" title="Wise Owl">🦉</div>
        <div className="forest-nature-item animal-bird" title="Songbird">🐦</div>

        {/* Dense Lush Trees Along the Landscape */}
        <div className="forest-deco-tree tree-1">🌲</div>
        <div className="forest-deco-tree tree-2">🌳</div>
        <div className="forest-deco-tree tree-3">🌲</div>
        <div className="forest-deco-tree tree-4">🌳</div>
        <div className="forest-deco-tree tree-5">🌲</div>
        <div className="forest-deco-tree tree-6">🌳</div>
        <div className="forest-deco-tree tree-7">🌲</div>
        <div className="forest-deco-tree tree-8">🌳</div>
        <div className="forest-deco-tree tree-9">🌲</div>
        <div className="forest-deco-tree tree-10">🌳</div>
        <div className="forest-deco-tree tree-11">🌲</div>
        <div className="forest-deco-tree tree-12">🌳</div>
        <div className="forest-deco-tree tree-13">🌲</div>
        <div className="forest-deco-tree tree-14">🌳</div>

        {/* Rich Grass Tufts & Wildflowers */}
        <div className="forest-grass grass-1">🌿 🌸 🌿</div>
        <div className="forest-grass grass-2">🌱 🌼 🌱</div>
        <div className="forest-grass grass-3">🌿 🌻 🌿</div>
        <div className="forest-grass grass-4">🌱 🌸 🌱</div>
        <div className="forest-grass grass-5">🌿 🌼 🌿</div>
        <div className="forest-grass grass-6">🌱 🌺 🌱</div>
        <div className="forest-grass grass-7">🌿 🌷 🌿</div>
        <div className="forest-grass grass-8">🌱 🌸 🌱</div>
        <div className="forest-grass grass-9">🌿 🌼 🌿</div>
        <div className="forest-grass grass-10">🌱 🌻 🌱</div>
        <div className="forest-grass grass-11">🌿 🌸 🌿</div>
        <div className="forest-grass grass-12">🌱 🌼 🌱</div>
        <div className="forest-grass grass-13">🌿 🌺 🌿</div>
        <div className="forest-grass grass-14">🌱 🌻 🌱</div>

        {/* Mushrooms, Rocks & Campfire */}
        <div className="forest-nature-item shroom-1">🍄</div>
        <div className="forest-nature-item shroom-2">🍄</div>
        <div className="forest-nature-item shroom-3">🍄</div>
        <div className="forest-nature-item shroom-4">🍄</div>
        <div className="forest-nature-item shroom-5">🍄</div>
        <div className="forest-nature-item rock-1">🪨</div>
        <div className="forest-nature-item rock-2">🪨</div>
        <div className="forest-nature-item rock-3">🪨</div>
        <div className="forest-nature-item rock-4">🪨</div>
        <div className="forest-nature-item campfire">🏕️ 🔥</div>

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
            <stop offset="45%" stopColor="#38bdf8" />
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

        {/* Deep Black Asphalt Trail Surface */}
        <path
          d="M 200 144
             C 450 180, 750 200, 750 336
             C 750 430, 250 450, 250 552
             C 250 640, 780 660, 780 768
             C 780 880, 220 880, 220 984
             C 220 1060, 600 1050, 600 1128"
          className="forest-path-surface"
        />

        {/* Glowing Amber / Emerald Luminous Center Trail Line */}
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
