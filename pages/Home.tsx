import React, { useEffect, useRef, useState } from 'react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const el = containerRef.current;
    if (el) el.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (el) el.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
      >
        {/* Molten Copper Background Simulation (Canvas/Video Placeholder) */}
        <div className="absolute inset-0 z-0 opacity-60">
           <img 
             src="https://picsum.photos/seed/aneef-copper/1920/1080" 
             className="w-full h-full object-cover blur-sm scale-110 animate-pulse-slow" 
             alt="Molten Copper" 
           />
           {/* Darken overlay */}
           <div className="absolute inset-0 bg-navy/60 mix-blend-multiply"></div>
        </div>

        {/* Torchlight Effect */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light transition-opacity duration-75"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(183, 121, 92, 0.15) 0%, rgba(15, 40, 68, 0.8) 40%, rgba(15, 40, 68, 1) 100%)`
          }}
        />

        {/* Center Content */}
        <div className="relative z-20 text-center">
          <div className="mb-6">
             <span className="material-symbols-outlined text-6xl text-gold-foil">diamond</span>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-gold-foil tracking-tight mb-4">
            ANEEF
          </h1>
          <p className="text-copper font-sans uppercase tracking-[0.4em] text-sm md:text-base">
            Liquid Sovereignty
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-copper"></div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative py-32 px-6 md:px-12 bg-navy border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-white/40 font-sans text-xs uppercase tracking-[0.2em] mb-8 block">The Philosophy</span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-12">
            In a world of noise, we provide <span className="text-copper italic">silence</span>. 
            In an economy of volatility, we architect <span className="text-copper italic">permanence</span>.
          </h2>
          <p className="font-sans text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            We operate at the intersection of extreme privacy and boundless capability. 
            For the Sovereign Individual, visibility is a liability. We manage your visual assets 
            with the same rigor applied to your financial portfolio.
          </p>
        </div>
      </section>

      {/* Dual Path Section */}
      <section className="relative h-screen flex flex-col md:flex-row overflow-hidden">
        {/* Left: The Mandate */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative group cursor-pointer border-b md:border-b-0 md:border-r border-white/10" onClick={() => onNavigate(Page.INSTITUTION)}>
          <div className="absolute inset-0 bg-navy transition-all duration-700 md:group-hover:w-[140%] z-0">
             <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/arch/800/1200')] bg-cover bg-center mix-blend-overlay"></div>
          </div>
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center md:items-start p-12 transition-transform duration-500 group-hover:scale-105">
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-4">THE MANDATE</h3>
            <p className="font-sans text-white/60 text-sm uppercase tracking-widest mb-8">For the Executive. Privacy Guaranteed.</p>
            <span className="text-copper text-xs border-b border-copper pb-1">Discover The Institution</span>
          </div>
        </div>

        {/* Right: Accelerate */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative group cursor-pointer" onClick={() => onNavigate(Page.CONCIERGE)}>
          <div className="absolute inset-0 bg-navy-light transition-all duration-700 md:group-hover:w-[140%] md:group-hover:-translate-x-[20%] z-0">
             <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/jet/800/1200')] bg-cover bg-center mix-blend-overlay"></div>
          </div>
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center md:items-end p-12 text-right transition-transform duration-500 group-hover:scale-105">
            <h3 className="font-serif text-4xl md:text-5xl text-white mb-4">ACCELERATE</h3>
            <p className="font-sans text-white/60 text-sm uppercase tracking-widest mb-8">For the Aspirational. Velocity & Scale.</p>
            <span className="text-copper text-xs border-b border-copper pb-1">Access Concierge</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
