// config/api.js
export const API_BASE_URL = 'http://127.0.0.1:8000';

export const API_ENDPOINTS = {
  PREDICT: `${API_BASE_URL}/predict`,
  CHAT: `${API_BASE_URL}/chat`,
};

export const apiClient = {
  async predict(symbol, lookback = 60) {
    const response = await fetch(API_ENDPOINTS.PREDICT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol, lookback }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Prediction failed');
    }

    return data;
  },

  async chat(message, context = {}) {
    const response = await fetch(API_ENDPOINTS.CHAT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, context }),
    });

    if (!response.ok) {
      throw new Error('Chat request failed');
    }

    return response.json();
  },
};
