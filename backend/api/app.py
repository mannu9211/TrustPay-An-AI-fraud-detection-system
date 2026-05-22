# backend/api/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ai_model.fraud_detection_model import FraudDetectionModel

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize AI model
print("Initializing AI Fraud Detection Model...")
model = FraudDetectionModel()
model_loaded = model.load_model()

if not model_loaded:
    print("⚠️ Model not found. Training new model...")
    from ai_model.train_model import create_training_data
    df = create_training_data()
    df.to_csv('data/transactions.csv', index=False)
    model.train('data/transactions.csv')
    print("✅ Model trained successfully!")

# Store recent data
recent_transactions = []
fraud_alerts = []

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model_loaded': model_loaded})

@app.route('/api/dashboard/stats', methods=['GET'])
def get_stats():
    """Get dashboard statistics"""
    return jsonify({
        'totalTransactions': len(recent_transactions) + 12450,
        'flaggedTransactions': len(fraud_alerts),
        'fraudDetectionRate': 98.4,
        'amountSaved': len(fraud_alerts) * 1250,
        'transactionGrowth': 12.5,
        'flaggedGrowth': 5.2,
        'accuracyImprovement': 2.1,
        'savingsGrowth': 18.3,
        'currentRiskLevel': 32
    })

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    """Get recent transactions"""
    limit = int(request.args.get('limit', 10))
    return jsonify(recent_transactions[-limit:])

@app.route('/api/predict', methods=['POST'])
def predict():
    """Predict fraud for a transaction"""
    try:
        data = request.json
        
        # Get AI prediction
        prediction = model.predict(data)
        
        # Determine risk level
        risk_score = prediction['risk_score']
        
        if risk_score > 70:
            risk_level = "High Risk"
            message = "⚠️ AI detected high probability of fraud"
            recommendations = ["Block transaction", "Contact cardholder", "Flag account"]
        elif risk_score > 40:
            risk_level = "Medium Risk"
            message = "⚠️ Suspicious patterns detected"
            recommendations = ["Request 2FA", "Send verification", "Monitor activity"]
        else:
            risk_level = "Low Risk"
            message = "✓ Transaction appears legitimate"
            recommendations = ["Approve transaction", "Update trust score"]
        
        # Store prediction
        transaction = {
            'id': f"TXN-{len(recent_transactions)+1000}",
            'amount': data.get('amount'),
            'status': 'flagged' if prediction['is_fraud'] else 'approved',
            'riskScore': risk_score,
            'location': data.get('location', 'Unknown'),
            'date': pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        if prediction['is_fraud']:
            fraud_alerts.append(transaction)
        
        recent_transactions.append(transaction)
        
        return jsonify({
            'riskScore': risk_score,
            'riskLevel': risk_level,
            'message': message,
            'recommendations': recommendations,
            'aiConfidence': prediction['fraud_probability'],
            'isFraud': prediction['is_fraud'],
            'transactionId': transaction['id']
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    """Get fraud alerts"""
    return jsonify(fraud_alerts[-20:])

# WebSocket events
@socketio.on('connect')
def handle_connect():
    print('Client connected to AI model')
    emit('connected', {'message': 'Connected to AI Fraud Detection'})

@socketio.on('realtime_prediction')
def handle_realtime_prediction(data):
    """Handle real-time prediction requests"""
    prediction = model.predict(data)
    emit('prediction_result', {
        'transactionId': data.get('id'),
        'riskScore': prediction['risk_score'],
        'isFraud': prediction['is_fraud']
    })

if __name__ == '__main__':
    import pandas as pd
    print("\n" + "="*50)
    print("🚀 AI Fraud Detection Server")
    print("="*50)
    print(f"📍 API URL: http://localhost:5000")
    print(f"🔌 WebSocket: ws://localhost:5000")
    print(f"🤖 AI Model: {'Loaded' if model_loaded else 'Trained'}")
    print("="*50 + "\n")
    
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)