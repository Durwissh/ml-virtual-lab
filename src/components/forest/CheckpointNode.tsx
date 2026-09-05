// src/components/forest/CheckpointNode.tsx
import React from 'react';
import { ForestCheckpoint } from './forestData';

export type CheckpointStatus = 'completed' | 'current' | 'available' | 'locked';

interface CheckpointNodeProps {
  checkpoint: ForestCheckpoint;
  status: CheckpointStatus;
  isSelected: boolean;
  onSelect: (checkpoint: ForestCheckpoint) => void;
}

export default function CheckpointNode({
  checkpoint,
  status,
  isSelected,
  onSelect,
}: CheckpointNodeProps) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';

  return (
    <div
      className={`forest-node-wrapper pos-${checkpoint.id}${isSelected ? ' is-selected' : ''} status-${status}`}
      style={{
        left: `${checkpoint.mapX}%`,
        top: `${checkpoint.mapY}%`,
      }}
    >
      {/* Node Interactive Button */}
      <button
        type="button"
        className="forest-node-btn"
        onClick={() => onSelect(checkpoint)}
        aria-label={`${checkpoint.name} - ${status}`}
        aria-current={isSelected ? 'true' : undefined}
      >
        {/* Glow Ring for Current / Selected Node */}
        {(isCurrent || isSelected) && <div className="forest-node-glow-ring" />}

        {/* Tree Canopy Art & Visual Motif */}
        <div className={`forest-tree-canopy canopy-${checkpoint.treeType}`}>
          <div className="forest-tree-leaves">
            {checkpoint.treeType === 'sprout' && <span className="tree-art">🌱</span>}
            {checkpoint.treeType === 'grove' && <span className="tree-art">🌳</span>}
            {checkpoint.treeType === 'clearing' && <span className="tree-art">🔬</span>}
            {checkpoint.treeType === 'observatory' && <span className="tree-art">📊</span>}
            {checkpoint.treeType === 'twin-trees' && <span className="tree-art">🌲🌲</span>}
            {checkpoint.treeType === 'summit' && <span className="tree-art">🏆</span>}
          </div>

          {/* Status Pin Badge on Tree */}
          <div className="forest-status-pin">
            {isCompleted ? (
              <span className="pin-icon check">✓</span>
            ) : isLocked ? (
              <span className="pin-icon lock">🔒</span>
            ) : isCurrent ? (
              <span className="pin-icon pulse">●</span>
            ) : (
              <span className="pin-icon num">{checkpoint.number}</span>
            )}
          </div>
        </div>

        {/* Floating Label Banner */}
        <div className="forest-node-label-plate">
          <div className="forest-label-top">
            <span className="forest-step-tag">STEP {checkpoint.number}</span>
            {isCurrent && <span className="forest-current-pill">Current</span>}
            {isCompleted && <span className="forest-done-pill">Done</span>}
            {isLocked && <span className="forest-locked-pill">Locked</span>}
          </div>
          <div className="forest-label-name">{checkpoint.name}</div>
          <div className="forest-label-sub">{checkpoint.subtitle}</div>
        </div>
      </button>
    </div>
  );
}
