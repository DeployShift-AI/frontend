import React from 'react';
import { X, Newspaper, ExternalLink } from 'lucide-react';

interface NewsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const News: React.FC<NewsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-[#0A0A0A] shadow-xl border-l border-[#EAEAEA] dark:border-[#1F1F1F] overflow-y-auto">
        <div className="sticky top-0 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#EAEAEA] dark:border-[#1F1F1F] z-10">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-2">
              <Newspaper className="text-[#2563EB]" size={20} />
              <h2 className="text-xl font-semibold">Crypto News</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#F3F4F6] dark:hover:bg-[#1F1F1F] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Featured News */}
          <div className="bg-[#F3F4F6] dark:bg-[#1F1F1F] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-500 rounded-full">Featured</span>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Bitcoin Surges Past $60,000 as Institutional Adoption Grows</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">The world's largest cryptocurrency continues its upward trajectory as major financial institutions increase their crypto holdings...</p>
            <a href="#" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
              Read more <ExternalLink size={16} />
            </a>
          </div>

          {/* Latest News */}
          <div className="space-y-6">
            <div className="bg-[#F3F4F6] dark:bg-[#1F1F1F] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">4 hours ago</span>
              </div>
              <h3 className="text-base font-semibold mb-2">Ethereum Layer 2 Solutions See Record Transaction Volume</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Scaling solutions on Ethereum reach new milestones as adoption continues to grow...</p>
              <a href="#" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors text-sm">
                Read more <ExternalLink size={14} />
              </a>
            </div>

            <div className="bg-[#F3F4F6] dark:bg-[#1F1F1F] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">6 hours ago</span>
              </div>
              <h3 className="text-base font-semibold mb-2">Solana NFT Market Shows Strong Recovery in Q1</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">The Solana NFT ecosystem demonstrates resilience with increasing trading volumes...</p>
              <a href="#" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors text-sm">
                Read more <ExternalLink size={14} />
              </a>
            </div>

            <div className="bg-[#F3F4F6] dark:bg-[#1F1F1F] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">8 hours ago</span>
              </div>
              <h3 className="text-base font-semibold mb-2">Major Bank Launches Crypto Custody Service</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Traditional financial institutions continue to embrace digital assets with new service offerings...</p>
              <a href="#" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors text-sm">
                Read more <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};