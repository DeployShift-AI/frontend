import React from 'react';
import { X, TrendingUp, PieChart, LineChart, Star } from 'lucide-react';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  isOpen,
  onClose,
  walletAddress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-[#0A0A0A] shadow-xl border-l border-[#EAEAEA] dark:border-[#1F1F1F] overflow-y-auto">
        <div className="sticky top-0 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#EAEAEA] dark:border-[#1F1F1F] z-10">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#F3F4F6] dark:hover:bg-[#1F1F1F] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Portfolio Value */}
          <div className="bg-[#F3F4F6] dark:bg-[#1F1F1F] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-[#2563EB]" size={20} />
              <h3 className="font-semibold">Total Portfolio Value</h3>
            </div>
            <p className="text-3xl font-bold">$12,345.67</p>
            <p className="text-sm text-green-500 mt-1">+2.5% (24h)</p>
          </div>

          {/* Asset Holdings */}
          <div className="bg-[#F3F4F6] dark:bg-[#1F1F1F] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="text-[#2563EB]" size={20} />
              <h3 className="font-semibold">Asset Holdings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SOL</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Solana</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">2.5 SOL</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">$250.00</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">USDC</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">USD Coin</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">1000 USDC</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">$1,000.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Insights */}
          <div className="bg-[#F3F4F6] dark:bg-[#1F1F1F] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <LineChart className="text-[#2563EB]" size={20} />
              <h3 className="font-semibold">Portfolio Insights</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm">24h Change</p>
                <p className="text-sm font-medium text-green-500">+$45.67</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">7d Change</p>
                <p className="text-sm font-medium text-red-500">-$123.45</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">30d Change</p>
                <p className="text-sm font-medium text-green-500">+$567.89</p>
              </div>
            </div>
          </div>

          {/* Watchlist */}
          <div className="bg-[#F3F4F6] dark:bg-[#1F1F1F] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-[#2563EB]" size={20} />
              <h3 className="font-semibold">Watchlist</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">BTC</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bitcoin</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$45,678.90</p>
                  <p className="text-sm text-green-500">+1.2%</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">ETH</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ethereum</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">$2,345.67</p>
                  <p className="text-sm text-red-500">-0.5%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};