# backend/ai_model/train_model.py
import pandas as pd
import numpy as np
from fraud_detection_model import FraudDetectionModel

# Create synthetic training data
def create_training_data():
    np.random.seed(42)
    n_samples = 5000
    
    data = {
        'amount': np.random.exponential(500, n_samples),
        'amount_log': 0,
        'hour_of_day': np.random.randint(0, 24, n_samples),
        'is_weekend': np.random.randint(0, 2, n_samples),
        'high_amount': np.random.randint(0, 2, n_samples),
        'transaction_type': np.random.randint(0, 3, n_samples),
        'card_type': np.random.randint(0, 4, n_samples),
        'is_fraud': np.zeros(n_samples)
    }
    
    df = pd.DataFrame(data)
    df['amount_log'] = np.log1p(df['amount'])
    df['high_amount'] = (df['amount'] > 1000).astype(int)
    
    # Create fraud patterns
    fraud_conditions = (
        (df['amount'] > 2000) |  # High amount
        (df['hour_of_day'] > 22) |  # Late night
        (df['hour_of_day'] < 5) |   # Early morning
        (df['transaction_type'] == 2)  # Online transactions
    )
    
    # Add fraud with 5% probability
    df['is_fraud'] = (fraud_conditions & (np.random.random(n_samples) < 0.05)).astype(int)
    
    return df

if __name__ == "__main__":
    print("Creating training data...")
    df = create_training_data()
    
    # Save data
    import os
    os.makedirs('../data', exist_ok=True)
    df.to_csv('../data/transactions.csv', index=False)
    print(f"Saved {len(df)} transactions to ../data/transactions.csv")
    print(f"Fraud rate: {df['is_fraud'].mean():.2%}")
    
    # Train model
    print("\nTraining fraud detection model...")
    model = FraudDetectionModel()
    model.train('../data/transactions.csv')
    print("\n✅ Training complete! Model saved to models/")