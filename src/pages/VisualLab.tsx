// src/pages/VisualLab.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LinearRegressionViz from '../components/visualizations/LinearRegressionViz';
import LogisticRegressionViz from '../components/visualizations/LogisticRegressionViz';
import PCAViz from '../components/visualizations/PCAViz';
import SVMViz from '../components/visualizations/SVMViz';
import KMeansViz from '../components/visualizations/KMeansViz';
import DecisionTreeViz from '../components/visualizations/DecisionTreeViz';
import RandomForestViz from '../components/visualizations/RandomForestViz';
import PerceptronViz from '../components/visualizations/PerceptronViz';
import './LearningPath.css';

const VIZ_MODULES = [
  {
    id: 'exp-02-linear-regression',
    expId: '2',
    title: 'Linear Regression Least Squares',
    description: 'Adjust slope and intercept in real time or run Ordinary Least Squares to minimize residuals and evaluate R² and MSE.',
    category: 'Regression',
    component: <LinearRegressionViz />,
  },
  {
    id: 'exp-04-logistic-regression',
    expId: '4',
    title: 'Logistic Regression Sigmoid & Threshold',
    description: 'Observe how the sigmoid activation function transforms linear boundary scores into class probabilities with dynamic thresholding.',
    category: 'Classification',
    component: <LogisticRegressionViz />,
  },
  {
    id: 'exp-05-pca',
    expId: '5',
    title: 'PCA Variance & Orthogonal Projections',
    description: 'Inspect orthogonal principal component eigenvectors, rotate projection axes, and view cumulative explained variance ratios.',
    category: 'Dimensionality Reduction',
    component: <PCAViz />,
  },
  {
    id: 'exp-06-svm',
    expId: '6',
    title: 'Support Vector Machine Maximum Margin',
    description: 'Interactive maximum-margin hyperplane separator with support vector identification and regularisation C parameter adjustment.',
    category: 'Classification',
    component: <SVMViz />,
  },
  {
    id: 'exp-07-kmeans',
    expId: '7',
    title: 'K-Means Iterative Centroid Convergence',
    description: 'Step through assignment and update iterations with custom K cluster counts and observe inertia reduction.',
    category: 'Clustering',
    component: <KMeansViz />,
  },
  {
    id: 'exp-08-decision-tree',
    expId: '8',
    title: 'Decision Tree Boundary Partitioning',
    description: 'Visualise recursive orthogonal feature space partitioning, max-depth splits, and leaf node purity.',
    category: 'Tree-Based Models',
    component: <DecisionTreeViz />,
  },
  {
    id: 'exp-09-random-forest',
    expId: '9',
    title: 'Random Forest Ensemble Voting',
    description: 'Sample multiple bagged trees with feature randomness and observe variance reduction through majority ensemble aggregation.',
    category: 'Ensemble Learning',
    component: <RandomForestViz />,
  },
  {
    id: 'exp-10-perceptron',
    expId: '10',
    title: 'Single-Layer Perceptron Learning Algorithm',
    description: 'Train an artificial neuron with step activation function on linearly separable logic gates (AND, OR, NAND) with step-by-step weight updates.',
    category: 'Neural Networks',
    component: <PerceptronViz />,
  },
];

export default function VisualLab() {
  const [activeVizId, setActiveVizId] = useState(VIZ_MODULES[0].id);

  const activeModule = VIZ_MODULES.find(v => v.id === activeVizId) || VIZ_MODULES[0];

  return (
    <div className="lp-container animate-fade-in">
      <div className="lp-hero">
        <div className="lp-badge">Interactive D3 Simulation Suite</div>
        <h1 className="lp-title">Visual Laboratory Sandbox</h1>
        <p className="lp-subtitle">
          Explore dynamic, real-time mathematical visualizations across all 8 interactive D3 modules. Manipulate parameters, observe decision boundaries, and build intuitive understanding.
        </p>
      </div>

      {/* Module Selector Tabs */}
      <div className="lp-filters-bar" role="tablist" aria-label="Visualization modules">
        {VIZ_MODULES.map(module => (
          <button
            key={module.id}
            role="tab"
            aria-selected={activeVizId === module.id}
            className={`lp-filter-btn${activeVizId === module.id ? ' lp-filter-btn--active' : ''}`}
            onClick={() => setActiveVizId(module.id)}
          >
            {module.title}
          </button>
        ))}
      </div>

      {/* Active Visualization Sandbox Card */}
      <div className="lp-exp-card" style={{ padding: 'var(--space-8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span className="badge badge-navy" style={{ marginBottom: '6px' }}>{activeModule.category}</span>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--text-primary)' }}>
              {activeModule.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px', maxWidth: '700px' }}>
              {activeModule.description}
            </p>
          </div>
          <Link to={`/experiment/${activeModule.expId}`} className="btn btn-primary btn-sm">
            Open Full Experiment {activeModule.expId} →
          </Link>
        </div>

        {/* Visualizer Frame */}
        <div style={{ marginTop: 'var(--space-6)', background: 'var(--bg-primary)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', border: '1px solid var(--border-primary)' }}>
          {activeModule.component}
        </div>
      </div>
    </div>
  );
}
