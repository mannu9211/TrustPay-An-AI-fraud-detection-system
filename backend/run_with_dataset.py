# backend/run_with_dataset.py
import os
import sys

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Check if dataset exists
if not os.path.exists('data/fraud_dataset.csv'):
    print("❌ Dataset not found!")
    print("Please ensure data/fraud_dataset.csv exists")
    print("\nCreating sample dataset...")
    
    os.makedirs('data', exist_ok=True)
    # The model will create sample data automatically
    from ai_model.advanced_fraud_model import AdvancedFraudDetectionModel
    model = AdvancedFraudDetectionModel()
    model.train()

# Run the API server
from api.app_with_dataset import socketio, app

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)