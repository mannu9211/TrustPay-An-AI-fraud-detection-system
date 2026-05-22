# backend/ai_model/advanced_fraud_model.py
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
import joblib
import os
import warnings
warnings.filterwarnings('ignore')

class AdvancedFraudDetectionModel:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.feature_importance = None
        self.model_performance = {}
        
    def load_and_prepare_data(self, data_path='data/fraud_dataset.csv'):
        """Load and prepare dataset for training"""
        print("📊 Loading dataset...")
        df = pd.read_csv(data_path)
        print(f"✅ Loaded {len(df)} transactions")
        print(f"📈 Fraud cases: {df['is_fraud'].sum()} ({df['is_fraud'].mean()*100:.2f}%)")
        
        # Feature engineering
        df = self.create_features(df)
        
        return df
    
    def create_features(self, df):
        """Create advanced features for better fraud detection"""
        # Create a copy to avoid warnings
        df = df.copy()
        
        # Time-based features
        df['is_weekend'] = df['day_of_week'].apply(lambda x: 1 if x in ['Saturday', 'Sunday'] else 0)
        df['is_late_night'] = df['transaction_hour'].apply(lambda x: 1 if x < 5 or x > 22 else 0)
        
        # Amount-based features
        df['amount_log'] = np.log1p(df['amount'])
        df['is_high_amount'] = (df['amount'] > df['amount'].quantile(0.9)).astype(int)
        
        # Risk scores
        df['location_risk'] = df['location'].map({
            'New York': 2, 'London': 3, 'Tokyo': 1, 'Paris': 2,
            'Sydney': 1, 'Berlin': 2, 'Singapore': 3, 'Chicago': 1,
            'Los Angeles': 2, 'San Francisco': 1, 'Toronto': 1
        }).fillna(2)
        
        df['fraud_attempt_risk'] = np.where(df['previous_fraud_attempts'] > 3, 3,
                                           np.where(df['previous_fraud_attempts'] > 1, 2, 1))
        
        df['account_age_risk'] = np.where(df['account_age_days'] < 30, 3,
                                         np.where(df['account_age_days'] < 90, 2, 1))
        
        # Interaction features
        df['high_amount_late_night'] = ((df['is_high_amount'] == 1) & (df['is_late_night'] == 1)).astype(int)
        df['new_account_high_amount'] = ((df['account_age_days'] < 30) & (df['is_high_amount'] == 1)).astype(int)
        
        return df
    
    def prepare_features(self, df):
        """Prepare features for model training"""
        feature_columns = [
            'amount', 'amount_log', 'transaction_hour', 'is_weekend', 'is_late_night',
            'is_high_amount', 'previous_fraud_attempts', 'account_age_days',
            'device_trust_score', 'location_risk', 'fraud_attempt_risk',
            'account_age_risk', 'high_amount_late_night', 'new_account_high_amount'
        ]
        
        # Encode categorical variables
        categorical_cols = ['transaction_type', 'card_type', 'time_of_day', 'day_of_week']
        
        for col in categorical_cols:
            if col in df.columns:
                self.label_encoders[col] = LabelEncoder()
                df[f'{col}_encoded'] = self.label_encoders[col].fit_transform(df[col])
                feature_columns.append(f'{col}_encoded')
        
        X = df[feature_columns]
        y = df['is_fraud']
        
        return X, y, feature_columns
    
    def train(self, data_path='data/fraud_dataset.csv'):
        """Train the fraud detection model"""
        print("\n" + "="*60)
        print("🚀 TRAINING FRAUD DETECTION MODEL")
        print("="*60)
        
        # Load and prepare data
        df = self.load_and_prepare_data(data_path)
        
        # Prepare features
        X, y, self.feature_names = self.prepare_features(df)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        print(f"\n📊 Training data: {len(X_train)} samples")
        print(f"📊 Test data: {len(X_test)} samples")
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train multiple models and choose best
        models = {
            'Random Forest': RandomForestClassifier(
                n_estimators=100,
                max_depth=10,
                min_samples_split=5,
                random_state=42,
                class_weight='balanced'
            ),
            'Gradient Boosting': GradientBoostingClassifier(
                n_estimators=100,
                max_depth=5,
                learning_rate=0.1,
                random_state=42
            )
        }
        
        best_model = None
        best_score = 0
        
        print("\n🔍 Training multiple models...")
        for name, model in models.items():
            model.fit(X_train_scaled, y_train)
            y_pred = model.predict(X_test_scaled)
            score = f1_score(y_test, y_pred)
            
            print(f"\n📈 {name}:")
            print(f"   Accuracy: {accuracy_score(y_test, y_pred):.4f}")
            print(f"   Precision: {precision_score(y_test, y_pred):.4f}")
            print(f"   Recall: {recall_score(y_test, y_pred):.4f}")
            print(f"   F1 Score: {score:.4f}")
            
            if score > best_score:
                best_score = score
                best_model = model
        
        self.model = best_model
        
        # Cross-validation
        cv_scores = cross_val_score(self.model, X_train_scaled, y_train, cv=5, scoring='f1')
        print(f"\n✅ Cross-validation F1 Score: {cv_scores.mean():.4f} (+/- {cv_scores.std()*2:.4f})")
        
        # Feature importance
        self.feature_importance = dict(zip(self.feature_names, self.model.feature_importances_))
        
        print("\n📊 TOP 10 FEATURE IMPORTANCE:")
        sorted_features = sorted(self.feature_importance.items(), key=lambda x: x[1], reverse=True)[:10]
        for feature, importance in sorted_features:
            print(f"   {feature}: {importance:.4f}")
        
        # Store performance metrics
        y_pred = self.model.predict(X_test_scaled)
        y_pred_proba = self.model.predict_proba(X_test_scaled)[:, 1]
        
        self.model_performance = {
            'accuracy': accuracy_score(y_test, y_pred),
            'precision': precision_score(y_test, y_pred),
            'recall': recall_score(y_test, y_pred),
            'f1_score': f1_score(y_test, y_pred),
            'roc_auc': roc_auc_score(y_test, y_pred_proba)
        }
        
        print("\n🎯 MODEL PERFORMANCE SUMMARY:")
        for metric, value in self.model_performance.items():
            print(f"   {metric.upper()}: {value:.4f}")
        
        # Save model
        self.save_model()
        
        return self.model
    
    def predict(self, transaction_data):
        """Predict fraud for a single transaction"""
        if self.model is None:
            self.load_model()
        
        # Convert to DataFrame
        df = pd.DataFrame([transaction_data])
        
        # Create features
        df = self.create_features(df)
        
        # Prepare features
        X, _, _ = self.prepare_features(df)
        
        # Scale features
        X_scaled = self.scaler.transform(X)
        
        # Get prediction and probability
        prediction = self.model.predict(X_scaled)[0]
        probability = self.model.predict_proba(X_scaled)[0][1]
        risk_score = int(probability * 100)
        
        # Get feature contributions for this prediction
        feature_contributions = self.get_feature_contributions(df, X_scaled[0])
        
        return {
            'is_fraud': bool(prediction),
            'fraud_probability': float(probability),
            'risk_score': risk_score,
            'risk_level': self.get_risk_level(risk_score),
            'feature_contributions': feature_contributions,
            'confidence': float(max(probability, 1-probability))
        }
    
    def predict_batch(self, transactions_df):
        """Predict fraud for multiple transactions"""
        if self.model is None:
            self.load_model()
        
        # Create features
        df = self.create_features(transactions_df)
        
        # Prepare features
        X, _, _ = self.prepare_features(df)
        
        # Scale features
        X_scaled = self.scaler.transform(X)
        
        # Get predictions
        predictions = self.model.predict(X_scaled)
        probabilities = self.model.predict_proba(X_scaled)[:, 1]
        risk_scores = (probabilities * 100).astype(int)
        
        return predictions, probabilities, risk_scores
    
    def get_feature_contributions(self, df, features_scaled):
        """Get which features contributed most to the prediction"""
        if not hasattr(self.model, 'feature_importances_'):
            return []
        
        contributions = []
        for i, (feature, importance) in enumerate(self.feature_importance.items()):
            if i < len(features_scaled):
                contribution = features_scaled[i] * importance
                contributions.append({
                    'feature': feature,
                    'importance': float(importance),
                    'contribution': float(abs(contribution)),
                    'value': float(features_scaled[i])
                })
        
        # Return top 5 contributing features
        return sorted(contributions, key=lambda x: x['contribution'], reverse=True)[:5]
    
    def get_risk_level(self, risk_score):
        """Get risk level based on score"""
        if risk_score > 75:
            return 'Critical Risk'
        elif risk_score > 60:
            return 'High Risk'
        elif risk_score > 35:
            return 'Medium Risk'
        elif risk_score > 15:
            return 'Low Risk'
        else:
            return 'Very Low Risk'
    
    def save_model(self, path='models/'):
        """Save the trained model and artifacts"""
        if not os.path.exists(path):
            os.makedirs(path)
        
        joblib.dump(self.model, f'{path}/fraud_model.pkl')
        joblib.dump(self.scaler, f'{path}/scaler.pkl')
        joblib.dump(self.label_encoders, f'{path}/label_encoders.pkl')
        joblib.dump(self.feature_names, f'{path}/feature_names.pkl')
        joblib.dump(self.model_performance, f'{path}/model_performance.pkl')
        
        print(f"\n💾 Model saved to {path}")
    
    def load_model(self, path='models/'):
        """Load trained model and artifacts"""
        self.model = joblib.load(f'{path}/fraud_model.pkl')
        self.scaler = joblib.load(f'{path}/scaler.pkl')
        self.label_encoders = joblib.load(f'{path}/label_encoders.pkl')
        self.feature_names = joblib.load(f'{path}/feature_names.pkl')
        self.model_performance = joblib.load(f'{path}/model_performance.pkl')
        
        print("✅ Model loaded successfully")
        print(f"📊 Model Performance: F1 Score = {self.model_performance['f1_score']:.4f}")
    
    def get_model_info(self):
        """Get model information and statistics"""
        return {
            'model_type': type(self.model).__name__,
            'performance': self.model_performance,
            'feature_count': len(self.feature_names),
            'top_features': sorted(self.feature_importance.items(), key=lambda x: x[1], reverse=True)[:5]
        }

# Standalone training script
if __name__ == "__main__":
    # Create sample data if not exists
    if not os.path.exists('data/fraud_dataset.csv'):
        print("Creating sample dataset...")
        os.makedirs('data', exist_ok=True)
        
        # Generate synthetic data
        np.random.seed(42)
        n_samples = 10000
        
        data = {
            'transaction_id': [f'TXN-{i:05d}' for i in range(n_samples)],
            'amount': np.random.exponential(500, n_samples),
            'transaction_type': np.random.choice(['online', 'in_store', 'atm'], n_samples, p=[0.6, 0.3, 0.1]),
            'card_type': np.random.choice(['Visa', 'Mastercard', 'Amex', 'Discover'], n_samples),
            'location': np.random.choice(['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Berlin'], n_samples),
            'time_of_day': np.random.choice(['morning', 'afternoon', 'evening', 'late_night'], n_samples),
            'day_of_week': np.random.choice(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], n_samples),
            'transaction_hour': np.random.randint(0, 24, n_samples),
            'previous_fraud_attempts': np.random.poisson(0.5, n_samples),
            'account_age_days': np.random.exponential(365, n_samples).astype(int),
            'device_trust_score': np.random.randint(20, 100, n_samples),
            'is_fraud': np.zeros(n_samples)
        }
        
        df = pd.DataFrame(data)
        
        # Create fraud patterns
        fraud_conditions = (
            (df['amount'] > 2000) |
            (df['transaction_hour'] > 22) |
            (df['transaction_hour'] < 5) |
            (df['previous_fraud_attempts'] > 2) |
            (df['account_age_days'] < 30)
        )
        
        df.loc[fraud_conditions, 'is_fraud'] = np.random.choice([0, 1], size=sum(fraud_conditions), p=[0.7, 0.3])
        
        df.to_csv('data/fraud_dataset.csv', index=False)
        print(f"✅ Created dataset with {n_samples} transactions")
    
    # Train model
    model = AdvancedFraudDetectionModel()
    model.train('data/fraud_dataset.csv')
    
    # Test prediction
    print("\n" + "="*60)
    print("🔮 TESTING MODEL WITH SAMPLE TRANSACTION")
    print("="*60)
    
    test_transaction = {
        'amount': 15000,
        'transaction_type': 'online',
        'card_type': 'Visa',
        'location': 'London',
        'time_of_day': 'late_night',
        'day_of_week': 'Saturday',
        'transaction_hour': 23,
        'previous_fraud_attempts': 3,
        'account_age_days': 15,
        'device_trust_score': 35
    }
    
    result = model.predict(test_transaction)
    print(f"\n💰 Amount: ${test_transaction['amount']}")
    print(f"🎯 Risk Score: {result['risk_score']}%")
    print(f"⚠️ Risk Level: {result['risk_level']}")
    print(f"📊 Fraud Probability: {result['fraud_probability']:.2%}")
    print(f"✅ Is Fraud: {result['is_fraud']}")
    
    print("\n🔍 Top Contributing Factors:")
    for contrib in result['feature_contributions']:
        print(f"   • {contrib['feature']}: {contrib['importance']:.3f}")