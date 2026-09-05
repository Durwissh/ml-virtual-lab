// src/pages/VisualLab.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './VisualLab.css';

interface VizModule {
  title: string;
  experimentNumber: number;
  experimentId: string;
  category: string;
  icon: string;
  description: string;
  currentCapabilities: string[];
  simulationType: string;
}

const activeVisualizations: VizModule[] = [
  {
    title: 'Linear Regression Least-Squares Fitter',
    experimentNumber: 2,
    experimentId: '2',
    category: 'Regression',
    icon: '📈',
    description: 'Adjust slope (weights) and intercept (bias) dynamically to visualize residuals and observe MSE minimization in real time.',
    currentCapabilities: ['Interactive slope & intercept sliders', 'Real-time residual error lines', 'Dynamic MSE & RMSE calculation'],
    simulationType: 'Continuous OLS Optimization',
  },
  {
    title: 'Logistic Regression Decision Boundary & Probability Surface',
    experimentNumber: 4,
    experimentId: '4',
    category: 'Classification',
    icon: '🎯',
    description: 'Tune weight coefficients and bias to adjust the linear separator and examine the underlying sigmoid probability heatmap.',
    currentCapabilities: ['2D decision boundary rotation', 'Canvas sigmoid heatmap shading', 'Confidence score calculation'],
    simulationType: 'Binary Classification Boundary',
  },
  {
    title: 'Principal Component Analysis (PCA) Projection Engine',
    experimentNumber: 5,
    experimentId: '5',
    category: 'Dimensionality Reduction',
    icon: '🔬',
    description: 'Explore orthogonal eigenvectors PC1 and PC2, project 2D data onto lower-dimensional axes, and analyze explained variance.',
    currentCapabilities: ['PC1 & PC2 eigenvector vectors', 'Orthogonal projection onto PC1', 'Explained variance ratio bar'],
    simulationType: 'Covariance Eigendecomposition',
  },
  {
    title: 'Support Vector Machine (SVM) Margin Maximizer',
    experimentNumber: 6,
    experimentId: '6',
    category: 'Classification',
    icon: '⚔',
    description: 'Interact with the separating hyperplane, positive and negative canonical margins, and highlighted critical support vectors.',
    currentCapabilities: ['Hyperplane orientation control', 'Margin boundary visualization', 'Support vector identification'],
    simulationType: 'Maximum-Margin Hyperplane',
  },
  {
    title: 'K-Means Iterative Centroid Convergence Sandbox',
    experimentNumber: 7,
    experimentId: '7',
    category: 'Clustering',
    icon: '🎨',
    description: 'Watch cluster centroids update through iterative Assignment and Update phases until convergence is achieved.',
    currentCapabilities: ['Adjustable K clusters (2–5)', 'Step-by-step & autoplay execution', 'Voronoi cluster assignment coloring'],
    simulationType: 'Iterative Centroid Convergence',
  },
  {
    title: 'Decision Tree Recursive Split Visualizer',
    experimentNumber: 8,
    experimentId: '8',
    category: 'Tree Models',
    icon: '🌳',
    description: 'Navigate hierarchical binary splits, evaluate Gini impurity at each internal node, and trace root-to-leaf decision pathways.',
    currentCapabilities: ['Interactive decision tree diagram', 'Gini impurity threshold inspection', 'Root-to-leaf sample routing'],
    simulationType: 'Recursive Partitioning',
  },
  {
    title: 'Random Forest Ensemble Majority Voting Matrix',
    experimentNumber: 9,
    experimentId: '9',
    category: 'Ensemble Learning',
    icon: '🌲',
    description: 'Observe how an ensemble of uncorrelated decision trees evaluates test samples and aggregates individual predictions by majority voting.',
    currentCapabilities: ['Multiple tree voter predictions', 'Majority voting tally display', 'Confidence distribution breakdown'],
    simulationType: 'Ensemble Bagging Aggregation',
  },
  {
    title: 'Single-Layer Perceptron Learning Step Animator',
    experimentNumber: 10,
    experimentId: '10',
    category: 'Neural Networks',
    icon: '🧠',
    description: 'Step through training epochs as the Perceptron identifies misclassified points and applies the Hebbian weight update rule.',
    currentCapabilities: ['Step-by-step training iteration', 'Dynamic weight vector rotation', 'Misclassification error detection'],
    simulationType: 'Supervised Hebbian Learning',
  },
];

export default function VisualLab() {
  return (
    <div className="page-layout">
      <main className="page-main">
        <div className="visual-lab-container">
          {/* Header */}
          <div className="vl-hero animate-fade-in">
            <div className="vl-status-badge">
              <span className="vl-status-dot"></span>
              <span>Interactive Simulation Studio · Active Engineering</span>
            </div>

            <h1 className="vl-title">
              Visual Lab Simulation Studio
            </h1>

            <p className="vl-subtitle">
              We are actively developing a unified multi-algorithm simulation sandbox.
              Students will soon be able to generate synthetic datasets, compare multiple models side-by-side, and tune hyper-parameters across algorithms.
            </p>

            <div className="vl-notice-card">
              <div className="vl-notice-icon">💡</div>
              <div className="vl-notice-text">
                <strong>Available Now in Experiments:</strong> All 8 interactive D3.js and Canvas algorithm simulations are fully functional inside their respective curriculum experiments. Click any module below to open the live interactive visualization.
              </div>
            </div>
          </div>

          {/* Grid of live simulations */}
          <div className="vl-section-header">
            <div>
              <div className="section-label">Curriculum Algorithm Simulations</div>
              <h2 className="section-title">Available Interactive Simulations (8 Modules)</h2>
            </div>
          </div>

          <div className="vl-grid">
            {activeVisualizations.map(viz => (
              <div key={viz.experimentNumber} className="vl-card animate-fade-in-up">
                <div className="vl-card-header">
                  <div className="vl-card-icon-title">
                    <span className="vl-icon">{viz.icon}</span>
                    <div>
                      <span className="badge badge-navy">{viz.category}</span>
                      <h3 className="vl-card-title">{viz.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="vl-card-desc">{viz.description}</p>

                <div className="vl-card-specs">
                  <div className="vl-spec-label">Simulation Type:</div>
                  <div className="vl-spec-value">{viz.simulationType}</div>
                </div>

                <div className="vl-capabilities">
                  <div className="vl-cap-label">Interactive Controls:</div>
                  <ul className="vl-cap-list">
                    {viz.currentCapabilities.map(cap => (
                      <li key={cap}>✓ {cap}</li>
                    ))}
                  </ul>
                </div>

                <div className="vl-card-footer">
                  <Link
                    to={`/experiment/${viz.experimentId}`}
                    className="btn btn-primary btn-sm"
                  >
                    Open in Experiment {String(viz.experimentNumber).padStart(2, '0')} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Development Roadmap */}
          <div className="vl-roadmap-card">
            <h3 className="vl-roadmap-title">Studio Roadmap: Unified Sandbox (Phase 2 Preview)</h3>
            <div className="vl-roadmap-grid">
              <div className="vl-roadmap-item">
                <div className="vl-roadmap-badge">Planned</div>
                <h4>Custom Dataset Generator</h4>
                <p>Generate non-linear moons, concentric circles, anisotropic clusters, and regression curves with configurable Gaussian noise.</p>
              </div>
              <div className="vl-roadmap-item">
                <div className="vl-roadmap-badge">Planned</div>
                <h4>Dual-Model Split Screen</h4>
                <p>Compare decision boundaries of Logistic Regression vs. Support Vector Machine vs. Decision Trees on the exact same dataset.</p>
              </div>
              <div className="vl-roadmap-item">
                <div className="vl-roadmap-badge">Planned</div>
                <h4>Hyperparameter Sliders</h4>
                <p>Simulate learning rate schedules, polynomial kernel degrees, maximum tree depth limits, and regularization strength penalties.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
