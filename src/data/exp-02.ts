// src/data/exp-02.ts
// Experiment 2: Linear Regression
// Full content transcribed from vlab_manual.txt

export const exp02 = {
  "id": "2",
  "title": "Linear Regression",
  "aim": "To understand the concept of linear regression, implement a simple linear regression model using Python, and evaluate model performance using standard regression metrics (MAE, MSE, RMSE, R ).",
  "learningObjectives": [
    "Understand the theoretical foundations and mathematical formulation of Linear Regression",
    "Implement the algorithmic pipeline using Python and scikit-learn",
    "Evaluate model performance and diagnostic metrics on unseen test data",
    "Analyze model assumptions, practical advantages, and limitations"
  ],
  "theory": [
    {
      "id": "what-is-regression",
      "title": "2.1 What Is Regression?",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of linear regression using standard scikit-learn libraries.",
      "codeExample": {
        "title": "What Is Regression?",
        "code": "Regression is a supervised learning task where the model learns a mapping from input features to a continuous numerical output (the target variable). Unlike classification, which predicts discrete categories, regression predicts a quantity-for example, predicting house prices, temperatures, or sales revenue.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "linear-relationship",
      "title": "2.2 Linear Relationship",
      "type": "text",
      "content": "Linear regression assumes a linear relationship between the input features and the target variable. The model fits a straight line (in simple regression) or a hyperplane (in multiple regression) that best describes the data.",
      "visualizationId": "linear-regression"
    },
    {
      "id": "simple-linear-regression",
      "title": "2.3 Simple Linear Regression",
      "type": "text",
      "content": "When there is a single input feature x, the model equation is:\ny = b0 + b1   x\nwhere:\n* y is the predicted target value.\n* b0 (intercept) is the value of y when x = 0.\n* b1 (coefficient/slope) is the change in y for a one-unit increase in x.\n* x is the input feature.",
      "formulas": [
        {
          "name": "Simple Linear Regression Model",
          "latex": "y = \\beta_0 + \\beta_1 x + \\epsilon",
          "description": "y is the predicted target, \\beta_0 is the intercept, \\beta_1 is the slope coefficient, and \\epsilon is residual error."
        }
      ]
    },
    {
      "id": "multiple-linear-regression",
      "title": "2.4 Multiple Linear Regression",
      "type": "text",
      "content": "When there are n input features, the model generalises to:\ny = b0 + b1x1 + b2x2 + ... + b?x?\nEach coefficient b? represents the contribution of feature x? to the prediction, holding all other features constant.",
      "formulas": [
        {
          "name": "Multiple Linear Regression",
          "latex": "y = \\beta_0 + \\beta_1 x_1 + \\beta_2 x_2 + \\dots + \\beta_n x_n",
          "description": "Each coefficient \\beta_i represents the partial derivative of y with respect to x_i holding other features constant."
        }
      ]
    },
    {
      "id": "residuals-and-the-least-squares-method",
      "title": "2.5 Residuals and the Least-Squares Method",
      "type": "text",
      "content": "A residual is the difference between the actual value and the predicted value for a data point:\nResidual = y_actual - y_predicted\nThe ordinary least-squares (OLS) method finds the coefficients that minimise the sum of squared residuals. This ensures the fitted line is as close as possible to the observed data points.",
      "visualizationId": "linear-regression"
    },
    {
      "id": "model-evaluation-metrics",
      "title": "2.6 Model Evaluation Metrics",
      "type": "text",
      "content": "The quality of a regression model is assessed using several metrics:\nMean Absolute Error (MAE)\nMAE = (1/n) ?|y? - y?|\nAverage of the absolute differences between actual and predicted values. Easy to interpret; measured in the same units as the target.\nMean Squared Error (MSE)\nMSE = (1/n) ?(y? - y?) \nAverage of the squared differences. Penalises larger errors more heavily than MAE.\nRoot Mean Squared Error (RMSE)\nRMSE = v(MSE)\nSquare root of MSE. Measured in the same units as the target, making it more interpretable than MSE.\nCoefficient of Determination (R )\nR  = 1 - [?(y? - y?)  / ?(y? - ?) ]\nwhere ? is the mean of actual values. R  measures the proportion of variance in the target explained by the model. R  = 1 indicates a perfect fit; R  = 0 indicates the model explains no variance better than using the mean.\nMetric\nMeasures\nIdeal Value\nMAE\nAverage absolute error\n0 (lower is better)\nMSE\nAverage squared error\n0 (lower is better)\nRMSE\nRoot of average squared error\n0 (lower is better)\nR \nProportion of variance explained\n1 (higher is better)",
      "formulas": [
        {
          "name": "Mean Absolute Error (MAE)",
          "latex": "\\text{MAE} = \\frac{1}{n} \\sum_{i=1}^n |y_i - \\hat{y}_i|",
          "description": "Average absolute magnitude of residuals; measured in the same units as the target variable."
        },
        {
          "name": "Mean Squared Error (MSE)",
          "latex": "\\text{MSE} = \\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2",
          "description": "Average squared difference between actual and predicted values; heavily penalises larger outliers."
        },
        {
          "name": "Root Mean Squared Error (RMSE)",
          "latex": "\\text{RMSE} = \\sqrt{\\frac{1}{n} \\sum_{i=1}^n (y_i - \\hat{y}_i)^2}",
          "description": "Square root of MSE; penalises large errors while retaining the original target units."
        },
        {
          "name": "Coefficient of Determination (R\u00b2)",
          "latex": "R^2 = 1 - \\frac{\\sum (y_i - \\hat{y}_i)^2}{\\sum (y_i - \\bar{y})^2}",
          "description": "Proportion of variance in target explained by independent features. 1.0 represents a perfect fit."
        }
      ]
    },
    {
      "id": "illustrative-python-example",
      "title": "2.7 Illustrative Python Example",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of linear regression using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Illustrative Python Example",
        "code": "from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score\nfrom sklearn.datasets import fetch_california_housing\nimport numpy as np\n\n# Load dataset\ndata = fetch_california_housing()\nX, y = data.data, data.target\n\n# Train-test split\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\n\n# Create and train the model\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# Predictions\ny_pred = model.predict(X_test)\n\n# Coefficients\nprint(\"Intercept:\", model.intercept_)\nprint(\"Coefficients:\", model.coef_)\n\n# Evaluation metrics\nmae = mean_absolute_error(y_test, y_pred)\nmse = mean_squared_error(y_test, y_pred)\nrmse = np.sqrt(mse)\nr2 = r2_score(y_test, y_pred)\n\nprint(f\"MAE:  {mae:.4f}\")\nprint(f\"MSE:  {mse:.4f}\")\nprint(f\"RMSE: {rmse:.4f}\")\nprint(f\"R :   {r2:.4f}\")\n  LinearRegression() creates a linear regression model using ordinary least squares.\n  fit() learns the coefficients and intercept from the training data.\n  predict() computes predicted target values for new data.\n  model.intercept_ is b0; model.coef_ is the array of coefficients [b1, b2, ...].\n  MAE, MSE, RMSE, and R  quantify how well predictions match actual values.",
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
          "description": "Simple to understand, implement, and interpret."
        },
        {
          "description": "Computationally efficient even on large datasets."
        },
        {
          "description": "Coefficients provide direct insight into feature importance and direction of effect."
        },
        {
          "description": "Works well when the underlying relationship is approximately linear."
        }
      ]
    },
    {
      "id": "limitations",
      "title": "2.9 Limitations",
      "type": "list",
      "items": [
        {
          "description": "Assumes a linear relationship - performs poorly on non-linear data."
        },
        {
          "description": "Sensitive to outliers, which can disproportionately influence the fitted line."
        },
        {
          "description": "Assumes independence and homoscedasticity (constant variance) of residuals."
        },
        {
          "description": "Multicollinearity among features can make coefficient estimates unstable."
        }
      ]
    },
    {
      "id": "applications",
      "title": "2.10 Applications",
      "type": "list",
      "items": [
        {
          "description": "Predicting house prices based on features like area, location, and number of rooms."
        },
        {
          "description": "Estimating sales revenue from advertising expenditure."
        },
        {
          "description": "Forecasting temperatures or energy consumption."
        },
        {
          "description": "Modelling dose-response relationships in pharmacology."
        }
      ]
    }
  ],
  "pretest": {
    "title": "Pre-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "Linear regression predicts a ___ target variable.",
        "options": [
          "categorical",
          "continuous",
          "binary",
          "ordinal"
        ],
        "answer": 1
      },
      {
        "q": "In the equation y = b0 + b1x, what does b0 represent?",
        "options": [
          "The slope",
          "The intercept",
          "The feature value",
          "The residual"
        ],
        "answer": 1
      },
      {
        "q": "What does the slope b1 indicate?",
        "options": [
          "The predicted value when x = 0",
          "The change in y for a one-unit change in x",
          "The error of the model",
          "The mean of y"
        ],
        "answer": 1
      },
      {
        "q": "The ordinary least-squares method minimises the sum of ___.",
        "options": [
          "absolute residuals",
          "squared residuals",
          "cubed residuals",
          "log residuals"
        ],
        "answer": 1
      },
      {
        "q": "Which metric is in the same units as the target variable?",
        "options": [
          "MSE",
          "R",
          "RMSE",
          "Variance"
        ],
        "answer": 2
      },
      {
        "q": "An R  value of 0.85 means the model explains ___ of the variance.",
        "options": [
          "15%",
          "85%",
          "0.85 units",
          "100%"
        ],
        "answer": 1
      },
      {
        "q": "What is the ideal R  value for a perfect model?",
        "options": [
          "0",
          "0.5",
          "1",
          "-8"
        ],
        "answer": 2
      },
      {
        "q": "MAE stands for ___.",
        "options": [
          "Maximum Absolute Error",
          "Mean Absolute Error",
          "Median Absolute Error",
          "Minimum Absolute Error"
        ],
        "answer": 1
      },
      {
        "q": "Which metric penalises large errors more - MAE or MSE?",
        "options": [
          "MAE",
          "MSE",
          "Both equally",
          "Neither"
        ],
        "answer": 1
      },
      {
        "q": "In multiple linear regression with 5 features, how many coefficients (excluding intercept) are there?",
        "options": [
          "1",
          "5",
          "10",
          "25"
        ],
        "answer": 1
      },
      {
        "q": "A residual is defined as ___.",
        "options": [
          "predicted - mean",
          "actual - predicted",
          "actual - mean",
          "predicted - actual"
        ],
        "answer": 1
      },
      {
        "q": "Which Python class implements linear regression in scikit-learn?",
        "options": [
          "LogisticRegression",
          "LinearRegression",
          "Ridge",
          "Lasso"
        ],
        "answer": 1
      },
      {
        "q": "The method that trains the linear regression model is called ___.",
        "options": [
          "predict()",
          "fit()",
          "score()",
          "transform()"
        ],
        "answer": 1
      },
      {
        "q": "Which attribute stores the learned coefficients after fitting?",
        "options": [
          "model.weights_",
          "model.coef_",
          "model.params_",
          "model.beta_"
        ],
        "answer": 1
      },
      {
        "q": "If RMSE = 3.0, what is MSE?",
        "options": [
          "3.0",
          "6.0",
          "9.0",
          "1.73"
        ],
        "answer": 2
      },
      {
        "q": "Linear regression is a ___ learning algorithm.",
        "options": [
          "unsupervised",
          "supervised",
          "reinforcement",
          "semi-supervised"
        ],
        "answer": 1
      },
      {
        "q": "What assumption does linear regression make about the relationship between features and target?",
        "options": [
          "Logarithmic",
          "Polynomial",
          "Linear",
          "Exponential"
        ],
        "answer": 2
      },
      {
        "q": "Multicollinearity refers to ___.",
        "options": [
          "Missing values in the target",
          "High correlation among input features",
          "Non-linear target distribution",
          "Imbalanced class distribution"
        ],
        "answer": 1
      },
      {
        "q": "Which of the following is NOT a valid regression metric?",
        "options": [
          "MAE",
          "R",
          "F1-score",
          "RMSE"
        ],
        "answer": 2
      },
      {
        "q": "If all residuals are zero, what is the R  value?",
        "options": [
          "0",
          "0.5",
          "1",
          "Undefined"
        ],
        "answer": 2
      }
    ]
  },
  "procedure": {
    "steps": [
      {
        "title": "Step 1",
        "action": "Load the dataset (e.g., California Housing or a provided CSV) and inspect features and target.",
        "input": "Input features and target arrays",
        "process": "Load the dataset (e.g., California Housing or a provided CSV) and inspect features and target.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 2",
        "action": "Split the data into training set (80%) and test set (20%).",
        "input": "Input features and target arrays",
        "process": "Split the data into training set (80%) and test set (20%).",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 3",
        "action": "Create a LinearRegression model and fit it on the training data.",
        "input": "Input features and target arrays",
        "process": "Create a LinearRegression model and fit it on the training data.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 4",
        "action": "Use the trained model to predict target values on the test set.",
        "input": "Input features and target arrays",
        "process": "Use the trained model to predict target values on the test set.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 5",
        "action": "Retrieve and interpret the model's intercept and coefficients.",
        "input": "Input features and target arrays",
        "process": "Retrieve and interpret the model's intercept and coefficients.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 6",
        "action": "Compute evaluation metrics: MAE, MSE, RMSE, R .",
        "input": "Input features and target arrays",
        "process": "Compute evaluation metrics: MAE, MSE, RMSE, R .",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 7",
        "action": "Analyse the results - assess whether the model adequately captures the relationship.",
        "input": "Input features and target arrays",
        "process": "Analyse the results - assess whether the model adequately captures the relationship.",
        "output": "Transformed data or intermediate model state"
      }
    ],
    "inputProcessOutput": {
      "input": "Dataset with numerical features and a continuous target variable.",
      "process": "Train-test split ? Model fitting (OLS) ? Prediction on test set.",
      "output": "Stage"
    }
  },
  "results": {
    "observations": [
      "The intercept (b0) - the baseline predicted value when all features are zero.",
      "The coefficients - each coefficient indicates how much the target changes per unit change in that feature.",
      "Positive coefficients indicate a direct relationship; negative coefficients indicate an inverse relationship.",
      "MAE and RMSE should be compared against the scale of the target variable to assess practical significance.",
      "R  close to 1 indicates the model captures most of the variance; values near 0 suggest a poor fit."
    ],
    "keyInsight": "Proper application of Linear Regression requires verifying fundamental assumptions, standardizing feature scales where necessary, and evaluating performance on clean unseen test partitions."
  },
  "posttest": {
    "title": "Post-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "A linear regression model has coefficients [2.5, -1.3] and intercept 4.0. For input [3, 2], what is the predicted value?",
        "options": [
          "8.9",
          "9.1",
          "8.1",
          "11.5"
        ],
        "answer": 0
      },
      {
        "q": "After training, model.coef_ returns [0.5, -0.2, 1.1]. Which feature has the strongest positive influence?",
        "options": [
          "Feature 1 (0.5)",
          "Feature 2 (-0.2)",
          "Feature 3 (1.1)",
          "Cannot determine"
        ],
        "answer": 2
      },
      {
        "q": "You obtain MAE = 2.5 and the target ranges from 0 to 100. Is this model performing well?",
        "options": [
          "Yes, the error is small relative to the target range",
          "No, MAE should always be less than 1",
          "It depends on R  only",
          "Cannot determine without MSE"
        ],
        "answer": 0
      },
      {
        "q": "Your model gives R  = 0.95 on training data but R  = 0.60 on test data. What does this suggest?",
        "options": [
          "The model is underfitting",
          "The model is overfitting",
          "The model is perfect",
          "The test set is too large"
        ],
        "answer": 1
      },
      {
        "q": "Which code correctly computes RMSE from MSE?",
        "options": [
          "rmse = mse ** 2",
          "rmse = np.sqrt(mse)",
          "rmse = mse / n",
          "rmse = np.log(mse)"
        ],
        "answer": 1
      },
      {
        "q": "A negative R  value indicates that ___.",
        "options": [
          "The model is perfect",
          "The model performs worse than simply predicting the mean",
          "There is a calculation error",
          "The target is categorical"
        ],
        "answer": 1
      },
      {
        "q": "In scikit-learn, which function computes R ?",
        "options": [
          "accuracy_score",
          "r2_score",
          "f1_score",
          "roc_auc_score"
        ],
        "answer": 1
      },
      {
        "q": "You train a model with 3 features. model.coef_ has shape ___.",
        "options": [
          "(3,)",
          "(1,)",
          "(3, 3)",
          "(1, 3)"
        ],
        "answer": 0
      },
      {
        "q": "Adding more features to a linear regression model always improves R  on the ___.",
        "options": [
          "Test set",
          "Training set",
          "Both equally",
          "Neither"
        ],
        "answer": 1
      },
      {
        "q": "Which assumption is violated if residuals form a curved pattern when plotted against predicted values?",
        "options": [
          "Homoscedasticity",
          "Linearity",
          "Independence",
          "Normality"
        ],
        "answer": 1
      },
      {
        "q": "For the code: model.fit(X_train, y_train); pred = model.predict(X_test), what does pred contain?",
        "options": [
          "Training labels",
          "Test feature values",
          "Predicted target values for X_test",
          "Residuals"
        ],
        "answer": 2
      },
      {
        "q": "If you reverse actual and predicted in mean_squared_error(y_pred, y_test), does the result change?",
        "options": [
          "Yes, dramatically",
          "No, MSE is symmetric",
          "It raises an error",
          "It returns the negative value"
        ],
        "answer": 1
      },
      {
        "q": "A dataset has features with very different scales (e.g., 0-1 vs 0-100000). How does this affect linear regression?",
        "options": [
          "It makes the model invalid",
          "The coefficient magnitudes differ in scale, but predictions are unaffected by feature scaling in OLS",
          "The model will always overfit",
          "It prevents the model from converging"
        ],
        "answer": 1
      },
      {
        "q": "What value does model.intercept_ return?",
        "options": [
          "An array of coefficients",
          "A single scalar value",
          "The R  score",
          "The residual sum of squares"
        ],
        "answer": 1
      },
      {
        "q": "Which of the following would likely cause poor linear regression performance?",
        "options": [
          "A linear relationship between features and target",
          "A quadratic relationship between the feature and target",
          "Having a large training set",
          "Using standardised features"
        ],
        "answer": 1
      },
      {
        "q": "What does mean_absolute_error(y_test, y_pred) return?",
        "options": [
          "A value always between 0 and 1",
          "The average of absolute differences between actual and predicted values",
          "The square root of the variance",
          "The maximum prediction error"
        ],
        "answer": 1
      },
      {
        "q": "In simple linear regression with one feature, the model has how many parameters?",
        "options": [
          "1 (slope only)",
          "2 (slope and intercept)",
          "3",
          "Depends on data size"
        ],
        "answer": 1
      },
      {
        "q": "Your model produces identical predictions for all test samples. What is likely wrong?",
        "options": [
          "The model is overfitting",
          "All features may be constant, or the model learned zero coefficients",
          "The test set is too small",
          "R  is too high"
        ],
        "answer": 1
      },
      {
        "q": "To predict house prices using area and number of rooms, which type of regression is appropriate?",
        "options": [
          "Simple linear regression",
          "Multiple linear regression",
          "Logistic regression",
          "Polynomial regression"
        ],
        "answer": 1
      },
      {
        "q": "After model.fit(X_train, y_train), calling model.score(X_test, y_test) returns the ___.",
        "options": [
          "MAE",
          "MSE",
          "R  score",
          "RMSE"
        ],
        "answer": 2
      }
    ]
  }
};
