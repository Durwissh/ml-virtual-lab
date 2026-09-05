// src/data/exp-03.ts
// Experiment 3: Cross-Validation for Model Evaluation
// Full content transcribed from vlab_manual.txt

export const exp03 = {
  "id": "3",
  "title": "Cross-Validation for Model Evaluation",
  "aim": "To understand cross-validation as a model evaluation and resampling strategy, implement K-Fold cross-validation using Python, and interpret fold scores, mean score, and standard deviation to assess model generalisability.",
  "learningObjectives": [
    "Understand the theoretical foundations and mathematical formulation of Cross-Validation for Model Evaluation",
    "Implement the algorithmic pipeline using Python and scikit-learn",
    "Evaluate model performance and diagnostic metrics on unseen test data",
    "Analyze model assumptions, practical advantages, and limitations"
  ],
  "theory": [
    {
      "id": "need-for-model-evaluation",
      "title": "2.1 Need for Model Evaluation",
      "type": "text",
      "content": "A machine learning model that performs well on training data may fail on new, unseen data. This gap between training performance and real-world performance is the problem of generalisation. Model evaluation techniques help estimate how well a model will generalise before it is deployed."
    },
    {
      "id": "train-validation-test-concepts",
      "title": "2.2 Train / Validation / Test Concepts",
      "type": "text",
      "content": "A simple approach is to split data into training and test sets. However, if the model is tuned repeatedly based on test-set performance, the test set effectively becomes part of the training process. A three-way split introduces a validation set:\n* Training set - used to fit the model.\n* Validation set - used to tune hyperparameters and compare models.\n* Test set - held out until final evaluation; provides an unbiased performance estimate.\nA fixed single split, however, may not be representative. The performance estimate depends heavily on which samples happen to be in the validation set."
    },
    {
      "id": "cross-validation",
      "title": "2.3 Cross-Validation",
      "type": "text",
      "content": "Cross-validation addresses this limitation by systematically rotating through multiple train/validation splits. It is an evaluation/resampling strategy, not itself a predictive model. Any model (e.g., linear regression, decision tree, SVM) can be evaluated using cross-validation."
    },
    {
      "id": "k-fold-cross-validation",
      "title": "2.4 K-Fold Cross-Validation",
      "type": "text",
      "content": "The most common form is K-Fold Cross-Validation:\n* The dataset is divided into K equal (or approximately equal) subsets called folds.\n* In each iteration, one fold is used as the validation set and the remaining K-1 folds form the training set.\n* The model is trained and evaluated K times, each time with a different validation fold.\n* This produces K performance scores (one per fold).\nCommon values for K are 5 and 10.",
      "formulas": [
        {
          "name": "Cross-Validation Mean Score",
          "latex": "\\bar{S} = \\frac{1}{K} \\sum_{k=1}^K S_k",
          "description": "Mean performance metric across K folds, where S_k is the score on the k-th validation fold."
        },
        {
          "name": "Cross-Validation Standard Deviation",
          "latex": "\\sigma_S = \\sqrt{\\frac{1}{K-1} \\sum_{k=1}^K (S_k - \\bar{S})^2}",
          "description": "Quantifies stability and variance of model performance across folds."
        }
      ]
    },
    {
      "id": "interpreting-cross-validation-results",
      "title": "2.5 Interpreting Cross-Validation Results",
      "type": "text",
      "content": "The K fold scores are summarised as:\n* Mean score - average performance across all folds. This is the primary estimate of model quality.\n* Standard deviation - measures variability across folds. A high standard deviation suggests the model's performance is sensitive to the choice of training data."
    },
    {
      "id": "stratified-k-fold",
      "title": "2.6 Stratified K-Fold",
      "type": "text",
      "content": "For classification tasks, Stratified K-Fold ensures that each fold preserves the same proportion of each class as the full dataset. This prevents folds with very few (or no) samples of a minority class, which could give misleading scores."
    },
    {
      "id": "data-leakage-during-cross-validation",
      "title": "2.7 Data Leakage During Cross-Validation",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of cross-validation for model evaluation using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Data Leakage During Cross-Validation",
        "code": "If preprocessing (e.g., scaling) is applied to the entire dataset before cross-validation, information from validation folds leaks into training folds. To avoid this, preprocessing must be included inside the cross-validation loop - typically by using a Pipeline.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "cross-validation-and-hyperparameter-tuning",
      "title": "2.8 Cross-Validation and Hyperparameter Tuning",
      "type": "text",
      "content": "Cross-validation is commonly used within hyperparameter tuning (e.g., GridSearchCV). For each candidate set of hyperparameters, cross-validation estimates performance. The best-performing configuration is then selected and retrained on the full training set."
    },
    {
      "id": "illustrative-python-example",
      "title": "2.9 Illustrative Python Example",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of cross-validation for model evaluation using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Illustrative Python Example",
        "code": "from sklearn.model_selection import cross_val_score, KFold, StratifiedKFold\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.datasets import load_iris\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nimport numpy as np\n\n# Load dataset\nX, y = load_iris(return_X_y=True)\n\n# Define model inside a Pipeline to avoid leakage\npipe = Pipeline([\n    ('scaler', StandardScaler()),\n    ('clf', LogisticRegression(max_iter=200))\n])\n\n# 5-Fold Cross-Validation\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(pipe, X, y, cv=cv, scoring='accuracy')\n\nprint(\"Fold scores:\", scores)\nprint(f\"Mean accuracy: {scores.mean():.4f}\")\nprint(f\"Standard deviation: {scores.std():.4f}\")\n  cross_val_score handles the entire K-fold process: splitting, training, and evaluating.\n  StratifiedKFold preserves class proportions in each fold (important for classification).\n  The Pipeline ensures the scaler is fitted only on training folds, preventing leakage.\n  scores is an array of 5 accuracy values (one per fold).\n  Mean and standard deviation summarise overall performance and stability.\nPython Example - Examining Each Fold with KFold\nfrom sklearn.model_selection import KFold\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.datasets import fetch_california_housing\nfrom sklearn.metrics import r2_score\n\nX, y = fetch_california_housing(return_X_y=True)\n\nkf = KFold(n_splits=5, shuffle=True, random_state=42)\nmodel = LinearRegression()\n\nfor fold, (train_idx, val_idx) in enumerate(kf.split(X), 1):\n    X_train, X_val = X[train_idx], X[val_idx]\n    y_train, y_val = y[train_idx], y[val_idx]\n    model.fit(X_train, y_train)\n    y_pred = model.predict(X_val)\n    print(f\"Fold {fold}: R  = {r2_score(y_val, y_pred):.4f}\")\n  KFold.split() yields training and validation indices for each fold.\n  The model is re-trained from scratch in every fold.\n  Each fold produces an independent R  score, giving insight into performance variability.",
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
          "description": "Uses all data for both training and validation - no sample is wasted."
        },
        {
          "description": "Provides a more reliable performance estimate than a single train-test split."
        },
        {
          "description": "Reduces variance of the performance estimate compared to a single hold-out."
        },
        {
          "description": "Helps detect overfitting when individual fold scores vary widely."
        }
      ]
    },
    {
      "id": "limitations",
      "title": "2.11 Limitations",
      "type": "list",
      "items": [
        {
          "description": "Computationally expensive - the model is trained K times."
        },
        {
          "description": "Not suitable for very large datasets where even a single training run is slow."
        },
        {
          "description": "Does not eliminate the need for a separate held-out test set for final evaluation."
        },
        {
          "description": "Results can vary with different random seeds or K values."
        }
      ]
    }
  ],
  "pretest": {
    "title": "Pre-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "Cross-validation is best described as ___.",
        "options": [
          "A predictive model",
          "An evaluation/resampling strategy",
          "A feature selection technique",
          "A data augmentation method"
        ],
        "answer": 1
      },
      {
        "q": "In 5-fold cross-validation, how many times is the model trained?",
        "options": [
          "1",
          "2",
          "5",
          "10"
        ],
        "answer": 2
      },
      {
        "q": "In K-fold cross-validation, each fold serves as the validation set exactly ___ time(s).",
        "options": [
          "0",
          "1",
          "K",
          "K-1"
        ],
        "answer": 1
      },
      {
        "q": "Why is a single train-test split sometimes unreliable?",
        "options": [
          "It takes too long",
          "Performance depends heavily on which samples are in the test set",
          "It always overfits",
          "It cannot be used with classification"
        ],
        "answer": 1
      },
      {
        "q": "What does generalisation mean in machine learning?",
        "options": [
          "Memorising the training data",
          "Performing well on new, unseen data",
          "Using all features",
          "Achieving 100% training accuracy"
        ],
        "answer": 1
      },
      {
        "q": "What is the purpose of a validation set?",
        "options": [
          "Final evaluation",
          "Tuning hyperparameters and comparing models",
          "Generating new data",
          "Removing missing values"
        ],
        "answer": 1
      },
      {
        "q": "In Stratified K-Fold, what is preserved across folds?",
        "options": [
          "Feature order",
          "Class proportions",
          "Sample size",
          "Alphabetical order"
        ],
        "answer": 1
      },
      {
        "q": "Mean accuracy across 5 folds is computed as ___.",
        "options": [
          "Maximum of fold scores",
          "Sum of fold scores divided by 5",
          "Product of fold scores",
          "Minimum of fold scores"
        ],
        "answer": 1
      },
      {
        "q": "A high standard deviation across fold scores suggests ___.",
        "options": [
          "Excellent model stability",
          "The model's performance varies across subsets of data",
          "The model has converged",
          "Cross-validation is unnecessary"
        ],
        "answer": 1
      },
      {
        "q": "Which function in scikit-learn performs cross-validation and returns fold scores?",
        "options": [
          "train_test_split",
          "cross_val_score",
          "fit",
          "GridSearchCV"
        ],
        "answer": 1
      },
      {
        "q": "The parameter cv=10 in cross_val_score means ___.",
        "options": [
          "10 features are selected",
          "10-fold cross-validation",
          "10 models are ensembled",
          "The model trains for 10 epochs"
        ],
        "answer": 1
      },
      {
        "q": "What happens if you scale the entire dataset before cross-validation?",
        "options": [
          "Nothing; it is the recommended approach",
          "Data leakage - validation folds influence the scaling",
          "The model trains faster",
          "The folds become unequal"
        ],
        "answer": 1
      },
      {
        "q": "To prevent leakage during cross-validation, you should ___.",
        "options": [
          "Use a larger K value",
          "Include preprocessing inside a Pipeline",
          "Skip feature scaling entirely",
          "Use the test set for validation"
        ],
        "answer": 1
      },
      {
        "q": "Which is larger: 5-fold or 10-fold cross-validation training set per fold?",
        "options": [
          "5-fold (uses 4/5 of data for training)",
          "10-fold (uses 9/10 of data for training)",
          "Both are equal",
          "It depends on the dataset"
        ],
        "answer": 1
      },
      {
        "q": "Cross-validation can be used for ___.",
        "options": [
          "Classification only",
          "Regression only",
          "Both classification and regression",
          "Neither"
        ],
        "answer": 2
      },
      {
        "q": "After cross-validation selects the best hyperparameters, the final model is typically ___.",
        "options": [
          "Not trained at all",
          "Retrained on the full training set with those hyperparameters",
          "Used directly from the last fold",
          "Retrained on the test set"
        ],
        "answer": 1
      },
      {
        "q": "How many validation scores does 7-fold cross-validation produce?",
        "options": [
          "1",
          "6",
          "7",
          "14"
        ],
        "answer": 2
      },
      {
        "q": "Shuffle parameter in KFold controls ___.",
        "options": [
          "Feature order",
          "Whether samples are randomly shuffled before splitting into folds",
          "The scoring metric",
          "The number of folds"
        ],
        "answer": 1
      },
      {
        "q": "Which cross-validation variant is preferred for imbalanced classification datasets?",
        "options": [
          "KFold",
          "StratifiedKFold",
          "LeaveOneOut",
          "RepeatedKFold"
        ],
        "answer": 1
      },
      {
        "q": "Cross-validation replaces the need for a final test set. True or False?",
        "options": [
          "True",
          "False",
          "Only for classification",
          "Only when K > 10"
        ],
        "answer": 1
      }
    ]
  },
  "procedure": {
    "steps": [
      {
        "title": "Step 1",
        "action": "Load the dataset and select a classification or regression model.",
        "input": "Input features and target arrays",
        "process": "Load the dataset and select a classification or regression model.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 2",
        "action": "Choose the number of folds (K), typically 5 or 10.",
        "input": "Input features and target arrays",
        "process": "Choose the number of folds (K), typically 5 or 10.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 3",
        "action": "Optionally wrap preprocessing and the model in a Pipeline.",
        "input": "Input features and target arrays",
        "process": "Optionally wrap preprocessing and the model in a Pipeline.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 4",
        "action": "Run cross_val_score with the chosen model, data, and CV strategy.",
        "input": "Input features and target arrays",
        "process": "Run cross_val_score with the chosen model, data, and CV strategy.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 5",
        "action": "Examine the individual fold scores.",
        "input": "Input features and target arrays",
        "process": "Examine the individual fold scores.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 6",
        "action": "Compute the mean score and standard deviation.",
        "input": "Input features and target arrays",
        "process": "Compute the mean score and standard deviation.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 7",
        "action": "Interpret the results - assess both average performance and stability.",
        "input": "Input features and target arrays",
        "process": "Interpret the results - assess both average performance and stability.",
        "output": "Transformed data or intermediate model state"
      }
    ],
    "inputProcessOutput": {
      "input": "Dataset, ML model, number of folds (K).",
      "process": "K iterations of train-validate splits; model fitted and scored each time.",
      "output": "Stage"
    }
  },
  "results": {
    "observations": [
      "An array of K scores - one per fold.",
      "The mean score represents the overall estimated performance of the model.",
      "A low standard deviation indicates the model performs consistently across different data subsets.",
      "A high standard deviation may indicate sensitivity to particular data splits or insufficient data.",
      "Comparing cross-validation scores across models helps select the best-performing algorithm."
    ],
    "keyInsight": "Proper application of Cross-Validation for Model Evaluation requires verifying fundamental assumptions, standardizing feature scales where necessary, and evaluating performance on clean unseen test partitions."
  },
  "posttest": {
    "title": "Post-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "You run 5-fold CV and get scores [0.90, 0.88, 0.92, 0.87, 0.93]. What is the mean accuracy?",
        "options": [
          "0.88",
          "0.90",
          "0.92",
          "0.93"
        ],
        "answer": 1
      },
      {
        "q": "For the same scores [0.90, 0.88, 0.92, 0.87, 0.93], the standard deviation is approximately ___.",
        "options": [
          "0.001",
          "0.024",
          "0.10",
          "0.50"
        ],
        "answer": 1
      },
      {
        "q": "You compare Model A (mean CV = 0.85, std = 0.02) vs Model B (mean CV = 0.86, std = 0.10). Which observation is most appropriate?",
        "options": [
          "Model B is clearly better",
          "Both are similar in mean, but Model A is more stable",
          "Model A is overfitting",
          "Standard deviation does not matter"
        ],
        "answer": 1
      },
      {
        "q": "In cross_val_score(model, X, y, cv=10), how many train-validate splits occur?",
        "options": [
          "5",
          "10",
          "20",
          "1"
        ],
        "answer": 1
      },
      {
        "q": "A pipeline with StandardScaler and SVC is used in cross_val_score. How often is the scaler fitted?",
        "options": [
          "Once on the full dataset",
          "Once per fold, on the training fold only",
          "Twice per fold",
          "Never"
        ],
        "answer": 1
      },
      {
        "q": "What happens if you increase K from 5 to 20?",
        "options": [
          "Each training set becomes smaller",
          "Each training set becomes larger, but computation increases",
          "Nothing changes",
          "The model overfits more"
        ],
        "answer": 1
      },
      {
        "q": "Leave-One-Out CV (LOOCV) is K-Fold with K equal to ___.",
        "options": [
          "2",
          "5",
          "The number of samples",
          "The number of features"
        ],
        "answer": 2
      },
      {
        "q": "You use cross_val_score with scoring='neg_mean_squared_error'. Why is the sign negative?",
        "options": [
          "It indicates an error in the code",
          "Scikit-learn convention: higher is better, so errors are negated",
          "MSE is always negative",
          "The model is performing poorly"
        ],
        "answer": 1
      },
      {
        "q": "After CV selects the best model, you retrain it on all training data. Why?",
        "options": [
          "To waste more time",
          "To give the final model access to the maximum amount of training data",
          "Because CV results are invalid",
          "To check for data leakage"
        ],
        "answer": 1
      },
      {
        "q": "For a binary classification task with 60% class 0 and 40% class 1, StratifiedKFold ensures each fold has approximately ___.",
        "options": [
          "50% class 0, 50% class 1",
          "60% class 0, 40% class 1",
          "All class 0 in one fold",
          "Random proportions"
        ],
        "answer": 1
      },
      {
        "q": "Which is the correct interpretation of a single fold in 5-fold CV?",
        "options": [
          "The model is trained on 1/5 of data and tested on 4/5",
          "The model is trained on 4/5 of data and tested on 1/5",
          "The model is trained and tested on the same 1/5",
          "The model is trained on all data"
        ],
        "answer": 1
      },
      {
        "q": "If K = 1, cross-validation becomes ___.",
        "options": [
          "Standard training without validation",
          "Leave-One-Out",
          "Impossible",
          "The same as K = 2"
        ],
        "answer": 0
      },
      {
        "q": "You use cross_val_score(pipe, X, y, cv=5, scoring='accuracy') for regression. What happens?",
        "options": [
          "It works correctly",
          "It raises an error because accuracy is not valid for regression",
          "It returns R  automatically",
          "It returns zero"
        ],
        "answer": 1
      },
      {
        "q": "RepeatedKFold with n_repeats=3 and n_splits=5 produces how many total fold scores?",
        "options": [
          "3",
          "5",
          "8",
          "15"
        ],
        "answer": 3
      },
      {
        "q": "Cross-validation is particularly useful when the dataset is ___.",
        "options": [
          "Very large (millions of rows)",
          "Small to moderate, where every sample matters",
          "Entirely unlabelled",
          "Already split into predefined folds"
        ],
        "answer": 1
      },
      {
        "q": "Which code correctly creates a 10-fold CV splitter?",
        "options": [
          "KFold(n_splits=10)",
          "KFold(n_folds=10)",
          "KFold(k=10)",
          "KFold(splits=10)"
        ],
        "answer": 0
      },
      {
        "q": "During 5-fold CV on 100 samples, each validation fold contains approximately ___ samples.",
        "options": [
          "5",
          "10",
          "20",
          "50"
        ],
        "answer": 2
      },
      {
        "q": "You notice fold 3 has a much lower score than other folds. What might this indicate?",
        "options": [
          "A bug in the code",
          "That fold contains unusual or difficult samples",
          "The model is perfect",
          "K is too small"
        ],
        "answer": 1
      },
      {
        "q": "What is the main computational disadvantage of cross-validation?",
        "options": [
          "It requires extra data",
          "The model must be trained K times instead of once",
          "It can only be used with neural networks",
          "It eliminates the training set"
        ],
        "answer": 1
      },
      {
        "q": "After cross-validation, you report a single performance number. This should be the ___.",
        "options": [
          "Best fold score",
          "Worst fold score",
          "Mean of fold scores",
          "Median of fold scores"
        ],
        "answer": 2
      }
    ]
  }
};
