from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

# Load trained model, scaler, and encoders
model = joblib.load("random_forest_model.pkl")
scaler = joblib.load("scaler.pkl")
label_encoders = joblib.load("label_encoders.pkl")

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Readmission Prediction API is running!'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        df = pd.DataFrame([data])

        for col in label_encoders:
            if col in df.columns:
                df[col] = label_encoders[col].transform(df[col])

        numeric_columns = ['age', 'num_procedures', 'days_in_hospital', 'comorbidity_score']
        df[numeric_columns] = scaler.transform(df[numeric_columns])

        df = df.reindex(columns=model.feature_names_in_, fill_value=0)

        prediction = model.predict(df)[0]
        probability = model.predict_proba(df)[:, 1][0]

        return jsonify({'readmission': int(prediction), 'probability': float(probability)})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
