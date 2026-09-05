// src/pages/Glossary.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Glossary.css';

interface GlossaryTerm {
  term: string;
  category: 'Foundations' | 'Regression' | 'Classification' | 'Dimensionality Reduction' | 'Clustering' | 'Neural Networks' | 'Evaluation';
  simpleDefinition: string;
  technicalDefinition: string;
  experimentId: string;
  experimentTitle: string;
  formulaLatex?: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Activation Function',
    category: 'Neural Networks',
    simpleDefinition: 'A mathematical rule that decides whether a neuron should fire or be activated based on its total input.',
    technicalDefinition: 'A non-linear or step transformation applied to the net weighted sum z = w^T x + b to introduce non-linearity into a neural network.',
    experimentId: '10',
    experimentTitle: 'Exp 10: Perceptron',
  },
  {
    term: 'Bagging (Bootstrap Aggregating)',
    category: 'Classification',
    simpleDefinition: 'Training multiple copies of the same model on different random subsets of the data and averaging their predictions.',
    technicalDefinition: 'An ensemble meta-algorithm where B bootstrap samples are drawn with replacement to train base estimators independently, substantially reducing estimator variance.',
    experimentId: '9',
    experimentTitle: 'Exp 09: Random Forest',
  },
  {
    term: 'Centroid',
    category: 'Clustering',
    simpleDefinition: 'The center point or geometric average location of all the data points belonging to a cluster.',
    technicalDefinition: 'The coordinate vector \\mu_k representing the arithmetic mean of all p-dimensional data vectors assigned to cluster C_k.',
    experimentId: '7',
    experimentTitle: 'Exp 07: K-Means',
  },
  {
    term: 'Cross-Validation',
    category: 'Evaluation',
    simpleDefinition: 'A method of testing an algorithm repeatedly on different splits of data to check that it works reliably on unseen samples.',
    technicalDefinition: 'A resampling technique that partitions data into K mutually exclusive subsets, using K-1 folds for fitting and the remaining fold for validation, iterating K times.',
    experimentId: '3',
    experimentTitle: 'Exp 03: Cross-Validation',
  },
  {
    term: 'Data Leakage',
    category: 'Foundations',
    simpleDefinition: 'Accidentally letting information from the test dataset sneak into the model during training, causing falsely inflated accuracy.',
    technicalDefinition: 'Spurious conditioning of model parameters on out-of-sample data, typically caused by fitting scalers, imputers, or encoders prior to the train-test split.',
    experimentId: '1',
    experimentTitle: 'Exp 01: Data Pre-processing',
  },
  {
    term: 'Decision Boundary',
    category: 'Classification',
    simpleDefinition: 'The line, curve, or surface that separates different output classes in a machine learning model.',
    technicalDefinition: 'The geometric hypersurface where class posterior probabilities are equal, or where the decision function f(x) = 0.',
    experimentId: '4',
    experimentTitle: 'Exp 04: Logistic Regression',
  },
  {
    term: 'Eigenvector & Eigenvalue',
    category: 'Dimensionality Reduction',
    simpleDefinition: 'Special directions in data where spread is maximized (eigenvector), and the amount of spread along that direction (eigenvalue).',
    technicalDefinition: 'Non-zero vector v satisfying C v = \\lambda v for covariance matrix C, where v represents a principal component axis and \\lambda is its variance.',
    experimentId: '5',
    experimentTitle: 'Exp 05: PCA',
  },
  {
    term: 'Elbow Method',
    category: 'Clustering',
    simpleDefinition: 'A graphical technique to find the optimal number of clusters K by looking for an inflection point where error drop flattens.',
    technicalDefinition: 'A heuristic selecting K by plotting within-cluster sum of squares (inertia) against K and locating the point of diminishing marginal returns.',
    experimentId: '7',
    experimentTitle: 'Exp 07: K-Means',
  },
  {
    term: 'Entropy',
    category: 'Classification',
    simpleDefinition: 'A measure of impurity, randomness, or disorder in a set of data items.',
    technicalDefinition: 'Information entropy H(t) = -\\sum p_i \\log_2(p_i) quantifying the expected information content or uncertainty at tree decision node t.',
    experimentId: '8',
    experimentTitle: 'Exp 08: Decision Tree',
  },
  {
    term: 'Explained Variance',
    category: 'Dimensionality Reduction',
    simpleDefinition: 'How much of the total variation and information in a high-dimensional dataset is retained by chosen principal components.',
    technicalDefinition: 'The proportion of eigenvalues corresponding to selected eigenvectors relative to the trace of the empirical covariance matrix.',
    experimentId: '5',
    experimentTitle: 'Exp 05: PCA',
  },
  {
    term: 'Feature Scaling',
    category: 'Foundations',
    simpleDefinition: 'Rescaling features measured in different units (like age and salary) into a uniform range.',
    technicalDefinition: 'Normalizing feature domains via min-max linear scaling to [0, 1] or z-score standardisation to \\mu=0, \\sigma=1 to equalize gradient descent dynamics.',
    experimentId: '1',
    experimentTitle: 'Exp 01: Data Pre-processing',
  },
  {
    term: 'Gini Impurity',
    category: 'Classification',
    simpleDefinition: 'The probability that a randomly picked sample would be incorrectly labelled if it were randomly classified according to class distribution.',
    technicalDefinition: 'Metric I_G(t) = 1 - \\sum p_i^2 used in CART algorithms as an efficient alternative to entropy for choosing optimal feature split thresholds.',
    experimentId: '8',
    experimentTitle: 'Exp 08: Decision Tree',
  },
  {
    term: 'Hyperplane',
    category: 'Classification',
    simpleDefinition: 'A flat geometric boundary with one less dimension than the ambient feature space (a line in 2D, a plane in 3D).',
    technicalDefinition: 'An affine subspace of codimension 1 defined by w^T x + b = 0, dividing the vector space into two distinct half-spaces.',
    experimentId: '6',
    experimentTitle: 'Exp 06: SVM',
  },
  {
    term: 'Imputation',
    category: 'Foundations',
    simpleDefinition: 'Filling in missing values in a dataset with statistical estimates (such as mean, median, or mode).',
    technicalDefinition: 'Statistical substitution of absent values using central tendency metrics or predictive algorithms to prevent row deletion.',
    experimentId: '1',
    experimentTitle: 'Exp 01: Data Pre-processing',
  },
  {
    term: 'Inertia (Within-Cluster Sum of Squares)',
    category: 'Clustering',
    simpleDefinition: 'The sum of squared distances of samples to their closest cluster center; smaller inertia indicates tighter clusters.',
    technicalDefinition: 'The objective loss function J = \\sum_{k=1}^K \\sum_{x \\in C_k} \\|x - \\mu_k\\|^2 minimized in Lloyd\'s algorithm.',
    experimentId: '7',
    experimentTitle: 'Exp 07: K-Means',
  },
  {
    term: 'Kernel Trick',
    category: 'Classification',
    simpleDefinition: 'A mathematical technique that maps non-linear data into higher dimensions to make it linearly separable without computing high-dimensional coordinates.',
    technicalDefinition: 'Implicit inner product computation K(x, x\') = \\langle \\phi(x), \\phi(x\') \\rangle in reproducing kernel Hilbert spaces satisfying Mercer\'s theorem.',
    experimentId: '6',
    experimentTitle: 'Exp 06: SVM',
  },
  {
    term: 'Linear Regression (OLS)',
    category: 'Regression',
    simpleDefinition: 'Finding the straight line that best fits continuous data points by minimizing the total squared vertical distances to the line.',
    technicalDefinition: 'Estimating linear parameters \\beta = (X^T X)^{-1} X^T y to minimize the quadratic residual sum of squares \\|y - X \\beta\\|^2.',
    experimentId: '2',
    experimentTitle: 'Exp 02: Linear Regression',
  },
  {
    term: 'Logistic (Sigmoid) Function',
    category: 'Classification',
    simpleDefinition: 'An S-shaped mathematical curve that squashes any real number into a probability between 0 and 1.',
    technicalDefinition: 'Function \\sigma(z) = 1 / (1 + e^{-z}), whose inverse is the logit function, representing Bernoulli log-odds.',
    experimentId: '4',
    experimentTitle: 'Exp 04: Logistic Regression',
  },
  {
    term: 'Margin & Maximum-Margin Principle',
    category: 'Classification',
    simpleDefinition: 'The distance between the decision boundary and the closest data points of any class; SVM maximizes this gap.',
    technicalDefinition: 'Geometric margin 2 / \\|w\\| between canonical planes w^T x + b = \\pm 1; maximizing it minimizes structural risk.',
    experimentId: '6',
    experimentTitle: 'Exp 06: SVM',
  },
  {
    term: 'Mean Squared Error (MSE) & RMSE',
    category: 'Regression',
    simpleDefinition: 'The average squared distance between true values and predictions; RMSE is its square root in original units.',
    technicalDefinition: 'Risk function computing the expectation of quadratic loss L(y, \\hat{y}) = (y - \\hat{y})^2; penalizes large errors non-linearly.',
    experimentId: '2',
    experimentTitle: 'Exp 02: Linear Regression',
  },
  {
    term: 'One-Hot Encoding',
    category: 'Foundations',
    simpleDefinition: 'Turning categories (like red, green, blue) into individual binary 1/0 columns without creating artificial ordering.',
    technicalDefinition: 'Mapping nominal categorical variables with K levels into a K-dimensional vector space with exactly one active bit.',
    experimentId: '1',
    experimentTitle: 'Exp 01: Data Pre-processing',
  },
  {
    term: 'Perceptron',
    category: 'Neural Networks',
    simpleDefinition: 'The earliest computational model of a single biological neuron that learns a linear decision boundary through iterative updates.',
    technicalDefinition: 'Binary linear classifier outputting f(w^T x + b) via a Heaviside step function, guaranteed to converge on linearly separable data.',
    experimentId: '10',
    experimentTitle: 'Exp 10: Perceptron',
  },
  {
    term: 'Random Forest',
    category: 'Classification',
    simpleDefinition: 'An ensemble of many decision trees trained with random features and data subsets that vote on the final prediction.',
    technicalDefinition: 'Modified bagging ensemble combining B decorrelated CART trees, each choosing split candidates from a random feature subset of size \\sqrt{p}.',
    experimentId: '9',
    experimentTitle: 'Exp 09: Random Forest',
  },
  {
    term: 'Support Vector',
    category: 'Classification',
    simpleDefinition: 'The critical borderline data points that sit directly on the edge of the margin and define the decision boundary.',
    technicalDefinition: 'Training instances x_i with non-zero Lagrange multipliers \\alpha_i > 0 in the dual quadratic optimization program.',
    experimentId: '6',
    experimentTitle: 'Exp 06: SVM',
  },
];

const categories = ['All', 'Foundations', 'Regression', 'Classification', 'Dimensionality Reduction', 'Clustering', 'Neural Networks', 'Evaluation'] as const;

export default function Glossary() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const q = search.toLowerCase().trim();
      const matchesSearch = !q ||
        item.term.toLowerCase().includes(q) ||
        item.simpleDefinition.toLowerCase().includes(q) ||
        item.technicalDefinition.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="page-layout">
      <main className="page-main">
        <div className="glossary-container">
          {/* Header */}
          <div className="glossary-header animate-fade-in">
            <div className="section-label">Academic Reference</div>
            <h1 className="glossary-title">Machine Learning Glossary</h1>
            <p className="glossary-subtitle">
              Verified mathematical and conceptual definitions for core algorithms, loss functions, metrics, and evaluation techniques used in the SRM ML Virtual Laboratory.
            </p>

            {/* Search & Filter Controls */}
            <div className="glossary-controls">
              <div className="glossary-search-wrapper">
                <span className="glossary-search-icon">🔍</span>
                <input
                  type="text"
                  className="glossary-search-input"
                  placeholder="Search machine learning terms, formulas, or concepts…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search glossary terms"
                />
                {search && (
                  <button
                    className="glossary-search-clear"
                    onClick={() => setSearch('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="glossary-category-pills" role="tablist">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`glossary-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                    role="tab"
                    aria-selected={selectedCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="glossary-count-row">
            <span>Showing {filteredTerms.length} of {glossaryTerms.length} verified terms</span>
            {selectedCategory !== 'All' && <span>Filtered by: <strong>{selectedCategory}</strong></span>}
          </div>

          {/* Terms Grid */}
          {filteredTerms.length === 0 ? (
            <div className="glossary-empty">
              <p className="empty-title">No matching terms found</p>
              <p className="empty-desc">Try refining your search query or switching categories.</p>
              <button
                className="btn btn-secondary"
                onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                style={{ marginTop: 'var(--space-3)' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="glossary-grid">
              {filteredTerms.map(item => (
                <div key={item.term} className="glossary-card animate-fade-in-up">
                  <div className="glossary-card-top">
                    <h2 className="glossary-term-name">{item.term}</h2>
                    <span className="badge badge-navy">{item.category}</span>
                  </div>

                  <div className="glossary-def-block">
                    <div className="glossary-def-label">Conceptual Meaning</div>
                    <p className="glossary-def-text">{item.simpleDefinition}</p>
                  </div>

                  <div className="glossary-def-block">
                    <div className="glossary-def-label">Technical & Mathematical Definition</div>
                    <p className="glossary-def-text technical">{item.technicalDefinition}</p>
                  </div>

                  <div className="glossary-card-footer">
                    <span className="glossary-exp-ref">Curriculum Origin:</span>
                    <Link to={`/experiment/${item.experimentId}`} className="glossary-exp-link">
                      {item.experimentTitle} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
