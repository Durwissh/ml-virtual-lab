// src/components/forest/forestData.ts

export interface ForestCheckpoint {
  id: number;
  number: string;
  name: string;
  subtitle: string;
  locationName: string;
  icon: string;
  category: string;
  description: string;
  learnObjectives: string[];
  ctaLabel: string;
  route: string;
  lockMessage: string;
  relatedExpIds: string[];
  treeType: 'foundations' | 'preprocessing' | 'pipeline' | 'evaluation' | 'benchmarking' | 'assessment';
  // Exact percentage coordinates (0 - 100%) on the widescreen RPG road
  mapX: number;
  mapY: number;
}

export const FOREST_CHECKPOINTS: ForestCheckpoint[] = [
  {
    id: 1,
    number: '01',
    name: 'ML Foundations',
    subtitle: 'Core Paradigms & Lifecycle',
    locationName: 'Foundations Clearing',
    icon: '🧠',
    category: 'Foundations',
    description: 'Establish foundational machine learning principles: discover how algorithms learn from data patterns, compare Supervised, Unsupervised, and Reinforcement paradigms, and explore real-world use cases.',
    learnObjectives: [
      'What is Machine Learning and why it matters',
      'Core learning paradigms: Supervised, Unsupervised, Reinforcement',
      'Real-world applications across science and industry',
      'Fundamental terminology and the standard ML lifecycle'
    ],
    ctaLabel: 'Start ML Foundations →',
    route: '/experiment/1#aim',
    lockMessage: 'Available to all students from the start.',
    relatedExpIds: ['1'],
    treeType: 'foundations',
    mapX: 8,
    mapY: 48
  },
  {
    id: 2,
    number: '02',
    name: 'Dataset Pre-processing',
    subtitle: 'Cleaning & Feature Engineering',
    locationName: 'Data Engineering Station',
    icon: '📊',
    category: 'Data Engineering',
    description: 'Master tabular data hygiene: handle missing values with statistical imputation, apply One-Hot/Label encoding, and perform numerical normalization/standardization without data leakage.',
    learnObjectives: [
      'Understanding tabular datasets (samples, features, labels)',
      'Input matrices (X) vs. Ground-truth targets (y)',
      'Handling missing values with statistical imputation',
      'One-Hot & Label encoding for categorical attributes',
      'Feature scaling: Z-Score Standardisation & Normalisation'
    ],
    ctaLabel: 'Explore Pre-processing →',
    route: '/experiment/1#theory',
    lockMessage: 'Available from the start. Recommended after ML Foundations.',
    relatedExpIds: ['1'],
    treeType: 'preprocessing',
    mapX: 25,
    mapY: 72
  },
  {
    id: 3,
    number: '03',
    name: 'Pipeline Execution',
    subtitle: 'Interactive Model Training',
    locationName: 'Virtual Laboratory',
    icon: '🔬',
    category: 'Hands-On Lab',
    description: 'Execute hands-on experimentation in the interactive Virtual Lab: configure data processing parameters, execute transformation pipelines, and inspect distribution shifts live.',
    learnObjectives: [
      'Configure interactive pre-processing parameters',
      'Clean missing values and scale numerical attributes',
      'Inspect transformed dataset distributions live',
      'Observe real-time pipeline execution without data leakage'
    ],
    ctaLabel: 'Open Laboratory (Exp 1) →',
    route: '/experiment/1',
    lockMessage: 'Available to all students. Put theory into practice.',
    relatedExpIds: ['1'],
    treeType: 'pipeline',
    mapX: 42,
    mapY: 50
  },
  {
    id: 4,
    number: '04',
    name: 'Model Evaluation',
    subtitle: 'Performance Metrics & Validation',
    locationName: 'Evaluation Observatory',
    icon: '📈',
    category: 'Model Evaluation',
    description: 'Diagnose model efficacy using statistical indicators: calculate MSE, RMSE, and R² for regression; analyze Confusion Matrices, Precision, Recall, and F1-Score for classification; identify Overfitting vs. Underfitting.',
    learnObjectives: [
      'Regression metrics: MAE, MSE, RMSE, and R² Goodness-of-Fit',
      'Classification diagnosis: Confusion Matrix breakdown',
      'Balancing Precision vs. Recall and harmonic F1-Score',
      'Diagnosing Overfitting (High Variance) vs. Underfitting (High Bias)'
    ],
    ctaLabel: 'Inspect Evaluation Metrics →',
    route: '/experiment/1#results',
    lockMessage: 'Complete Experiment 1 or submit its quiz to unlock the Observatory.',
    relatedExpIds: ['1'],
    treeType: 'evaluation',
    mapX: 58,
    mapY: 49
  },
  {
    id: 5,
    number: '05',
    name: 'Algorithm Benchmarking',
    subtitle: 'Model Comparison & Selection',
    locationName: 'Benchmarking Pavilion',
    icon: '⚖️',
    category: 'Model Comparison',
    description: 'Benchmark diverse machine learning algorithms against one another: compare Linear Regression, Decision Trees, and Support Vector Machines across accuracy, convergence speed, and complexity.',
    learnObjectives: [
      'Compare Experiment 1 (Pre-processing) with Experiment 2 (Linear Regression)',
      'Benchmark linear models against tree ensembles and SVM kernels',
      'Understand the impact of hyperparameter tuning',
      'Identify the best-performing model configuration'
    ],
    ctaLabel: 'Compare Algorithms (Exp 2) →',
    route: '/experiment/2',
    lockMessage: 'Complete Experiment 1 results to unlock algorithm comparisons.',
    relatedExpIds: ['2', '4', '6', '8', '9'],
    treeType: 'benchmarking',
    mapX: 74,
    mapY: 62
  },
  {
    id: 6,
    number: '06',
    name: 'Knowledge Assessment',
    subtitle: 'Certification & Final Testing',
    locationName: 'Assessment Summit',
    icon: '🏆',
    category: 'Mastery & Certification',
    description: 'Validate your machine learning proficiency: take the comprehensive knowledge assessment, test your analytical problem solving, and achieve certified mastery recognition.',
    learnObjectives: [
      'Comprehensive assessment covering core ML concepts & workflows',
      'Scenario-based questions on algorithm selection and data hygiene',
      'Evaluation metric calculation and interpretation challenges',
      'Receive instant scored feedback and mastery review'
    ],
    ctaLabel: 'Take Assessment →',
    route: '/experiment/1#posttest',
    lockMessage: 'Complete the foundational experiments and results analysis to unlock the Summit.',
    relatedExpIds: ['1', '2', '3', '10'],
    treeType: 'assessment',
    mapX: 89,
    mapY: 46
  }
];
