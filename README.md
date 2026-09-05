\# ML Virtual Lab



An interactive Machine Learning Virtual Lab designed to help students learn core machine learning concepts through structured theory, practical procedures, quizzes, and interactive visualizations.



\## Overview



ML Virtual Lab provides an interactive learning environment for understanding fundamental Machine Learning algorithms and concepts.



The platform combines:



\- Concept-focused theory

\- Short Python examples

\- Step-by-step practical procedures

\- Pre-test and post-test assessments

\- Interactive algorithm visualizations

\- Progress tracking

\- Bookmarks and personal notes

\- Responsive web design



The application is designed as an academic learning resource for students studying Machine Learning.



\## Experiments



The Virtual Lab contains 10 experiments:



| No. | Experiment |

|---|---|

| 01 | Data Pre-processing for Machine Learning |

| 02 | Linear Regression |

| 03 | Cross-Validation for Model Evaluation |

| 04 | Logistic Regression for Binary Classification |

| 05 | Principal Component Analysis (PCA) |

| 06 | Support Vector Machine Classification |

| 07 | K-Means Clustering |

| 08 | Decision Tree Classification |

| 09 | Random Forest Classification |

| 10 | Artificial Neural Network using Perceptron Learning |



\## Interactive Visualizations



The Virtual Lab includes interactive visual learning components for major Machine Learning concepts.



\### Linear Regression

Explore regression lines, predictions, residual errors, and error metrics interactively.



\### Logistic Regression

Understand binary classification and decision boundaries through interactive data.



\### PCA

Visualize principal components, data projection, and dimensionality reduction.



\### Support Vector Machine

Explore decision boundaries, margins, and support vectors.



\### K-Means Clustering

Observe cluster assignments and centroid movement through iterative clustering.



\### Decision Tree

Understand feature-based splitting and tree-based classification.



\### Random Forest Classification

Visualize multiple decision trees, individual predictions, majority voting, and the final classification.



\### Perceptron

Observe the learning process and decision-boundary updates step by step.



\## Key Features



\- 10 structured Machine Learning experiments

\- Student-friendly theoretical explanations

\- Python examples with syntax highlighting

\- Mathematical formulas with KaTeX

\- Pre-test and post-test quizzes

\- Interactive procedure stepper

\- Progress tracking

\- Bookmarks

\- Personal notes

\- Interactive Machine Learning visualizations

\- Responsive desktop and mobile layouts

\- Dark/light theme support

\- Client-side persistence using browser local storage



\## Technology Stack



\- \*\*React\*\* — Interactive user interface

\- \*\*TypeScript\*\* — Type-safe application development

\- \*\*Vite\*\* — Development server and production build tool

\- \*\*D3.js\*\* — Interactive Machine Learning visualizations

\- \*\*KaTeX\*\* — Mathematical formula rendering

\- \*\*Prism.js\*\* — Python syntax highlighting

\- \*\*React Router\*\* — Application navigation

\- \*\*CSS\*\* — Responsive layout and visual design

\- \*\*LocalStorage\*\* — Client-side persistence



\## Project Structure



```text

ml-virtual-lab/

│

├── src/

│   ├── assets/

│   │   └── srm-logo.png

│   │

│   ├── components/

│   │   ├── visualizations/

│   │   ├── Header.tsx

│   │   ├── Quiz.tsx

│   │   ├── PythonBlock.tsx

│   │   └── FormulaCard.tsx

│   │

│   ├── context/

│   │   ├── ProgressContext.tsx

│   │   └── ThemeContext.tsx

│   │

│   ├── data/

│   │   ├── exp-01.ts

│   │   ├── exp-02.ts

│   │   ├── ...

│   │   └── exp-10.ts

│   │

│   ├── pages/

│   │   ├── Home.tsx

│   │   ├── ExperimentsIndex.tsx

│   │   └── ExperimentPage.tsx

│   │

│   └── styles/

│

├── index.html

├── package.json

├── package-lock.json

├── tsconfig.json

├── vite.config.ts

├── vlab\_manual.txt

└── README.md

