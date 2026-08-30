import os
import sys
import re
import string
import json
import joblib
import pandas as pd
import numpy as np

# Set UTF-8 encoding for Windows console output
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.linear_model import LogisticRegression, SGDClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Ensure NLTK data is downloaded
try:
    stop_words = set(stopwords.words('english'))
except LookupError:
    nltk.download('stopwords')
    nltk.download('punkt')
    nltk.download('punkt_tab')
    stop_words = set(stopwords.words('english'))

EMOTION_MAPPING = {
    'sadness': 0,
    'anger': 1,
    'love': 2,
    'surprise': 3,
    'fear': 4,
    'joy': 5
}
REVERSE_EMOTION_MAPPING = {v: k for k, v in EMOTION_MAPPING.items()}

def clean_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    # 1. Lowercase
    text = text.lower()
    # 2. Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    # 3. Remove numbers
    text = re.sub(r'\d+', '', text)
    # 4. Remove emojis / non-ascii
    text = "".join([ch for ch in text if ch.isascii()])
    # 5. Remove stopwords
    words = text.split()
    cleaned = [w for w in words if w not in stop_words and len(w) > 1]
    return " ".join(cleaned)

def train_and_save():
    print("🚀 Loading dataset train.txt...")
    df = pd.read_csv('train.txt', sep=';', header=None, names=['text', 'emotions'])
    print(f"Total samples: {len(df)}")
    print("Class distribution:")
    print(df['emotions'].value_counts())

    # Map target emotions
    df['target'] = df['emotions'].map(EMOTION_MAPPING)

    # Clean text
    print("🧹 Cleaning text...")
    df['cleaned_text'] = df['text'].apply(clean_text)

    # Train / Test split 80/20
    X_train, X_test, y_train, y_test = train_test_split(
        df['cleaned_text'], df['target'], test_size=0.2, random_state=42, stratify=df['target']
    )
    print(f"Training set: {len(X_train)} | Test set: {len(X_test)}")

    # 1. Evaluate Multinomial NB with Bag of Words (Baseline)
    bow_vectorizer = CountVectorizer()
    X_train_bow = bow_vectorizer.fit_transform(X_train)
    X_test_bow = bow_vectorizer.transform(X_test)
    nb_bow = MultinomialNB()
    nb_bow.fit(X_train_bow, y_train)
    acc_nb_bow = accuracy_score(y_test, nb_bow.predict(X_test_bow))
    print(f"Multinomial NB (BoW): {acc_nb_bow * 100:.2f}%")

    # 2. TF-IDF Vectorizer
    print("⚡ Fitting TF-IDF Vectorizer...")
    tfidf_vectorizer = TfidfVectorizer(
        lowercase=True,
        stop_words='english',
        ngram_range=(1, 2),
        min_df=2,
        max_df=0.95,
        sublinear_tf=True
    )
    X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)
    X_test_tfidf = tfidf_vectorizer.transform(X_test)

    # Multinomial NB (TF-IDF)
    nb_tfidf = MultinomialNB()
    nb_tfidf.fit(X_train_tfidf, y_train)
    acc_nb_tfidf = accuracy_score(y_test, nb_tfidf.predict(X_test_tfidf))
    print(f"Multinomial NB (TF-IDF): {acc_nb_tfidf * 100:.2f}%")

    # Models Comparison
    models = {
        "Linear SVM": CalibratedClassifierCV(LinearSVC(random_state=42, max_iter=2000), cv=3),
        "Logistic Regression": LogisticRegression(max_iter=1000, random_state=42),
        "SGD Classifier": SGDClassifier(loss='log_loss', random_state=42),
        "Multinomial NB": nb_tfidf,
        "Random Forest": RandomForestClassifier(n_estimators=150, random_state=42, n_jobs=-1)
    }

    results = {}
    trained_models = {}

    print("\n--- Training Comparison Models ---")
    for name, model in models.items():
        if name != "Multinomial NB":
            model.fit(X_train_tfidf, y_train)
        pred = model.predict(X_test_tfidf)
        acc = accuracy_score(y_test, pred)
        results[name] = acc
        trained_models[name] = model
        print(f"{name:22} : {acc * 100:.2f}%")

    # Find best model
    best_name = max(results, key=results.get)
    best_acc = results[best_name]
    best_model = trained_models[best_name]

    print(f"\n🏆 Best Model: {best_name} ({best_acc * 100:.2f}% accuracy)")

    # Classification report
    print("\nClassification Report for Best Model:")
    print(classification_report(y_test, best_model.predict(X_test_tfidf), target_names=list(EMOTION_MAPPING.keys())))

    # Save artifacts
    print("\n💾 Saving model artifacts...")
    joblib.dump(best_model, "best_nlp_model.pkl")
    joblib.dump(tfidf_vectorizer, "tfidf_vectorizer.pkl")

    # Save comparison data to JSON
    metadata = {
        "best_model": best_name,
        "best_accuracy": round(best_acc * 100, 2),
        "classes": list(EMOTION_MAPPING.keys()),
        "mapping": EMOTION_MAPPING,
        "reverse_mapping": {str(k): v for k, v in REVERSE_EMOTION_MAPPING.items()},
        "total_samples": len(df),
        "train_samples": len(X_train),
        "test_samples": len(X_test),
        "model_comparison": [
            {"model": "Linear SVM", "vectorizer": "TF-IDF", "accuracy": round(results["Linear SVM"] * 100, 2), "status": "Best ⭐", "isBest": True},
            {"model": "Logistic Regression", "vectorizer": "TF-IDF", "accuracy": round(results["Logistic Regression"] * 100, 2), "status": "Compared", "isBest": False},
            {"model": "SGD Classifier", "vectorizer": "TF-IDF", "accuracy": round(results["SGD Classifier"] * 100, 2), "status": "Compared", "isBest": False},
            {"model": "Random Forest", "vectorizer": "TF-IDF", "accuracy": round(results["Random Forest"] * 100, 2), "status": "Compared", "isBest": False},
            {"model": "Multinomial Naive Bayes", "vectorizer": "Bag of Words", "accuracy": round(acc_nb_bow * 100, 2), "status": "Good", "isBest": False},
            {"model": "Multinomial Naive Bayes", "vectorizer": "TF-IDF", "accuracy": round(acc_nb_tfidf * 100, 2), "status": "Baseline", "isBest": False},
        ]
    }

    with open("model_metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)

    print("✅ Model, TF-IDF Vectorizer, and Metadata saved successfully!")

if __name__ == '__main__':
    train_and_save()
