
# 🛡️ TrustPay - AI Fraud Detection System

An intelligent, real-time fraud detection system powered by Machine Learning.

## 🚀 Quick Start

### Backend (Python)
```bash
cd backend
pip install -r requirements.txt
python generate_data.py
python run_with_dataset.py
```

### Frontend (React)
```bash
cd fraud-detection-frontend
npm install
npm run dev
```

### Access
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## ✨ Features

- **AI-Powered Detection** - Random Forest ML model for fraud prediction
- **Real-time Monitoring** - Live transaction analysis with WebSocket
- **Interactive Dashboard** - Visual analytics and statistics
- **Risk Scoring** - 0-100% fraud probability score
- **Instant Alerts** - Real-time fraud notifications
- **Dark Mode** - Modern glass-morphism UI

## 📁 Project Structure

```
TrustPay/
├── backend/              # Python Flask API + ML Model
│   ├── ai_model/        # Fraud detection model
│   ├── api/             # REST API endpoints
│   ├── data/            # Dataset (CSV)
│   └── models/          # Saved trained models
└── fraud-detection-frontend/  # React frontend
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Main pages
    │   ├── contexts/    # State management
    │   └── services/    # API services
    └── public/          # Static assets
```

## 🎯 How It Works

1. **Transaction Data** → Sent to backend API
2. **AI Model** → Analyzes patterns and calculates risk score
3. **Risk Assessment** → Returns fraud probability (0-100%)
4. **Dashboard** → Displays real-time results and alerts

## 📊 Sample API Response

```json
{
  "riskScore": 85,
  "riskLevel": "High Risk",
  "isFraud": true,
  "aiConfidence": 0.92,
  "recommendations": ["Block transaction", "Contact cardholder"]
}
```

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 | Flask |
| Vite | Python 3.8+ |
| Recharts | scikit-learn |
| Axios | Pandas |
| CSS3 | Socket.IO |

## 📝 Commands Cheat Sheet

```bash
# Start backend
cd backend && python run_with_dataset.py

# Start frontend  
cd fraud-detection-frontend && npm run dev

# Generate new dataset
cd backend && python generate_data.py

# Install all dependencies
cd backend && pip install -r requirements.txt
cd fraud-detection-frontend && npm install
```

## 🤝 Contributing

1. Fork the repo
2. Create branch: `git checkout -b feature/amazing`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/amazing`
5. Open Pull Request

## 👨‍💻 Author

**Mannu Singh**
- GitHub: [@mannu9211](https://github.com/mannu9211)

## 📄 License

MIT License - Free for personal and commercial use

## ⭐ Support

If this project helped you, please give it a star on GitHub!

---

**Built with ❤️ for fraud prevention**
```

## How to Add This README:

### In VS Code:
1. Create new file → `README.md`
2. Copy the content above
3. Paste and save (Ctrl+S)

### In Terminal:
```bash
cd D:\TrustPay
echo "# TrustPay - AI Fraud Detection System" > README.md
# Then open and paste the full content
```

### Commit and Push:
```bash
git add README.md
git commit -m "Add README file"
git push
```
