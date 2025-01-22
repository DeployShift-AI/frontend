import React from 'react';
import { cn } from '../lib/utils';
import { useTypewriter } from '../hooks/useTypewriter';

interface ChatMessageProps {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
}

const LoadingDots = () => (
  <div className="flex space-x-2">
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
  </div>
);

export const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  sender,
  timestamp,
  isLoading,
}) => {
  const typedText = useTypewriter(content, sender === 'bot' ? 50 : 0);

  return (
    <div
      className={cn(
        'flex w-full mb-6 items-end gap-2',
        sender === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      {sender === 'bot' && (
        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 mb-1">
          <img
            src="/assets/shift.jpg"
            alt="Shift AI Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div
        className={cn(
          'relative max-w-[85%] px-6 py-4 rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-200',
          sender === 'user'
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white animate-message-user'
            : 'bg-[#1F1F1F] dark:bg-[#141414] text-gray-100 animate-message-bot',
          sender === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
        )}
      >
        {isLoading ? (
          <LoadingDots />
        ) : (
          <>
            <p className="text-[15px] leading-relaxed">
              {sender === 'bot' ? typedText : content}
              {sender === 'bot' && typedText !== content && (
                <span className="animate-blink ml-1">|</span>
              )}
            </p>
            <span className="block text-xs mt-2 opacity-60">
              {timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </>
        )}
        <div
          className={cn(
            'absolute bottom-0 -z-10 h-4 w-4',
            sender === 'user'
              ? 'right-0 bg-blue-600'
              : 'left-0 bg-[#1F1F1F] dark:bg-[#141414]'
          )}
          style={{
            clipPath: sender === 'user'
              ? 'polygon(100% 0, 0 0, 100% 100%)'
              : 'polygon(0 0, 100% 0, 0 100%)'
          }}
        />
      </div>
    </div>
  );
};