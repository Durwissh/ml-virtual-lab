// src/data/exp-10.ts
// Experiment 10: Artificial Neural Network using Perceptron Learning
// Full content transcribed from vlab_manual.txt

export const exp10 = {
  "id": "10",
  "title": "Artificial Neural Network using Perceptron Learning",
  "aim": "To understand the concept of an artificial neuron and the perceptron learning algorithm, implement a perceptron classifier in Python using scikit-learn, and observe its ability to classify linearly separable data.",
  "learningObjectives": [
    "Understand the theoretical foundations and mathematical formulation of Artificial Neural Network using Perceptron Learning",
    "Implement the algorithmic pipeline using Python and scikit-learn",
    "Evaluate model performance and diagnostic metrics on unseen test data",
    "Analyze model assumptions, practical advantages, and limitations"
  ],
  "theory": [
    {
      "id": "biological-inspiration",
      "title": "2.1 Biological Inspiration",
      "type": "text",
      "content": "Artificial neural networks are loosely inspired by biological neurons. A biological neuron receives signals through dendrites, processes them in the cell body, and transmits output through the axon. An artificial neuron mimics this process mathematically."
    },
    {
      "id": "the-artificial-neuron",
      "title": "2.2 The Artificial Neuron",
      "type": "text",
      "content": "An artificial neuron (perceptron) has the following components:\n* Inputs (x1, x2, ..., x?) - the feature values of a data sample.\n* Weights (w1, w2, ..., w?) - parameters that determine the importance of each input.\n* Bias (b) - an additional parameter that shifts the decision boundary.\n* Weighted sum - the linear combination of inputs and weights.\n* Activation function - determines the output based on the weighted sum.",
      "visualizationId": "perceptron"
    },
    {
      "id": "weighted-sum",
      "title": "2.3 Weighted Sum",
      "type": "text",
      "content": "The perceptron computes a weighted sum of the inputs:\nz = w1x1 + w2x2 + ... + w?x? + b\nThis can also be written in vector notation as z = w   x + b.",
      "formulas": [
        {
          "name": "Linear Combination (Weighted Net Input)",
          "latex": "z = \\sum_{i=1}^m w_i x_i + b = w^T x + b",
          "description": "Computes the net excitation input from inputs x_i, learned weights w_i, and bias b."
        }
      ]
    },
    {
      "id": "activation-function",
      "title": "2.4 Activation Function",
      "type": "text",
      "content": "The original perceptron uses a step (threshold) activation function:\n* If z = 0 ? output = 1 (class 1)\n* If z < 0 ? output = 0 (class 0)\nThis binary output makes the perceptron a linear binary classifier. The step function is simple but non-differentiable, which limits the perceptron to basic learning rules.",
      "formulas": [
        {
          "name": "Heaviside Step Function",
          "latex": "f(z) = \\begin{cases} 1 & \\text{if } z \\ge 0 \\\\ 0 & \\text{if } z < 0 \\end{cases}",
          "description": "Produces binary output decision based on whether net input exceeds threshold."
        }
      ]
    },
    {
      "id": "the-perceptron-learning-algorithm",
      "title": "2.5 The Perceptron Learning Algorithm",
      "type": "text",
      "content": "The perceptron learns by iteratively adjusting its weights:\n* Step 1: Initialise weights and bias (often to zero or small random values).\n* Step 2: For each training sample, compute the prediction.\n* Step 3: Compare the prediction to the actual label. Compute the error.\n* Step 4: Update weights using the rule below.\n* Step 5: Repeat for multiple epochs until convergence or a stopping condition.\nWeight Update Rule\nw? = w? + ?   (y_actual - y_predicted)   x?\nwhere:\n* ? (eta) is the learning rate - a small positive number controlling the step size.\n* y_actual is the true class label.\n* y_predicted is the perceptron's output.\n* x? is the input feature value.\nIf the prediction is correct (y_actual = y_predicted), the error is 0 and weights remain unchanged. If the prediction is wrong, weights are adjusted in the direction that would improve the prediction.",
      "formulas": [
        {
          "name": "Perceptron Weight Update Rule",
          "latex": "w_i \\leftarrow w_i + \\eta (y - \\hat{y}) x_i",
          "description": "Weights update only upon misclassification, scaled by learning rate \\eta and error difference."
        },
        {
          "name": "Bias Update Rule",
          "latex": "b \\leftarrow b + \\eta (y - \\hat{y})",
          "description": "Bias updates proportionately to shift decision threshold toward correct classification."
        }
      ],
      "visualizationId": "perceptron"
    },
    {
      "id": "learning-rate",
      "title": "2.6 Learning Rate",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of artificial neural network using perceptron learning using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Learning Rate",
        "code": "The learning rate ? controls how much the weights change in each update. A very small learning rate leads to slow convergence. A very large learning rate may cause the algorithm to overshoot and oscillate without converging. Typical values range from 0.001 to 1.0.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "epoch",
      "title": "2.7 Epoch",
      "type": "text",
      "content": "An epoch is one complete pass through the entire training dataset. The perceptron may need multiple epochs for the weights to converge to good values."
    },
    {
      "id": "linear-separability",
      "title": "2.8 Linear Separability",
      "type": "text",
      "content": "A dataset is linearly separable if a single straight line (or hyperplane in higher dimensions) can perfectly separate the classes. The perceptron convergence theorem guarantees that the perceptron will find a separating hyperplane if the data is linearly separable."
    },
    {
      "id": "limitations-of-a-single-perceptron",
      "title": "2.9 Limitations of a Single Perceptron",
      "type": "text",
      "content": "A single perceptron can only solve linearly separable problems. It cannot solve the classic XOR problem, where no single straight line can separate the two classes. This limitation was a major factor in the early criticism of perceptrons and motivated the development of multi-layer neural networks."
    },
    {
      "id": "illustrative-python-example",
      "title": "2.10 Illustrative Python Example",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of artificial neural network using perceptron learning using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Illustrative Python Example",
        "code": "from sklearn.linear_model import Perceptron\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import accuracy_score, classification_report\nfrom sklearn.datasets import load_iris\nimport numpy as np\n\n# Load dataset - use only 2 classes for binary classification\nX, y = load_iris(return_X_y=True)\nmask = y != 2  # Keep only class 0 and class 1\nX, y = X[mask], y[mask]\n\n# Split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# Scale features\nscaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)\nX_test_s = scaler.transform(X_test)\n\n# Train Perceptron\nmodel = Perceptron(max_iter=1000, eta0=0.1, random_state=42)\nmodel.fit(X_train_s, y_train)\n\n# Predictions\ny_pred = model.predict(X_test_s)\n\n# Evaluation\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.4f}\")\nprint(\"\\nClassification Report:\")\nprint(classification_report(y_test, y_pred))\n\n# Learned parameters\nprint(f\"\\nWeights: {model.coef_}\")\nprint(f\"Bias:    {model.intercept_}\")\nprint(f\"Epochs completed: {model.n_iter_}\")\n  Perceptron() creates a perceptron classifier.\n  max_iter=1000 sets the maximum number of epochs.\n  eta0=0.1 sets the learning rate.\n  Feature scaling is important because the perceptron is sensitive to feature magnitudes.\n  model.coef_ contains the learned weights; model.intercept_ is the bias term.\n  model.n_iter_ reports how many epochs were needed before convergence.\nPython Example - Observing the Effect of Learning Rate\nfrom sklearn.linear_model import Perceptron\nfrom sklearn.metrics import accuracy_score\n\nfor lr in [0.001, 0.01, 0.1, 1.0]:\n    model = Perceptron(max_iter=1000, eta0=lr, random_state=42)\n    model.fit(X_train_s, y_train)\n    acc = accuracy_score(y_test, model.predict(X_test_s))\n    print(f\"Learning rate: {lr}  Accuracy: {acc:.4f}  Epochs: {model.n_iter_}\")\n  This loop trains perceptrons with different learning rates.\n  Students can observe how the learning rate affects convergence speed and accuracy.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "advantages",
      "title": "2.11 Advantages",
      "type": "list",
      "items": [
        {
          "description": "Very simple and fast to train."
        },
        {
          "description": "Guaranteed to converge for linearly separable data."
        },
        {
          "description": "Provides a foundation for understanding more complex neural networks."
        },
        {
          "description": "Low computational requirements."
        }
      ]
    },
    {
      "id": "limitations",
      "title": "2.12 Limitations",
      "type": "list",
      "items": [
        {
          "description": "Cannot solve non-linearly separable problems (e.g., XOR)."
        },
        {
          "description": "Does not output probabilities - only class labels."
        },
        {
          "description": "Sensitive to feature scaling."
        },
        {
          "description": "A single perceptron has very limited representational power."
        }
      ]
    },
    {
      "id": "from-perceptron-to-multi-layer-networks",
      "title": "2.13 From Perceptron to Multi-Layer Networks",
      "type": "text",
      "content": "The limitations of a single perceptron are overcome by stacking multiple layers of neurons, forming a multi-layer perceptron (MLP). MLPs can learn non-linear decision boundaries and are the foundation of modern deep learning."
    },
    {
      "id": "applications-of-perceptron-learning",
      "title": "2.14 Applications of Perceptron Learning",
      "type": "list",
      "items": [
        {
          "description": "Simple binary classification tasks with linearly separable data."
        },
        {
          "description": "Online learning scenarios where data arrives sequentially."
        },
        {
          "description": "Educational introduction to neural network concepts."
        },
        {
          "description": "Building block for more complex architectures (MLPs, deep networks)."
        }
      ]
    }
  ],
  "pretest": {
    "title": "Pre-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "A perceptron is a type of ___.",
        "options": [
          "Clustering algorithm",
          "Artificial neuron / linear classifier",
          "Dimensionality reduction technique",
          "Ensemble method"
        ],
        "answer": 1
      },
      {
        "q": "The inputs to a perceptron are ___.",
        "options": [
          "Class labels",
          "Feature values of a sample",
          "Random numbers",
          "Other perceptrons"
        ],
        "answer": 1
      },
      {
        "q": "Weights in a perceptron determine ___.",
        "options": [
          "The number of inputs",
          "The importance/contribution of each input",
          "The number of classes",
          "The dataset size"
        ],
        "answer": 1
      },
      {
        "q": "The bias in a perceptron allows ___.",
        "options": [
          "Faster training",
          "Shifting the decision boundary away from the origin",
          "Adding more inputs",
          "Removing outliers"
        ],
        "answer": 1
      },
      {
        "q": "The weighted sum is computed as ___.",
        "options": [
          "z = x1 + x2 + ... + x?",
          "z = w1x1 + w2x2 + ... + w?x? + b",
          "z = w1/x1 + w2/x2",
          "z = max(x1, x2, ..., x?)"
        ],
        "answer": 1
      },
      {
        "q": "The step activation function outputs ___.",
        "options": [
          "Any real number",
          "0 or 1",
          "A probability between 0 and 1",
          "A continuous value"
        ],
        "answer": 1
      },
      {
        "q": "The learning rate ? controls ___.",
        "options": [
          "The number of features",
          "How much weights change per update",
          "The number of epochs",
          "The number of classes"
        ],
        "answer": 1
      },
      {
        "q": "An epoch is ___.",
        "options": [
          "A single weight update",
          "One complete pass through the entire training dataset",
          "A type of activation function",
          "The final prediction"
        ],
        "answer": 1
      },
      {
        "q": "The perceptron weight update rule is ___.",
        "options": [
          "w? = w? + ?   (y - y)   x?",
          "w? = w?   x?",
          "w? = x? / ?",
          "w? = w? - y"
        ],
        "answer": 0
      },
      {
        "q": "If the perceptron's prediction matches the actual label, the weight update is ___.",
        "options": [
          "Maximum",
          "Zero (no change)",
          "Always 1",
          "Negative"
        ],
        "answer": 1
      },
      {
        "q": "A dataset is linearly separable if ___.",
        "options": [
          "It has more than two classes",
          "A single hyperplane can separate all classes perfectly",
          "No algorithm can classify it",
          "It requires non-linear models"
        ],
        "answer": 1
      },
      {
        "q": "The classic problem that a single perceptron CANNOT solve is ___.",
        "options": [
          "AND gate",
          "OR gate",
          "XOR problem",
          "NOT gate"
        ],
        "answer": 2
      },
      {
        "q": "Why can't a single perceptron solve XOR?",
        "options": [
          "XOR has too many features",
          "XOR is not linearly separable",
          "The learning rate is too small",
          "XOR requires regression, not classification"
        ],
        "answer": 1
      },
      {
        "q": "Perceptron convergence theorem states that ___.",
        "options": [
          "Perceptrons always converge",
          "A perceptron will converge if the data is linearly separable",
          "Perceptrons never converge",
          "Convergence depends on the dataset size only"
        ],
        "answer": 1
      },
      {
        "q": "Which Python class implements the perceptron in scikit-learn?",
        "options": [
          "Perceptron from sklearn.linear_model",
          "Perceptron from sklearn.neural_network",
          "MLPClassifier",
          "NeuralNetwork"
        ],
        "answer": 0
      },
      {
        "q": "The parameter eta0 in scikit-learn's Perceptron sets ___.",
        "options": [
          "The number of epochs",
          "The learning rate",
          "The number of features",
          "The activation function"
        ],
        "answer": 1
      },
      {
        "q": "max_iter in Perceptron controls ___.",
        "options": [
          "Maximum number of features",
          "Maximum number of epochs",
          "Maximum number of samples",
          "Maximum weight value"
        ],
        "answer": 1
      },
      {
        "q": "After training, model.coef_ contains ___.",
        "options": [
          "The input features",
          "The learned weights",
          "The predictions",
          "The class labels"
        ],
        "answer": 1
      },
      {
        "q": "model.n_iter_ reports ___.",
        "options": [
          "The number of features used",
          "The number of epochs completed during training",
          "The number of test samples",
          "The number of support vectors"
        ],
        "answer": 1
      },
      {
        "q": "Feature scaling before training a perceptron is ___.",
        "options": [
          "Optional but unnecessary",
          "Important because the perceptron is sensitive to feature magnitudes",
          "Harmful to performance",
          "Required only for categorical features"
        ],
        "answer": 1
      }
    ]
  },
  "procedure": {
    "steps": [
      {
        "title": "Step 1",
        "action": "Load a binary classification dataset (or filter a multi-class dataset to two classes).",
        "input": "Input features and target arrays",
        "process": "Load a binary classification dataset (or filter a multi-class dataset to two classes).",
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
        "action": "Create a Perceptron with a chosen learning rate (eta0) and max_iter.",
        "input": "Input features and target arrays",
        "process": "Create a Perceptron with a chosen learning rate (eta0) and max_iter.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 5",
        "action": "Train the perceptron using fit().",
        "input": "Input features and target arrays",
        "process": "Train the perceptron using fit().",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 6",
        "action": "Predict on the test set.",
        "input": "Input features and target arrays",
        "process": "Predict on the test set.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 7",
        "action": "Compute accuracy and classification report.",
        "input": "Input features and target arrays",
        "process": "Compute accuracy and classification report.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 8",
        "action": "Examine the learned weights (coef_), bias (intercept_), and number of epochs (n_iter_).",
        "input": "Input features and target arrays",
        "process": "Examine the learned weights (coef_), bias (intercept_), and number of epochs (n_iter_).",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 9",
        "action": "Experiment with different learning rates and observe convergence.",
        "input": "Input features and target arrays",
        "process": "Experiment with different learning rates and observe convergence.",
        "output": "Transformed data or intermediate model state"
      }
    ],
    "inputProcessOutput": {
      "input": "Binary classification dataset, learning rate, maximum epochs.",
      "process": "Feature scaling ? Weight initialisation ? Iterative weight updates ? Convergence.",
      "output": "Stage"
    }
  },
  "results": {
    "observations": [
      "The perceptron achieves high accuracy on linearly separable data.",
      "The learned weights indicate the importance and direction of each feature's influence.",
      "The bias shifts the decision boundary; its value should be noted.",
      "n_iter_ shows how quickly the algorithm converged - fewer epochs indicate faster convergence.",
      "Different learning rates affect convergence speed; very small rates may require more epochs.",
      "On non-linearly separable data, the perceptron may fail to achieve good accuracy, demonstrating its fundamental limitation."
    ],
    "keyInsight": "Proper application of Artificial Neural Network using Perceptron Learning requires verifying fundamental assumptions, standardizing feature scales where necessary, and evaluating performance on clean unseen test partitions."
  },
  "posttest": {
    "title": "Post-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "A perceptron with weights w = [0.5, -0.3] and bias b = 0.1 receives input x = [2, 4]. What is the weighted sum z?",
        "options": [
          "0.9",
          "0.0",
          "-0.1",
          "0.5"
        ],
        "answer": 2
      },
      {
        "q": "Using the same z = -0.1, what does the step activation function output?",
        "options": [
          "1",
          "0",
          "0.5",
          "-0.1"
        ],
        "answer": 1
      },
      {
        "q": "After one epoch, a perceptron misclassifies 3 out of 80 samples. In the next epoch, it misclassifies 0. What happened?",
        "options": [
          "The perceptron failed",
          "Weights were adjusted enough to correctly classify all training samples",
          "The test set changed",
          "The learning rate became zero"
        ],
        "answer": 1
      },
      {
        "q": "You train a perceptron with eta0=0.001 and it hasn't converged after max_iter=100. What should you try?",
        "options": [
          "Decrease eta0 further",
          "Increase max_iter or increase eta0",
          "Remove all features",
          "Use an unsupervised algorithm"
        ],
        "answer": 1
      },
      {
        "q": "A perceptron achieves 50% accuracy on a binary dataset. This is equivalent to ___.",
        "options": [
          "A perfect classifier",
          "Random guessing",
          "A very good classifier",
          "An underfitting regression model"
        ],
        "answer": 1
      },
      {
        "q": "model.coef_ = [[0.8, -0.5, 0.3, 0.0]]. Feature 4 has weight 0.0, meaning ___.",
        "options": [
          "Feature 4 is the most important",
          "Feature 4 does not influence the perceptron's decision",
          "Feature 4 is always 0",
          "The model is broken"
        ],
        "answer": 1
      },
      {
        "q": "Why does the perceptron fail on XOR data even with many epochs?",
        "options": [
          "The learning rate is too small",
          "XOR is not linearly separable; no single hyperplane can separate the classes",
          "The perceptron needs more features",
          "XOR requires regression"
        ],
        "answer": 1
      },
      {
        "q": "In the weight update w? = w? + ?(y - y)x?, if y=1, y=0, ?=0.1, x?=3, the new w? change is ___.",
        "options": [
          "+0.3",
          "-0.3",
          "+0.1",
          "+3.0"
        ],
        "answer": 0
      },
      {
        "q": "In the same update, if y=0 and y=0, the weight change is ___.",
        "options": [
          "+0.3",
          "-0.3",
          "0.0 (no change)",
          "+0.1"
        ],
        "answer": 2
      },
      {
        "q": "You train a perceptron on scaled data and get 100% accuracy. You then feed it unscaled data. What happens?",
        "options": [
          "The same accuracy",
          "Accuracy likely drops because the model learned on a different scale",
          "Accuracy increases",
          "An error is raised"
        ],
        "answer": 1
      },
      {
        "q": "A perceptron is a special case of a neural network with ___ layer(s).",
        "options": [
          "0",
          "1 (single layer, no hidden layer)",
          "2",
          "Many"
        ],
        "answer": 1
      },
      {
        "q": "Multi-layer perceptrons (MLPs) overcome the single perceptron's limitation by ___.",
        "options": [
          "Using more data",
          "Adding hidden layers that can learn non-linear boundaries",
          "Using a different distance metric",
          "Removing the activation function"
        ],
        "answer": 1
      },
      {
        "q": "If model.n_iter_ = 5 and max_iter = 1000, the perceptron ___.",
        "options": [
          "Failed to converge",
          "Converged in 5 epochs (early stopping)",
          "Is underfitting",
          "Used 1000 epochs"
        ],
        "answer": 1
      },
      {
        "q": "Which of the following is NOT a perceptron component?",
        "options": [
          "Weights",
          "Bias",
          "Activation function",
          "Convolutional filter"
        ],
        "answer": 3
      },
      {
        "q": "Perceptron with eta0=0.5 updates weights ___ than eta0=0.01.",
        "options": [
          "50 times faster",
          "More aggressively (larger steps)",
          "More slowly",
          "Identically"
        ],
        "answer": 1
      },
      {
        "q": "On linearly separable 2D data with 2 classes, the perceptron finds a ___.",
        "options": [
          "Curve",
          "Straight line decision boundary",
          "Circular boundary",
          "No boundary"
        ],
        "answer": 1
      },
      {
        "q": "model.intercept_ in scikit-learn's Perceptron corresponds to ___.",
        "options": [
          "The weight vector",
          "The bias term b",
          "The learning rate",
          "The number of iterations"
        ],
        "answer": 1
      },
      {
        "q": "What is the difference between Perceptron and LogisticRegression in scikit-learn?",
        "options": [
          "They are identical",
          "Perceptron uses a step function and hinge-like loss; LogisticRegression uses sigmoid and log loss",
          "Perceptron is for regression; LogisticRegression is for clustering",
          "There is no difference in output"
        ],
        "answer": 1
      },
      {
        "q": "A perceptron can be trained online (one sample at a time) because ___.",
        "options": [
          "It requires batch processing",
          "The weight update rule applies per sample",
          "It uses gradient descent on the full dataset",
          "It requires all data in memory"
        ],
        "answer": 1
      },
      {
        "q": "To classify data into 3 classes using perceptrons, you would need ___.",
        "options": [
          "1 perceptron",
          "2 perceptrons",
          "3 perceptrons (e.g., one-vs-rest)",
          "Perceptrons cannot handle 3 classes"
        ],
        "answer": 2
      }
    ]
  }
};
