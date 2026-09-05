// src/pages/LearningPath.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { experiments, ExperimentMeta } from '../data/experiments';
import { useProgress } from '../context/ProgressContext';
import './LearningPath.css';

interface Stage {
  title: string;
  stageNumber: string;
  description: string;
  experimentIds: string[];
}

const stages: Stage[] = [
  {
    stageNumber: 'STAGE 1',
    title: 'Data Foundations & Pipeline Preparation',
    description: 'Master raw data cleansing, categorical encoding, feature scaling, and train-test splits without data leakage.',
    experimentIds: ['1'],
  },
  {
    stageNumber: 'STAGE 2',
    title: 'Regression & Model Generalization',
    description: 'Learn Ordinary Least Squares formulation, regression error metrics, and K-Fold cross-validation for unbiased evaluation.',
    experimentIds: ['2', '3'],
  },
  {
    stageNumber: 'STAGE 3',
    title: 'Supervised Classification & Ensembles',
    description: 'Progress from binary logistic regression and maximum-margin SVMs to interpretable Decision Trees and Bagged Random Forests.',
    experimentIds: ['4', '6', '8', '9'],
  },
  {
    stageNumber: 'STAGE 4',
    title: 'Dimensionality Reduction',
    description: 'Address the curse of dimensionality through covariance eigen-decomposition and principal component projections.',
    experimentIds: ['5'],
  },
  {
    stageNumber: 'STAGE 5',
    title: 'Unsupervised Clustering',
    description: 'Discover latent cluster structures and partition unlabelled datasets using iterative centroid updates and the Elbow Method.',
    experimentIds: ['7'],
  },
  {
    stageNumber: 'STAGE 6',
    title: 'Artificial Neural Networks',
    description: 'Transition from linear classifiers to neural computing using the biological neuron model and the Perceptron Learning Algorithm.',
    experimentIds: ['10'],
  },
];

export default function LearningPath() {
  const { getCompletionPercent, getOverallPercent } = useProgress();
  const overallPercent = getOverallPercent();

  return (
    <div className="page-layout">
      <main className="page-main">
        <div className="learning-path-container">
          {/* Header Banner */}
          <div className="lp-header animate-fade-in">
            <div className="section-label">Academic Curriculum Journey</div>
            <h1 className="lp-title">Machine Learning Learning Path</h1>
            <p className="lp-subtitle">
              A structured 6-stage progression through all 10 core laboratory experiments.
              Follow this path to build robust mathematical, algorithmic, and practical competence.
            </p>

            <div className="lp-progress-card">
              <div className="lp-progress-top">
                <span className="lp-progress-label">Overall Curriculum Progress</span>
                <span className="lp-progress-value">{overallPercent}%</span>
              </div>
              <div className="lp-progress-track">
                <div className="lp-progress-bar" style={{ width: `${overallPercent}%` }}></div>
              </div>
            </div>
          </div>

          {/* Timeline Stages */}
          <div className="lp-stages-list">
            {stages.map((stage, sIdx) => {
              const stageExps = stage.experimentIds
                .map(id => experiments.find(e => e.id === id))
                .filter(Boolean) as ExperimentMeta[];

              const stageCompletedCount = stageExps.filter(e => getCompletionPercent(e.id) === 100).length;
              const isStageComplete = stageCompletedCount === stageExps.length;

              return (
                <div key={stage.stageNumber} className="lp-stage-card animate-fade-in-up">
                  <div className="lp-stage-sidebar">
                    <div className={`lp-stage-badge ${isStageComplete ? 'lp-stage-badge--complete' : ''}`}>
                      {isStageComplete ? '✓' : sIdx + 1}
                    </div>
                    {sIdx < stages.length - 1 && <div className="lp-stage-connector"></div>}
                  </div>

                  <div className="lp-stage-content">
                    <div className="lp-stage-header">
                      <div>
                        <div className="lp-stage-number">{stage.stageNumber}</div>
                        <h2 className="lp-stage-title">{stage.title}</h2>
                      </div>
                      <span className={`badge ${isStageComplete ? 'badge-gold' : 'badge-navy'}`}>
                        {stageCompletedCount} / {stageExps.length} Done
                      </span>
                    </div>

                    <p className="lp-stage-desc">{stage.description}</p>

                    <div className="lp-experiments-grid">
                      {stageExps.map(exp => {
                        const pct = getCompletionPercent(exp.id);
                        const isExpDone = pct === 100;

                        return (
                          <div key={exp.id} className="lp-exp-card">
                            <div className="lp-exp-card-header">
                              <span className="lp-exp-num">Exp {String(exp.number).padStart(2, '0')}</span>
                              <span className="badge badge-navy">{exp.difficulty}</span>
                            </div>

                            <h3 className="lp-exp-title">{exp.title}</h3>
                            <p className="lp-exp-desc">{exp.description}</p>

                            <div className="lp-exp-footer">
                              <span className="lp-exp-time">⏱ {exp.estimatedTime}</span>
                              <div className="lp-exp-action-group">
                                {pct > 0 && <span className="lp-exp-pct">{pct}%</span>}
                                <Link
                                  to={`/experiment/${exp.id}`}
                                  className={`btn ${isExpDone ? 'btn-ghost' : pct > 0 ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                                >
                                  {isExpDone ? 'Review' : pct > 0 ? 'Resume' : 'Start'}
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
