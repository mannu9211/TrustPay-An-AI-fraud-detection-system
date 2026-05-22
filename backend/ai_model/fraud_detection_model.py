# backend/ai_model/fraud_detection_model.py
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os

class FraudDetectionModel:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        
    def extract_features(self, transaction):
        """Extract features from transaction data"""
        features = {
            'amount': float(transaction.get('amount', 0)),
            'amount_log': np.log1p(float(transaction.get('amount', 0))),
            'hour_of_day': int(transaction.get('hour', 12)),
            'is_weekend': 1 if int(transaction.get('day_of_week', 0)) >= 5 else 0,
            'high_amount': 1 if float(transaction.get('amount', 0)) > 1000 else 0,
        }
        
        # Transaction type
        type_map = {'online': 2, 'in_store': 1, 'atm': 0}
        features['transaction_type'] = type_map.get(transaction.get('transaction_type', 'online'), 2)
        
        # Card type
        card_map = {'Visa': 3, 'Mastercard': 2, 'Amex': 1, 'Discover': 0}
        features['card_type'] = card_map.get(transaction.get('card_type', 'Visa'), 3)
        
        return np.array(list(features.values())).reshape(1, -1)
    
    def predict(self, transaction):
        """Predict fraud probability"""
        if self.model is None:
            # Return mock prediction if model not trained
            amount = float(transaction.get('amount', 0))
            risk_score = min(100, int(amount / 100))
            return {
                'risk_score': risk_score,
                'is_fraud': risk_score > 70,
                'fraud_probability': risk_score / 100
            }
        
        features = self.extract_features(transaction)
        features_scaled = self.scaler.transform(features)
        
        probability = self.model.predict_proba(features_scaled)[0][1]
        risk_score = int(probability * 100)
        
        return {
            'risk_score': risk_score,
            'is_fraud': probability > 0.7,
            'fraud_probability': float(probability)
        }
    
    def train(self, data_path):
        """Train the model"""
        df = pd.read_csv(data_path)
        
        # Prepare features
        X = df[['amount', 'amount_log', 'hour_of_day', 'is_weekend', 
                'high_amount', 'transaction_type', 'card_type']].values
        y = df['is_fraud'].values
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Train model
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )
        self.model.fit(X_scaled, y)
        
        # Save model
        os.makedirs('models', exist_ok=True)
        joblib.dump(self.model, 'models/fraud_model.pkl')
        joblib.dump(self.scaler, 'models/scaler.pkl')
        
        print(f"Model trained! Accuracy: {self.model.score(X_scaled, y):.2%}")
        
        return self.model
    
    def load_model(self):
        """Load trained model"""
        try:
            self.model = joblib.load('models/fraud_model.pkl')
            self.scaler = joblib.load('models/scaler.pkl')
            print("✅ Model loaded successfully")
            return True
        except:
            print("⚠️ No trained model found")
            return False