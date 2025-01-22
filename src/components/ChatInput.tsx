import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsTyping(true);
      onSendMessage(message);
      setMessage('');
      // Reset typing animation after a short delay
      setTimeout(() => setIsTyping(false), 300);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-4 bg-gradient-to-b from-transparent to-[#0A0A0A]/50"
    >
      <div className="relative flex items-center gap-3 p-1 bg-[#1F1F1F] dark:bg-[#141414] rounded-2xl border border-white/5 shadow-xl backdrop-blur-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500/20">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          placeholder={
            disabled ? 'Connect wallet to chat' : 'Type your message here...'
          }
          className="flex-1 p-4 bg-transparent text-[15px] text-white placeholder-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className={`mr-1 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20 transform hover:scale-105 active:scale-95 ${
            isTyping ? 'animate-send-message' : ''
          }`}
        >
          <Send size={20} className={isTyping ? 'animate-send-icon' : ''} />
        </button>
      </div>
    </form>
  );
};