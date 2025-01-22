import React, { useEffect, useState } from 'react';
import { Moon, Sun, Wallet, LayoutDashboard, Bitcoin, Feather as Ethereum, Newspaper } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Dashboard } from './components/Dashboard';
import { WelcomeBox } from './components/WelcomeBox';
import { useStore } from './store/useStore';
import { truncateAddress } from './lib/utils';
import { useTypewriter } from './hooks/useTypewriter';
import { WarpSpeed } from './components/WarpSpeed';
import { News } from './components/News';
import { AnimatedTitle } from './components/AnimatedTitle';

function CryptoOrbit() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute rounded-full animate-orbit" style={{ animationDelay: '0s' }}>
          <div className="w-8 h-8 bg-[#F7931A] rounded-full flex items-center justify-center animate-glow">
            <Bitcoin className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="absolute rounded-full animate-orbit" style={{ animationDelay: '-6.67s' }}>
          <div className="w-8 h-8 bg-[#627EEA] rounded-full flex items-center justify-center animate-glow">
            <Ethereum className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="absolute rounded-full animate-orbit" style={{ animationDelay: '-13.33s' }}>
          <div className="w-8 h-8 bg-[#00FFA3] rounded-full flex items-center justify-center animate-glow">
            <span className="text-black font-bold">SOL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const {
    messages,
    theme,
    isWalletConnected,
    walletAddress,
    isDashboardOpen,
    isNewsOpen,
    addMessage,
    toggleTheme,
    setWalletConnection,
    toggleDashboard,
    toggleNews,
  } = useStore();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showChatInput, setShowChatInput] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [connectedPublicKey, setConnectedPublicKey] = useState<string | null>(null);

  useEffect(() => {
    const handleWarpSpeedComplete = () => {
      setShowBackground(false);
      setShowTitle(true);
      
      // After title animation and a pause, show the chat content
      const titleTimer = setTimeout(() => {
        setShowTitle(false);
        if (connectedPublicKey) {
          setWalletConnection(true, connectedPublicKey);
          setShowContent(true);
        }
        setIsConnecting(false);
      }, 3000); // Show title for 3 seconds after typing completes

      return () => clearTimeout(titleTimer);
    };

    window.addEventListener('warpSpeedComplete', handleWarpSpeedComplete);
    return () => window.removeEventListener('warpSpeedComplete', handleWarpSpeedComplete);
  }, [setWalletConnection, connectedPublicKey]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Handle deep linking return from Phantom mobile app
  useEffect(() => {
    const handleDeepLinkReturn = async () => {
      const url = new URL(window.location.href);
      const errorCode = url.searchParams.get('errorCode');
      const phantomPublicKey = url.searchParams.get('phantom_encryption_public_key');
      
      if (errorCode) {
        console.error('Wallet connection error:', errorCode);
        addMessage('Failed to connect wallet. Please try again.', 'bot');
        return;
      }

      if (phantomPublicKey) {
        try {
          const provider = (window as any).phantom?.solana;
          if (provider?.isPhantom) {
            const response = await provider.connect();
            if (response.publicKey) {
              setIsConnecting(true);
              setShowBackground(true);
              setConnectedPublicKey(response.publicKey.toString());
            }
          }
        } catch (error) {
          console.error('Error connecting after deep link return:', error);
          addMessage('Failed to connect wallet. Please try again.', 'bot');
        }
      }
    };

    // Check if we're returning from a deep link
    if (window.location.href.includes('phantom')) {
      handleDeepLinkReturn();
    }
  }, [addMessage]);

  const getPhantomWallet = () => {
    if ('phantom' in window) {
      const provider = (window as any).phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    // Check for Phantom mobile wallet
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Include the current URL as the redirect URL
      const currentUrl = encodeURIComponent(window.location.href);
      const url = `https://phantom.app/ul/browse/${currentUrl}`;
      window.location.href = url;
      return null;
    }

    window.open('https://phantom.app/', '_blank');
    return null;
  };

  const connectWallet = async () => {
    try {
      const provider = getPhantomWallet();
      if (!provider) {
        // If getPhantomWallet redirected to install/mobile app, we don't want to continue
        return;
      }

      // Try to connect to the wallet first
      const response = await provider.connect();
      
      // Only if connection is successful, start the animation sequence
      if (response.publicKey) {
        setIsConnecting(true);
        setShowBackground(true);
        setConnectedPublicKey(response.publicKey.toString());
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      addMessage('Failed to connect wallet. Please try again.', 'bot');
      setIsConnecting(false);
      setShowBackground(false);
      setConnectedPublicKey(null);
    }
  };

  const disconnectWallet = () => {
    const provider = getPhantomWallet();
    if (provider) {
      provider.disconnect();
    }
    setWalletConnection(false, null);
    setShowWelcome(true);
    setShowChatInput(false);
    setShowContent(false);
    setConnectedPublicKey(null);
  };

  const handleBotResponse = async (message: string) => {
    setIsTyping(true);
    
    // Calculate typing duration based on message length (50ms per character, minimum 1.5s)
    const typingDuration = Math.max(message.length * 50, 1500);
    
    await new Promise(resolve => setTimeout(resolve, typingDuration));
    setIsTyping(false);
    addMessage(message, 'bot');
  };

  const handleSendMessage = async (content: string) => {
    setShowWelcome(false);
    setShowChatInput(true);
    addMessage(content, 'user');

    // Handle different message types
    if (content === "Show me my portfolio balance") {
      await handleBotResponse("I'll show you your portfolio balance right away.");
      setTimeout(() => {
        toggleDashboard();
      }, 5000);
    } else if (content === "Latest crypto news") {
      await handleBotResponse("I'll show you the latest crypto news.");
      setTimeout(() => {
        toggleNews();
      }, 5000);
    } else {
      await handleBotResponse("Thank you for your message! This is a demo response.");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setShowWelcome(false);
    setShowChatInput(true);
    handleSendMessage(suggestion);
  };

  const resetToWelcome = () => {
    setShowWelcome(true);
    setShowChatInput(false);
    useStore.setState(state => ({
      ...state,
      messages: [],
      isDashboardOpen: false,
      isNewsOpen: false
    }));
  };

  if (!isWalletConnected) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center overflow-hidden relative">
        {showBackground && <WarpSpeed />}
        {showTitle && <AnimatedTitle />}
        <div className={`absolute inset-0 overflow-hidden ${isConnecting ? 'animate-success-fade' : ''}`}>
          <CryptoOrbit />
        </div>

        <div className={`relative z-10 max-w-md w-full mx-4 ${isConnecting ? 'animate-success-fade' : ''}`}>
          <div className="bg-[#1F1F1F]/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform transition-all duration-300 hover:scale-105 hover:border-blue-500/20 hover:shadow-2xl">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Welcome to Shift
            </h1>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Connect your wallet to start chatting with our AI assistant. Your conversations are secure and private.
            </p>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 active:scale-95"
            >
              <Wallet size={20} className="transition-transform duration-300 group-hover:rotate-12" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="fixed top-0 w-full bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#EAEAEA] dark:border-[#1F1F1F] z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={resetToWelcome}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img
                src="/assets/shift.jpg"
                alt="Shift AI Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Shift</h1>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[#F3F4F6] dark:hover:bg-[#1F1F1F] transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleNews}
                className="p-2 rounded-lg hover:bg-[#F3F4F6] dark:hover:bg-[#1F1F1F] transition-colors"
              >
                <Newspaper size={20} />
              </button>
              <button
                onClick={toggleDashboard}
                className="p-2 rounded-lg hover:bg-[#F3F4F6] dark:hover:bg-[#1F1F1F] transition-colors"
              >
                <LayoutDashboard size={20} />
              </button>
              <span className="text-sm font-medium">
                {truncateAddress(walletAddress || '')}
              </span>
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-24 relative">
        {showContent && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="min-h-[calc(100vh-12rem)] flex flex-col">
              {showWelcome ? (
                <WelcomeBox onSuggestionClick={handleSuggestionClick} />
              ) : (
                <>
                  {messages.map((message) => (
                    <ChatMessage key={message.id} {...message} />
                  ))}
                  {isTyping && (
                    <ChatMessage
                      content=""
                      sender="bot"
                      timestamp={new Date()}
                      isLoading={true}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {showContent && showChatInput && (
        <footer className="fixed bottom-0 w-full bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-t border-[#EAEAEA] dark:border-[#1F1F1F] animate-slide-up">
          <div className="container mx-auto max-w-3xl">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </footer>
      )}

      <Dashboard
        isOpen={isDashboardOpen}
        onClose={toggleDashboard}
        walletAddress={walletAddress || ''}
      />

      <News
        isOpen={isNewsOpen}
        onClose={toggleNews}
      />
    </div>
  );
}

export default App;