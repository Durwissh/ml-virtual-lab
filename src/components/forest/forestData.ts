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
  treeType: 'sprout' | 'grove' | 'clearing' | 'observatory' | 'twin-trees' | 'summit';
  // Position on the SVG/Grid map (percentages 0-100)
  mapX: number;
  mapY: number;
}

export const FOREST_CHECKPOINTS: ForestCheckpoint[] = [
  {
    id: 1,
    number: '01',
    name: 'ML Foundations',
    subtitle: 'Forest Entrance & Sprout Tree',
    locationName: 'The Trailhead Sprout',
    icon: '🌱',
    category: 'Foundations',
    description: 'Begin your journey into Machine Learning. Discover how intelligent models learn from data, explore core paradigms, and understand the modern ML workflow.',
    learnObjectives: [
      'What is Machine Learning and why it matters',
      'Core ML paradigms: Supervised, Unsupervised, Reinforcement',
      'Real-world applications across science and industry',
      'Fundamental terminology and the standard ML lifecycle'
    ],
    ctaLabel: 'Start Foundations →',
    route: '/experiment/1#aim',
    lockMessage: 'Available to all students from the start.',
    relatedExpIds: ['1'],
    treeType: 'sprout',
    mapX: 20,
    mapY: 12
  },
  {
    id: 2,
    number: '02',
    name: 'Dataset Grove',
    subtitle: 'The Ancient Data Canopy',
    locationName: 'The Feature & Label Grove',
    icon: '🌿',
    category: 'Data Engineering',
    description: 'Enter the lush Dataset Grove. Master how raw tabular tables are cleaned, how missing values are imputed, and how numerical features are normalized without data leakage.',
    learnObjectives: [
      'Understanding tabular datasets (samples, features, labels)',
      'Input matrices (X) vs. Ground-truth targets (y)',
      'Handling missing values with statistical imputation',
      'One-Hot & Label encoding for categorical columns',
      'Feature scaling: Z-Score Standardisation & Normalisation'
    ],
    ctaLabel: 'Explore Dataset Grove →',
    route: '/experiment/1#theory',
    lockMessage: 'Available from the start. Recommended after ML Foundations.',
    relatedExpIds: ['1'],
    treeType: 'grove',
    mapX: 75,
    mapY: 28
  },
  {
    id: 3,
    number: '03',
    name: 'Experiment Clearing',
    subtitle: 'Virtual Lab Clearing',
    locationName: 'The Laboratory Clearing',
    icon: '🔬',
    category: 'Hands-On Lab',
    description: 'Step into the open Experiment Clearing. Put theory into real practice by executing Experiment 01: Data Pre-processing in the interactive Virtual Lab.',
    learnObjectives: [
      'Configure interactive pre-processing parameters',
      'Clean missing values and scale numerical attributes',
      'Inspect transformed dataset distributions live',
      'Observe real-time pipeline execution without data leakage'
    ],
    ctaLabel: 'Start Experiment 1 →',
    route: '/experiment/1',
    lockMessage: 'Available to all students. Put theory into practice.',
    relatedExpIds: ['1'],
    treeType: 'clearing',
    mapX: 25,
    mapY: 46
  },
  {
    id: 4,
    number: '04',
    name: 'Results Observatory',
    subtitle: 'Observation Platform & Metrics',
    locationName: 'The Performance Observatory',
    icon: '📊',
    category: 'Model Evaluation',
    description: 'Ascend to the forest observation deck. Interpret model performance indicators including Accuracy, Precision, Recall, Confusion Matrices, and R² scores.',
    learnObjectives: [
      'Regression metrics: MAE, MSE, RMSE, and R² Goodness-of-Fit',
      'Classification diagnosis: Confusion Matrix breakdown',
      'Balancing Precision vs. Recall and the harmonic F1-Score',
      'Diagnosing Overfitting (High Variance) vs. Underfitting (High Bias)'
    ],
    ctaLabel: 'Enter Results Observatory →',
    route: '/experiment/1#results',
    lockMessage: 'Complete Experiment 1 or submit its quiz to unlock the Observatory.',
    relatedExpIds: ['1'],
    treeType: 'observatory',
    mapX: 78,
    mapY: 64
  },
  {
    id: 5,
    number: '05',
    name: 'Comparison Woods',
    subtitle: 'Twin Canopy & Benchmarking',
    locationName: 'The Twin Algorithm Woods',
    icon: '🔄',
    category: 'Model Comparison',
    description: 'Navigate the deep Comparison Woods with interconnected trees representing different model families. Benchmark linear vs. non-linear algorithms and evaluate trade-offs.',
    learnObjectives: [
      'Compare Experiment 1 (Pre-processing) with Experiment 2 (Linear Regression)',
      'Benchmark linear models against tree ensembles and SVM kernels',
      'Understand the impact of hyperparameter tuning',
      'Identify the best-performing model configuration'
    ],
    ctaLabel: 'Explore Comparison Woods →',
    route: '/experiment/2',
    lockMessage: 'Complete Experiment 1 results to unlock algorithm comparisons.',
    relatedExpIds: ['2', '4', '6', '8', '9'],
    treeType: 'twin-trees',
    mapX: 22,
    mapY: 82
  },
  {
    id: 6,
    number: '06',
    name: 'Knowledge Summit',
    subtitle: 'Ancient Summit of Mastery',
    locationName: 'The Apex Knowledge Tree',
    icon: '🏆',
    category: 'Mastery & Certification',
    description: 'Reach the summit of the forest! Test your overall machine learning understanding with the comprehensive laboratory assessment and receive mastery recognition.',
    learnObjectives: [
      'Comprehensive multiple-choice assessment covering core ML theory',
      'Scenario-based questions on algorithm selection and data hygiene',
      'Evaluation metric calculation and interpretation challenges',
      'Receive instant scored feedback and mastery review'
    ],
    ctaLabel: 'Take Final Assessment →',
    route: '/experiment/1#posttest',
    lockMessage: 'Complete the foundational experiments and results analysis to unlock the Summit.',
    relatedExpIds: ['1', '2', '3', '10'],
    treeType: 'summit',
    mapX: 60,
    mapY: 94
  }
];
