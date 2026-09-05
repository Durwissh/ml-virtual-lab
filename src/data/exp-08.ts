// src/data/exp-08.ts
// Experiment 8: Decision Tree Classification
// Full content transcribed from vlab_manual.txt

export const exp08 = {
  "id": "8",
  "title": "Decision Tree Classification",
  "aim": "To understand the decision tree classification algorithm, implement it in Python using scikit-learn, and analyse how the tree makes predictions using splitting criteria such as Gini impurity and entropy.",
  "learningObjectives": [
    "Understand the theoretical foundations and mathematical formulation of Decision Tree Classification",
    "Implement the algorithmic pipeline using Python and scikit-learn",
    "Evaluate model performance and diagnostic metrics on unseen test data",
    "Analyze model assumptions, practical advantages, and limitations"
  ],
  "theory": [
    {
      "id": "what-is-a-decision-tree",
      "title": "2.1 What Is a Decision Tree?",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of decision tree classification using standard scikit-learn libraries.",
      "codeExample": {
        "title": "What Is a Decision Tree?",
        "code": "A decision tree is a supervised learning algorithm that makes predictions by learning a sequence of if-then-else decision rules from the training data. It recursively partitions the feature space into regions, each associated with a class label.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "tree-structure",
      "title": "2.2 Tree Structure",
      "type": "text",
      "content": "A decision tree consists of:\n* Root node - the topmost node; the first splitting decision.\n* Internal nodes - nodes where the data is split based on a feature condition.\n* Branches - connections between nodes, representing the outcome of a decision.\n* Leaf nodes - terminal nodes that provide the final class prediction.",
      "visualizationId": "decision-tree"
    },
    {
      "id": "how-predictions-are-made",
      "title": "2.3 How Predictions Are Made",
      "type": "text",
      "content": "To classify a new sample, the tree starts at the root node and follows branches based on the sample's feature values. At each internal node, a condition is checked (e.g., 'Is Feature A = 5.0?'). The sample moves left or right depending on the answer. This continues until a leaf node is reached, which provides the predicted class."
    },
    {
      "id": "splitting-criteria",
      "title": "2.4 Splitting Criteria",
      "type": "text",
      "content": "The tree decides which feature and threshold to split on by evaluating how well a split separates the classes. The goal is to create child nodes that are as 'pure' as possible (dominated by a single class).\nGini Impurity\nGini = 1 - ? p? \nwhere p? is the proportion of samples belonging to class i in a node. Gini = 0 means the node is perfectly pure (all samples belong to one class). Gini is maximised when classes are equally distributed.\nEntropy\nEntropy = -? p?   log2(p?)\nEntropy measures disorder. Entropy = 0 means the node is pure. Maximum entropy occurs when all classes are equally represented.\nInformation Gain\nInformation Gain = Entropy(parent) - Weighted Average of Entropy(children)\nThe split that produces the highest information gain (or equivalently, the largest reduction in impurity) is selected. Gini impurity and entropy often produce similar splits.",
      "formulas": [
        {
          "name": "Gini Impurity",
          "latex": "I_G(t) = 1 - \\sum_{i=1}^C p_i^2",
          "description": "Measures the probability of misclassifying a randomly chosen element from node t."
        },
        {
          "name": "Entropy",
          "latex": "H(t) = -\\sum_{i=1}^C p_i \\log_2(p_i)",
          "description": "Information-theoretic measure of disorder and uncertainty at node t."
        },
        {
          "name": "Information Gain",
          "latex": "IG(T, a) = H(T) - \\sum_{v \\in \\text{vals}(a)} \\frac{|T_v|}{|T|} H(T_v)",
          "description": "Reduction in entropy achieved by partitioning dataset T on feature attribute a."
        }
      ]
    },
    {
      "id": "tree-depth-and-overfitting",
      "title": "2.5 Tree Depth and Overfitting",
      "type": "text",
      "content": "A decision tree can grow until every leaf is perfectly pure, but this often leads to overfitting - the tree memorises the training data, including noise, and generalises poorly. Controlling tree depth is essential."
    },
    {
      "id": "pruning",
      "title": "2.6 Pruning",
      "type": "text",
      "content": "Pruning removes parts of the tree that do not improve generalisation. Pre-pruning limits growth during training (e.g., setting max_depth, min_samples_split). Post-pruning removes branches after the full tree is grown. In scikit-learn, pre-pruning parameters are commonly used."
    },
    {
      "id": "important-parameters",
      "title": "2.7 Important Parameters",
      "type": "text",
      "content": "Parameter\nDescription\ncriterion\n'gini' or 'entropy' - the splitting criterion.\nmax_depth\nMaximum depth of the tree. Limits overfitting.\nmin_samples_split\nMinimum samples required to split an internal node.\nmin_samples_leaf\nMinimum samples required at a leaf node.\nmax_features\nNumber of features to consider for each split."
    },
    {
      "id": "illustrative-python-example",
      "title": "2.8 Illustrative Python Example",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of decision tree classification using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Illustrative Python Example",
        "code": "from sklearn.tree import DecisionTreeClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score, classification_report\nfrom sklearn.datasets import load_iris\n\n# Load dataset\nX, y = load_iris(return_X_y=True)\nfeature_names = load_iris().feature_names\n\n# Split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# Train Decision Tree\nmodel = DecisionTreeClassifier(\n    criterion='gini', max_depth=3, random_state=42\n)\nmodel.fit(X_train, y_train)\n\n# Predictions\ny_pred = model.predict(X_test)\n\n# Evaluation\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.4f}\")\nprint(\"\\nClassification Report:\")\nprint(classification_report(y_test, y_pred))\n\n# Feature importance\nprint(\"\\nFeature Importances:\")\nfor name, importance in zip(feature_names, model.feature_importances_):\n    print(f\"  {name}: {importance:.4f}\")\n  DecisionTreeClassifier builds a classification tree.\n  criterion='gini' uses Gini impurity for splitting (default).\n  max_depth=3 limits the tree to 3 levels, reducing overfitting.\n  feature_importances_ shows each feature's contribution to the splitting decisions.\n  A higher importance value means the feature is more influential in classification.\n\n\nPython Example - Using Entropy\n# Train with entropy criterion\nmodel_entropy = DecisionTreeClassifier(\n    criterion='entropy', max_depth=4, random_state=42\n)\nmodel_entropy.fit(X_train, y_train)\ny_pred_e = model_entropy.predict(X_test)\nprint(f\"Accuracy (entropy): {accuracy_score(y_test, y_pred_e):.4f}\")\n  Changing criterion to 'entropy' uses information gain for splitting.\n  Both Gini and entropy generally produce comparable tree structures.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "advantages",
      "title": "2.9 Advantages",
      "type": "list",
      "items": [
        {
          "description": "Easy to understand and visualise - resembles human decision-making."
        },
        {
          "description": "Requires minimal data preprocessing (no scaling needed)."
        },
        {
          "description": "Handles both numerical and categorical features."
        },
        {
          "description": "Feature importance is built in."
        }
      ]
    },
    {
      "id": "limitations",
      "title": "2.10 Limitations",
      "type": "list",
      "items": [
        {
          "description": "Prone to overfitting, especially with deep trees and noisy data."
        },
        {
          "description": "Unstable - small changes in data can produce a very different tree."
        },
        {
          "description": "Biased toward features with many levels or high cardinality."
        },
        {
          "description": "Cannot extrapolate beyond the range of training data."
        }
      ]
    },
    {
      "id": "applications",
      "title": "2.11 Applications",
      "type": "list",
      "items": [
        {
          "description": "Medical diagnosis decision support."
        },
        {
          "description": "Credit approval systems."
        },
        {
          "description": "Customer behaviour analysis."
        },
        {
          "description": "Rule extraction for business logic."
        }
      ]
    }
  ],
  "pretest": {
    "title": "Pre-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "A decision tree makes predictions using a sequence of ___.",
        "options": [
          "Mathematical equations",
          "If-then-else rules",
          "Random guesses",
          "Gradient computations"
        ],
        "answer": 1
      },
      {
        "q": "The topmost node in a decision tree is called the ___.",
        "options": [
          "Leaf node",
          "Root node",
          "Internal node",
          "Branch"
        ],
        "answer": 1
      },
      {
        "q": "Leaf nodes in a decision tree provide ___.",
        "options": [
          "Splitting conditions",
          "The final class prediction",
          "Feature names",
          "Training data"
        ],
        "answer": 1
      },
      {
        "q": "Gini impurity of 0 means ___.",
        "options": [
          "Maximum impurity",
          "The node is perfectly pure",
          "All classes are equally distributed",
          "The tree has no nodes"
        ],
        "answer": 1
      },
      {
        "q": "Entropy of 0 means ___.",
        "options": [
          "Maximum disorder",
          "The node is perfectly pure",
          "The tree is unpruned",
          "All features are used"
        ],
        "answer": 1
      },
      {
        "q": "Information gain measures ___.",
        "options": [
          "The depth of the tree",
          "The reduction in impurity after a split",
          "The number of features",
          "The accuracy of the model"
        ],
        "answer": 1
      },
      {
        "q": "Overfitting in a decision tree occurs when ___.",
        "options": [
          "The tree is too shallow",
          "The tree is too deep and memorises noise in the data",
          "No features are used",
          "The training accuracy is low"
        ],
        "answer": 1
      },
      {
        "q": "max_depth limits ___.",
        "options": [
          "The number of features",
          "The maximum number of levels in the tree",
          "The number of training samples",
          "The number of leaf nodes only"
        ],
        "answer": 1
      },
      {
        "q": "Pruning a decision tree helps ___.",
        "options": [
          "Increase tree complexity",
          "Reduce overfitting by simplifying the tree",
          "Add more data",
          "Speed up data loading"
        ],
        "answer": 1
      },
      {
        "q": "Which parameter changes the splitting criterion to entropy?",
        "options": [
          "max_depth='entropy'",
          "criterion='entropy'",
          "splitter='entropy'",
          "strategy='entropy'"
        ],
        "answer": 1
      },
      {
        "q": "Decision trees do NOT require ___.",
        "options": [
          "Labelled training data",
          "Feature scaling",
          "Internal nodes",
          "A splitting criterion"
        ],
        "answer": 1
      },
      {
        "q": "A node with Gini = 0.5 (for 2 classes) is ___.",
        "options": [
          "Perfectly pure",
          "Maximally impure",
          "Empty",
          "A leaf node"
        ],
        "answer": 1
      },
      {
        "q": "Feature importance in a decision tree is based on ___.",
        "options": [
          "Alphabetical order of feature names",
          "How much each feature reduces impurity across all splits",
          "The number of missing values",
          "The feature's data type"
        ],
        "answer": 1
      },
      {
        "q": "Which scikit-learn class implements classification trees?",
        "options": [
          "DecisionTreeRegressor",
          "DecisionTreeClassifier",
          "RandomForestClassifier",
          "SVC"
        ],
        "answer": 1
      },
      {
        "q": "In Gini = 1 - ?p? , p? is ___.",
        "options": [
          "The feature value",
          "The proportion of class i in the node",
          "The number of samples",
          "The tree depth"
        ],
        "answer": 1
      },
      {
        "q": "A decision tree with max_depth=1 is called a ___.",
        "options": [
          "Forest",
          "Stump",
          "Bush",
          "Root"
        ],
        "answer": 1
      },
      {
        "q": "Which of the following can a decision tree handle directly?",
        "options": [
          "Both numerical and categorical features",
          "Only numerical features",
          "Only categorical features",
          "Only binary features"
        ],
        "answer": 0
      },
      {
        "q": "At each internal node, the tree checks ___.",
        "options": [
          "All features simultaneously",
          "A condition on one feature (e.g., Feature A = 5.0)",
          "The target variable",
          "The test accuracy"
        ],
        "answer": 1
      },
      {
        "q": "How does a decision tree classify a new sample?",
        "options": [
          "By computing a weighted sum",
          "By traversing from root to leaf, following branches based on feature values",
          "By comparing to all training samples",
          "By random selection"
        ],
        "answer": 1
      },
      {
        "q": "The default criterion in DecisionTreeClassifier is ___.",
        "options": [
          "entropy",
          "gini",
          "log_loss",
          "mse"
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
        "action": "Create a DecisionTreeClassifier with a chosen criterion and max_depth.",
        "input": "Input features and target arrays",
        "process": "Create a DecisionTreeClassifier with a chosen criterion and max_depth.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 4",
        "action": "Train the model using fit().",
        "input": "Input features and target arrays",
        "process": "Train the model using fit().",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 5",
        "action": "Predict on the test set.",
        "input": "Input features and target arrays",
        "process": "Predict on the test set.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 6",
        "action": "Compute accuracy and classification report.",
        "input": "Input features and target arrays",
        "process": "Compute accuracy and classification report.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 7",
        "action": "Examine feature importances.",
        "input": "Input features and target arrays",
        "process": "Examine feature importances.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 8",
        "action": "Experiment with different max_depth values to observe the effect on accuracy.",
        "input": "Input features and target arrays",
        "process": "Experiment with different max_depth values to observe the effect on accuracy.",
        "output": "Transformed data or intermediate model state"
      }
    ],
    "inputProcessOutput": {
      "input": "Classification dataset, criterion (gini/entropy), max_depth.",
      "process": "Recursive splitting based on impurity reduction ? Tree construction ? Prediction.",
      "output": "Stage"
    }
  },
  "results": {
    "observations": [
      "Classification accuracy - does the tree correctly classify most test samples?",
      "Feature importances - which features are most influential in the decision-making process?",
      "Effect of max_depth - deeper trees may overfit (high train accuracy, lower test accuracy).",
      "Gini vs. entropy - both criteria typically yield similar results for most datasets.",
      "The tree structure implicitly encodes interpretable decision rules."
    ],
    "keyInsight": "Proper application of Decision Tree Classification requires verifying fundamental assumptions, standardizing feature scales where necessary, and evaluating performance on clean unseen test partitions."
  },
  "posttest": {
    "title": "Post-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "A node contains 40 samples of class A and 60 of class B. The Gini impurity is ___.",
        "options": [
          "0.48",
          "0.50",
          "0.40",
          "0.60"
        ],
        "answer": 0
      },
      {
        "q": "Using the same node (40A, 60B), if a split produces a child with 40A and 0B, that child's Gini is ___.",
        "options": [
          "0.0",
          "0.48",
          "0.50",
          "1.0"
        ],
        "answer": 0
      },
      {
        "q": "You train a tree with max_depth=None. Training accuracy is 100% but test accuracy is 65%. This suggests ___.",
        "options": [
          "The tree is underfitting",
          "The tree is overfitting",
          "Perfect generalisation",
          "The test set is wrong"
        ],
        "answer": 1
      },
      {
        "q": "To reduce overfitting, you should ___.",
        "options": [
          "Remove max_depth",
          "Decrease max_depth",
          "Increase training data to infinity",
          "Use a larger tree"
        ],
        "answer": 1
      },
      {
        "q": "feature_importances_ = [0.05, 0.80, 0.10, 0.05]. Which feature is most important?",
        "options": [
          "Feature 1",
          "Feature 2",
          "Feature 3",
          "Feature 4"
        ],
        "answer": 1
      },
      {
        "q": "A stump (max_depth=1) makes ___ split(s).",
        "options": [
          "0",
          "1",
          "2",
          "Many"
        ],
        "answer": 1
      },
      {
        "q": "You change criterion from 'gini' to 'entropy'. The accuracy changes from 0.93 to 0.92. What does this suggest?",
        "options": [
          "Entropy is always worse",
          "Gini and entropy often give similar results; the small difference may not be significant",
          "Gini is incorrect",
          "The dataset requires a different algorithm"
        ],
        "answer": 1
      },
      {
        "q": "A decision tree with no depth limit and min_samples_leaf=1 is likely to ___.",
        "options": [
          "Underfit",
          "Overfit by memorising training data",
          "Achieve exactly 50% accuracy",
          "Not train at all"
        ],
        "answer": 1
      },
      {
        "q": "In a multi-class problem with 5 classes, the maximum Gini impurity is ___.",
        "options": [
          "0.50",
          "0.80",
          "0.20",
          "1.00"
        ],
        "answer": 1
      },
      {
        "q": "You notice the tree uses only 2 out of 10 features. The importance of unused features is ___.",
        "options": [
          "Negative",
          "0.0",
          "1.0",
          "Undefined"
        ],
        "answer": 1
      },
      {
        "q": "For the split 'petal_length = 2.45', samples with petal_length = 2.0 go to the ___ branch.",
        "options": [
          "Left (True/Yes)",
          "Right (False/No)",
          "Both branches",
          "Neither branch"
        ],
        "answer": 0
      },
      {
        "q": "min_samples_split=10 means ___.",
        "options": [
          "A node must have at least 10 samples to be considered for splitting",
          "The tree has exactly 10 splits",
          "10 features are used per split",
          "The test set has 10 samples"
        ],
        "answer": 0
      },
      {
        "q": "Decision trees can handle missing values natively in scikit-learn (as of recent versions). True or False?",
        "options": [
          "True",
          "False",
          "Only for regression trees",
          "Only with entropy"
        ],
        "answer": 0
      },
      {
        "q": "A very shallow tree (max_depth=1) is likely to ___.",
        "options": [
          "Overfit",
          "Underfit",
          "Achieve perfect accuracy",
          "Crash"
        ],
        "answer": 1
      },
      {
        "q": "Which attribute provides the tree structure after fitting?",
        "options": [
          "model.tree_",
          "model.structure_",
          "model.nodes_",
          "model.graph_"
        ],
        "answer": 0
      },
      {
        "q": "What does model.predict(X_test) return for a DecisionTreeClassifier?",
        "options": [
          "Probabilities",
          "Class labels",
          "Feature importances",
          "Gini values"
        ],
        "answer": 1
      },
      {
        "q": "Two features have equal Gini reduction at a node. Which one is selected?",
        "options": [
          "The first one encountered (implementation-dependent)",
          "Both are used simultaneously",
          "Neither; the node becomes a leaf",
          "The one with fewer unique values"
        ],
        "answer": 0
      },
      {
        "q": "Adding random_state to DecisionTreeClassifier ensures ___.",
        "options": [
          "The tree is always optimal",
          "Reproducible results when there are ties in feature selection",
          "The data is shuffled differently each time",
          "Overfitting is prevented"
        ],
        "answer": 1
      },
      {
        "q": "Can the same feature be used for splitting at multiple nodes in the same tree?",
        "options": [
          "No, each feature is used only once",
          "Yes, a feature can be used at different thresholds in different nodes",
          "Only if max_depth > 5",
          "Only with entropy criterion"
        ],
        "answer": 1
      },
      {
        "q": "predict_proba() for a decision tree returns the proportion of ___ in the leaf node.",
        "options": [
          "Features",
          "Training samples of each class",
          "Splits",
          "Internal nodes"
        ],
        "answer": 1
      }
    ]
  }
};
