// src/data/exp-07.ts
// Experiment 7: K-Means Clustering
// Full content transcribed from vlab_manual.txt

export const exp07 = {
  "id": "7",
  "title": "K-Means Clustering",
  "aim": "To understand the K-Means clustering algorithm as an unsupervised learning technique, implement it in Python using scikit-learn, and use the elbow method to determine an appropriate number of clusters.",
  "learningObjectives": [
    "Understand the theoretical foundations and mathematical formulation of K-Means Clustering",
    "Implement the algorithmic pipeline using Python and scikit-learn",
    "Evaluate model performance and diagnostic metrics on unseen test data",
    "Analyze model assumptions, practical advantages, and limitations"
  ],
  "theory": [
    {
      "id": "unsupervised-learning",
      "title": "2.1 Unsupervised Learning",
      "type": "text",
      "content": "Unsupervised learning works with unlabelled data - there is no target variable to predict. The goal is to discover hidden patterns, groupings, or structures within the data. Clustering is one of the most common unsupervised learning tasks."
    },
    {
      "id": "what-is-clustering",
      "title": "2.2 What Is Clustering?",
      "type": "text",
      "content": "Clustering divides a dataset into groups (clusters) such that data points within the same cluster are more similar to each other than to data points in other clusters. Unlike classification, clustering does not require labelled target classes.",
      "visualizationId": "kmeans"
    },
    {
      "id": "k-means-algorithm",
      "title": "2.3 K-Means Algorithm",
      "type": "text",
      "content": "K-Means is an iterative clustering algorithm that partitions data into exactly K clusters. It works by alternating between two steps:\nAssignment Step\nEach data point is assigned to the nearest centroid based on Euclidean distance.\nd(x, c) = v[?(x? - c?) ]\nwhere x is a data point and c is a centroid.\nUpdate Step\nEach centroid is recalculated as the mean of all data points assigned to that cluster.\nThese two steps repeat until the centroids no longer change significantly (convergence) or a maximum number of iterations is reached."
    },
    {
      "id": "the-k-means-process",
      "title": "2.4 The K-Means Process",
      "type": "text",
      "content": "* Step 1: Choose the number of clusters K.\n* Step 2: Initialise K centroids (randomly or using a smart method like k-means++).\n* Step 3: Assign each data point to its nearest centroid.\n* Step 4: Update each centroid to the mean of its assigned points.\n* Step 5: Repeat Steps 3-4 until convergence.",
      "visualizationId": "kmeans"
    },
    {
      "id": "inertia-within-cluster-sum-of-squares",
      "title": "2.5 Inertia (Within-Cluster Sum of Squares)",
      "type": "text",
      "content": "Inertia measures the total distance of all data points to their assigned centroids:\nInertia = ? ? ||x - c_k|| \nLower inertia indicates tighter, more compact clusters. However, inertia always decreases as K increases (adding more clusters always reduces distances), so inertia alone cannot determine the optimal K.",
      "formulas": [
        {
          "name": "Within-Cluster Sum of Squares (Inertia)",
          "latex": "J = \\sum_{k=1}^K \\sum_{x_i \\in C_k} \\|x_i - \\mu_k\\|^2",
          "description": "Objective function minimized by K-Means, where \\mu_k is the mean centroid of cluster C_k."
        },
        {
          "name": "Euclidean Distance Metric",
          "latex": "d(x_i, \\mu_k) = \\sqrt{\\sum_{j=1}^p (x_{ij} - \\mu_{kj})^2}",
          "description": "Distance measure used to assign each sample point to its nearest cluster centroid."
        }
      ]
    },
    {
      "id": "the-elbow-method",
      "title": "2.6 The Elbow Method",
      "type": "text",
      "content": "The elbow method plots inertia against different values of K. As K increases, inertia decreases. At some point, the rate of decrease slows sharply, forming an 'elbow' in the curve. The K value at this elbow is often a good choice for the number of clusters."
    },
    {
      "id": "illustrative-python-example",
      "title": "2.7 Illustrative Python Example",
      "type": "text",
      "content": "The following Python example illustrates the practical implementation of k-means clustering using standard scikit-learn libraries.",
      "codeExample": {
        "title": "Illustrative Python Example",
        "code": "from sklearn.cluster import KMeans\nfrom sklearn.datasets import make_blobs\nimport numpy as np\n\n# Generate synthetic data with 3 natural clusters\nX, _ = make_blobs(n_samples=300, centers=3, random_state=42)\n\n# Fit K-Means with K=3\nkmeans = KMeans(n_clusters=3, random_state=42, n_init=10)\nkmeans.fit(X)\n\n# Results\nprint(\"Cluster labels (first 10):\", kmeans.labels_[:10])\nprint(\"Cluster centres:\\n\", kmeans.cluster_centers_)\nprint(f\"Inertia: {kmeans.inertia_:.2f}\")\n  make_blobs generates synthetic data with known cluster structure.\n  KMeans(n_clusters=3) partitions the data into 3 clusters.\n  n_init=10 runs K-Means 10 times with different initialisations, keeping the best result.\n  labels_ contains the cluster assignment (0, 1, or 2) for each data point.\n  cluster_centers_ contains the coordinates of the final centroids.\n  inertia_ is the total within-cluster sum of squared distances.\n\n\nPython Example - Elbow Method\nfrom sklearn.cluster import KMeans\nimport numpy as np\n\n# Compute inertia for K = 1 to 10\ninertias = []\nK_range = range(1, 11)\n\nfor k in K_range:\n    km = KMeans(n_clusters=k, random_state=42, n_init=10)\n    km.fit(X)\n    inertias.append(km.inertia_)\n\nprint(\"K  |  Inertia\")\nprint(\"-\" * 20)\nfor k, inertia in zip(K_range, inertias):\n    print(f\"{k:2d} |  {inertia:.2f}\")\n\n# The 'elbow' point is where inertia stops decreasing rapidly\n  The loop fits K-Means for each value of K and records the inertia.\n  Plotting K vs. inertia reveals the elbow point.\n  Beyond the elbow, adding more clusters provides diminishing returns.",
        "explanation": [
          "Executes standard scikit-learn workflow.",
          "Demonstrates proper API usage."
        ]
      }
    },
    {
      "id": "sensitivity-to-initialisation-and-outliers",
      "title": "2.8 Sensitivity to Initialisation and Outliers",
      "type": "text",
      "content": "K-Means results depend on the initial placement of centroids. Poor initialisation can lead to suboptimal clusters. The k-means++ initialisation method (default in scikit-learn) mitigates this by spreading initial centroids apart.\nOutliers can distort centroids because the mean is pulled toward extreme values. This may result in unnatural cluster assignments."
    },
    {
      "id": "advantages",
      "title": "2.9 Advantages",
      "type": "list",
      "items": [
        {
          "description": "Simple and intuitive."
        },
        {
          "description": "Computationally efficient - scales well to large datasets."
        },
        {
          "description": "Works well with spherical, equally sized clusters."
        },
        {
          "description": "Easy to interpret - each point belongs to exactly one cluster."
        }
      ]
    },
    {
      "id": "limitations",
      "title": "2.10 Limitations",
      "type": "list",
      "items": [
        {
          "description": "Requires specifying K in advance."
        },
        {
          "description": "Assumes spherical clusters of similar size and density."
        },
        {
          "description": "Sensitive to initialisation and outliers."
        },
        {
          "description": "Uses Euclidean distance - performs poorly with non-convex clusters."
        },
        {
          "description": "Not suitable for categorical data directly."
        }
      ]
    },
    {
      "id": "applications",
      "title": "2.11 Applications",
      "type": "list",
      "items": [
        {
          "description": "Customer segmentation in marketing."
        },
        {
          "description": "Image compression (colour quantisation)."
        },
        {
          "description": "Document clustering for topic modelling."
        },
        {
          "description": "Anomaly detection (points far from any centroid)."
        }
      ]
    }
  ],
  "pretest": {
    "title": "Pre-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "K-Means is a ___ learning algorithm.",
        "options": [
          "Supervised",
          "Unsupervised",
          "Reinforcement",
          "Semi-supervised"
        ],
        "answer": 1
      },
      {
        "q": "Clustering groups data based on ___.",
        "options": [
          "Known class labels",
          "Similarity among data points",
          "Regression targets",
          "Feature names"
        ],
        "answer": 1
      },
      {
        "q": "Does K-Means require labelled target classes?",
        "options": [
          "Yes",
          "No",
          "Only for the test set",
          "Only for validation"
        ],
        "answer": 1
      },
      {
        "q": "In K-Means, K refers to ___.",
        "options": [
          "The number of features",
          "The number of clusters",
          "The number of iterations",
          "The number of samples"
        ],
        "answer": 1
      },
      {
        "q": "A centroid is ___.",
        "options": [
          "A data point at the boundary",
          "The mean position of all points in a cluster",
          "The median of the dataset",
          "An outlier"
        ],
        "answer": 1
      },
      {
        "q": "Euclidean distance measures ___.",
        "options": [
          "Angular similarity",
          "Straight-line distance between two points",
          "Correlation",
          "Cosine similarity"
        ],
        "answer": 1
      },
      {
        "q": "In the assignment step, each point is assigned to ___.",
        "options": [
          "A random cluster",
          "The nearest centroid",
          "The farthest centroid",
          "All clusters"
        ],
        "answer": 1
      },
      {
        "q": "In the update step, centroids are recalculated as ___.",
        "options": [
          "The median of assigned points",
          "The mean of assigned points",
          "The mode of assigned points",
          "The maximum of assigned points"
        ],
        "answer": 1
      },
      {
        "q": "K-Means iterates until ___.",
        "options": [
          "K becomes zero",
          "Centroids stop changing significantly",
          "All points are in one cluster",
          "Exactly 10 iterations"
        ],
        "answer": 1
      },
      {
        "q": "Inertia in K-Means measures ___.",
        "options": [
          "The number of clusters",
          "Total within-cluster sum of squared distances",
          "Between-cluster distance",
          "The number of iterations"
        ],
        "answer": 1
      },
      {
        "q": "As K increases, inertia generally ___.",
        "options": [
          "Increases",
          "Decreases",
          "Stays the same",
          "Oscillates"
        ],
        "answer": 1
      },
      {
        "q": "The elbow method helps determine ___.",
        "options": [
          "The best features",
          "An appropriate value of K",
          "The learning rate",
          "The optimal distance metric"
        ],
        "answer": 1
      },
      {
        "q": "k-means++ is an improved method for ___.",
        "options": [
          "Computing distances",
          "Initialising centroids",
          "Selecting features",
          "Evaluating clusters"
        ],
        "answer": 1
      },
      {
        "q": "K-Means assumes clusters are approximately ___.",
        "options": [
          "Linear",
          "Spherical",
          "Triangular",
          "Hierarchical"
        ],
        "answer": 1
      },
      {
        "q": "Which Python class implements K-Means in scikit-learn?",
        "options": [
          "KMeans from sklearn.cluster",
          "KMeans from sklearn.linear_model",
          "KMeans from sklearn.tree",
          "KMeans from sklearn.svm"
        ],
        "answer": 0
      },
      {
        "q": "n_init in KMeans specifies ___.",
        "options": [
          "Number of clusters",
          "Number of times K-Means runs with different initialisations",
          "Number of features",
          "Number of data points"
        ],
        "answer": 1
      },
      {
        "q": "After fitting, kmeans.labels_ contains ___.",
        "options": [
          "Feature names",
          "Cluster assignment for each data point",
          "Centroid coordinates",
          "Inertia values"
        ],
        "answer": 1
      },
      {
        "q": "After fitting, kmeans.cluster_centers_ contains ___.",
        "options": [
          "The original data",
          "Coordinates of the final centroids",
          "Distance matrix",
          "Labels"
        ],
        "answer": 1
      },
      {
        "q": "Outliers can distort K-Means because ___.",
        "options": [
          "They are always removed",
          "They pull centroids toward extreme values",
          "They create new clusters automatically",
          "They have no effect"
        ],
        "answer": 1
      },
      {
        "q": "K-Means uses which distance metric by default?",
        "options": [
          "Manhattan",
          "Euclidean",
          "Cosine",
          "Hamming"
        ],
        "answer": 1
      }
    ]
  },
  "procedure": {
    "steps": [
      {
        "title": "Step 1",
        "action": "Load or generate the dataset (note: no target labels are needed).",
        "input": "Input features and target arrays",
        "process": "Load or generate the dataset (note: no target labels are needed).",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 2",
        "action": "Choose an initial value for K (e.g., 3).",
        "input": "Input features and target arrays",
        "process": "Choose an initial value for K (e.g., 3).",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 3",
        "action": "Fit KMeans with the chosen K.",
        "input": "Input features and target arrays",
        "process": "Fit KMeans with the chosen K.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 4",
        "action": "Examine cluster labels, centroids, and inertia.",
        "input": "Input features and target arrays",
        "process": "Examine cluster labels, centroids, and inertia.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 5",
        "action": "Perform the elbow method: fit K-Means for K = 1 to 10 and record inertia.",
        "input": "Input features and target arrays",
        "process": "Perform the elbow method: fit K-Means for K = 1 to 10 and record inertia.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 6",
        "action": "Identify the elbow point in the inertia vs. K plot.",
        "input": "Input features and target arrays",
        "process": "Identify the elbow point in the inertia vs. K plot.",
        "output": "Transformed data or intermediate model state"
      },
      {
        "title": "Step 7",
        "action": "Re-run K-Means with the chosen optimal K and interpret results.",
        "input": "Input features and target arrays",
        "process": "Re-run K-Means with the chosen optimal K and interpret results.",
        "output": "Transformed data or intermediate model state"
      }
    ],
    "inputProcessOutput": {
      "input": "Unlabelled dataset, number of clusters K.",
      "process": "Centroid initialisation ? Assignment ? Update ? Repeat until convergence.",
      "output": "Stage"
    }
  },
  "results": {
    "observations": [
      "Each data point receives a cluster label (0, 1, ... K-1).",
      "Centroids represent the centre of each cluster - they summarise the cluster.",
      "Inertia quantifies cluster compactness - lower is better for a given K.",
      "The elbow plot helps identify when adding more clusters provides diminishing returns.",
      "Different random seeds or initialisations may produce slightly different results."
    ],
    "keyInsight": "Proper application of K-Means Clustering requires verifying fundamental assumptions, standardizing feature scales where necessary, and evaluating performance on clean unseen test partitions."
  },
  "posttest": {
    "title": "Post-Test",
    "description": "Answer all 20 questions. Each question has exactly one correct answer.",
    "questions": [
      {
        "q": "You run K-Means with K=4 on 200 data points. How many centroids are there after convergence?",
        "options": [
          "1",
          "4",
          "200",
          "50"
        ],
        "answer": 1
      },
      {
        "q": "Inertia for K=3 is 150. For K=4, inertia is 148. For K=5, inertia is 147. What does this suggest?",
        "options": [
          "K=3 is optimal because inertia is highest",
          "The elbow is around K=3; increasing K beyond 3 gives marginal improvement",
          "K=5 is always the best choice",
          "Inertia should increase with K"
        ],
        "answer": 1
      },
      {
        "q": "After running K-Means, you find one cluster has 5 points and another has 195. What might this indicate?",
        "options": [
          "K-Means always creates equal clusters",
          "The data may have one large natural group and some outliers or a small subgroup",
          "The algorithm failed",
          "K should be increased to 200"
        ],
        "answer": 1
      },
      {
        "q": "You apply K-Means to customer data with features 'Age' (20-70) and 'Income' (20000-200000). What preprocessing is recommended?",
        "options": [
          "No preprocessing needed",
          "Feature scaling to equalise the influence of both features",
          "Removing the Age feature",
          "Label encoding"
        ],
        "answer": 1
      },
      {
        "q": "kmeans.predict(new_data) assigns each new data point to ___.",
        "options": [
          "A random cluster",
          "The nearest existing centroid",
          "A new cluster",
          "The centroid with the most points"
        ],
        "answer": 1
      },
      {
        "q": "If K = n_samples (each point is its own cluster), inertia equals ___.",
        "options": [
          "Maximum",
          "Minimum (0)",
          "Undefined",
          "Infinity"
        ],
        "answer": 1
      },
      {
        "q": "K-Means converged after 5 iterations. What does this mean?",
        "options": [
          "It ran for exactly 5 iterations regardless",
          "Centroids stopped moving significantly after 5 iterations",
          "There are 5 clusters",
          "5 features were used"
        ],
        "answer": 1
      },
      {
        "q": "You run K-Means twice with different random_state values and get different cluster assignments. Why?",
        "options": [
          "The algorithm is deterministic",
          "Different initial centroids can lead to different local optima",
          "The data changed between runs",
          "K-Means uses gradient descent"
        ],
        "answer": 1
      },
      {
        "q": "n_init=10 means K-Means runs ___ times and keeps ___.",
        "options": [
          "10 times; the result with lowest inertia",
          "10 times; the result with highest inertia",
          "10 times; the average of all results",
          "1 time with 10 clusters"
        ],
        "answer": 0
      },
      {
        "q": "Your data has 3 well-separated spherical clusters. K-Means with K=3 will likely ___.",
        "options": [
          "Fail completely",
          "Correctly identify the 3 clusters",
          "Merge all clusters into 1",
          "Create 6 clusters"
        ],
        "answer": 1
      },
      {
        "q": "For K-Means, which type of cluster shape is hardest to detect?",
        "options": [
          "Spherical",
          "Crescent-shaped (non-convex)",
          "Equal-sized spheres",
          "Dense spheres"
        ],
        "answer": 1
      },
      {
        "q": "What is the time complexity order of K-Means?",
        "options": [
          "O(n )",
          "O(n   K   iterations   features)",
          "O(log n)",
          "O(1)"
        ],
        "answer": 1
      },
      {
        "q": "After fitting, you want to see which cluster a specific sample belongs to. You check ___.",
        "options": [
          "kmeans.inertia_",
          "kmeans.labels_[sample_index]",
          "kmeans.cluster_centers_",
          "kmeans.n_init"
        ],
        "answer": 1
      },
      {
        "q": "K-Means on text data requires ___.",
        "options": [
          "No preprocessing",
          "Converting text to numerical vectors (e.g., TF-IDF) first",
          "Using K = number of words",
          "Labelling the text manually"
        ],
        "answer": 1
      },
      {
        "q": "The elbow method is subjective because ___.",
        "options": [
          "It always gives K=5",
          "The exact elbow point can be ambiguous",
          "It uses supervised labels",
          "It only works for K=2"
        ],
        "answer": 1
      },
      {
        "q": "Silhouette score is an alternative to the elbow method. It measures ___.",
        "options": [
          "Training accuracy",
          "How similar a point is to its cluster vs. other clusters",
          "The number of iterations",
          "The learning rate"
        ],
        "answer": 1
      },
      {
        "q": "You set max_iter=1 in KMeans. What happens?",
        "options": [
          "The algorithm doesn't run",
          "Only one assignment-update cycle is performed, and centroids may not have converged",
          "K is set to 1",
          "An error is raised"
        ],
        "answer": 1
      },
      {
        "q": "K-Means is an example of ___ clustering.",
        "options": [
          "Hierarchical",
          "Partitional",
          "Density-based",
          "Graph-based"
        ],
        "answer": 1
      },
      {
        "q": "Can K-Means be used for image compression?",
        "options": [
          "No, it only works for tabular data",
          "Yes - colours can be clustered and replaced with centroid colours",
          "Only with supervised labels",
          "Only for grayscale images"
        ],
        "answer": 1
      },
      {
        "q": "After clustering, you notice one centroid is very far from all data points. This likely means ___.",
        "options": [
          "The clustering is perfect",
          "The centroid was initialised poorly or there are outliers pulling it",
          "K is too small",
          "The data is not numerical"
        ],
        "answer": 1
      }
    ]
  }
};
