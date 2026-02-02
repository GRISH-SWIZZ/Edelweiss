# Edelweiss AI Stock Intelligence Platform

> **Seeing Tomorrow in Today's Patterns**

A production-ready React web application for AI-powered stock market intelligence featuring pattern recognition, sentiment analysis, and explainable machine learning.

## 🚀 Features

- **Pattern Memory Engine™**: Learn from historical market patterns
- **Market Mood Intelligence (MMI)**: Real-time sentiment analysis (Bullish/Bearish/Neutral)
- **Explainable AI (X-AI Finance)**: Transparent decision-making process
- **Risk-First Forecasting**: Downside protection prioritization
- **Time-Horizon Intelligence**: Flexible prediction windows (1D to Custom)
- **Anomaly Detection**: Black-swan event identification
- **AI Confidence Index**: Prediction certainty metrics
- **Human-in-the-Loop**: Expert validation system

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite 7
- **UI Framework**: Mantine v8 + Tailwind CSS v4
- **State Management**: Zustand
- **API Client**: TanStack Query
- **Routing**: React Router v7
- **Authentication**: Firebase Auth
- **Charts**: Mantine Charts (Recharts)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd edelweiss
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Google, Facebook, Email/Password)
   - Copy your Firebase configuration
   - Update `src/config/firebase.js` with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

4. Start the development server:
```bash
npm run dev
```

## 🔌 Backend API

The application connects to a FastAPI backend at `http://127.0.0.1:8000`

### API Endpoints

#### Prediction Endpoint
```
POST /predict
Content-Type: application/json

Request:
{
  "symbol": "AAPL",
  "lookback": 60
}

Response:
{
  "symbol": "AAPL",
  "last_close_price": 259.48,
  "predicted_price": 239.16,
  "lookback_window": 60,
  "model_version": "v1.0"
}
```

#### Chat Endpoint (Coming Soon)
```
POST /chat
Content-Type: application/json

Request:
{
  "message": "user question",
  "context": { "symbol": "AAPL" }
}
```

## 🎨 Pages

### Landing Page (`/`)
- Hero section with compelling tagline
- Feature showcase (8 core features)
- Tech stack badges
- Development timeline
- Footer with navigation

### Login Page (`/login`)
- Google Sign-In
- Facebook Sign-In
- Email/Password authentication
- Elegant glassmorphic design

### Dashboard (`/dashboard`)
- Stock symbol selector
- Time horizon selector
- Real-time prediction interface
- Price chart with historical and predicted data
- AI confidence indicator
- Market mood widget
- Tabbed analytics:
  - Metrics (RMSE, MAE, Volatility)
  - Risk Analysis
  - Explainability (Feature importance)

## 🎯 Key Components

- **Chatbot**: Global floating widget (placeholder for future implementation)
- **Loading Animation**: Multi-stage analysis progress indicator
- **Protected Routes**: Authentication-based access control

## 📱 Responsive Design

Fully responsive design that adapts to:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🌈 Design System

### Color Palette
- **Primary**: Cyan (#22d3ee)
- **Background**: Dark gradient (#0a0a0f → #14161b)
- **Accent**: Neon cyan with glow effects
- **Text**: Light gray (#e5e7eb) with dimmed variants

### Typography
- **Font Family**: Inter (system fallback)
- **Monospace**: JetBrains Mono
- **Headings**: Bold, gradient-filled for emphasis

### Visual Style
- Glassmorphic cards with backdrop blur
- Neon glow effects for interactive elements
- Smooth animations and transitions
- Visual-first approach (minimal text, maximum data visualization)

## 🔐 Configuration

### Backend URL
Update `src/config/api.js` if your backend is hosted elsewhere:

```javascript
export const API_BASE_URL = 'https://your-backend-url.com';
```

## 🚀 Production Build

```bash
npm run build
npm run preview
```

## 📝 Environment Variables

Create a `.env` file (optional):

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
```

## 🤝 Contributing

This is a demonstration project. For production use:

1. Implement proper error boundaries
2. Add comprehensive error handling
3. Implement proper authentication guards
4. Add loading states for all async operations
5. Implement proper form validation
6. Add E2E tests
7. Configure proper CORS policies
8. Implement rate limiting

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🎉 Acknowledgments

Built with modern React best practices and production-ready architecture patterns.

---

**Note**: Remember to configure your Firebase project and ensure your backend API is running before testing the application.
