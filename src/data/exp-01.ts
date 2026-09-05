// src/data/exp-01.ts
// Experiment 1: Data Pre-processing for Machine Learning
// Complete structured content from the V-Lab manual

export const exp01 = {
  id: '1',
  title: 'Data Pre-processing for Machine Learning',

  aim: 'To understand and implement essential data pre-processing techniques—handling missing values, encoding categorical variables, feature scaling, and train-test splitting—that prepare raw data for subsequent machine learning models.',

  learningObjectives: [
    'Identify common data quality issues in real-world datasets',
    'Apply imputation strategies for missing values',
    'Encode categorical variables using label and one-hot encoding',
    'Scale features using Min-Max normalisation and standardisation',
    'Split data into training and test sets correctly',
    'Prevent data leakage using scikit-learn Pipelines',
  ],

  theory: [
    {
      id: 'intro',
      title: '2.1 Introduction to Data Pre-processing',
      type: 'text' as const,
      content: `Machine learning algorithms learn patterns from data. However, real-world data is rarely clean or ready for direct use. It may contain missing entries, inconsistent formats, categorical text, or features measured on vastly different scales. Data pre-processing is the collection of techniques used to transform raw data into a suitable format for machine learning algorithms.

Pre-processing is not itself a predictive machine learning algorithm. It does not generate predictions or classifications. Instead, it prepares the input data so that the models trained on it can perform effectively.`,
    },
    {
      id: 'data-quality',
      title: '2.2 Data Quality and Common Issues',
      type: 'list' as const,
      intro: 'Real-world datasets commonly suffer from the following issues:',
      items: [
        { term: 'Missing values', description: 'entries that are absent due to collection errors, sensor failures, or incomplete surveys.' },
        { term: 'Inconsistent data types', description: 'numerical features stored as text, or dates in different formats.' },
        { term: 'Categorical variables', description: "text labels (e.g., 'Red', 'Green') that algorithms cannot process directly." },
        { term: 'Differing feature scales', description: 'one feature ranges from 0 to 1 while another ranges from 0 to 100,000.' },
        { term: 'Outliers', description: 'extreme values that may distort model training.' },
      ],
    },
    {
      id: 'missing-values',
      title: '2.3 Handling Missing Values',
      type: 'text' as const,
      content: 'Common strategies for dealing with missing values include:',
      subsections: [
        { term: 'Removal', description: 'dropping rows or columns with missing values. Simple but can cause significant data loss.' },
        { term: 'Imputation', description: 'replacing missing values with a computed substitute such as the column mean, median, or mode.' },
        { term: 'Advanced imputation', description: 'using models (e.g., k-nearest neighbours) to predict missing values from other features.' },
      ],
      codeExample: {
        title: 'Handling Missing Values',
        code: `import pandas as pd
from sklearn.impute import SimpleImputer

# Sample data with missing values
data = {'Age': [25, 30, None, 22, 28],
        'Salary': [50000, None, 70000, 45000, 60000]}
df = pd.DataFrame(data)

# Impute missing values with the column mean
imputer = SimpleImputer(strategy='mean')
df_imputed = pd.DataFrame(
    imputer.fit_transform(df), columns=df.columns
)
print(df_imputed)`,
        explanation: [
          'SimpleImputer replaces each missing value with the mean of that column.',
          "Other strategies include 'median', 'most_frequent', and 'constant'.",
          'The imputer is first fitted (it learns the means) and then transforms the data.',
        ],
      },
    },
    {
      id: 'encoding',
      title: '2.4 Numerical and Categorical Variables',
      type: 'text' as const,
      content: 'Machine learning algorithms generally require numerical input. Categorical variables—features that take discrete text labels—must be converted into numbers.',
      table: {
        headers: ['Method', 'Description', 'Example'],
        rows: [
          ['Label Encoding', 'Assigns a unique integer to each category.', 'Red→0, Green→1, Blue→2'],
          ['One-Hot Encoding', 'Creates a binary column for each category.', 'Red→[1,0,0], Green→[0,1,0]'],
        ],
      },
      note: 'Label encoding introduces an implicit ordinal relationship (0 < 1 < 2), which may mislead algorithms. One-hot encoding avoids this but increases the number of features.',
      codeExample: {
        title: 'Encoding Categorical Variables',
        code: `import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Label Encoding
le = LabelEncoder()
colours = ['Red', 'Green', 'Blue', 'Green', 'Red']
encoded = le.fit_transform(colours)
print("Label Encoded:", encoded)

# One-Hot Encoding using pandas
df = pd.DataFrame({'Colour': colours})
df_onehot = pd.get_dummies(df, columns=['Colour'], dtype=int)
print(df_onehot)`,
        explanation: [
          'LabelEncoder converts each unique string to an integer.',
          'pd.get_dummies creates separate binary columns for each category.',
          'One-hot encoding is generally preferred for nominal (unordered) categories.',
        ],
      },
    },
    {
      id: 'scaling',
      title: '2.5 Feature Scaling',
      type: 'text' as const,
      content: 'When features are measured on different scales, algorithms that rely on distance calculations (e.g., k-nearest neighbours, support vector machines, neural networks) or gradient-based optimisation can be negatively affected. Feature scaling brings all numerical features to a comparable range.',
      formulas: [
        {
          name: 'Min-Max Normalisation',
          latex: "X' = \\frac{X - X_{\\min}}{X_{\\max} - X_{\\min}}",
          description: 'Rescales each feature to a fixed range, typically [0, 1]. X is the original value, X_min and X_max are the minimum and maximum values of that feature.',
        },
        {
          name: 'Standardisation (Z-score)',
          latex: 'Z = \\frac{X - \\mu}{\\sigma}',
          description: 'Centres each feature around zero with unit standard deviation. μ is the feature mean and σ is the feature standard deviation.',
        },
      ],
      note: 'Normalisation and standardisation are different transformations. Normalisation rescales values to a bounded range; standardisation centres and scales by variance.',
      codeExample: {
        title: 'Feature Scaling',
        code: `from sklearn.preprocessing import MinMaxScaler, StandardScaler
import numpy as np

X = np.array([[100, 0.5], [200, 1.5],
              [300, 2.5], [400, 3.5]])

# Min-Max Normalisation
mm_scaler = MinMaxScaler()
X_minmax = mm_scaler.fit_transform(X)
print("Min-Max Scaled:\\n", X_minmax)

# Standardisation
std_scaler = StandardScaler()
X_standard = std_scaler.fit_transform(X)
print("Standardised:\\n", X_standard)`,
        explanation: [
          'MinMaxScaler maps each feature to the [0, 1] range.',
          'StandardScaler transforms features to have zero mean and unit variance.',
          'Both scalers first fit (learn parameters) then transform the data.',
        ],
      },
    },
    {
      id: 'outliers',
      title: '2.6 Outliers',
      type: 'text' as const,
      content: 'Outliers are data points that differ significantly from the majority. They can arise from measurement errors, data entry mistakes, or genuinely rare events. Outliers may skew model training, particularly for algorithms sensitive to variance. Common detection methods include z-score analysis and the interquartile range (IQR) method.',
    },
    {
      id: 'train-test',
      title: '2.7 Train-Test Splitting',
      type: 'text' as const,
      content: 'To evaluate how well a model generalises to unseen data, the dataset is divided into a training set (used to fit the model) and a test set (used to evaluate performance). A common split ratio is 80:20 or 70:30.',
      codeExample: {
        title: 'Train-Test Split',
        code: `from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Training samples: {X_train.shape[0]}")
print(f"Test samples:     {X_test.shape[0]}")`,
        explanation: [
          'test_size=0.2 reserves 20% of the data for testing.',
          'random_state ensures reproducibility across runs.',
          'The split must happen before any preprocessing that learns from data.',
        ],
      },
    },
    {
      id: 'leakage',
      title: '2.8 Data Leakage',
      type: 'text' as const,
      content: 'Data leakage occurs when information from the test set inadvertently influences the training process. A common mistake is fitting a scaler or imputer on the entire dataset before splitting. This allows test-set statistics (mean, standard deviation, min, max) to influence the transformation applied to training data.',
      subsections: [
        { term: 'Step 1', description: 'Split the data into training and test sets.' },
        { term: 'Step 2', description: 'Fit preprocessing transformations on the training data only.' },
        { term: 'Step 3', description: 'Transform the training data using the fitted transformer.' },
        { term: 'Step 4', description: 'Transform the test data using the same fitted transformer (without re-fitting).' },
      ],
      codeExample: {
        title: 'Leakage-Safe Preprocessing with Pipeline',
        code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Pipeline ensures scaler is fit only on training data
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression(max_iter=200))
])

pipe.fit(X_train, y_train)
score = pipe.score(X_test, y_test)
print(f"Test accuracy: {score:.4f}")`,
        explanation: [
          'Pipeline chains preprocessing and modelling into a single object.',
          'When pipe.fit() is called, the scaler is fitted only on X_train.',
          'When pipe.score() is called on X_test, the scaler transforms X_test using training statistics.',
          'This prevents data leakage automatically.',
        ],
      },
    },
    {
      id: 'advantages',
      title: '2.9 Advantages of Proper Pre-processing',
      type: 'list' as const,
      items: [
        { description: 'Improves model accuracy and convergence speed.' },
        { description: 'Prevents biased learning from features on larger scales.' },
        { description: 'Handles missing data gracefully instead of crashing the training process.' },
        { description: 'Makes the dataset compatible with a wide range of algorithms.' },
      ],
    },
    {
      id: 'limitations',
      title: '2.10 Limitations and Considerations',
      type: 'list' as const,
      items: [
        { description: 'Imputation introduces synthetic values; it does not recover true data.' },
        { description: 'Encoding choices can introduce unintended ordinal relationships.' },
        { description: 'Scaling does not fix fundamentally flawed or irrelevant features.' },
        { description: 'Over-aggressive outlier removal may discard genuine data points.' },
      ],
    },
    {
      id: 'applications',
      title: '2.11 Applications',
      type: 'list' as const,
      items: [
        { description: 'Every supervised and unsupervised learning workflow requires some form of preprocessing.' },
        { description: 'Medical datasets with missing patient records.' },
        { description: 'Financial data with mixed numerical and categorical attributes.' },
        { description: 'Natural language processing pipelines where text must be encoded numerically.' },
      ],
    },
  ],

  pretest: {
    title: 'Pre-Test',
    description: 'Answer all 20 questions. Each question has exactly one correct answer.',
    questions: [
      { q: 'What is the primary purpose of data pre-processing in machine learning?', options: ['To generate predictions from raw data', 'To transform raw data into a suitable format for ML algorithms', 'To select the best ML algorithm automatically', 'To visualise data distributions'], answer: 1 },
      { q: 'Which of the following is NOT a common data quality issue?', options: ['Missing values', 'Categorical variables', 'Properly normalised features', 'Outliers'], answer: 2 },
      { q: 'What does imputation mean in the context of missing data?', options: ['Deleting rows with missing values', 'Replacing missing values with computed substitutes', 'Converting missing values to zero', 'Ignoring missing values during training'], answer: 1 },
      { q: 'Which imputation strategy replaces missing values with the most frequently occurring value?', options: ['mean', 'median', 'most_frequent', 'constant'], answer: 2 },
      { q: 'Label encoding assigns each category a unique ___.', options: ['binary vector', 'float value', 'integer', 'random string'], answer: 2 },
      { q: 'Why might label encoding be problematic for nominal categories?', options: ['It creates too many columns', 'It introduces an artificial ordinal relationship', 'It cannot handle more than two categories', 'It requires normalisation afterward'], answer: 1 },
      { q: 'One-hot encoding converts a categorical column with k categories into ___.', options: ['1 column', 'k columns', 'k-1 columns (always)', '2 columns'], answer: 1 },
      { q: 'What range does Min-Max normalisation typically scale features to?', options: ['-1 to 1', '0 to 1', '0 to 100', '-∞ to +∞'], answer: 1 },
      { q: 'In the standardisation formula Z = (X − μ) / σ, what does σ represent?', options: ['Feature mean', 'Feature standard deviation', 'Feature variance', 'Feature range'], answer: 1 },
      { q: 'After standardisation, the transformed feature has approximately which mean and standard deviation?', options: ['Mean = 0, SD = 0', 'Mean = 1, SD = 0', 'Mean = 0, SD = 1', 'Mean = 0.5, SD = 0.5'], answer: 2 },
      { q: 'Which statement about normalisation and standardisation is correct?', options: ['They are the same transformation', 'Normalisation rescales to a bounded range; standardisation centres by mean and scales by variance', 'Standardisation always maps values to [0, 1]', 'Normalisation requires computing the mean'], answer: 1 },
      { q: 'What is a common train-test split ratio?', options: ['50:50', '80:20', '99:1', '60:40:20'], answer: 1 },
      { q: 'Why is the data split into training and test sets?', options: ['To make training faster', 'To evaluate how well the model generalises to unseen data', 'To remove outliers', 'To perform feature encoding'], answer: 1 },
      { q: 'What is data leakage?', options: ['Losing data due to hardware failure', 'Test-set information improperly influencing the training process', 'A data compression technique', 'The process of splitting data into folds'], answer: 1 },
      { q: 'In a leakage-safe workflow, when should a scaler be fitted?', options: ['On the entire dataset before splitting', 'On the test set only', 'On the training set only, after splitting', 'On neither set'], answer: 2 },
      { q: 'Which Python class chains preprocessing and modelling to prevent leakage?', options: ['SimpleImputer', 'Pipeline', 'ColumnTransformer', 'GridSearchCV'], answer: 1 },
      { q: 'Which of the following is an outlier detection method?', options: ['One-hot encoding', 'Label encoding', 'IQR method', 'Train-test split'], answer: 2 },
      { q: 'Is data pre-processing itself a predictive machine learning algorithm?', options: ['Yes, it predicts target values', 'Yes, it classifies data points', 'No, it prepares data for subsequent models', 'No, but it computes accuracy scores'], answer: 2 },
      { q: 'What does the parameter random_state do in train_test_split?', options: ['Sets the test set size', 'Ensures reproducibility of the split', 'Removes random noise from data', 'Selects features randomly'], answer: 1 },
      { q: 'Which scaler would you use if you want features centred around zero with unit variance?', options: ['MinMaxScaler', 'StandardScaler', 'MaxAbsScaler', 'RobustScaler'], answer: 1 },
    ],
  },

  procedure: {
    steps: [
      { title: 'Load Dataset', action: 'Load the provided dataset and inspect its structure', input: 'CSV file or built-in dataset', process: 'Read file, display shape, data types, first rows', output: 'DataFrame overview with row count, column count, and types' },
      { title: 'Handle Missing Values', action: 'Identify columns with missing values and apply imputation', input: 'DataFrame with NaN entries', process: 'Apply SimpleImputer with mean/median/mode strategy', output: 'DataFrame with no missing values' },
      { title: 'Encode Categoricals', action: 'Apply label encoding or one-hot encoding as appropriate', input: 'Categorical text columns', process: 'LabelEncoder or pd.get_dummies', output: 'Fully numerical DataFrame' },
      { title: 'Scale Features', action: 'Apply Min-Max normalisation or standardisation to numerical columns', input: 'Numerical columns on different scales', process: 'MinMaxScaler or StandardScaler', output: 'Scaled features in comparable ranges' },
      { title: 'Train-Test Split', action: 'Split the processed data into training and test sets', input: 'Clean numerical DataFrame', process: 'train_test_split with 80:20 ratio', output: 'X_train, X_test, y_train, y_test arrays' },
      { title: 'Verify Shapes', action: 'Verify the shapes of the resulting training and test arrays', input: 'Split arrays', process: 'Print .shape of each array', output: 'Confirmed sample counts' },
      { title: 'Build Pipeline', action: 'Construct a Pipeline to chain preprocessing and a simple model', input: 'Raw training data', process: 'Pipeline([scaler, model]).fit()', output: 'Leakage-free trained model' },
    ],
    inputProcessOutput: {
      input: 'Raw dataset (CSV or built-in) with missing values, categorical features, and varying scales.',
      process: 'Imputation → Encoding → Scaling → Train-Test Split.',
      output: 'Clean, numerically encoded, scaled training and test sets ready for model training.',
    },
  },

  results: {
    observations: [
      'Missing values are replaced with imputed values; no NaN entries remain in the processed data.',
      'Categorical columns are replaced by integer codes (label encoding) or binary indicator columns (one-hot encoding).',
      'Scaled features fall within [0, 1] for Min-Max or have approximately zero mean and unit variance for standardisation.',
      'Training and test sets have the expected number of samples based on the chosen split ratio.',
      'When a Pipeline is used, the scaler statistics are derived only from the training set.',
    ],
    keyInsight: 'Pre-processing does not produce prediction accuracy or classification metrics. Accuracy, precision, recall, R², etc., are computed after a model is trained on the preprocessed data. The success of preprocessing is measured by the cleanliness, consistency, and leakage-free preparation of the dataset.',
  },

  posttest: {
    title: 'Post-Test',
    description: 'Answer all 20 questions. Each question has exactly one correct answer.',
    questions: [
      { q: "A dataset has 1000 rows and a column 'Income' with 50 missing values. After applying SimpleImputer(strategy='mean'), how many rows remain?", options: ['950', '1000', '1050', 'Depends on the mean value'], answer: 1 },
      { q: "You encode the column ['Small', 'Medium', 'Large'] using LabelEncoder. The algorithm may incorrectly assume that:", options: ['All categories have equal frequency', 'Large > Medium > Small numerically, implying an ordinal relationship', 'The feature is continuous', 'Missing values exist'], answer: 1 },
      { q: 'After applying MinMaxScaler, feature values range from 0.0 to 1.0. A new test sample has a feature value larger than any in the training set. Its scaled value will be:', options: ['Exactly 1.0', 'Greater than 1.0', 'Exactly 0.0', 'Negative'], answer: 1 },
      { q: 'A colleague fits StandardScaler on the full dataset before splitting. What risk does this introduce?', options: ['The model will run slower', 'Data leakage – test statistics influence the training transformation', 'The features will be unnormalised', 'The scaler will raise an error'], answer: 1 },
      { q: 'In sklearn, which method learns the scaling parameters without transforming the data?', options: ['transform()', 'fit()', 'fit_transform()', 'predict()'], answer: 1 },
      { q: "Given: pipe = Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression())]), what happens when pipe.fit(X_train, y_train) is called?", options: ['Only the scaler is fitted', 'Only the classifier is fitted', 'The scaler is fitted on X_train, then the classifier is fitted on scaled X_train', 'The scaler and classifier are fitted on X_test'], answer: 2 },
      { q: 'You apply one-hot encoding to a column with 5 unique categories. How many new binary columns are created?', options: ['1', '4', '5', '10'], answer: 2 },
      { q: 'Which preprocessing step is most important before applying k-nearest neighbours?', options: ['One-hot encoding only', 'Feature scaling', 'Removing the target column', 'Sorting the data'], answer: 1 },
      { q: 'What is the standardised value of X = 50 when μ = 50 and σ = 10?', options: ['-1.0', '0.0', '1.0', '5.0'], answer: 1 },
      { q: 'If X_min = 10 and X_max = 60, what is the Min-Max normalised value of X = 35?', options: ['0.25', '0.50', '0.75', '0.35'], answer: 1 },
      { q: 'Why should you NOT evaluate preprocessing quality using prediction accuracy?', options: ['Because preprocessing has no hyper-parameters', 'Because preprocessing is not a predictive algorithm; accuracy belongs to the model', 'Because accuracy can only be used for classification', 'Because preprocessing always achieves 100% accuracy'], answer: 1 },
      { q: 'Which imputation strategy is most suitable for a skewed numerical feature?', options: ['Mean', 'Median', 'Mode', 'Constant (0)'], answer: 1 },
      { q: 'After train_test_split with test_size=0.3, what fraction of the data is in the training set?', options: ['0.3', '0.5', '0.7', '1.0'], answer: 2 },
      { q: 'You notice that after encoding, a feature has values {0, 1, 2}. Which encoding was most likely applied?', options: ['One-hot encoding', 'Label encoding', 'Standardisation', 'Min-Max normalisation'], answer: 1 },
      { q: 'A Pipeline with StandardScaler and SVC is used with cross_val_score. Is the scaler re-fitted for each fold?', options: ['No, it is fitted once on all data', 'Yes, the pipeline ensures the scaler is fitted only on the training fold each time', 'No, the scaler is never fitted during cross-validation', 'Yes, but only on the test fold'], answer: 1 },
      { q: 'What does df.isnull().sum() return for a pandas DataFrame?', options: ['Total number of rows', 'Count of missing values per column', 'Boolean mask of the DataFrame', 'List of column names'], answer: 1 },
      { q: 'Which is the correct order for a leakage-free workflow?', options: ['Scale → Split → Train', 'Split → Fit scaler on train → Transform train and test → Train model', 'Train model → Split → Scale', 'Scale → Train → Split → Test'], answer: 1 },
      { q: 'RobustScaler uses which statistics to scale features?', options: ['Mean and standard deviation', 'Minimum and maximum', 'Median and interquartile range', 'Mode and range'], answer: 2 },
      { q: "You have a binary categorical column ('Yes'/'No'). Which encoding is simplest and appropriate?", options: ['One-hot encoding into 2 columns', 'Label encoding (Yes→1, No→0)', 'Ordinal encoding with 10 bins', 'Target encoding'], answer: 1 },
      { q: 'After pre-processing, you observe that all features have mean ≈ 0 and std ≈ 1. Which transformation was applied?', options: ['Min-Max normalisation', 'Standardisation', 'Log transformation', 'One-hot encoding'], answer: 1 },
    ],
  },
};
