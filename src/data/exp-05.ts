// src/data/exp-05.ts
// Experiment 5: Principal Component Analysis (PCA)
// Full content transcribed from vlab_manual.txt

export const exp05 = {
  "id": "5",
  "title": "Principal Component Analysis (PCA)",
  "aim": "To understand Principal Component Analysis (PCA) as a dimensionality reduction technique, implement it in Python using scikit-learn, and analyse the explained variance to determine an appropriate number of principal components.",
  "learningObjectives": [
    "Understand the theoretical foundations and mathematical formulation of Principal Component Analysis (PCA)",
    "Implement the algorithmic pipeline using Python and scikit-learn",
    "Evaluate model performance and diagnostic metrics on unseen test data",
    "Analyze model assumptions, practical advantages, and limitations"
  ],
  "theory": [
    {
      "id": "the-problem-of-high-dimensional-data",
      "title": "2.1 The Problem of High-Dimensional Data",
      "type": "text",
      "content": "Many real-world datasets have a large number of features (dimensions). High-dimensional data presents several challenges: increased computation time, higher risk of overfitting, difficulty in visualisation, and the 'curse of dimensionality' where distance-based algorithms degrade as dimensions increase."
    },
    {
      "id": "what-is-dimensionality-reduction",
      "title": "2.2 What Is Dimensionality Reduction?",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of principal component analysis (pca) using standard scikit-learn libraries.",
      "codeExample": {
        "title": "What Is Dimensionality Reduction?",
        "code": "Dimensionality reduction transforms data from a high-dimensional space to a lower-dimensional space while retaining as much important information as possible. This is distinct from feature selection, which simply discards some original features. PCA creates entirely new features (principal components) that are linear combinations of the original features.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "principal-component-analysis",
      "title": "2.3 Principal Component Analysis",
      "type": "text",
      "content": "PCA is an unsupervised dimensionality reduction technique that identifies directions (principal components) along which the data varies the most. It projects the original data onto these directions, reducing the number of features while preserving maximum variance."
    },
    {
      "id": "key-concepts",
      "title": "2.4 Key Concepts",
      "type": "text",
      "content": "* Variance - measures how spread out the data is along a direction. PCA seeks directions of maximum variance.\n* Covariance - measures how two features vary together. PCA analyses the covariance structure of the data.\n* Eigenvectors - the directions of the principal components.\n* Eigenvalues - the amount of variance captured by each principal component.\n* Principal Components (PCs) - new orthogonal axes ordered by decreasing variance.\n* Orthogonality - principal components are perpendicular to each other, meaning they capture independent patterns.\n* Projection - data points are projected onto the selected principal components.",
      "formulas": [
        {
          "name": "Eigenvalue Problem",
          "latex": "C v = \\lambda v",
          "description": "Where C is the covariance matrix, v is an eigenvector (principal component), and \\lambda is the eigenvalue."
        },
        {
          "name": "Sample Covariance Matrix",
          "latex": "C = \\frac{1}{n-1} X^T X",
          "description": "Computed from mean-centered (and standardised) data matrix X."
        }
      ]
    },
    {
      "id": "how-pca-works",
      "title": "2.5 How PCA Works",
      "type": "text",
      "content": "The PCA process can be summarised as:\n* Step 1: Standardise the data (important when features have different scales).\n* Step 2: Compute the covariance matrix of the standardised data.\n* Step 3: Compute the eigenvectors and eigenvalues of the covariance matrix.\n* Step 4: Sort eigenvectors by decreasing eigenvalue.\n* Step 5: Select the top k eigenvectors (principal components).\n* Step 6: Project the data onto the selected components.",
      "visualizationId": "pca"
    },
    {
      "id": "explained-variance",
      "title": "2.6 Explained Variance",
      "type": "text",
      "content": "Each principal component captures a fraction of the total variance. The explained variance ratio for each component tells us how much of the data's variability it accounts for. The cumulative explained variance helps decide how many components to retain.\nA common rule of thumb is to retain enough components to capture 90-95% of the total variance.",
      "formulas": [
        {
          "name": "Explained Variance Ratio",
          "latex": "\\text{EVR}_k = \\frac{\\lambda_k}{\\sum_{j=1}^p \\lambda_j}",
          "description": "Proportion of total dataset variance captured along the k-th principal component."
        }
      ]
    },
    {
      "id": "importance-of-scaling-before-pca",
      "title": "2.7 Importance of Scaling Before PCA",
      "type": "text",
      "content": "PCA is sensitive to feature scales because it maximises variance. A feature with values in the thousands will dominate the principal components over a feature with values between 0 and 1, regardless of importance. Standardising features (zero mean, unit variance) before PCA ensures that all features contribute equally."
    },
    {
      "id": "illustrative-python-example",
      "title": "2.8 Illustrative Python Example",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of principal component analysis (pca) using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Illustrative Python Example",
        "code": "from sklearn.decomposition import PCA\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.datasets import load_iris\nimport numpy as np\n\n# Load dataset (4 features)\nX, y = load_iris(return_X_y=True)\n\n# Standardise features\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\n\n# Apply PCA - reduce to 2 components\npca = PCA(n_components=2)\nX_pca = pca.fit_transform(X_scaled)\n\nprint(f\"Original shape:  {X.shape}\")\nprint(f\"Reduced shape:   {X_pca.shape}\")\nprint(f\"Explained variance ratio: {pca.explained_variance_ratio_}\")\nprint(f\"Total variance captured:  {sum(pca.explained_variance_ratio_):.4f}\")\n  StandardScaler standardises features before PCA - essential when feature scales differ.\n  PCA(n_components=2) reduces the data from 4 features to 2 principal components.\n  fit_transform() computes the principal components and projects the data.\n  explained_variance_ratio_ shows the fraction of total variance captured by each component.\n  The sum gives the total variance retained (e.g., 0.9577 means 95.77% of variance is preserved).\nPython Example - Choosing the Number of Components\nfrom sklearn.decomposition import PCA\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.datasets import load_wine\n\nX, y = load_wine(return_X_y=True)\nX_scaled = StandardScaler().fit_transform(X)\n\n# Fit PCA with all components to examine variance\npca_full = PCA()\npca_full.fit(X_scaled)\n\ncumulative_var = np.cumsum(pca_full.explained_variance_ratio_)\nprint(\"Cumulative explained variance per component:\")\nfor i, cv in enumerate(cumulative_var, 1):\n    print(f\"  {i} components: {cv:.4f}\")\n    if cv >= 0.95:\n        print(f\"  --> {i} components capture >= 95% variance\")\n        break\n  Fitting PCA without specifying n_components retains all components.\n  np.cumsum computes the cumulative sum of explained variance ratios.\n  This helps determine the minimum number of components needed to reach a variance threshold.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "reconstruction-concept",
      "title": "2.9 Reconstruction Concept",
      "type": "text",
      "content": "After reducing dimensions, PCA can approximately reconstruct the original data using inverse_transform(). The reconstruction is imperfect because some variance is discarded. The reconstruction error increases as fewer components are retained."
    },
    {
      "id": "advantages",
      "title": "2.10 Advantages",
      "type": "list",
      "items": [
        {
          "description": "Reduces dimensionality, speeding up subsequent algorithms."
        },
        {
          "description": "Removes correlated features by creating orthogonal components."
        },
        {
          "description": "Helps visualise high-dimensional data in 2D or 3D."
        },
        {
          "description": "Can reduce overfitting by eliminating noise captured in minor components."
        }
      ]
    },
    {
      "id": "limitations",
      "title": "2.11 Limitations",
      "type": "list",
      "items": [
        {
          "description": "Principal components are linear combinations - PCA cannot capture non-linear relationships."
        },
        {
          "description": "Components are harder to interpret than original features."
        },
        {
          "description": "Information loss is inevitable when reducing dimensions."
        },
        {
          "description": "Requires feature scaling; results change if scaling is omitted."
        }
      ]
    },
    {
      "id": "applications",
      "title": "2.12 Applications",
      "type": "list",
      "items": [
        {
          "description": "Visualising high-dimensional datasets (e.g., gene expression data)."
        },
        {
          "description": "Preprocessing for classification/regression to reduce feature count."
        },
        {
          "description": "Image compression (representing images with fewer principal components)."
        },
        {
          "description": "Noise reduction in signal processing."
        }
      ]
    }
  ],
  "pretest": {
    "title": "Pre-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "PCA is a technique for ___.",
        "options": [
          "Classification",
          "Regression",
          "Dimensionality reduction",
          "Clustering"
        ],
        "answer": 2
      },
      {
        "q": "PCA creates new features that are ___ of the original features.",
        "options": [
          "Copies",
          "Subsets",
          "Linear combinations",
          "Non-linear transformations"
        ],
        "answer": 2
      },
      {
        "q": "Is PCA the same as feature selection?",
        "options": [
          "Yes, they are identical",
          "No - feature selection picks original features; PCA creates new ones",
          "Yes, but PCA is faster",
          "No - PCA is a clustering method"
        ],
        "answer": 1
      },
      {
        "q": "What does PCA maximise along each principal component?",
        "options": [
          "Accuracy",
          "Variance",
          "Correlation",
          "Mean"
        ],
        "answer": 1
      },
      {
        "q": "Principal components are ___ to each other.",
        "options": [
          "Parallel",
          "Orthogonal (perpendicular)",
          "Identical",
          "Inversely proportional"
        ],
        "answer": 1
      },
      {
        "q": "Why should features be standardised before PCA?",
        "options": [
          "To speed up computation",
          "Because PCA is sensitive to feature scales",
          "To remove outliers",
          "Standardisation is optional for PCA"
        ],
        "answer": 1
      },
      {
        "q": "Eigenvalues in PCA represent ___.",
        "options": [
          "Feature names",
          "Amount of variance captured per component",
          "Number of data points",
          "Classification accuracy"
        ],
        "answer": 1
      },
      {
        "q": "If a dataset has 10 features, PCA can produce at most ___ components.",
        "options": [
          "5",
          "10",
          "20",
          "100"
        ],
        "answer": 1
      },
      {
        "q": "Explained variance ratio tells us ___.",
        "options": [
          "The prediction accuracy",
          "The fraction of total variance captured by each component",
          "The number of outliers",
          "The mean of each feature"
        ],
        "answer": 1
      },
      {
        "q": "A common threshold for cumulative explained variance is ___.",
        "options": [
          "50%",
          "70%",
          "90-95%",
          "100%"
        ],
        "answer": 2
      },
      {
        "q": "PCA is a ___ learning technique.",
        "options": [
          "Supervised",
          "Unsupervised",
          "Reinforcement",
          "Semi-supervised"
        ],
        "answer": 1
      },
      {
        "q": "Which matrix is central to the PCA computation?",
        "options": [
          "Confusion matrix",
          "Covariance matrix",
          "Identity matrix",
          "Adjacency matrix"
        ],
        "answer": 1
      },
      {
        "q": "What does n_components in PCA specify?",
        "options": [
          "Number of original features to keep",
          "Number of principal components to retain",
          "Number of clusters",
          "Number of training samples"
        ],
        "answer": 1
      },
      {
        "q": "After PCA with n_components=3, each data point is represented by ___ values.",
        "options": [
          "The original number of features",
          "3",
          "1",
          "6"
        ],
        "answer": 1
      },
      {
        "q": "Which method applies PCA and projects the data in one step?",
        "options": [
          "fit()",
          "transform()",
          "fit_transform()",
          "predict()"
        ],
        "answer": 2
      },
      {
        "q": "If the first 2 components capture 95% of variance, the remaining components capture ___.",
        "options": [
          "95%",
          "5%",
          "0%",
          "100%"
        ],
        "answer": 1
      },
      {
        "q": "PCA can be used for ___.",
        "options": [
          "Data visualisation in 2D",
          "Noise reduction",
          "Feature compression",
          "All of the above"
        ],
        "answer": 3
      },
      {
        "q": "What happens to variance when dimensions are reduced by PCA?",
        "options": [
          "All variance is preserved",
          "Some variance is inevitably lost",
          "Variance increases",
          "Variance becomes zero"
        ],
        "answer": 1
      },
      {
        "q": "Reconstruction after PCA is ___.",
        "options": [
          "Always exact",
          "Approximate (some information is lost)",
          "Impossible",
          "Better than the original"
        ],
        "answer": 1
      },
      {
        "q": "Which Python class implements PCA in scikit-learn?",
        "options": [
          "PCA from sklearn.decomposition",
          "PCA from sklearn.linear_model",
          "PCA from sklearn.cluster",
          "PCA from sklearn.metrics"
        ],
        "answer": 0
      }
    ]
  },
  "procedure": {
    "steps": [
      {
        "title": "Step 1",
        "action": "Load the dataset and note the number of original features.",
        "input": "Input features and target arrays",
        "process": "Load the dataset and note the number of original features.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 2",
        "action": "Standardise the features using StandardScaler.",
        "input": "Input features and target arrays",
        "process": "Standardise the features using StandardScaler.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 3",
        "action": "Apply PCA with a specified number of components (e.g., 2 for visualisation).",
        "input": "Input features and target arrays",
        "process": "Apply PCA with a specified number of components (e.g., 2 for visualisation).",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 4",
        "action": "Examine the explained variance ratio for each component.",
        "input": "Input features and target arrays",
        "process": "Examine the explained variance ratio for each component.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 5",
        "action": "Compute cumulative explained variance to determine how many components are needed.",
        "input": "Input features and target arrays",
        "process": "Compute cumulative explained variance to determine how many components are needed.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 6",
        "action": "Observe the reduced-dimension representation of the data.",
        "input": "Input features and target arrays",
        "process": "Observe the reduced-dimension representation of the data.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 7",
        "action": "Interpret the results - how much information is retained, and what is the trade-off.",
        "input": "Input features and target arrays",
        "process": "Interpret the results - how much information is retained, and what is the trade-off.",
        "output": "Transformed data or intermediate model state"
      }
    ],
    "inputProcessOutput": {
      "input": "High-dimensional dataset (standardised features).",
      "process": "Standardisation ? PCA computation ? Projection onto top k components.",
      "output": "Stage"
    }
  },
  "results": {
    "observations": [
      "The shape of the data changes from (n_samples, original_features) to (n_samples, n_components).",
      "The first principal component captures the largest fraction of variance.",
      "Subsequent components capture progressively less variance.",
      "Cumulative explained variance helps justify the chosen number of components.",
      "A 2-component projection can be visualised as a scatter plot, often revealing cluster structure."
    ],
    "keyInsight": "Proper application of Principal Component Analysis (PCA) requires verifying fundamental assumptions, standardizing feature scales where necessary, and evaluating performance on clean unseen test partitions."
  },
  "posttest": {
    "title": "Post-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "PCA on 8 features produces explained_variance_ratio_ = [0.40, 0.25, 0.15, 0.10, 0.05, 0.03, 0.01, 0.01]. How many components capture at least 80% variance?",
        "options": [
          "2",
          "3",
          "4",
          "5"
        ],
        "answer": 2
      },
      {
        "q": "You apply PCA without standardising. Feature A (range 0-100000) dominates PC1. Why?",
        "options": [
          "Feature A is most important",
          "PCA maximises variance; Feature A's large scale inflates its variance contribution",
          "PCA ignores small-scale features",
          "Standardisation has no effect on PCA"
        ],
        "answer": 1
      },
      {
        "q": "After PCA(n_components=3).fit_transform(X), the output array has shape (200, ___)?",
        "options": [
          "Original number of features",
          "3",
          "200",
          "6"
        ],
        "answer": 1
      },
      {
        "q": "You compute pca.explained_variance_ratio_ and get [0.72, 0.23, 0.05]. What does 0.72 mean?",
        "options": [
          "72% of samples are in component 1",
          "Component 1 captures 72% of total variance",
          "72% accuracy",
          "72 eigenvalues"
        ],
        "answer": 1
      },
      {
        "q": "Why are principal components ordered from first to last?",
        "options": [
          "Alphabetically",
          "By decreasing variance captured",
          "By increasing computation time",
          "Randomly"
        ],
        "answer": 1
      },
      {
        "q": "PCA with n_components=None retains ___.",
        "options": [
          "Zero components",
          "One component",
          "All components",
          "Half the components"
        ],
        "answer": 2
      },
      {
        "q": "Can PCA be applied to image data?",
        "options": [
          "No, only tabular data",
          "Yes - images can be flattened into feature vectors and reduced",
          "Only if images are grayscale",
          "Only with convolutional neural networks"
        ],
        "answer": 1
      },
      {
        "q": "After PCA, inverse_transform() approximately recovers ___.",
        "options": [
          "The target variable",
          "The original features",
          "The covariance matrix",
          "The eigenvalues"
        ],
        "answer": 1
      },
      {
        "q": "A student runs PCA(n_components=2) on a 50-feature dataset. How much computation is saved for a downstream classifier?",
        "options": [
          "None",
          "The classifier now processes 2 features instead of 50",
          "The classifier becomes unsupervised",
          "Accuracy doubles"
        ],
        "answer": 1
      },
      {
        "q": "What is the relationship between the number of principal components and information retention?",
        "options": [
          "More components = less information",
          "More components = more information retained",
          "They are unrelated",
          "Exactly 2 components always suffice"
        ],
        "answer": 1
      },
      {
        "q": "PCA cannot capture ___ relationships between features.",
        "options": [
          "Linear",
          "Non-linear",
          "Positive",
          "Negative"
        ],
        "answer": 1
      },
      {
        "q": "If all features are perfectly uncorrelated, PCA ___.",
        "options": [
          "Fails to run",
          "Returns the original features as principal components",
          "Reduces to a single component",
          "Doubles the features"
        ],
        "answer": 1
      },
      {
        "q": "You plot cumulative variance vs. number of components. The curve flattens after 5 components. What does this suggest?",
        "options": [
          "Use all components",
          "5 components capture most of the variance; additional components add little",
          "The data has 5 classes",
          "PCA failed"
        ],
        "answer": 1
      },
      {
        "q": "StandardScaler before PCA ensures ___.",
        "options": [
          "Features are sorted",
          "All features contribute equally regardless of original scale",
          "Missing values are imputed",
          "The target variable is normalised"
        ],
        "answer": 1
      },
      {
        "q": "Which of the following is a valid use of PCA?",
        "options": [
          "Predicting class labels directly",
          "Reducing 100 features to 10 for faster training",
          "Imputing missing values",
          "Encoding categorical variables"
        ],
        "answer": 1
      },
      {
        "q": "Explained variance ratios always sum to ___.",
        "options": [
          "0",
          "1 (when all components are retained)",
          "0.95",
          "Varies"
        ],
        "answer": 1
      },
      {
        "q": "A colleague uses PCA for 'feature selection'. Is this technically correct?",
        "options": [
          "Yes, PCA selects original features",
          "No - PCA creates new features (principal components), which is dimensionality reduction, not selection",
          "Yes, if n_components < original features",
          "No - PCA is a clustering algorithm"
        ],
        "answer": 1
      },
      {
        "q": "What does pca.components_ contain after fitting?",
        "options": [
          "The transformed data",
          "The principal component directions (loadings)",
          "The class labels",
          "The original feature names"
        ],
        "answer": 1
      },
      {
        "q": "PCA on a 2D dataset with 2 components produces ___.",
        "options": [
          "A 1D dataset",
          "The same 2D dataset (rotated)",
          "A 3D dataset",
          "Nothing"
        ],
        "answer": 1
      },
      {
        "q": "Which scenario benefits most from PCA?",
        "options": [
          "A dataset with 5 well-separated features",
          "A dataset with 500 highly correlated features",
          "A dataset with 2 features",
          "A dataset with no variance"
        ],
        "answer": 1
      }
    ]
  }
};
