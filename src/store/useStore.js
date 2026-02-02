import { create } from 'zustand';

export const useStore = create((set) => ({
  // Auth state
  user: null,
  setUser: (user) => set({ user }),
  
  // Dashboard state
  selectedSymbol: 'AAPL',
  setSelectedSymbol: (symbol) => set({ selectedSymbol: symbol }),
  
  timeHorizon: '1M',
  setTimeHorizon: (horizon) => set({ timeHorizon: horizon }),
  
  predictionData: null,
  setPredictionData: (data) => set({ predictionData: data }),
  
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  // Chatbot state
  isChatOpen: false,
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
}));
