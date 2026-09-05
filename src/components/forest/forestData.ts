// src/components/forest/forestData.ts

export interface ForestCheckpoint {
  id: number;
  number: string;
  name: string;
  subtitle: string;
  stageName: string;
  growthStage: string;
  locationName: string;
  icon: string;
  category: string;
  description: string;
  learnObjectives: string[];
  ctaLabel: string;
  route: string;
  lockMessage: string;
  relatedExpIds: string[];
  treeType: 'seed' | 'sprout' | 'sapling' | 'branching' | 'mature-tree' | 'ancient-tree';
  // Exact percentage coordinates (0 - 100%) on the RPG dirt road
  mapX: number;
  mapY: number;
}

export const FOREST_CHECKPOINTS: ForestCheckpoint[] = [
  {
    id: 1,
    number: '01',
    name: 'ML Foundations',
    stageName: 'The Seed',
    growthStage: 'Stage 1: Seed & Germination',
    subtitle: 'Planting Core Concepts',
    locationName: 'The Trailhead Seedbed',
    icon: '🌰',
    category: 'Foundations',
    description: 'Every great forest begins with a single seed. Plant your machine learning foundations: understand how algorithms learn from data, explore key learning paradigms, and master the standard workflow.',
    learnObjectives: [
      'What is Machine Learning and why it matters',
      'Core learning paradigms: Supervised, Unsupervised, Reinforcement',
      'Real-world applications across science and industry',
      'Fundamental terminology and standard ML lifecycle'
    ],
    ctaLabel: 'Plant the Seed (Start) →',
    route: '/experiment/1#aim',
    lockMessage: 'Available to all students from the start.',
    relatedExpIds: ['1'],
    treeType: 'seed',
    mapX: 80,
    mapY: 7
  },
  {
    id: 2,
    number: '02',
    name: 'Dataset Grove',
    stageName: 'The Sprout',
    growthStage: 'Stage 2: The Sprout',
    subtitle: 'Nurturing & Cleaning Features',
    locationName: 'The Data & Feature Grove',
    icon: '🌱',
    category: 'Data Engineering',
    description: 'The seed sprouts its first green shoots! Master how raw data is nourished, cleaned, imputed for missing values, and standardized so the model can grow strong without data leakage.',
    learnObjectives: [
      'Understanding tabular datasets (samples, features, labels)',
      'Input matrices (X) vs. Ground-truth targets (y)',
      'Handling missing values with statistical imputation',
      'One-Hot & Label encoding for categorical columns',
      'Feature scaling: Z-Score Standardisation & Normalisation'
    ],
    ctaLabel: 'Nurture the Sprout →',
    route: '/experiment/1#theory',
    lockMessage: 'Available from the start. Recommended after ML Foundations.',
    relatedExpIds: ['1'],
    treeType: 'sprout',
    mapX: 53,
    mapY: 23
  },
  {
    id: 3,
    number: '03',
    name: 'Experiment Clearing',
    stageName: 'The Sapling',
    growthStage: 'Stage 3: The Young Sapling',
    subtitle: 'First Live Laboratory Execution',
    locationName: 'The Laboratory Clearing',
    icon: '🌿',
    category: 'Hands-On Lab',
    description: 'The sprout grows into a resilient sapling! Put theory into practice by configuring and executing Experiment 01: Data Pre-processing in the interactive Virtual Lab.',
    learnObjectives: [
      'Configure interactive pre-processing parameters',
      'Clean missing values and scale numerical attributes',
      'Inspect transformed dataset distributions live',
      'Observe real-time pipeline execution without data leakage'
    ],
    ctaLabel: 'Grow the Sapling (Lab 1) →',
    route: '/experiment/1',
    lockMessage: 'Available to all students. Put theory into practice.',
    relatedExpIds: ['1'],
    treeType: 'sapling',
    mapX: 35,
    mapY: 39
  },
  {
    id: 4,
    number: '04',
    name: 'Results Observatory',
    stageName: 'Branching Tree',
    growthStage: 'Stage 4: Branching Tree',
    subtitle: 'Evaluating Metrics & Health',
    locationName: 'The Metric Observatory',
    icon: '🪴',
    category: 'Model Evaluation',
    description: 'Branches spread wide into the sunlight! Evaluate your model health: diagnose Overfitting vs. Underfitting, and inspect Accuracy, Precision, Recall, Confusion Matrices, and R² scores.',
    learnObjectives: [
      'Regression metrics: MAE, MSE, RMSE, and R² Goodness-of-Fit',
      'Classification diagnosis: Confusion Matrix breakdown',
      'Balancing Precision vs. Recall and harmonic F1-Score',
      'Diagnosing Overfitting (High Variance) vs. Underfitting (High Bias)'
    ],
    ctaLabel: 'Inspect Tree Health (Results) →',
    route: '/experiment/1#results',
    lockMessage: 'Complete Experiment 1 or submit its quiz to unlock the Observatory.',
    relatedExpIds: ['1'],
    treeType: 'branching',
    mapX: 55,
    mapY: 54
  },
  {
    id: 5,
    number: '05',
    name: 'Comparison Woods',
    stageName: 'Mature Tree',
    growthStage: 'Stage 5: Full Canopy Tree',
    subtitle: 'Benchmarking Algorithms',
    locationName: 'The Twin Algorithm Woods',
    icon: '🌳',
    category: 'Model Comparison',
    description: 'A towering tree with full lush canopy! Benchmark linear algorithms against decision trees and SVM kernels to compare complexity, interpretability, and performance.',
    learnObjectives: [
      'Compare Experiment 1 (Pre-processing) with Experiment 2 (Linear Regression)',
      'Benchmark linear models against tree ensembles and SVM kernels',
      'Understand the impact of hyperparameter tuning',
      'Identify the best-performing model configuration'
    ],
    ctaLabel: 'Enter Comparison Woods →',
    route: '/experiment/2',
    lockMessage: 'Complete Experiment 1 results to unlock algorithm comparisons.',
    relatedExpIds: ['2', '4', '6', '8', '9'],
    treeType: 'mature-tree',
    mapX: 45,
    mapY: 72
  },
  {
    id: 6,
    number: '06',
    name: 'Knowledge Summit',
    stageName: 'Ancient Tree of Mastery',
    growthStage: 'Stage 6: Ancient Tree of Mastery',
    subtitle: 'The Sacred Tree & Certification',
    locationName: 'The Apex Knowledge Tree',
    icon: '🌲',
    category: 'Mastery & Certification',
    description: 'You have nurtured the seed into the Great Ancient Tree of Knowledge! Complete the final comprehensive laboratory assessment and claim your certificate of mastery.',
    learnObjectives: [
      'Comprehensive assessment covering core ML concepts & workflows',
      'Scenario-based questions on algorithm selection and data hygiene',
      'Evaluation metric calculation and interpretation challenges',
      'Receive instant scored feedback and mastery review'
    ],
    ctaLabel: 'Claim Mastery (Assessment) →',
    route: '/experiment/1#posttest',
    lockMessage: 'Complete the foundational experiments and results analysis to unlock the Summit.',
    relatedExpIds: ['1', '2', '3', '10'],
    treeType: 'ancient-tree',
    mapX: 28,
    mapY: 88
  }
];
