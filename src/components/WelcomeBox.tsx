import React, { useState, useEffect, useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { useStore } from '../store/useStore';

interface WelcomeBoxProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
  "Show me my portfolio balance",
  "How do I stake SOL?",
  "What are the current gas fees?",
  "Latest crypto news",
];

export const WelcomeBox: React.FC<WelcomeBoxProps> = ({ onSuggestionClick }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatText = useTypewriter("How can I help you today?", 100);
  
  useEffect(() => {
    if (chatText.length === "How can I help you today?".length) {
      const timer = setTimeout(() => {
        setShowSuggestions(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [chatText]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSuggestionClick(inputValue);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionClick(suggestion);
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full mx-4">
        <div className="bg-[#1F1F1F]/50 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transform transition-all duration-300 hover:border-blue-500/20 hover:shadow-2xl mb-8 animate-fade-in">
          <div className="flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={chatText}
              className="w-full bg-transparent text-xl leading-relaxed text-gray-300 placeholder-gray-500 focus:outline-none"
            />
            <span className="animate-blink text-gray-300">|</span>
          </div>
        </div>

        {showSuggestions && (
          <div className="grid grid-cols-2 gap-6">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-6 bg-[#1F1F1F]/50 backdrop-blur-xl rounded-xl text-left hover:bg-[#2A2A2A] dark:hover:bg-[#1A1A1A] transition-all duration-300 border border-white/10 hover:border-blue-500/20 hover:scale-105 animate-float-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="text-base text-gray-300">{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};