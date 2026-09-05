// src/data/exp-09.ts
// Experiment 9: Random Forest Classification
// Full content transcribed from vlab_manual.txt

export const exp09 = {
  "id": "9",
  "title": "Random Forest Classification",
  "aim": "To understand Random Forest as an ensemble learning method built on multiple decision trees, implement it in Python using scikit-learn, and compare its performance and robustness against a single decision tree.",
  "learningObjectives": [
    "Understand the theoretical foundations and mathematical formulation of Random Forest Classification",
    "Implement the algorithmic pipeline using Python and scikit-learn",
    "Evaluate model performance and diagnostic metrics on unseen test data",
    "Analyze model assumptions, practical advantages, and limitations"
  ],
  "theory": [
    {
      "id": "ensemble-learning",
      "title": "2.1 Ensemble Learning",
      "type": "text",
      "content": "Ensemble learning combines the predictions of multiple individual models (base learners) to produce a more accurate and robust overall prediction. The idea is that a group of diverse models, even if individually imperfect, can collectively outperform any single model."
    },
    {
      "id": "from-decision-tree-to-random-forest",
      "title": "2.2 From Decision Tree to Random Forest",
      "type": "text",
      "content": "A single decision tree is easy to interpret but prone to overfitting and instability. Random Forest addresses these weaknesses by building many decision trees and combining their predictions.\nAspect\nDecision Tree\nRandom Forest\nNumber of trees\n1\nMany (controlled by n_estimators)\nTraining data\nUses the full training set\nEach tree uses a random bootstrap sample\nFeature selection\nConsiders all features at each split\nConsiders a random subset at each split\nOverfitting\nHigh risk (especially deep trees)\nMuch lower risk due to averaging\nStability\nUnstable - small data changes can change the tree\nMore stable - many trees smooth out variations\nInterpretability\nHigh (visualise a single tree)\nLower (many trees are harder to inspect individually)",
      "visualizationId": "random-forest"
    },
    {
      "id": "how-random-forest-works",
      "title": "2.3 How Random Forest Works",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of random forest classification using standard scikit-learn libraries.",
      "formulas": [
        {
          "name": "Majority Voting Aggregation",
          "latex": "\\hat{y} = \\text{mode}\\{h_1(x), h_2(x), \\dots, h_B(x)\\}",
          "description": "Final ensemble classification combines predictions of B independent base decision trees h_b."
        },
        {
          "name": "Ensemble Variance Reduction",
          "latex": "\\text{Var}(\\bar{h}) = \\rho \\sigma^2 + \\frac{1-\\rho}{B} \\sigma^2",
          "description": "Random feature subsampling lowers inter-tree correlation \\rho, reducing overall ensemble variance."
        }
      ],
      "codeExample": {
        "title": "How Random Forest Works",
        "code": "Bootstrap Sampling (Bagging)\nEach tree is trained on a bootstrap sample - a random sample drawn with replacement from the training data. This means each tree sees a slightly different version of the data, introducing diversity.\nRandom Feature Selection\nAt each split, only a random subset of features is considered (typically vn features for classification). This further decorrelates the trees, making the ensemble more robust.\nVoting (Aggregation)\nFor classification, each tree votes for a class. The class with the most votes across all trees is the final prediction (majority voting). For regression, predictions are averaged.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "key-parameter-n-estimators",
      "title": "2.4 Key Parameter: n_estimators",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of random forest classification using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Key Parameter: n_estimators",
        "code": "n_estimators is the number of trees in the forest. More trees generally improve performance and stability, but with diminishing returns and increased computation time. Common values range from 100 to 500.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "feature-importance",
      "title": "2.5 Feature Importance",
      "type": "text",
      "content": "Random Forest provides a built-in measure of feature importance, calculated by averaging the impurity reduction contributed by each feature across all trees. This gives a more reliable estimate than a single tree, because it is averaged over many diverse trees."
    },
    {
      "id": "overfitting-and-generalisation",
      "title": "2.6 Overfitting and Generalisation",
      "type": "text",
      "content": "Random Forest is inherently resistant to overfitting compared to a single deep decision tree. The combination of bagging and random feature selection ensures that the trees make different errors, which are cancelled out during voting. However, Random Forest can still overfit if n_estimators is very small or max_depth is excessive on noisy data."
    },
    {
      "id": "illustrative-python-example",
      "title": "2.7 Illustrative Python Example",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of random forest classification using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Illustrative Python Example",
        "code": "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score, classification_report\nfrom sklearn.datasets import load_iris\n\n# Load dataset\nX, y = load_iris(return_X_y=True)\nfeature_names = load_iris().feature_names\n\n# Split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# Train Random Forest\nmodel = RandomForestClassifier(\n    n_estimators=100, random_state=42\n)\nmodel.fit(X_train, y_train)\n\n# Predictions\ny_pred = model.predict(X_test)\n\n# Evaluation\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.4f}\")\nprint(\"\\nClassification Report:\")\nprint(classification_report(y_test, y_pred))\n\n# Feature importance\nprint(\"\\nFeature Importances:\")\nfor name, importance in zip(feature_names, model.feature_importances_):\n    print(f\"  {name}: {importance:.4f}\")\n  RandomForestClassifier builds an ensemble of decision trees.\n  n_estimators=100 creates 100 trees in the forest.\n  Each tree is trained on a different bootstrap sample with random feature subsets.\n  The final prediction is determined by majority voting across all trees.\n  feature_importances_ is averaged across all trees, providing a more stable estimate.\n\n\nPython Example - Comparing Decision Tree vs. Random Forest\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n\n# Decision Tree\ndt = DecisionTreeClassifier(random_state=42)\ndt.fit(X_train, y_train)\ndt_acc = accuracy_score(y_test, dt.predict(X_test))\n\n# Random Forest\nrf = RandomForestClassifier(n_estimators=100, random_state=42)\nrf.fit(X_train, y_train)\nrf_acc = accuracy_score(y_test, rf.predict(X_test))\n\nprint(f\"Decision Tree Accuracy: {dt_acc:.4f}\")\nprint(f\"Random Forest Accuracy: {rf_acc:.4f}\")\n  This comparison highlights that Random Forest typically matches or exceeds a single decision tree.\n  The improvement comes from reduced variance through ensemble averaging.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "advantages",
      "title": "2.8 Advantages",
      "type": "list",
      "items": [
        {
          "description": "More accurate and robust than a single decision tree."
        },
        {
          "description": "Resistant to overfitting due to bagging and random feature selection."
        },
        {
          "description": "Handles high-dimensional data well."
        },
        {
          "description": "Provides reliable feature importance estimates."
        },
        {
          "description": "Works well with default hyperparameters."
        }
      ]
    },
    {
      "id": "limitations",
      "title": "2.9 Limitations",
      "type": "list",
      "items": [
        {
          "description": "Less interpretable than a single decision tree - harder to visualise the ensemble."
        },
        {
          "description": "Slower to train and predict than a single tree (especially with many estimators)."
        },
        {
          "description": "Higher memory usage due to storing many trees."
        },
        {
          "description": "May not improve significantly over a single tree on very simple datasets."
        }
      ]
    },
    {
      "id": "applications",
      "title": "2.10 Applications",
      "type": "list",
      "items": [
        {
          "description": "Medical diagnosis and clinical prediction."
        },
        {
          "description": "Fraud detection in financial transactions."
        },
        {
          "description": "Gene expression analysis and bioinformatics."
        },
        {
          "description": "Remote sensing and land cover classification."
        }
      ]
    }
  ],
  "pretest": {
    "title": "Pre-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "Random Forest is an example of ___.",
        "options": [
          "A single model",
          "An ensemble method",
          "An unsupervised algorithm",
          "A preprocessing technique"
        ],
        "answer": 1
      },
      {
        "q": "Random Forest is built from multiple ___.",
        "options": [
          "Linear regressions",
          "Decision trees",
          "SVMs",
          "Perceptrons"
        ],
        "answer": 1
      },
      {
        "q": "n_estimators in Random Forest controls ___.",
        "options": [
          "The number of features",
          "The number of trees",
          "The tree depth",
          "The number of classes"
        ],
        "answer": 1
      },
      {
        "q": "Bootstrap sampling means ___.",
        "options": [
          "Using all data for every tree",
          "Drawing random samples with replacement",
          "Removing outliers",
          "Splitting data into K folds"
        ],
        "answer": 1
      },
      {
        "q": "At each split in a Random Forest tree, the algorithm considers ___.",
        "options": [
          "All features",
          "A random subset of features",
          "Only the most important feature",
          "No features"
        ],
        "answer": 1
      },
      {
        "q": "The final prediction in Random Forest classification is determined by ___.",
        "options": [
          "The first tree only",
          "The last tree only",
          "Majority voting across all trees",
          "The average of probabilities only"
        ],
        "answer": 2
      },
      {
        "q": "Compared to a single decision tree, Random Forest is generally ___.",
        "options": [
          "Less accurate",
          "More accurate and more robust",
          "Faster to train",
          "More prone to overfitting"
        ],
        "answer": 1
      },
      {
        "q": "Feature importance in Random Forest is ___.",
        "options": [
          "Based on one tree only",
          "Averaged across all trees in the ensemble",
          "Always zero",
          "Not available"
        ],
        "answer": 1
      },
      {
        "q": "Random Forest reduces overfitting by ___.",
        "options": [
          "Making the tree deeper",
          "Combining many diverse trees that make different errors",
          "Using only one feature",
          "Removing the training data"
        ],
        "answer": 1
      },
      {
        "q": "Increasing n_estimators from 10 to 100 generally ___.",
        "options": [
          "Decreases accuracy",
          "Improves accuracy with diminishing returns",
          "Has no effect",
          "Causes overfitting"
        ],
        "answer": 1
      },
      {
        "q": "Which is more interpretable?",
        "options": [
          "A single decision tree",
          "A Random Forest",
          "Both equally",
          "Neither"
        ],
        "answer": 0
      },
      {
        "q": "In Random Forest, each tree sees ___.",
        "options": [
          "The exact same data",
          "A different bootstrap sample",
          "Only 10% of the data",
          "Only the test data"
        ],
        "answer": 1
      },
      {
        "q": "Bagging stands for ___.",
        "options": [
          "Basic aggregation",
          "Bootstrap aggregating",
          "Batch gradient",
          "Binary averaging"
        ],
        "answer": 1
      },
      {
        "q": "For classification with Random Forest, the default number of features considered per split is ___.",
        "options": [
          "All features",
          "vn features",
          "1 feature",
          "n/2 features"
        ],
        "answer": 1
      },
      {
        "q": "A Random Forest with n_estimators=1 is equivalent to ___.",
        "options": [
          "A logistic regression",
          "A single decision tree (trained on a bootstrap sample)",
          "K-Means",
          "PCA"
        ],
        "answer": 1
      },
      {
        "q": "Which Python class implements Random Forest classification in scikit-learn?",
        "options": [
          "RandomForestRegressor",
          "RandomForestClassifier",
          "DecisionTreeClassifier",
          "GradientBoostingClassifier"
        ],
        "answer": 1
      },
      {
        "q": "Random Forest provides out-of-bag (OOB) score. This is an estimate of ___.",
        "options": [
          "Training accuracy",
          "Generalisation accuracy without a separate test set",
          "Feature importance",
          "The number of trees needed"
        ],
        "answer": 1
      },
      {
        "q": "Compared to a single decision tree, Random Forest uses ___.",
        "options": [
          "Less memory",
          "More memory (stores all trees)",
          "The same memory",
          "No memory"
        ],
        "answer": 1
      },
      {
        "q": "Random Forest can handle ___ features.",
        "options": [
          "Only numerical",
          "Only categorical",
          "Both numerical and categorical",
          "Only binary"
        ],
        "answer": 2
      },
      {
        "q": "The key difference between a Decision Tree and Random Forest is ___.",
        "options": [
          "Random Forest uses a different splitting criterion",
          "Random Forest trains multiple trees on bootstrapped data with random feature subsets",
          "Decision Trees cannot classify data",
          "Random Forest uses K-Means internally"
        ],
        "answer": 1
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
        "action": "Train a single DecisionTreeClassifier and record its accuracy.",
        "input": "Input features and target arrays",
        "process": "Train a single DecisionTreeClassifier and record its accuracy.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 4",
        "action": "Train a RandomForestClassifier with n_estimators=100 and record its accuracy.",
        "input": "Input features and target arrays",
        "process": "Train a RandomForestClassifier with n_estimators=100 and record its accuracy.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 5",
        "action": "Compare the accuracy and classification reports of both models.",
        "input": "Input features and target arrays",
        "process": "Compare the accuracy and classification reports of both models.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 6",
        "action": "Examine feature importances from the Random Forest.",
        "input": "Input features and target arrays",
        "process": "Examine feature importances from the Random Forest.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 7",
        "action": "Optionally vary n_estimators and observe the effect on accuracy.",
        "input": "Input features and target arrays",
        "process": "Optionally vary n_estimators and observe the effect on accuracy.",
        "output": "Transformed data or intermediate model state"
      }
    ],
    "inputProcessOutput": {
      "input": "Classification dataset, n_estimators.",
      "process": "Bootstrap sampling ? Train multiple trees ? Majority voting.",
      "output": "Stage"
    }
  },
  "results": {
    "observations": [
      "Random Forest accuracy is typically equal to or higher than a single decision tree.",
      "Random Forest feature importances are more stable (less sensitive to specific data splits).",
      "Increasing n_estimators improves accuracy up to a point, after which returns diminish.",
      "Random Forest generalises better - the gap between training and test accuracy is usually smaller.",
      "The trade-off: improved accuracy comes at the cost of interpretability and computation."
    ],
    "keyInsight": "Proper application of Random Forest Classification requires verifying fundamental assumptions, standardizing feature scales where necessary, and evaluating performance on clean unseen test partitions."
  },
  "posttest": {
    "title": "Post-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "You train a Decision Tree (accuracy=0.88) and a Random Forest (accuracy=0.95). Why is the Random Forest better?",
        "options": [
          "It uses a completely different algorithm",
          "The ensemble of diverse trees reduces variance and errors",
          "It uses fewer features",
          "It always achieves 100% accuracy"
        ],
        "answer": 1
      },
      {
        "q": "A Random Forest with n_estimators=500 is slower than one with n_estimators=50. Why?",
        "options": [
          "500 trees require more training and prediction time",
          "500 trees use fewer features",
          "The accuracy decreases with more trees",
          "The data size increases"
        ],
        "answer": 0
      },
      {
        "q": "You observe that a single decision tree's feature importances vary significantly when trained on different random splits. Random Forest importances are more consistent. Why?",
        "options": [
          "Random Forest uses a fixed split",
          "Random Forest averages importances across many trees, reducing variability",
          "Random Forest ignores feature importance",
          "Decision trees compute importances incorrectly"
        ],
        "answer": 1
      },
      {
        "q": "oob_score=True in RandomForestClassifier enables ___.",
        "options": [
          "Overfit detection",
          "Out-of-bag accuracy estimation using samples not included in each tree's bootstrap",
          "Outlier removal",
          "Optimal bias computation"
        ],
        "answer": 1
      },
      {
        "q": "In a Random Forest with 100 trees, each prediction is made by ___.",
        "options": [
          "1 tree",
          "50 trees",
          "All 100 trees (majority vote)",
          "The tree with highest accuracy"
        ],
        "answer": 2
      },
      {
        "q": "You set max_features='sqrt' in RandomForestClassifier. For a dataset with 16 features, each split considers ___.",
        "options": [
          "16 features",
          "4 features",
          "8 features",
          "1 feature"
        ],
        "answer": 1
      },
      {
        "q": "A Random Forest on a small dataset (50 samples) with n_estimators=1000 is likely to ___.",
        "options": [
          "Underfit severely",
          "Perform well but be computationally wasteful; the many trees see very similar bootstrap samples",
          "Crash",
          "Achieve 0% accuracy"
        ],
        "answer": 1
      },
      {
        "q": "Which of the following is NOT a hyperparameter of Random Forest?",
        "options": [
          "n_estimators",
          "max_depth",
          "learning_rate",
          "min_samples_split"
        ],
        "answer": 2
      },
      {
        "q": "Two Random Forest models have the same n_estimators but different random_state values. Their accuracies will likely be ___.",
        "options": [
          "Identical",
          "Very similar but not identical",
          "Completely different",
          "Zero for one of them"
        ],
        "answer": 1
      },
      {
        "q": "model.estimators_ in Random Forest contains ___.",
        "options": [
          "Feature importances",
          "The list of individual decision tree objects",
          "The training data",
          "The bootstrap samples"
        ],
        "answer": 1
      },
      {
        "q": "Can you visualise a single tree from a Random Forest?",
        "options": [
          "No, never",
          "Yes - each tree in model.estimators_ is a standard DecisionTreeClassifier",
          "Only the first tree",
          "Only if n_estimators=1"
        ],
        "answer": 1
      },
      {
        "q": "Random Forest with n_estimators=1 and max_features=None is essentially ___.",
        "options": [
          "A logistic regression",
          "A single decision tree trained on a bootstrap sample",
          "K-Means clustering",
          "PCA"
        ],
        "answer": 1
      },
      {
        "q": "What is the effect of setting bootstrap=False in RandomForestClassifier?",
        "options": [
          "Each tree is trained on the full dataset (no bootstrap sampling)",
          "The model does not train",
          "Each tree uses only 50% of the data",
          "Out-of-bag estimation is enabled"
        ],
        "answer": 0
      },
      {
        "q": "For a problem with 4 classes, Random Forest's majority voting selects ___.",
        "options": [
          "Always class 0",
          "The class with the most votes across all trees",
          "The class with the least votes",
          "A random class"
        ],
        "answer": 1
      },
      {
        "q": "You compare Random Forest to a single decision tree on 10 different random splits. Random Forest accuracy has lower variance. This demonstrates ___.",
        "options": [
          "Underfitting",
          "Greater stability due to ensemble averaging",
          "Worse performance",
          "Data leakage"
        ],
        "answer": 1
      },
      {
        "q": "Feature importances from Random Forest always sum to ___.",
        "options": [
          "0",
          "0.5",
          "1.0",
          "n_features"
        ],
        "answer": 2
      },
      {
        "q": "A Random Forest trained on text data would require ___.",
        "options": [
          "No preprocessing",
          "Converting text to numerical features (e.g., TF-IDF) first",
          "Only one tree",
          "Removing all text"
        ],
        "answer": 1
      },
      {
        "q": "Which ensemble method does Random Forest use?",
        "options": [
          "Boosting",
          "Bagging",
          "Stacking",
          "Blending"
        ],
        "answer": 1
      },
      {
        "q": "Setting max_depth=3 in Random Forest limits each tree to ___.",
        "options": [
          "3 features",
          "3 levels of depth",
          "3 estimators",
          "3 classes"
        ],
        "answer": 1
      },
      {
        "q": "The main source of diversity among trees in a Random Forest comes from ___.",
        "options": [
          "Different splitting criteria per tree",
          "Bootstrap sampling and random feature selection at each split",
          "Using different algorithms per tree",
          "Different learning rates per tree"
        ],
        "answer": 1
      }
    ]
  }
};
