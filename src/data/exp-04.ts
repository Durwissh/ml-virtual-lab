// src/data/exp-04.ts
// Experiment 4: Logistic Regression for Binary Classification
// Full content transcribed from vlab_manual.txt

export const exp04 = {
  "id": "4",
  "title": "Logistic Regression for Binary Classification",
  "aim": "To understand the concept of logistic regression for binary classification, implement it in Python using scikit-learn, and evaluate model performance using a confusion matrix, accuracy, precision, recall, and F1-score.",
  "learningObjectives": [
    "Understand the theoretical foundations and mathematical formulation of Logistic Regression for Binary Classification",
    "Implement the algorithmic pipeline using Python and scikit-learn",
    "Evaluate model performance and diagnostic metrics on unseen test data",
    "Analyze model assumptions, practical advantages, and limitations"
  ],
  "theory": [
    {
      "id": "classification-vs-regression",
      "title": "2.1 Classification vs. Regression",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of logistic regression for binary classification using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Classification vs. Regression",
        "code": "Classification is a supervised learning task where the model predicts a discrete class label. In binary classification, there are exactly two classes (e.g., spam/not-spam, positive/negative). This is fundamentally different from regression, which predicts a continuous numerical value.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "why-logistic-regression-for-classification",
      "title": "2.2 Why 'Logistic Regression' for Classification?",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of logistic regression for binary classification using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Why 'Logistic Regression' for Classification?",
        "code": "Despite its name, logistic regression is predominantly used for classification. The name comes from the fact that the model uses a logistic (sigmoid) function to transform a linear combination of features into a probability. The underlying computation is a regression on the log-odds, but the final output is a class prediction.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      },
      "visualizationId": "logistic-regression"
    },
    {
      "id": "the-logistic-sigmoid-function",
      "title": "2.3 The Logistic (Sigmoid) Function",
      "type": "text",
      "content": "Logistic regression first computes a linear combination of input features:\nz = b0 + b1x1 + b2x2 + ... + b?x?\nThis linear value z is then passed through the sigmoid function:\ns(z) = 1 / (1 + e??)\nProperties of the sigmoid function:\n* Output is always between 0 and 1, interpretable as a probability.\n* When z = 0, s(z) = 0.5.\n* As z ? +8, s(z) ? 1.\n* As z ? -8, s(z) ? 0.",
      "formulas": [
        {
          "name": "Standard Logistic Sigmoid Function",
          "latex": "\\sigma(z) = \\frac{1}{1 + e^{-z}}",
          "description": "Maps any real-valued number z into a valid probability between 0 and 1."
        },
        {
          "name": "Logit Linear Combination",
          "latex": "z = w^T x + b = \\beta_0 + \\beta_1 x_1 + \\dots + \\beta_n x_n",
          "description": "Linear combination of input features and model weights before applying sigmoid activation."
        },
        {
          "name": "Odds and Log-Odds (Logit)",
          "latex": "\\ln\\left(\\frac{p}{1-p}\\right) = w^T x + b",
          "description": "The natural logarithm of the odds ratio is a linear function of the input features."
        }
      ],
      "visualizationId": "logistic-regression"
    },
    {
      "id": "decision-threshold-and-class-prediction",
      "title": "2.4 Decision Threshold and Class Prediction",
      "type": "text",
      "content": "The sigmoid output is interpreted as the probability that the sample belongs to class 1. A decision threshold (commonly 0.5) determines the predicted class:\n* If s(z) = 0.5 ? predict class 1\n* If s(z) < 0.5 ? predict class 0\nThe threshold can be adjusted depending on the application (e.g., medical diagnosis may use a lower threshold to reduce false negatives)."
    },
    {
      "id": "confusion-matrix",
      "title": "2.5 Confusion Matrix",
      "type": "text",
      "content": "A confusion matrix summarises classification performance:\n\nPredicted Positive\nPredicted Negative\nActual Positive\nTrue Positive (TP)\nFalse Negative (FN)\nActual Negative\nFalse Positive (FP)\nTrue Negative (TN)\n* TP - correctly predicted positive.\n* TN - correctly predicted negative.\n* FP - incorrectly predicted positive (Type I error).\n* FN - incorrectly predicted negative (Type II error)."
    },
    {
      "id": "classification-metrics",
      "title": "2.6 Classification Metrics",
      "type": "text",
      "content": "Accuracy\nAccuracy = (TP + TN) / (TP + TN + FP + FN)\nProportion of correct predictions overall. Can be misleading for imbalanced datasets.\nPrecision\nPrecision = TP / (TP + FP)\nOf all samples predicted as positive, what fraction are truly positive? High precision means few false positives.\nRecall (Sensitivity)\nRecall = TP / (TP + FN)\nOf all actual positives, what fraction are correctly identified? High recall means few false negatives.\nF1-Score\nF1 = 2   (Precision   Recall) / (Precision + Recall)\nHarmonic mean of precision and recall. Useful when both metrics are important and the dataset is imbalanced.",
      "formulas": [
        {
          "name": "Accuracy",
          "latex": "\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}",
          "description": "Overall proportion of correctly classified instances."
        },
        {
          "name": "Precision",
          "latex": "\\text{Precision} = \\frac{TP}{TP + FP}",
          "description": "Proportion of positive predictions that were truly positive (low false positive rate)."
        },
        {
          "name": "Recall (Sensitivity)",
          "latex": "\\text{Recall} = \\frac{TP}{TP + FN}",
          "description": "Proportion of actual positive cases detected by the model (low false negative rate)."
        },
        {
          "name": "F1-Score",
          "latex": "F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}",
          "description": "Harmonic mean of precision and recall, balancing false positives and false negatives."
        }
      ]
    },
    {
      "id": "illustrative-python-example",
      "title": "2.7 Illustrative Python Example",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of logistic regression for binary classification using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Illustrative Python Example",
        "code": "from sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import (accuracy_score, precision_score,\n                             recall_score, f1_score, confusion_matrix)\nfrom sklearn.datasets import load_breast_cancer\n\n# Load binary classification dataset\nX, y = load_breast_cancer(return_X_y=True)\n\n# Split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# Train logistic regression model\nmodel = LogisticRegression(max_iter=10000, random_state=42)\nmodel.fit(X_train, y_train)\n\n# Predictions\ny_pred = model.predict(X_test)\n\n# Probability estimates\ny_proba = model.predict_proba(X_test)\nprint(\"Sample probabilities (first 3):\", y_proba[:3])\n\n# Confusion matrix\ncm = confusion_matrix(y_test, y_pred)\nprint(\"Confusion Matrix:\\n\", cm)\n\n# Metrics\nprint(f\"Accuracy:  {accuracy_score(y_test, y_pred):.4f}\")\nprint(f\"Precision: {precision_score(y_test, y_pred):.4f}\")\nprint(f\"Recall:    {recall_score(y_test, y_pred):.4f}\")\nprint(f\"F1-Score:  {f1_score(y_test, y_pred):.4f}\")\n  LogisticRegression(max_iter=10000) allows sufficient iterations for convergence.\n  fit() trains the model on the training data.\n  predict() returns class labels (0 or 1).\n  predict_proba() returns probability estimates for each class.\n  confusion_matrix() provides TP, TN, FP, FN counts.\n  accuracy_score, precision_score, recall_score, f1_score compute respective metrics.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "coefficients-in-logistic-regression",
      "title": "2.8 Coefficients in Logistic Regression",
      "type": "text",
      "content": "Like linear regression, logistic regression produces coefficients (model.coef_) and an intercept (model.intercept_). Each coefficient indicates the effect of that feature on the log-odds of the positive class. A positive coefficient increases the probability of class 1; a negative coefficient decreases it."
    },
    {
      "id": "advantages",
      "title": "2.9 Advantages",
      "type": "list",
      "items": [
        {
          "description": "Simple, fast, and interpretable."
        },
        {
          "description": "Outputs calibrated probabilities, not just class labels."
        },
        {
          "description": "Works well for linearly separable data."
        },
        {
          "description": "Coefficients provide insight into feature importance."
        }
      ]
    },
    {
      "id": "limitations",
      "title": "2.10 Limitations",
      "type": "list",
      "items": [
        {
          "description": "Assumes a linear decision boundary in the feature space."
        },
        {
          "description": "Struggles with complex, non-linear relationships without feature engineering."
        },
        {
          "description": "Sensitive to multicollinearity among features."
        },
        {
          "description": "May require feature scaling for optimal convergence."
        }
      ]
    },
    {
      "id": "applications",
      "title": "2.11 Applications",
      "type": "list",
      "items": [
        {
          "description": "Email spam detection (spam vs. not spam)."
        },
        {
          "description": "Medical diagnosis (disease present vs. absent)."
        },
        {
          "description": "Credit scoring (default vs. no default)."
        },
        {
          "description": "Customer churn prediction (will leave vs. will stay)."
        }
      ]
    }
  ],
  "pretest": {
    "title": "Pre-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "Logistic regression is primarily used for ___.",
        "options": [
          "Regression tasks",
          "Binary classification",
          "Clustering",
          "Dimensionality reduction"
        ],
        "answer": 1
      },
      {
        "q": "The sigmoid function maps any real number to a value between ___.",
        "options": [
          "-1 and 1",
          "0 and 1",
          "-8 and +8",
          "0 and 100"
        ],
        "answer": 1
      },
      {
        "q": "What is the output of s(0)?",
        "options": [
          "0",
          "0.5",
          "1",
          "-1"
        ],
        "answer": 1
      },
      {
        "q": "In binary classification, how many distinct classes exist?",
        "options": [
          "1",
          "2",
          "3",
          "Any number"
        ],
        "answer": 1
      },
      {
        "q": "A confusion matrix has dimensions ___.",
        "options": [
          "1 1",
          "2 2 (for binary)",
          "3 3",
          "n n (always)"
        ],
        "answer": 1
      },
      {
        "q": "True Positive means ___.",
        "options": [
          "Model predicted positive, and it was correct",
          "Model predicted negative, and it was correct",
          "Model predicted positive, but it was wrong",
          "Model predicted negative, but it was wrong"
        ],
        "answer": 0
      },
      {
        "q": "False Negative (Type II error) means ___.",
        "options": [
          "Predicting positive when actual is negative",
          "Predicting negative when actual is positive",
          "Predicting positive when actual is positive",
          "Predicting negative when actual is negative"
        ],
        "answer": 1
      },
      {
        "q": "Precision measures ___.",
        "options": [
          "TP / (TP + FN)",
          "TP / (TP + FP)",
          "TN / (TN + FP)",
          "(TP + TN) / Total"
        ],
        "answer": 1
      },
      {
        "q": "Recall measures ___.",
        "options": [
          "TP / (TP + FP)",
          "TP / (TP + FN)",
          "TN / (TN + FN)",
          "(TP + TN) / Total"
        ],
        "answer": 1
      },
      {
        "q": "F1-score is the ___ mean of precision and recall.",
        "options": [
          "Arithmetic",
          "Geometric",
          "Harmonic",
          "Weighted"
        ],
        "answer": 2
      },
      {
        "q": "Why is logistic regression called 'regression' if it is used for classification?",
        "options": [
          "It was named incorrectly by accident",
          "It models the log-odds as a linear regression, then converts to probability",
          "It can only predict continuous values",
          "It uses the same loss function as linear regression"
        ],
        "answer": 1
      },
      {
        "q": "What does predict_proba() return?",
        "options": [
          "Class labels",
          "Probability estimates for each class",
          "Residuals",
          "Coefficients"
        ],
        "answer": 1
      },
      {
        "q": "A decision threshold of 0.5 means ___.",
        "options": [
          "Classes are always balanced",
          "Samples with predicted probability = 0.5 are assigned to class 1",
          "The model achieves 50% accuracy",
          "The sigmoid output is exactly 0.5"
        ],
        "answer": 1
      },
      {
        "q": "Accuracy can be misleading when ___.",
        "options": [
          "The dataset is large",
          "Classes are balanced",
          "Classes are heavily imbalanced",
          "All features are numerical"
        ],
        "answer": 2
      },
      {
        "q": "Which metric should be prioritised when false negatives are costly (e.g., cancer detection)?",
        "options": [
          "Precision",
          "Recall",
          "Accuracy",
          "Specificity"
        ],
        "answer": 1
      },
      {
        "q": "The intercept in logistic regression is stored in ___.",
        "options": [
          "model.coef_",
          "model.intercept_",
          "model.bias_",
          "model.threshold_"
        ],
        "answer": 1
      },
      {
        "q": "How many output probabilities does predict_proba return per sample for binary classification?",
        "options": [
          "1",
          "2",
          "3",
          "Depends on features"
        ],
        "answer": 1
      },
      {
        "q": "In the equation z = b0 + b1x1, z is passed through the ___ function.",
        "options": [
          "Linear",
          "Quadratic",
          "Sigmoid",
          "Exponential"
        ],
        "answer": 2
      },
      {
        "q": "Which scikit-learn class implements logistic regression?",
        "options": [
          "LinearRegression",
          "LogisticRegression",
          "SVC",
          "KNeighborsClassifier"
        ],
        "answer": 1
      },
      {
        "q": "A positive coefficient in logistic regression means ___.",
        "options": [
          "The feature decreases the probability of class 1",
          "The feature increases the probability of class 1",
          "The feature has no effect",
          "The feature is categorical"
        ],
        "answer": 1
      }
    ]
  },
  "procedure": {
    "steps": [
      {
        "title": "Step 1",
        "action": "Load a binary classification dataset (e.g., Breast Cancer Wisconsin).",
        "input": "Input features and target arrays",
        "process": "Load a binary classification dataset (e.g., Breast Cancer Wisconsin).",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 2",
        "action": "Split into training (80%) and test (20%) sets.",
        "input": "Input features and target arrays",
        "process": "Split into training (80%) and test (20%) sets.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 3",
        "action": "Create a LogisticRegression model and train it on the training data.",
        "input": "Input features and target arrays",
        "process": "Create a LogisticRegression model and train it on the training data.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 4",
        "action": "Generate predictions and probability estimates on the test set.",
        "input": "Input features and target arrays",
        "process": "Generate predictions and probability estimates on the test set.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 5",
        "action": "Compute the confusion matrix.",
        "input": "Input features and target arrays",
        "process": "Compute the confusion matrix.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 6",
        "action": "Calculate accuracy, precision, recall, and F1-score.",
        "input": "Input features and target arrays",
        "process": "Calculate accuracy, precision, recall, and F1-score.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 7",
        "action": "Interpret the results and discuss which metric is most relevant for the given problem.",
        "input": "Input features and target arrays",
        "process": "Interpret the results and discuss which metric is most relevant for the given problem.",
        "output": "Transformed data or intermediate model state"
      }
    ],
    "inputProcessOutput": {
      "input": "Binary classification dataset with features and two-class labels.",
      "process": "Train-test split ? Model training ? Prediction ? Metric computation.",
      "output": "Stage"
    }
  },
  "results": {
    "observations": [
      "The confusion matrix - identify TP, TN, FP, and FN counts.",
      "Accuracy - the overall correct classification rate.",
      "Precision - how many predicted positives are truly positive.",
      "Recall - how many actual positives were correctly detected.",
      "F1-score - the balanced measure of precision and recall.",
      "Probability outputs - predict_proba shows the model's confidence for each prediction."
    ],
    "keyInsight": "Proper application of Logistic Regression for Binary Classification requires verifying fundamental assumptions, standardizing feature scales where necessary, and evaluating performance on clean unseen test partitions."
  },
  "posttest": {
    "title": "Post-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "A confusion matrix shows TP=45, TN=40, FP=5, FN=10. What is the accuracy?",
        "options": [
          "0.85",
          "0.90",
          "0.80",
          "0.95"
        ],
        "answer": 1
      },
      {
        "q": "Using the same confusion matrix (TP=45, TN=40, FP=5, FN=10), what is the precision?",
        "options": [
          "0.90",
          "0.82",
          "0.89",
          "0.80"
        ],
        "answer": 0
      },
      {
        "q": "Using the same matrix, what is the recall?",
        "options": [
          "0.90",
          "0.82",
          "0.818",
          "0.80"
        ],
        "answer": 2
      },
      {
        "q": "predict_proba returns [[0.3, 0.7]] for a sample. With threshold 0.5, the predicted class is ___.",
        "options": [
          "0",
          "1",
          "0.7",
          "Cannot determine"
        ],
        "answer": 1
      },
      {
        "q": "If you lower the decision threshold from 0.5 to 0.3, what generally happens?",
        "options": [
          "Precision increases, recall decreases",
          "Precision decreases, recall increases",
          "Both increase",
          "Both decrease"
        ],
        "answer": 1
      },
      {
        "q": "A model achieves 95% accuracy on a dataset where 95% of samples are class 0. Is this model useful?",
        "options": [
          "Yes, 95% is excellent",
          "Not necessarily; it may simply predict class 0 for everything",
          "Only if precision is also 95%",
          "Yes, but only for class 0"
        ],
        "answer": 1
      },
      {
        "q": "Which code correctly computes the F1-score?",
        "options": [
          "accuracy_score(y_test, y_pred)",
          "f1_score(y_test, y_pred)",
          "recall_score(y_test, y_pred)",
          "r2_score(y_test, y_pred)"
        ],
        "answer": 1
      },
      {
        "q": "The sigmoid of a very large positive z value is approximately ___.",
        "options": [
          "0",
          "0.5",
          "1",
          "-8"
        ],
        "answer": 2
      },
      {
        "q": "A logistic regression model has coef_ = [[-0.5, 1.2, 0.3]]. Which feature most strongly increases P(class=1)?",
        "options": [
          "Feature 1 (-0.5)",
          "Feature 2 (1.2)",
          "Feature 3 (0.3)",
          "All features equally"
        ],
        "answer": 1
      },
      {
        "q": "In a medical test, FN=20 means ___.",
        "options": [
          "20 healthy people were told they are sick",
          "20 sick people were told they are healthy",
          "20 people were correctly diagnosed",
          "20 tests failed to run"
        ],
        "answer": 1
      },
      {
        "q": "What does max_iter in LogisticRegression control?",
        "options": [
          "Number of features used",
          "Maximum number of iterations for the solver to converge",
          "Maximum number of test samples",
          "Maximum depth of the model"
        ],
        "answer": 1
      },
      {
        "q": "predict_proba(X_test) for binary classification returns an array of shape ___.",
        "options": [
          "(n_samples,)",
          "(n_samples, 1)",
          "(n_samples, 2)",
          "(2, n_samples)"
        ],
        "answer": 2
      },
      {
        "q": "The sum of probabilities from predict_proba for a single sample equals ___.",
        "options": [
          "0",
          "0.5",
          "1",
          "Varies per sample"
        ],
        "answer": 2
      },
      {
        "q": "Logistic regression can be extended to multi-class classification using ___.",
        "options": [
          "One-vs-Rest (OvR) strategy",
          "Clustering",
          "Principal Component Analysis",
          "KMeans"
        ],
        "answer": 0
      },
      {
        "q": "Which of the following is NOT a valid parameter for LogisticRegression in scikit-learn?",
        "options": [
          "C",
          "penalty",
          "max_iter",
          "n_estimators"
        ],
        "answer": 3
      },
      {
        "q": "The C parameter in LogisticRegression controls ___.",
        "options": [
          "The number of classes",
          "Inverse of regularisation strength (smaller C = stronger regularisation)",
          "The number of features",
          "The decision threshold"
        ],
        "answer": 1
      },
      {
        "q": "Confusion matrix for a perfect classifier would have ___.",
        "options": [
          "All values in TP and TN; FP=0 and FN=0",
          "All values in FP and FN; TP=0 and TN=0",
          "Equal values in all four cells",
          "Zero in all cells"
        ],
        "answer": 0
      },
      {
        "q": "If precision = 1.0 and recall = 0.5, F1-score is ___.",
        "options": [
          "0.50",
          "0.75",
          "0.67",
          "1.0"
        ],
        "answer": 2
      },
      {
        "q": "Which metric is the harmonic mean of precision and recall?",
        "options": [
          "Accuracy",
          "F1-score",
          "Specificity",
          "ROC-AUC"
        ],
        "answer": 1
      },
      {
        "q": "A patient has predict_proba = [0.15, 0.85]. With the default threshold, the model predicts ___.",
        "options": [
          "Negative (class 0)",
          "Positive (class 1)",
          "Unknown",
          "Both classes"
        ],
        "answer": 1
      }
    ]
  }
};
