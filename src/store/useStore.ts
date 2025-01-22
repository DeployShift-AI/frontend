import { create } from 'zustand';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatStore {
  messages: Message[];
  theme: 'light' | 'dark';
  isWalletConnected: boolean;
  walletAddress: string | null;
  isDashboardOpen: boolean;
  isNewsOpen: boolean;
  addMessage: (content: string, sender: 'user' | 'bot') => void;
  toggleTheme: () => void;
  setWalletConnection: (connected: boolean, address: string | null) => void;
  toggleDashboard: () => void;
  toggleNews: () => void;
}

export const useStore = create<ChatStore>((set) => ({
  messages: [],
  theme: 'dark',
  isWalletConnected: false,
  walletAddress: null,
  isDashboardOpen: false,
  isNewsOpen: false,
  addMessage: (content, sender) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: crypto.randomUUID(),
          content,
          sender,
          timestamp: new Date(),
        },
      ],
    })),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
  setWalletConnection: (connected, address) =>
    set(() => ({
      isWalletConnected: connected,
      walletAddress: address,
      isDashboardOpen: false,
      isNewsOpen: false,
    })),
  toggleDashboard: () =>
    set((state) => ({
      isDashboardOpen: !state.isDashboardOpen,
      isNewsOpen: false,
    })),
  toggleNews: () =>
    set((state) => ({
      isNewsOpen: !state.isNewsOpen,
      isDashboardOpen: false,
    })),
}));