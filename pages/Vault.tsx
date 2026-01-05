import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '../constants';

interface Artifact {
  id: string;
  title: string;
  era: string;
  material: string;
  img: string;
}

const sovereignCollection: Artifact[] = [
  { id: '001', title: 'Crown of Aethelgard', era: 'Circa 1200 AD', material: 'Gold & Ruby', img: ASSETS.VAULT.SOVEREIGN_CROWN },
  { id: '002', title: 'Scepter of Dawn', era: '1250 AD', material: 'Bronze', img: ASSETS.VAULT.SOVEREIGN_SCEPTER },
  { id: '003', title: 'The Obsidian Scroll', era: 'Unknown Era', material: 'Black Stone', img: ASSETS.VAULT.SOVEREIGN_SCROLL },
  { id: '004', title: 'Vessel of Night', era: '1300 AD', material: 'Ceramic', img: ASSETS.VAULT.SOVEREIGN_VESSEL },
  { id: '005', title: 'Imperial Coinage', era: '1150 AD', material: 'Gold', img: ASSETS.VAULT.SOVEREIGN_COIN },
];

const Vault: React.FC = () => {
  const [viewMode, setViewMode] = useState<'entrance' | 'collection'>('entrance');
  const [lightboxImage, setLightboxImage] = useState<Artifact | null>(null);
  
  // Horizontal Scroll Refs
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  // Horizontal Scroll Logic
  useEffect(() => {
    if (viewMode !== 'entrance') return;

    const container = horizontalContainerRef.current;
    if (!container) return;

    let scrollPos = 0;
    const scrollSpeed = 0.7; // Sensitivity

    const handleWheel = (e: WheelEvent) => {
      // If we are in entrance mode, hijack vertical scroll for horizontal movement
      e.preventDefault();
      
      const maxScroll = container.scrollWidth - window.innerWidth;
      scrollPos += e.deltaY * scrollSpeed;
      scrollPos = Math.max(0, Math.min(scrollPos, maxScroll));
      
      container.style.transform = `translateX(-${scrollPos}px)`;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [viewMode]);

  const openLightbox = (item: Artifact) => setLightboxImage(item);
  const closeLightbox = () => setLightboxImage(null);

  // Navigate Lightbox
  const nextLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = sovereignCollection.findIndex(i => i.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % sovereignCollection.length;
    setLightboxImage(sovereignCollection[nextIndex]);
  };

  const prevLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = sovereignCollection.findIndex(i => i.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + sovereignCollection.length) % sovereignCollection.length;
    setLightboxImage(sovereignCollection[prevIndex]);
  };

  return (
    <div className="bg-navy min-h-screen relative overflow-hidden font-display text-white selection:bg-copper/30">
      
      {/* Film Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
      </div>

      {/* MODE 1: Horizontal Scroll Entrance */}
      {viewMode === 'entrance' && (
        <div className="w-screen h-screen overflow-hidden relative bg-navy">
            {/* Scroll Container */}
            <div ref={horizontalContainerRef} className="flex h-full w-fit transition-transform duration-100 ease-out will-change-transform">
                
                {/* 1. Entrance Title */}
                <section className="flex-shrink-0 w-screen h-full flex flex-col items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-radial from-copper/5 to-transparent opacity-50"></div>
                    <h1 className="text-8xl md:text-[10rem] lg:text-[12rem] font-serif font-bold leading-none text-gradient-gold drop-shadow-2xl z-10">
                        THE VAULT
                    </h1>
                    <p className="text-white/70 text-sm md:text-base tracking-[0.6em] uppercase font-sans mt-4 z-10">
                        Collection I: The Sovereign
                    </p>
                    <div className="mt-20 flex items-center justify-center gap-4 cursor-pointer group z-10" onClick={() => setViewMode('collection')}>
                        <span className="text-copper text-xs tracking-[0.3em] uppercase group-hover:text-gold-light transition-colors">Explore Collections</span>
                         <span className="material-symbols-outlined text-copper group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
                    </div>
                     <div className="absolute bottom-10 right-10 flex items-center gap-2 opacity-50 animate-pulse">
                        <span className="text-[10px] uppercase tracking-widest text-copper">Scroll</span>
                        <span className="material-symbols-outlined text-copper text-sm">arrow_forward</span>
                    </div>
                </section>

                {/* 2. Artifacts & Transitions */}
                {sovereignCollection.slice(0, 3).map((item, idx) => (
                    <React.Fragment key={item.id}>
                        {/* Artifact View */}
                        <section className="flex-shrink-0 w-screen h-full flex items-center justify-center relative">
                            <div className="relative w-[70vh] h-[70vh] group cursor-pointer" onClick={() => setViewMode('collection')}>
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover shadow-2xl transition-transform duration-700 group-hover:scale-105" />
                                {/* Copper Edge */}
                                <div className="absolute inset-0 border border-copper/30 shadow-[0_0_10px_rgba(183,121,92,0.4)] pointer-events-none transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(183,121,92,0.6)]"></div>
                                {/* Caption */}
                                <div className="absolute -bottom-16 left-0">
                                    <p className="text-copper text-[10px] uppercase tracking-[0.2em] font-mono">
                                        FIG 0{idx + 1}. / {item.title.toUpperCase()} / {item.era.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Transition View (Negative Space) */}
                         <section className="flex-shrink-0 w-[50vw] h-full flex items-center justify-center relative overflow-hidden">
                            <span className="text-white/[0.03] text-[30vw] font-serif font-bold pointer-events-none select-none">
                                0{idx + 1}
                            </span>
                        </section>
                    </React.Fragment>
                ))}

                 <section className="flex-shrink-0 w-screen h-full flex items-center justify-center">
                    <button 
                        onClick={() => setViewMode('collection')}
                        className="px-12 py-6 border border-copper/50 text-copper text-xl font-serif italic hover:bg-copper/10 transition-colors"
                    >
                        View Full Collection
                    </button>
                </section>
            </div>
        </div>
      )}

      {/* MODE 2: Collection Details (Vertical) */}
      {viewMode === 'collection' && (
        <div className="relative min-h-screen flex flex-col pt-24 animate-fade-in">
             {/* Back to Horizontal Entrance */}
             <div className="fixed top-24 left-6 z-40">
                 <button onClick={() => setViewMode('entrance')} className="flex items-center gap-2 text-copper/60 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span className="text-[10px] uppercase tracking-widest">Back to Entrance</span>
                 </button>
             </div>

            <div className="w-full max-w-[1440px] mx-auto px-6 mb-12 flex justify-end">
                <div className="hidden md:flex items-center gap-3">
                    <span className="h-px w-8 bg-copper/30"></span>
                    <span className="text-copper-dim text-xs font-medium uppercase tracking-[0.2em]">Collection I of V</span>
                    <span className="h-px w-8 bg-copper/30"></span>
                </div>
            </div>

            {/* Header */}
            <div className="w-full max-w-[960px] mx-auto px-6 pb-20 text-center">
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] mb-6 text-gradient-gold drop-shadow-2xl">
                    THE SOVEREIGN
                </h1>
                <div className="flex flex-col items-center gap-8">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-copper to-transparent"></div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed font-sans">
                        A curated study in power, permanence, and the artifacts of a forgotten dynasty. 
                        Recovered from the sunken archives, each piece tells a story of a civilization at its zenith, 
                        accented by the signature ANEEF copper patina.
                    </p>
                </div>
            </div>

            {/* Grid Gallery */}
            <div className="w-full max-w-[1280px] mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sovereignCollection.map((item, idx) => (
                        <div 
                            key={item.id} 
                            className={`group flex flex-col gap-4 ${idx === 0 ? 'lg:row-span-2' : ''}`}
                            onClick={() => openLightbox(item)}
                        >
                            <div className={`relative overflow-hidden rounded-sm border border-copper/20 bg-navy-dark shadow-xl cursor-zoom-in transition-all duration-500 group-hover:border-gold-light/50 group-hover:shadow-[0_0_20px_-5px_rgba(236,146,19,0.2)] ${idx === 0 ? 'aspect-[3/4] lg:h-full' : 'aspect-square'}`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60 z-10"></div>
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
                                
                                <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none">
                                    <p className="text-gold-light text-xs font-bold uppercase tracking-widest mb-1">Lot {item.id}</p>
                                    <h3 className="text-white font-serif text-xl md:text-2xl">{item.title}</h3>
                                    <p className="text-copper text-xs mt-1">{item.era} • {item.material}</p>
                                </div>
                                {/* Persistent Copper Edge */}
                                <div className="absolute inset-0 border border-copper/10 pointer-events-none"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="w-full max-w-4xl mx-auto px-6 mb-24">
                <div className="relative overflow-hidden rounded border border-copper/30 bg-navy-dark/60 p-10 md:p-16 text-center shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-radial from-copper/10 to-navy-dark opacity-50 z-0"></div>
                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <h2 className="font-serif text-3xl md:text-4xl text-white">Interested in this collection?</h2>
                        <p className="text-copper-dim max-w-lg mx-auto text-sm md:text-base leading-relaxed font-sans">
                            To receive a private dossier, detailed provenance, or to schedule a viewing of The Sovereign collection, please submit a formal inquiry.
                        </p>
                        <button className="px-10 py-4 bg-navy-dark border border-copper text-copper hover:text-white hover:bg-copper transition-all duration-500 uppercase tracking-[0.15em] text-xs font-bold rounded-sm">
                            Request More Information
                        </button>
                    </div>
                </div>
            </div>

            {/* Collection Nav Footer */}
            <div className="w-full border-t border-copper/10 mt-auto bg-navy-dark/30 backdrop-blur-sm">
                <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between divide-y md:divide-y-0 md:divide-x divide-copper/10">
                    <button className="group flex-1 py-10 px-6 md:px-12 hover:bg-white/[0.02] transition-colors flex flex-col items-start gap-2 text-left">
                        <span className="text-copper/60 text-xs font-bold uppercase tracking-widest group-hover:text-gold-light transition-colors flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Previous Collection
                        </span>
                        <span className="font-serif text-2xl md:text-3xl text-white group-hover:translate-x-2 transition-transform duration-300">The Genesis</span>
                    </button>
                    <button className="group flex-1 py-10 px-6 md:px-12 hover:bg-white/[0.02] transition-colors flex flex-col items-end gap-2 text-right">
                        <span className="text-copper/60 text-xs font-bold uppercase tracking-widest group-hover:text-gold-light transition-colors flex items-center gap-2">
                            Next Collection
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </span>
                        <span className="font-serif text-2xl md:text-3xl text-white group-hover:-translate-x-2 transition-transform duration-300">The Dynasty</span>
                    </button>
                </div>
            </div>

             {/* Lightbox Overlay */}
             {lightboxImage && (
                <div className="fixed inset-0 z-[60] bg-navy-dark/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <button 
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-copper hover:text-white transition-colors z-50 p-2"
                    >
                        <span className="material-symbols-outlined text-4xl">close</span>
                    </button>
                    
                    <button 
                        onClick={prevLightbox}
                        className="hidden md:block absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-copper hover:text-white transition-colors p-4 z-50 hover:bg-white/5 rounded-full"
                    >
                        <span className="material-symbols-outlined text-5xl">chevron_left</span>
                    </button>

                    <div className="relative group max-w-[90vw] max-h-[85vh]">
                        <img 
                            src={lightboxImage.img} 
                            alt={lightboxImage.title} 
                            className="max-w-full max-h-[85vh] object-contain shadow-[0_0_50px_-10px_rgba(236,146,19,0.15)] border border-copper/20" 
                        />
                         <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-navy-dark via-navy-dark/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="font-serif text-2xl text-white">{lightboxImage.title}</h3>
                            <p className="text-copper text-sm uppercase tracking-widest mt-1">Lot {lightboxImage.id} • {lightboxImage.era}</p>
                        </div>
                    </div>

                    <button 
                        onClick={nextLightbox}
                        className="hidden md:block absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-copper hover:text-white transition-colors p-4 z-50 hover:bg-white/5 rounded-full"
                    >
                        <span className="material-symbols-outlined text-5xl">chevron_right</span>
                    </button>
                </div>
             )}
        </div>
      )}
    </div>
  );
};

export default Vault;