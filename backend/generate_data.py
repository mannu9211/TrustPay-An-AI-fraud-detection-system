# backend/generate_data.py
import pandas as pd
import numpy as np
import os

def generate_dataset():
    """Generate a simple dataset for fraud detection"""
    
    # Create data directory
    os.makedirs('data', exist_ok=True)
    
    # Set random seed
    np.random.seed(42)
    
    # Number of transactions
    n = 500
    
    print(f"Generating {n} transactions...")
    
    # Generate data
    data = {
        'transaction_id': [f'TXN-{i:04d}' for i in range(n)],
        'amount': np.random.exponential(500, n),
        'transaction_type': np.random.choice(['online', 'in_store', 'atm'], n, p=[0.6, 0.3, 0.1]),
        'card_type': np.random.choice(['Visa', 'Mastercard', 'Amex', 'Discover'], n),
        'location': np.random.choice(['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Berlin', 'Singapore'], n),
        'time_of_day': np.random.choice(['morning', 'afternoon', 'evening', 'late_night'], n),
        'day_of_week': np.random.choice(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], n),
        'transaction_hour': np.random.randint(0, 24, n),
        'previous_fraud_attempts': np.random.poisson(0.5, n),
        'account_age_days': np.random.exponential(365, n).astype(int),
        'device_trust_score': np.random.randint(20, 100, n),
        'is_fraud': np.zeros(n)
    }
    
    df = pd.DataFrame(data)
    
    # Add fraud patterns
    # 1. High amount transactions
    high_amount_mask = df['amount'] > 2000
    df.loc[high_amount_mask, 'is_fraud'] = np.random.choice([0, 1], size=sum(high_amount_mask), p=[0.7, 0.3])
    
    # 2. Late night transactions
    late_night_mask = df['transaction_hour'] > 22
    df.loc[late_night_mask, 'is_fraud'] = np.random.choice([0, 1], size=sum(late_night_mask), p=[0.8, 0.2])
    
    # 3. Online transactions with new accounts
    online_new_mask = (df['transaction_type'] == 'online') & (df['account_age_days'] < 30)
    df.loc[online_new_mask, 'is_fraud'] = np.random.choice([0, 1], size=sum(online_new_mask), p=[0.75, 0.25])
    
    # 4. Low trust devices
    low_trust_mask = df['device_trust_score'] < 40
    df.loc[low_trust_mask, 'is_fraud'] = np.random.choice([0, 1], size=sum(low_trust_mask), p=[0.8, 0.2])
    
    # Save to CSV
    output_path = 'data/fraud_dataset.csv'
    df.to_csv(output_path, index=False)
    
    print(f"\n✅ Dataset saved to: {output_path}")
    print(f"📊 Total transactions: {len(df)}")
    print(f"🎯 Fraud cases: {df['is_fraud'].sum()} ({df['is_fraud'].mean()*100:.1f}%)")
    print(f"💰 Average amount: ${df['amount'].mean():.2f}")
    
    # Show sample
    print("\n📋 Sample transactions:")
    print(df[['transaction_id', 'amount', 'transaction_type', 'location', 'is_fraud']].head(10))
    
    return df

if __name__ == "__main__":
    generate_dataset()
    print("\n✅ Dataset ready! Now run: python run_with_dataset.py")