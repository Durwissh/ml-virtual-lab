// src/data/experiments.ts
// Master list of all 10 experiments – used by home page, navigation, and index

export interface ExperimentMeta {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  description: string;
  icon: string; // simple text/emoji motif
  accentColor: string;
}

export const experiments: ExperimentMeta[] = [
  {
    id: '1',
    number: 1,
    title: 'Data Pre-processing for Machine Learning',
    shortTitle: 'Data Pre-processing',
    category: 'Foundations',
    difficulty: 'Beginner',
    estimatedTime: '45 min',
    description: 'Handle missing values, encode categorical variables, scale features, and split data while preventing data leakage.',
    icon: '⚙',
    accentColor: '#4a90e2',
  },
  {
    id: '2',
    number: 2,
    title: 'Linear Regression',
    shortTitle: 'Linear Regression',
    category: 'Regression',
    difficulty: 'Beginner',
    estimatedTime: '50 min',
    description: 'Understand the least-squares method, fit a regression line, and evaluate with MAE, MSE, RMSE, and R².',
    icon: '📈',
    accentColor: '#38a169',
  },
  {
    id: '3',
    number: 3,
    title: 'Cross-Validation for Model Evaluation',
    shortTitle: 'Cross-Validation',
    category: 'Model Evaluation',
    difficulty: 'Intermediate',
    estimatedTime: '40 min',
    description: 'Use K-Fold and Stratified K-Fold cross-validation to assess model generalization reliably.',
    icon: '🔄',
    accentColor: '#805ad5',
  },
  {
    id: '4',
    number: 4,
    title: 'Logistic Regression for Binary Classification',
    shortTitle: 'Logistic Regression',
    category: 'Classification',
    difficulty: 'Intermediate',
    estimatedTime: '55 min',
    description: 'Apply the sigmoid function for binary classification and evaluate with confusion matrix metrics.',
    icon: '🎯',
    accentColor: '#dd6b20',
  },
  {
    id: '5',
    number: 5,
    title: 'Principal Component Analysis (PCA)',
    shortTitle: 'PCA',
    category: 'Dimensionality Reduction',
    difficulty: 'Intermediate',
    estimatedTime: '50 min',
    description: 'Reduce high-dimensional data using eigenvectors and explained variance analysis.',
    icon: '🔬',
    accentColor: '#d53f8c',
  },
  {
    id: '6',
    number: 6,
    title: 'Support Vector Machine Classification',
    shortTitle: 'SVM',
    category: 'Classification',
    difficulty: 'Intermediate',
    estimatedTime: '55 min',
    description: 'Find maximum-margin hyperplanes and use kernel tricks for non-linear boundaries.',
    icon: '⚔',
    accentColor: '#e53e3e',
  },
  {
    id: '7',
    number: 7,
    title: 'K-Means Clustering',
    shortTitle: 'K-Means',
    category: 'Clustering',
    difficulty: 'Intermediate',
    estimatedTime: '50 min',
    description: 'Partition data into K clusters by iteratively updating centroids until convergence.',
    icon: '🎨',
    accentColor: '#319795',
  },
  {
    id: '8',
    number: 8,
    title: 'Decision Tree Classification',
    shortTitle: 'Decision Tree',
    category: 'Tree Models',
    difficulty: 'Intermediate',
    estimatedTime: '50 min',
    description: 'Build interpretable trees using Gini impurity and entropy splitting criteria.',
    icon: '🌳',
    accentColor: '#38a169',
  },
  {
    id: '9',
    number: 9,
    title: 'Random Forest Classification',
    shortTitle: 'Random Forest',
    category: 'Ensemble Learning',
    difficulty: 'Advanced',
    estimatedTime: '55 min',
    description: 'Combine multiple decision trees with bagging and feature randomness for robust predictions.',
    icon: '🌲',
    accentColor: '#2f855a',
  },
  {
    id: '10',
    number: 10,
    title: 'Artificial Neural Network using Perceptron Learning',
    shortTitle: 'Perceptron',
    category: 'Neural Networks',
    difficulty: 'Advanced',
    estimatedTime: '60 min',
    description: 'Understand biological inspiration, weighted sums, activation functions, and the perceptron learning algorithm.',
    icon: '🧠',
    accentColor: '#6b46c1',
  },
];

export function getExperiment(id: string): ExperimentMeta | undefined {
  return experiments.find(e => e.id === id);
}
