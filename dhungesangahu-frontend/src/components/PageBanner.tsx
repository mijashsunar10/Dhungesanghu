import React from 'react';
import { Sparkles } from 'lucide-react';

interface PageBannerProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({ title, subtitle, badge }) => {
  return (
    <section className="bg-gradient-to-r from-[#652d90] to-[#4b1f6b] text-white py-16 px-6 text-center relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-20px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto flex flex-col gap-3 relative z-10 items-center">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#ffdd57] text-[#4b1f6b] font-bold text-xs uppercase tracking-wider rounded-full shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
            {badge}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight drop-shadow-sm mt-2">
          {title}
        </h1>
        <p className="text-purple-200 font-light text-base sm:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
};
