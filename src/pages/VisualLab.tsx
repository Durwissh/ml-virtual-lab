// src/pages/VisualLab.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './VisualLab.css';

export default function VisualLab() {
  return (
    <div className="vlab-minimal-page">
      <div className="vlab-glow-bg" aria-hidden="true" />
      
      <div className="vlab-minimal-card animate-fade-in-up">
        <div className="vlab-wip-badge">
          <span className="vlab-wip-dot" />
          <span>WORK IN PROGRESS</span>
        </div>

        <div className="vlab-icon-wrap">
          <span className="vlab-icon-emoji">🧪</span>
        </div>

        <h1 className="vlab-minimal-title">Visual Lab</h1>

        <p className="vlab-minimal-subtitle">
          Interactive visualizations and algorithm simulations are currently under development.
        </p>

        <div className="vlab-minimal-actions">
          <Link to="/experiments" className="btn btn-primary btn-lg">
            Explore Experiments →
          </Link>
          <Link to="/" className="btn btn-secondary btn-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
