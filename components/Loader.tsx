import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'drawing' | 'filling' | 'done'>('drawing');

  useEffect(() => {
    // 1. Start Filling after drawing (simulated by CSS time)
    const fillTimer = setTimeout(() => {
      setStage('filling');
    }, 1500);

    // 2. Complete and reveal
    const doneTimer = setTimeout(() => {
      setStage('done');
      setTimeout(onComplete, 1000); // Wait for curtain animation
    }, 3500);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]
      ${stage === 'done' ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* SVG Logo Mockup */}
        <svg viewBox="0 0 100 100" className="w-32 h-32 overflow-visible">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bf953f" />
              <stop offset="50%" stopColor="#fcf6ba" />
              <stop offset="100%" stopColor="#b38728" />
            </linearGradient>
          </defs>
          
          {/* Animated Path */}
          <path 
            d="M50 5 L95 95 L5 95 Z" 
            fill={stage === 'filling' || stage === 'done' ? "url(#goldGradient)" : "transparent"}
            stroke="#B7795C" 
            strokeWidth="1"
            className="transition-all duration-[2000ms] ease-in-out"
            style={{
              strokeDasharray: 300,
              strokeDashoffset: stage === 'drawing' ? 300 : 0,
              opacity: stage === 'done' ? 0 : 1
            }}
          />
          <text 
            x="50" 
            y="70" 
            textAnchor="middle" 
            fill={stage === 'filling' || stage === 'done' ? "url(#goldGradient)" : "transparent"}
            stroke="#B7795C"
            strokeWidth="0.5"
            className="font-serif text-[20px] transition-all duration-[2000ms]"
            style={{ opacity: stage === 'done' ? 0 : 1 }}
          >
            ANEEF
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
