// Comparison table data strictly following specifications with highlighted Best Model
export const MODEL_COMPARISON_TABLE = [
  {
    id: 'linear-svm',
    model: 'Linear SVM',
    vectorizer: 'TF-IDF',
    accuracy: 'Best (89.72%)',
    status: 'Best',
    badge: '⭐ Best Model',
    isBest: true,
    description: 'Optimal linear separating hyperplane with sublinear TF-IDF features and calibrated probabilities.'
  },
  {
    id: 'random-forest',
    model: 'Random Forest',
    vectorizer: 'TF-IDF',
    accuracy: '88.53%',
    status: 'Compared',
    badge: 'Compared',
    isBest: false,
    description: 'Ensemble of 150 decision trees capturing non-linear n-gram interactions.'
  },
  {
    id: 'logistic-regression',
    model: 'Logistic Regression',
    vectorizer: 'TF-IDF',
    accuracy: '87.19%',
    status: 'Compared',
    badge: 'Compared',
    isBest: false,
    description: 'L2-regularized multinomial logistic regression with max_iter=1000.'
  },
  {
    id: 'sgd-classifier',
    model: 'SGD Classifier',
    vectorizer: 'TF-IDF',
    accuracy: '84.75%',
    status: 'Compared',
    badge: 'Compared',
    isBest: false,
    description: 'Stochastic Gradient Descent optimizer with log-loss convex objective.'
  },
  {
    id: 'nb-bow',
    model: 'Multinomial Naive Bayes',
    vectorizer: 'Bag of Words',
    accuracy: '76.78%',
    status: 'Good',
    badge: 'Good',
    isBest: false,
    description: 'Frequency-based word count Naive Bayes benchmark.'
  },
  {
    id: 'nb-tfidf',
    model: 'Multinomial Naive Bayes',
    vectorizer: 'TF-IDF',
    accuracy: '66.09%',
    status: 'Baseline',
    badge: 'Baseline',
    isBest: false,
    description: 'Standard TF-IDF weighted Naive Bayes baseline.'
  }
];

// Bar Chart performance dataset for Recharts
// Note: Includes exact real evaluation numbers from train.txt with highlighted best model
export const ACCURACY_CHART_DATA = [
  { name: 'Linear SVM (TF-IDF)', accuracy: 89.72, isBest: true, vectorizer: 'TF-IDF', fill: '#6366f1' },
  { name: 'Random Forest', accuracy: 88.53, isBest: false, vectorizer: 'TF-IDF', fill: '#8b5cf6' },
  { name: 'Logistic Regression', accuracy: 87.19, isBest: false, vectorizer: 'TF-IDF', fill: '#a855f7' },
  { name: 'SGD Classifier', accuracy: 84.75, isBest: false, vectorizer: 'TF-IDF', fill: '#06b6d4' },
  { name: 'NB (Bag of Words)', accuracy: 76.78, isBest: false, vectorizer: 'BoW', fill: '#3b82f6' },
  { name: 'NB (TF-IDF Baseline)', accuracy: 66.09, isBest: false, vectorizer: 'TF-IDF', fill: '#64748b' }
];

export const PREPROCESSING_PIPELINE = [
  { step: 1, title: 'Raw Text', description: 'Original user input string received from frontend or API.', icon: 'LuFileText' },
  { step: 2, title: 'Lowercase', description: 'Converts all characters to lowercase for uniform casing.', icon: 'LuCaseLower' },
  { step: 3, title: 'Remove Punctuation', description: 'Strips commas, periods, quotes, and symbols using translate table.', icon: 'LuScissors' },
  { step: 4, title: 'Remove Numbers', description: 'Filters out numerical digits (0-9) via regular expressions.', icon: 'LuHash' },
  { step: 5, title: 'Remove Emojis', description: 'Strips non-ASCII unicode emoji symbols and special characters.', icon: 'LuSmile' },
  { step: 6, title: 'Remove Stopwords', description: 'Filters out 198 common NLTK English stopwords ("the", "is", "at").', icon: 'LuFilter' },
  { step: 7, title: 'TF-IDF Vectorization', description: 'Transforms tokens into sublinear unigram & bigram TF-IDF numerical vectors.', icon: 'LuCpu' }
];

export const DATASET_STATS = {
  name: 'Emotion Dataset',
  file: 'train.txt',
  totalSamples: 16000,
  trainSplit: 12800,
  testSplit: 3200,
  splitRatio: '80/20 Train-Test Split',
  classesCount: 6,
  classBreakdown: [
    { emotion: 'Joy', count: 5362, percentage: 33.5, color: '#eab308' },
    { emotion: 'Sadness', count: 4666, percentage: 29.2, color: '#3b82f6' },
    { emotion: 'Anger', count: 2159, percentage: 13.5, color: '#ef4444' },
    { emotion: 'Fear', count: 1937, percentage: 12.1, color: '#a855f7' },
    { emotion: 'Love', count: 1304, percentage: 8.2, color: '#ec4899' },
    { emotion: 'Surprise', count: 572, percentage: 3.6, color: '#22c55e' }
  ]
};
