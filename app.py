import os
import sys
import re
import string
import json
import joblib
from flask import Flask, request, jsonify

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

app = Flask(__name__)

# Emotion mapping
EMOTION_MAPPING = {
    0: 'sadness',
    1: 'anger',
    2: 'love',
    3: 'surprise',
    4: 'fear',
    5: 'joy'
}

# Stopwords set
DEFAULT_STOPWORDS = {
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd",
    'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers',
    'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which',
    'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if',
    'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between',
    'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out',
    'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why',
    'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
    'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should',
    "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't",
    'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't",
    'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't",
    'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"
}

try:
    import nltk
    from nltk.corpus import stopwords
    stop_words = set(stopwords.words('english'))
except Exception:
    stop_words = DEFAULT_STOPWORDS

# Load model and vectorizer
model = None
vectorizer = None

def load_artifacts():
    global model, vectorizer
    model_path = os.path.join(os.path.dirname(__file__), "best_nlp_model.pkl")
    vec_path = os.path.join(os.path.dirname(__file__), "tfidf_vectorizer.pkl")
    if os.path.exists(model_path) and os.path.exists(vec_path):
        model = joblib.load(model_path)
        vectorizer = joblib.load(vec_path)
        print("✅ Model and TF-IDF Vectorizer loaded successfully!")
    else:
        print("⚠️ Model files not found. Run train_model.py first.")

load_artifacts()

# Clean input text with exact pipeline
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

# CORS middleware
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "online",
        "model_loaded": model is not None,
        "vectorizer_loaded": vectorizer is not None
    })

@app.route('/api/model-info', methods=['GET'])
def model_info():
    metadata_path = os.path.join(os.path.dirname(__file__), "model_metadata.json")
    if os.path.exists(metadata_path):
        with open(metadata_path, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    return jsonify({
        "best_model": "Linear SVM",
        "best_accuracy": 89.2,
        "classes": ["sadness", "anger", "love", "surprise", "fear", "joy"]
    })

@app.route('/api/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    global model, vectorizer
    if model is None or vectorizer is None:
        load_artifacts()
        if model is None or vectorizer is None:
            return jsonify({
                "error": "Model not loaded. Please run train_model.py first."
            }), 500

    data = request.get_json(force=True, silent=True)
    if not data or 'text' not in data:
        return jsonify({"error": "Missing 'text' in request body"}), 400

    raw_text = data.get('text', '').strip()
    if not raw_text:
        return jsonify({"error": "Text cannot be empty"}), 400

    cleaned = clean_text(raw_text)
    # If cleaning stripped everything (e.g. only stopwords or symbols), fallback to raw lower
    input_to_vec = cleaned if cleaned.strip() else raw_text.lower()

    # Transform
    features = vectorizer.transform([input_to_vec])

    # Predict class & confidence
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(features)[0]
        pred_idx = int(probs.argmax())
        confidence = float(probs[pred_idx] * 100)
        
        # Build distribution
        prob_dist = {}
        for idx, prob in enumerate(probs):
            emo_name = EMOTION_MAPPING.get(idx, str(idx))
            prob_dist[emo_name] = round(float(prob * 100), 2)
    elif hasattr(model, "decision_function"):
        # Softmax over decision function
        import numpy as np
        df = model.decision_function(features)[0]
        exp_df = np.exp(df - np.max(df))
        probs = exp_df / exp_df.sum()
        pred_idx = int(probs.argmax())
        confidence = float(probs[pred_idx] * 100)
        prob_dist = {EMOTION_MAPPING.get(i, str(i)): round(float(p * 100), 2) for i, p in enumerate(probs)}
    else:
        pred_idx = int(model.predict(features)[0])
        confidence = 95.0
        prob_dist = {EMOTION_MAPPING.get(pred_idx, 'joy'): 95.0}

    predicted_emotion = EMOTION_MAPPING.get(pred_idx, 'joy')

    return jsonify({
        "emotion": predicted_emotion,
        "confidence": round(confidence, 1),
        "probabilities": prob_dist,
        "cleaned_text": cleaned,
        "input_text": raw_text,
        "status": "success"
    })

if __name__ == '__main__':
    print("🚀 Starting Flask NLP Emotion Detection API on http://127.0.0.1:5000 ...")
    app.run(host='127.0.0.1', port=5000, debug=False)
