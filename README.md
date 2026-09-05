# SRM Machine Learning Virtual Laboratory

An interactive, university-grade Machine Learning Virtual Laboratory developed for the Department of Computing Technologies, SRM Institute of Science and Technology.

The platform guides students through a comprehensive 8-step learning journey:
**LEARN → UNDERSTAND → VISUALIZE → PRACTICE → TEST → ANALYZE → TRACK PROGRESS → CONTINUE**

---

## 🏛 Platform Overview

The SRM Machine Learning Virtual Lab provides an engaging, rigorous educational environment for mastering classical and modern machine learning algorithms.

Key capabilities:
- **10 Complete Curriculum Experiments** transcribed directly from the official laboratory manual.
- **Each experiment includes all 6 mandatory sections**:
  1. `AIM` — Formal academic objective & learning outcomes
  2. `THEORY` — Mathematical formulations with KaTeX LaTeX, illustrative Python code, advantages, limitations, and real-world applications
  3. `PRETEST` — 20 rigorous conceptual multiple-choice questions with 4 options and detailed post-submission answer review
  4. `PROCEDURE` — Step-by-step workflow with interactive check-offs and structured Input → Process → Output (IPO) breakdown
  5. `RESULTS AND ANALYSIS` — Verified observations and academic insights
  6. `POSTTEST` — 20 application-oriented multiple-choice questions with score tracking
- **8 Custom Interactive Visualizations** built with D3.js and HTML5 Canvas:
  - *Linear Regression*: Dynamic slope and intercept sliders, live residual lines, real-time MSE/RMSE calculation
  - *Logistic Regression*: 2D rotating decision boundary with canvas sigmoid probability heatmap
  - *PCA*: PC1 & PC2 eigenvector vectors, orthogonal projections, and explained variance ratio bars
  - *SVM*: Separating hyperplane, positive/negative margin boundaries, and support vector highlights
  - *K-Means*: Interactive 2D clustering sandbox with step-by-step assignment and centroid update phases
  - *Decision Tree*: Interactive tree diagram with Gini impurity node inspection and sample routing
  - *Random Forest*: Ensemble simulation demonstrating majority voting across multiple trees
  - *Perceptron*: Step-by-step weight update simulation highlighting misclassification errors
- **Interactive Simulation Studio (Visual Lab)**: A dedicated laboratory simulation studio bridging visual models with curriculum experiments.
- **Learning Path**: A 6-stage structured curriculum progression with prerequisites and completion badges.
- **Machine Learning Glossary**: Searchable, categorical directory of 24+ verified technical definitions with curriculum references.
- **Student Authentication & Cloud Persistence**:
  - Powered by Supabase Auth and PostgreSQL with Row Level Security (RLS)
  - Isolated student profiles, experiment progress, quiz evaluation history, bookmarks, and personal notes
  - Resilient local storage fallback for offline and guest study sessions

---

## 📚 The 10 Laboratory Experiments

| No. | Experiment Title | Category | Difficulty | Estimated Time | Interactive Visualization |
|:---:|:---|:---|:---:|:---:|:---:|
| 01 | Data Pre-processing for Machine Learning | Foundations | Beginner | 45 min | Pipeline Architecture |
| 02 | Linear Regression | Regression | Beginner | 50 min | OLS Least-Squares Fitter |
| 03 | Cross-Validation for Model Evaluation | Model Evaluation | Intermediate | 40 min | K-Fold Partitioning |
| 04 | Logistic Regression for Binary Classification | Classification | Intermediate | 55 min | Sigmoid Boundary & Heatmap |
| 05 | Principal Component Analysis (PCA) | Dimensionality Reduction | Intermediate | 50 min | Eigendecomposition Projection |
| 06 | Support Vector Machine Classification | Classification | Intermediate | 55 min | Maximum-Margin Hyperplane |
| 07 | K-Means Clustering | Clustering | Intermediate | 50 min | Iterative Centroid Convergence |
| 08 | Decision Tree Classification | Tree Models | Intermediate | 50 min | Recursive Partitioning Tree |
| 09 | Random Forest Classification | Ensemble Learning | Advanced | 55 min | Majority Voting Ensemble |
| 10 | Artificial Neural Network using Perceptron Learning | Neural Networks | Advanced | 60 min | Perceptron Step Learning |

---

## 🛠 Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Routing**: React Router v6 (SPA routing with ErrorBoundary and route-level fallback)
- **Math & Syntax**: KaTeX (LaTeX rendering), Prism.js (code highlighting)
- **Visualizations**: D3.js v7, HTML5 Canvas
- **Authentication & Database**: Supabase Auth, PostgreSQL, Row Level Security (RLS)
- **Design System**: Vanilla CSS tokens, SRM Institutional Navy & Cool Blue palette, WCAG 2.1 AA accessible contrast

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/Durwissh/ml-virtual-lab.git
cd ml-virtual-lab
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Supabase project URL and public anon key:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```
*(Note: If Supabase credentials are not provided, the application runs seamlessly using local storage persistence).*

### 4. Set up Supabase Database (if using Supabase)
Execute `supabase_schema.sql` in your Supabase SQL Editor to create the required tables and RLS security policies.

### 5. Run local development server
```bash
npm run dev
```

### 6. Build for production
```bash
npm run build
```

---

## 🌐 Deployment

The project is configured for Vercel deployment with SPA rewrites configured in `vercel.json`.
Output directory: `dist`.
Build command: `vite build`.

---

## 📄 License & Attribution

Developed for academic instruction at SRM Institute of Science and Technology, Department of Computing Technologies.
Curriculum content transcribed from the SRM Machine Learning Virtual Laboratory Manual.
