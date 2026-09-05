// src/pages/VisualLab.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './VisualLab.css';

const upcomingFeatures = [
  {
    icon: '📈',
    title: 'Real-time Gradient Descent Sandbox',
    desc: 'Live 3D surface contour plots with step-by-step learning rate and momentum tuning.',
    tag: 'Optimization',
  },
  {
    icon: '⚖️',
    title: 'Interactive SVM Maximum-Margin Visualizer',
    desc: 'Dynamic support vector manipulation across Linear, Polynomial, and RBF kernels.',
    tag: 'Classification',
  },
  {
    icon: '🔮',
    title: 'PCA High-Dimensional Variance Explorer',
    desc: 'Orthogonal eigenvector rotation and 3D-to-2D projection simulations.',
    tag: 'Dimensionality',
  },
  {
    icon: '🧠',
    title: 'Live Neural Perceptron Sandbox',
    desc: 'Synaptic weight adjustment and decision boundary convergence on non-linear gates.',
    tag: 'Deep Learning',
  },
];

export default function VisualLab() {
  return (
    <div className="vlab-page-wrapper animate-fade-in">
      <div className="vlab-container">
        {/* ─── Hero / Under Construction Banner ─── */}
        <div className="vlab-hero-card">
          <div className="vlab-pulse-indicator">
            <span className="vlab-pulse-dot"></span>
            <span className="vlab-pulse-text">LABORATORY CALIBRATION IN PROGRESS</span>
          </div>

          <div className="vlab-icon-sphere">
            <span className="vlab-sphere-emoji">🧪</span>
            <div className="vlab-sphere-ring vlab-sphere-ring-1"></div>
            <div className="vlab-sphere-ring vlab-sphere-ring-2"></div>
          </div>

          <h1 className="vlab-hero-title">
            Visual Simulation Suite <br />
            <span className="vlab-title-gradient">Under Active Construction</span>
          </h1>

          <p className="vlab-hero-subtitle">
            We are engineering a next-generation interactive D3 sandbox with dynamic gradient flows,
            real-time decision boundary simulations, and multidimensional parameter tuning.
          </p>

          <div className="vlab-status-badge-box">
            <div className="vlab-stat-chip">
              <span className="vlab-stat-icon">⚙️</span>
              <div>
                <div className="vlab-stat-label">Engine Status</div>
                <div className="vlab-stat-val">Compiling D3 Visualisers</div>
              </div>
            </div>

            <div className="vlab-stat-chip">
              <span className="vlab-stat-icon">📊</span>
              <div>
                <div className="vlab-stat-label">Modules in Pipeline</div>
                <div className="vlab-stat-val">8 Interactive Sandboxes</div>
              </div>
            </div>

            <div className="vlab-stat-chip">
              <span className="vlab-stat-icon">🚀</span>
              <div>
                <div className="vlab-stat-label">Current Version</div>
                <div className="vlab-stat-val">v2.0 Beta Pipeline</div>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="vlab-actions">
            <Link to="/experiments" className="btn btn-primary btn-lg">
              Explore 10 Guided Experiments →
            </Link>
            <Link to="/learning-path" className="btn btn-secondary btn-lg">
              View Learning Roadmap
            </Link>
            <Link to="/glossary" className="btn btn-secondary btn-lg">
              Open Master Glossary
            </Link>
          </div>
        </div>

        {/* ─── Preview of What's Coming ─── */}
        <div className="vlab-preview-section">
          <div className="vlab-section-header">
            <span className="vlab-section-tag">Coming Soon</span>
            <h2 className="vlab-section-title">What We're Building for You</h2>
            <p className="vlab-section-desc">
              Sneak peek into the real-time simulation modules currently under active calibration.
            </p>
          </div>

          <div className="vlab-preview-grid">
            {upcomingFeatures.map((item, idx) => (
              <div key={idx} className="vlab-preview-card">
                <div className="vlab-preview-top">
                  <span className="vlab-preview-icon">{item.icon}</span>
                  <span className="badge badge-navy">{item.tag}</span>
                </div>
                <h3 className="vlab-preview-title">{item.title}</h3>
                <p className="vlab-preview-desc">{item.desc}</p>
                <div className="vlab-preview-status">
                  <span className="vlab-wip-dot"></span> In Development
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
