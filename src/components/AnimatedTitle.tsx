import React, { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

export function AnimatedTitle() {
  const text = useTypewriter("Welcome to Shift AI", 150);
  const [showHeader, setShowHeader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Start fade in animation immediately
    setIsVisible(true);

    // Show header after typing completes
    if (text === "Welcome to Shift AI") {
      const timer = setTimeout(() => {
        setShowHeader(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [text]);
  
  return (
    <>
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-6xl font-bold text-white tracking-tight">
          {text}
          <span className="animate-blink ml-1">|</span>
        </h1>
      </div>
      {showHeader && (
        <header className="fixed top-0 w-full bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#EAEAEA] dark:border-[#1F1F1F] z-50 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-xl font-semibold tracking-tight text-white">Shift AI</h1>
          </div>
        </header>
      )}
    </>
  );
}