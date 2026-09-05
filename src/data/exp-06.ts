// src/data/exp-06.ts
// Experiment 6: Support Vector Machine Classification
// Full content transcribed from vlab_manual.txt

export const exp06 = {
  "id": "6",
  "title": "Support Vector Machine Classification",
  "aim": "To understand the principles of Support Vector Machine (SVM) classification, implement SVM using scikit-learn with different kernels, and evaluate classification performance on a test dataset.",
  "learningObjectives": [
    "Understand the theoretical foundations and mathematical formulation of Support Vector Machine Classification",
    "Implement the algorithmic pipeline using Python and scikit-learn",
    "Evaluate model performance and diagnostic metrics on unseen test data",
    "Analyze model assumptions, practical advantages, and limitations"
  ],
  "theory": [
    {
      "id": "classification-and-decision-boundaries",
      "title": "2.1 Classification and Decision Boundaries",
      "type": "text",
      "content": "Classification aims to assign each data point to a class. A decision boundary is the surface that separates different classes in the feature space. SVM is a supervised learning algorithm that finds an optimal decision boundary."
    },
    {
      "id": "hyperplane",
      "title": "2.2 Hyperplane",
      "type": "text",
      "content": "In SVM, the decision boundary is called a hyperplane. In 2D, a hyperplane is a line; in 3D, it is a plane; in higher dimensions, it is a flat subspace of dimension n-1.",
      "formulas": [
        {
          "name": "Hyperplane Equation",
          "latex": "w^T x + b = 0",
          "description": "Defines the decision boundary in feature space, where w is the normal vector and b is the intercept/bias."
        }
      ]
    },
    {
      "id": "margin-and-maximum-margin-principle",
      "title": "2.3 Margin and Maximum-Margin Principle",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of support vector machine classification using standard scikit-learn libraries.",
      "formulas": [
        {
          "name": "Margin Width",
          "latex": "M = \\frac{2}{\\|w\\|}",
          "description": "Perpendicular distance between positive and negative canonical margin hyperplanes w^T x + b = \\pm 1."
        },
        {
          "name": "Objective Function",
          "latex": "\\min_{w, b} \\frac{1}{2} \\|w\\|^2 + C \\sum_{i=1}^n \\xi_i",
          "description": "Soft-margin optimization balancing margin maximization and slack penalty \\xi_i controlled by C."
        }
      ],
      "codeExample": {
        "title": "Margin and Maximum-Margin Principle",
        "code": "The margin is the distance between the hyperplane and the nearest data points from each class. SVM selects the hyperplane that maximises this margin. The rationale is that a wider margin provides better generalisation - the classifier is more robust to small variations in the data.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      },
      "visualizationId": "svm"
    },
    {
      "id": "support-vectors",
      "title": "2.4 Support Vectors",
      "type": "text",
      "content": "Support vectors are the data points closest to the hyperplane - the points that define the margin. If these points were removed, the position of the hyperplane would change. The rest of the training data does not influence the hyperplane position. This makes SVM memory-efficient."
    },
    {
      "id": "the-decision-function",
      "title": "2.5 The Decision Function",
      "type": "text",
      "content": "The SVM decision function for a linear classifier is:\nf(x) = w   x + b\nwhere w is the weight vector (normal to the hyperplane), x is the input feature vector, and b is the bias. A sample is classified based on the sign of f(x)."
    },
    {
      "id": "linear-svm",
      "title": "2.6 Linear SVM",
      "type": "text",
      "content": "A linear SVM uses a straight hyperplane to separate classes. It works well when the data is linearly separable or approximately so."
    },
    {
      "id": "the-kernel-trick",
      "title": "2.7 The Kernel Trick",
      "type": "text",
      "content": "When data is not linearly separable in the original feature space, the kernel trick maps the data into a higher-dimensional space where a linear hyperplane can separate the classes. The kernel function computes the similarity between data points in this higher-dimensional space without explicitly computing the transformation.\nCommon kernel functions:\nKernel\nDescription\nUse Case\nlinear\nNo transformation; finds a straight hyperplane\nLinearly separable data\nrbf (Radial Basis Function)\nMaps to infinite-dimensional space using Gaussian similarity\nGeneral-purpose; most common default\npoly (Polynomial)\nMaps using polynomial features of specified degree\nWhen polynomial boundaries are expected\nsigmoid\nUses hyperbolic tangent function\nLess common; behaves like a neural network",
      "formulas": [
        {
          "name": "RBF (Gaussian) Kernel",
          "latex": "K(x, x') = \\exp(-\\gamma \\|x - x'\\|^2)",
          "description": "Maps points into infinite-dimensional Hilbert space for non-linear classification."
        }
      ]
    },
    {
      "id": "important-parameters",
      "title": "2.8 Important Parameters",
      "type": "text",
      "content": "C (Regularisation Parameter)\nC controls the trade-off between maximising the margin and minimising classification errors on the training data. A small C allows a wider margin (more misclassifications tolerated), promoting generalisation. A large C penalises misclassifications heavily, potentially leading to a narrower margin and overfitting.\ngamma (for RBF/Poly Kernels)\ngamma defines the influence of a single training sample. A low gamma means each sample influences a large area (smoother boundary). A high gamma makes the influence local, leading to complex, potentially overfitting boundaries."
    },
    {
      "id": "illustrative-python-example",
      "title": "2.9 Illustrative Python Example",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of support vector machine classification using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Illustrative Python Example",
        "code": "from sklearn.svm import SVC\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import accuracy_score, classification_report\nfrom sklearn.datasets import load_iris\n\n# Load dataset (using 2 classes for binary SVM)\nX, y = load_iris(return_X_y=True)\n\n# Train-test split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# Scale features\nscaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)\nX_test_s = scaler.transform(X_test)\n\n# Train SVM with RBF kernel\nmodel = SVC(kernel='rbf', C=1.0, gamma='scale', random_state=42)\nmodel.fit(X_train_s, y_train)\n\n# Predictions\ny_pred = model.predict(X_test_s)\n\n# Evaluation\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.4f}\")\nprint(\"\\nClassification Report:\")\nprint(classification_report(y_test, y_pred))\nprint(f\"Number of support vectors: {sum(model.n_support_)}\")\n  SVC (Support Vector Classifier) is the scikit-learn implementation of SVM.\n  kernel='rbf' uses the Radial Basis Function kernel.\n  C=1.0 provides a moderate regularisation level.\n  gamma='scale' sets gamma = 1 / (n_features   variance), a sensible default.\n  Feature scaling is important for SVM because the algorithm is sensitive to feature magnitudes.\n  model.n_support_ returns the number of support vectors per class.\n\n\nPython Example - Comparing Kernels\nfrom sklearn.svm import SVC\nfrom sklearn.metrics import accuracy_score\n\nkernels = ['linear', 'rbf', 'poly']\n\nfor k in kernels:\n    model = SVC(kernel=k, random_state=42)\n    model.fit(X_train_s, y_train)\n    y_pred = model.predict(X_test_s)\n    acc = accuracy_score(y_test, y_pred)\n    print(f\"Kernel: {k:8s}  Accuracy: {acc:.4f}\")\n  This loop trains SVM with three different kernels and compares accuracy.\n  The best kernel depends on the data distribution and separability.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "advantages",
      "title": "2.10 Advantages",
      "type": "list",
      "items": [
        {
          "description": "Effective in high-dimensional spaces."
        },
        {
          "description": "Memory-efficient - only support vectors are stored."
        },
        {
          "description": "Versatile - different kernels allow handling of various data distributions."
        },
        {
          "description": "Works well with clear margin of separation between classes."
        }
      ]
    },
    {
      "id": "limitations",
      "title": "2.11 Limitations",
      "type": "list",
      "items": [
        {
          "description": "Computationally expensive on very large datasets (training time scales poorly)."
        },
        {
          "description": "Sensitive to feature scaling - must standardise before training."
        },
        {
          "description": "Does not directly provide probability estimates (requires extra computation)."
        },
        {
          "description": "Choice of kernel and hyperparameters (C, gamma) significantly affects performance."
        }
      ]
    },
    {
      "id": "applications",
      "title": "2.12 Applications",
      "type": "list",
      "items": [
        {
          "description": "Handwriting and digit recognition."
        },
        {
          "description": "Text categorisation and spam detection."
        },
        {
          "description": "Image classification."
        },
        {
          "description": "Bioinformatics (e.g., protein classification)."
        }
      ]
    }
  ],
  "pretest": {
    "title": "Pre-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "SVM stands for ___.",
        "options": [
          "Standard Vector Model",
          "Support Vector Machine",
          "Supervised Variance Method",
          "Simple Vector Mapping"
        ],
        "answer": 1
      },
      {
        "q": "In SVM, the decision boundary is called a ___.",
        "options": [
          "Centroid",
          "Hyperplane",
          "Cluster",
          "Perceptron"
        ],
        "answer": 1
      },
      {
        "q": "The margin in SVM is ___.",
        "options": [
          "The distance between classes and the hyperplane",
          "The classification accuracy",
          "The number of support vectors",
          "The number of features"
        ],
        "answer": 0
      },
      {
        "q": "SVM aims to ___ the margin.",
        "options": [
          "Minimise",
          "Maximise",
          "Ignore",
          "Randomise"
        ],
        "answer": 1
      },
      {
        "q": "Support vectors are ___.",
        "options": [
          "All training data points",
          "The data points closest to the hyperplane",
          "The data points farthest from the hyperplane",
          "The centroid of each class"
        ],
        "answer": 1
      },
      {
        "q": "A linear SVM separates classes using a ___.",
        "options": [
          "Curved boundary",
          "Straight hyperplane",
          "Circular boundary",
          "Random boundary"
        ],
        "answer": 1
      },
      {
        "q": "The kernel trick allows SVM to handle ___.",
        "options": [
          "Missing values",
          "Non-linearly separable data",
          "Categorical features",
          "Unsupervised learning"
        ],
        "answer": 1
      },
      {
        "q": "Which kernel is the default in scikit-learn's SVC?",
        "options": [
          "linear",
          "poly",
          "rbf",
          "sigmoid"
        ],
        "answer": 2
      },
      {
        "q": "The C parameter controls ___.",
        "options": [
          "The number of classes",
          "The trade-off between margin width and training error",
          "The number of support vectors",
          "The kernel type"
        ],
        "answer": 1
      },
      {
        "q": "A large C value leads to ___.",
        "options": [
          "A wider margin, more generalisation",
          "A narrower margin, less tolerance for misclassification",
          "No change in the margin",
          "Automatic kernel selection"
        ],
        "answer": 1
      },
      {
        "q": "gamma in the RBF kernel controls ___.",
        "options": [
          "The number of features",
          "The influence radius of each training sample",
          "The learning rate",
          "The number of iterations"
        ],
        "answer": 1
      },
      {
        "q": "High gamma in RBF kernel leads to ___.",
        "options": [
          "Smoother, more general boundaries",
          "Complex, potentially overfitting boundaries",
          "Linear boundaries",
          "Ignoring all data points"
        ],
        "answer": 1
      },
      {
        "q": "Is feature scaling important for SVM?",
        "options": [
          "No, SVM is scale-invariant",
          "Yes, SVM is sensitive to feature magnitudes",
          "Only for the linear kernel",
          "Only when C > 1"
        ],
        "answer": 1
      },
      {
        "q": "Which of the following is NOT a common SVM kernel?",
        "options": [
          "linear",
          "rbf",
          "poly",
          "euclidean"
        ],
        "answer": 3
      },
      {
        "q": "SVM is a ___ learning algorithm.",
        "options": [
          "Unsupervised",
          "Supervised",
          "Reinforcement",
          "Self-supervised"
        ],
        "answer": 1
      },
      {
        "q": "In 2D feature space, the hyperplane is a ___.",
        "options": [
          "Point",
          "Line",
          "Plane",
          "Cube"
        ],
        "answer": 1
      },
      {
        "q": "If you remove a non-support-vector training point, does the hyperplane change?",
        "options": [
          "Yes, significantly",
          "No",
          "It depends on the kernel",
          "Always"
        ],
        "answer": 1
      },
      {
        "q": "The decision function f(x) = w   x + b classifies based on ___.",
        "options": [
          "The magnitude of f(x)",
          "The sign of f(x)",
          "The mean of f(x)",
          "The gradient of f(x)"
        ],
        "answer": 1
      },
      {
        "q": "Which scikit-learn class implements SVM for classification?",
        "options": [
          "SVR",
          "SVC",
          "LinearRegression",
          "KMeans"
        ],
        "answer": 1
      },
      {
        "q": "Polynomial kernel of degree 1 is equivalent to a ___ kernel.",
        "options": [
          "rbf",
          "sigmoid",
          "linear",
          "Gaussian"
        ],
        "answer": 2
      }
    ]
  },
  "procedure": {
    "steps": [
      {
        "title": "Step 1",
        "action": "Load the classification dataset.",
        "input": "Input features and target arrays",
        "process": "Load the classification dataset.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 2",
        "action": "Split into training and test sets.",
        "input": "Input features and target arrays",
        "process": "Split into training and test sets.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 3",
        "action": "Standardise features using StandardScaler.",
        "input": "Input features and target arrays",
        "process": "Standardise features using StandardScaler.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 4",
        "action": "Create an SVC model with a chosen kernel (e.g., 'rbf').",
        "input": "Input features and target arrays",
        "process": "Create an SVC model with a chosen kernel (e.g., 'rbf').",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 5",
        "action": "Set parameters C and gamma as needed.",
        "input": "Input features and target arrays",
        "process": "Set parameters C and gamma as needed.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 6",
        "action": "Train the model using fit().",
        "input": "Input features and target arrays",
        "process": "Train the model using fit().",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 7",
        "action": "Predict on the test set and compute evaluation metrics.",
        "input": "Input features and target arrays",
        "process": "Predict on the test set and compute evaluation metrics.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 8",
        "action": "Optionally compare different kernels.",
        "input": "Input features and target arrays",
        "process": "Optionally compare different kernels.",
        "output": "Transformed data or intermediate model state"
      }
    ],
    "inputProcessOutput": {
      "input": "Classification dataset, kernel type, C, gamma.",
      "process": "Scaling ? Model training ? Hyperplane optimisation ? Prediction.",
      "output": "Stage"
    }
  },
  "results": {
    "observations": [
      "The classification accuracy and detailed classification report (precision, recall, F1 per class).",
      "The number of support vectors - fewer support vectors generally indicate clearer class separation.",
      "The effect of changing C - smaller C gives a wider margin; larger C fits the training data more tightly.",
      "The effect of changing the kernel - different kernels produce different decision boundaries.",
      "The importance of feature scaling - SVM performance typically degrades without standardisation."
    ],
    "keyInsight": "Proper application of Support Vector Machine Classification requires verifying fundamental assumptions, standardizing feature scales where necessary, and evaluating performance on clean unseen test partitions."
  },
  "posttest": {
    "title": "Post-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "You train an SVM with kernel='linear' and C=0.01. The model misclassifies some training samples. What should you try?",
        "options": [
          "Decrease C further",
          "Increase C",
          "Remove all features",
          "Use KMeans instead"
        ],
        "answer": 1
      },
      {
        "q": "An SVM with RBF kernel and very high gamma perfectly fits the training data but performs poorly on the test set. This is likely ___.",
        "options": [
          "Underfitting",
          "Overfitting",
          "Correct behaviour",
          "A data leakage issue"
        ],
        "answer": 1
      },
      {
        "q": "You compare SVM with linear vs. RBF kernel. Linear kernel gives 75% accuracy; RBF gives 92%. What does this suggest?",
        "options": [
          "The data is linearly separable",
          "The data has non-linear boundaries that RBF captures better",
          "The linear kernel is always superior",
          "Both kernels are equivalent"
        ],
        "answer": 1
      },
      {
        "q": "model.n_support_ returns [15, 20]. What does this mean?",
        "options": [
          "There are 35 training samples",
          "Class 0 has 15 support vectors and class 1 has 20",
          "The model accuracy is 35%",
          "15 features and 20 samples"
        ],
        "answer": 1
      },
      {
        "q": "Why is StandardScaler applied before SVM but not after?",
        "options": [
          "SVM outputs need rescaling",
          "SVM input features must be on a comparable scale for the algorithm to work correctly",
          "It does not matter when scaling is applied",
          "Scaling is only needed for clustering"
        ],
        "answer": 1
      },
      {
        "q": "You use SVC(kernel='poly', degree=3). What type of boundary does this create?",
        "options": [
          "Linear boundary",
          "Cubic polynomial boundary",
          "Circular boundary",
          "Random boundary"
        ],
        "answer": 1
      },
      {
        "q": "SVC(probability=True) enables which method?",
        "options": [
          "fit()",
          "predict_proba()",
          "transform()",
          "score()"
        ],
        "answer": 1
      },
      {
        "q": "In a 3-class problem, SVM uses ___ strategy by default in scikit-learn.",
        "options": [
          "One-vs-Rest (OvR)",
          "One-vs-One (OvO)",
          "Direct multi-class",
          "Clustering"
        ],
        "answer": 1
      },
      {
        "q": "The term 'maximum-margin classifier' refers to SVM because ___.",
        "options": [
          "It uses the maximum number of features",
          "It finds the hyperplane with the widest margin between classes",
          "It maximises training time",
          "It maximises the number of support vectors"
        ],
        "answer": 1
      },
      {
        "q": "If you set gamma='auto' in SVC, gamma is computed as ___.",
        "options": [
          "1 / n_features",
          "1 / (n_features   variance)",
          "1.0",
          "0.5"
        ],
        "answer": 0
      },
      {
        "q": "An SVM model has 200 training samples and 50 support vectors. If you retrain with only the 50 support vectors, the hyperplane would be ___.",
        "options": [
          "Completely different",
          "Approximately the same",
          "Undefined",
          "Always better"
        ],
        "answer": 1
      },
      {
        "q": "Which parameter should you tune first when SVM performance is poor?",
        "options": [
          "random_state",
          "C and kernel",
          "The number of features",
          "The test set size"
        ],
        "answer": 1
      },
      {
        "q": "For a linearly separable dataset, which kernel is computationally most efficient?",
        "options": [
          "rbf",
          "poly (degree=5)",
          "linear",
          "sigmoid"
        ],
        "answer": 2
      },
      {
        "q": "You train SVM on unscaled data and get 60% accuracy. After scaling, accuracy jumps to 95%. Why?",
        "options": [
          "Scaling removed outliers",
          "SVM is sensitive to feature scales; scaling put features on equal footing",
          "Scaling added new features",
          "This is impossible"
        ],
        "answer": 1
      },
      {
        "q": "model.support_vectors_ returns ___.",
        "options": [
          "All training data",
          "Only the support vectors used to define the hyperplane",
          "The coefficients",
          "The test predictions"
        ],
        "answer": 1
      },
      {
        "q": "SVM with kernel='rbf', C=1.0 gives 90% accuracy. Which change is most likely to improve performance?",
        "options": [
          "Setting C=0.001",
          "Tuning C and gamma using GridSearchCV",
          "Removing the kernel",
          "Using a random forest instead"
        ],
        "answer": 1
      },
      {
        "q": "The bias term b in the SVM decision function is stored in ___.",
        "options": [
          "model.coef_",
          "model.intercept_",
          "model.bias_",
          "model.support_"
        ],
        "answer": 1
      },
      {
        "q": "What does classification_report() provide that accuracy_score() does not?",
        "options": [
          "A single accuracy number",
          "Per-class precision, recall, and F1-score",
          "The number of features",
          "The training time"
        ],
        "answer": 1
      },
      {
        "q": "SVM is particularly effective when ___.",
        "options": [
          "The dataset has millions of samples",
          "The number of features is high relative to the number of samples",
          "All features are categorical",
          "The data has no structure"
        ],
        "answer": 1
      },
      {
        "q": "Which of the following increases SVM training time the most?",
        "options": [
          "Increasing the number of features slightly",
          "Increasing the number of training samples significantly",
          "Changing the random_state",
          "Using a linear kernel"
        ],
        "answer": 1
      }
    ]
  }
};
