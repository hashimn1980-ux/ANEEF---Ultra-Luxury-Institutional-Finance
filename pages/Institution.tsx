import React, { useRef, useEffect, useState } from 'react';
import { ASSETS } from '../constants';

const Institution: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Cinematic Scroll Refs
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); // Replaced videoRef
  
  // Text Refs
  const textHeroRef = useRef<HTMLDivElement>(null);
  const textGenesisRef = useRef<HTMLDivElement>(null);
  const textPhilosophyRef = useRef<HTMLDivElement>(null);
  
  // Frame Management
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const frameCount = 192; // 0 to 191
  const imagesRef = useRef<HTMLImageElement[]>([]); // Store preloaded images in memory

  // 1. URL Generation Helper
  const currentFrame = (index: number) => {
    // Ensure we don't go out of bounds
    const safeIndex = Math.min(index, frameCount - 1);
    const paddedIndex = safeIndex.toString().padStart(3, '0');
    return `https://fhshakiacgnsnsvbrsdz.supabase.co/storage/v1/object/public/Ayman/webp-frames/frame_${paddedIndex}_delay-0.04s.jpg`;
  };

  // 2. Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const imageArray: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
         console.warn(`Failed to load frame ${i}`);
         loadedCount++;
         if (loadedCount === frameCount) setImagesLoaded(true);
      };
      imageArray.push(img);
    }
    imagesRef.current = imageArray;
  }, []);

  // 3. Canvas Rendering Logic (Simulates Object-Fit: Cover)
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];

    if (!ctx || !img || !img.complete) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate "Object-Fit: Cover" dimensions
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = img.width * (canvas.height / img.height);
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = img.height * (canvas.width / img.width);
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // 4. Initial Canvas Setup & Resize Handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-render current frame on resize (default to 0 if not scrolling)
      if (imagesLoaded) renderFrame(0);
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [imagesLoaded]);

  // 5. Horizontal Scroll Effect for Audit Section (Existing Logic)
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
         if (el.scrollLeft < el.scrollWidth - el.clientWidth && e.deltaY > 0) {
            e.preventDefault();
            el.scrollLeft += e.deltaY;
         } else if (el.scrollLeft > 0 && e.deltaY < 0) {
            e.preventDefault();
            el.scrollLeft += e.deltaY;
         }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // 6. Cinematic Scroll Scrubbing Logic (Updated for Canvas)
  useEffect(() => {
    const wrapper = heroWrapperRef.current;
    
    // Text Refs
    const heroText = textHeroRef.current;
    const genesisText = textGenesisRef.current;
    const philosophyText = textPhilosophyRef.current;

    if (!wrapper) return;

    const handleScrollScrub = () => {
      // Don't scrub if images aren't loaded yet
      if (!imagesLoaded) return;

      const rect = wrapper.getBoundingClientRect();
      const startScroll = rect.top; // Negative as we scroll down
      const scrollDistance = wrapper.offsetHeight - window.innerHeight;
      
      // Calculate Global Progress (0 to 1)
      let progress = 0;
      if (startScroll <= 0 && Math.abs(startScroll) < scrollDistance) {
        progress = Math.abs(startScroll) / scrollDistance;
      } else if (startScroll > 0) {
        progress = 0;
      } else {
        progress = 1;
      }

      // --- CANVAS UPDATE ---
      // Map progress (0-1) to Frame Index (0-191)
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * (frameCount - 1))
      );
      
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => renderFrame(frameIndex));

      // --- TEXT OPACITY LOGIC (Existing) ---
      
      // Stage 1: Hero Title (0.0 - 0.25)
      if (heroText) {
        let opacity = 1;
        if (progress > 0.1) {
            opacity = 1 - ((progress - 0.1) / 0.15); 
        }
        heroText.style.opacity = Math.max(0, opacity).toString();
        heroText.style.transform = `translateY(${progress * 100}px)`;
        heroText.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
      }

      // Stage 2: Genesis (0.3 - 0.6)
      if (genesisText) {
        let opacity = 0;
        if (progress > 0.25 && progress < 0.4) {
            opacity = (progress - 0.25) / 0.15;
        } else if (progress >= 0.4 && progress <= 0.6) {
            opacity = 1;
        } else if (progress > 0.6) {
            opacity = 1 - ((progress - 0.6) / 0.15);
        }
        genesisText.style.opacity = Math.max(0, opacity).toString();
        genesisText.style.transform = `translateY(${(progress - 0.3) * 50}px)`;
        genesisText.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
      }

      // Stage 3: Philosophy (0.65 - 0.95)
      if (philosophyText) {
        let opacity = 0;
        if (progress > 0.65 && progress < 0.8) {
            opacity = (progress - 0.65) / 0.15;
        } else if (progress >= 0.8) {
            opacity = 1;
        }
        philosophyText.style.opacity = Math.max(0, opacity).toString();
        philosophyText.style.transform = `translateY(${(progress - 0.65) * 50}px)`;
        philosophyText.style.pointerEvents = opacity > 0 ? 'auto' : 'none';
      }
    };

    window.addEventListener('scroll', handleScrollScrub);
    // Trigger once to set initial state
    handleScrollScrub();

    return () => {
      window.removeEventListener('scroll', handleScrollScrub);
    };
  }, [imagesLoaded]); // Only re-attach if load state changes

  return (
    <div className="bg-navy min-h-screen">
      
      {/* 1. CINEMATIC HERO HEADER (Scrubbing Section) */}
      <section 
        ref={heroWrapperRef}
        className="relative h-[400vh] w-full"
      >
        {/* Sticky Background Container */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
          
          {/* Loading Indicator */}
          {!imagesLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-50 bg-navy text-copper">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] animate-pulse mb-2">Initializing Assets</p>
                <p className="font-serif text-2xl">{loadProgress}%</p>
              </div>
            </div>
          )}

          {/* Canvas Layer */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full block transition-opacity duration-700 ${imagesLoaded ? 'opacity-50' : 'opacity-0'}`}
          />
          
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-navy/60 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy opacity-80 pointer-events-none"></div>

          {/* --- TEXT OVERLAYS --- */}
          
          {/* Stage 1: Hero Title */}
          <div ref={textHeroRef} className="absolute inset-0 flex items-center justify-center z-10 p-12 transition-opacity duration-100 ease-out">
              <div className="text-center">
                <div className="md:rotate-180 md:[writing-mode:vertical-rl] text-copper text-xs font-bold tracking-[0.3em] uppercase absolute left-6 top-1/2 -translate-y-1/2 hidden md:block opacity-60">
                    Est. 2024 / Dubai
                </div>
                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-6">
                    THE <br/><span className="text-gold-foil">INSTITUTION</span>
                </h1>
                <p className="text-white/60 font-sans text-lg uppercase tracking-[0.4em] max-w-xl mx-auto">
                    Guardians of Visual Sovereignty
                </p>
                <div className="mt-12 flex flex-col items-center gap-2 opacity-50 animate-pulse">
                    <span className="text-[10px] uppercase tracking-widest text-copper">Scroll to Initialize</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-copper to-transparent"></div>
                </div>
              </div>
          </div>

          {/* Stage 2: The Genesis */}
          <div ref={textGenesisRef} className="absolute inset-0 flex items-center justify-center z-20 p-6 md:p-12 opacity-0 pointer-events-none transition-opacity duration-100 ease-out">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="absolute -left-12 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-copper to-transparent"></div>
                <h3 className="text-copper text-xs uppercase tracking-[0.3em] mb-4 font-bold">The Founder's Genesis</h3>
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
                  Born from the <br/>
                  <span className="italic text-white/50">Necessity of Silence.</span>
                </h2>
                <p className="text-white/70 font-sans text-lg leading-relaxed max-w-md bg-navy/80 backdrop-blur-sm p-6 border-l border-white/10 shadow-2xl">
                  "I watched as the industry grew loud. Competitors screamed for attention while true power whispered. ANEEF was architected not to compete in the noise, but to own the silence."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-copper"></div>
                  <span className="text-white/40 text-xs uppercase tracking-widest">Elias Vane, Founder</span>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                 <div className="relative w-64 md:w-80 aspect-[3/4] border border-white/10 p-2 bg-navy/20 backdrop-blur-sm">
                    <img 
                      src={ASSETS.INSTITUTION.FOUNDER_PORTRAIT} 
                      alt="Founder" 
                      className="w-full h-full object-cover grayscale opacity-80"
                    />
                    <div className="absolute bottom-6 -left-6 bg-navy border border-copper px-6 py-2">
                       <span className="text-gold-foil font-serif text-xl italic">Est. 2024</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Stage 3: The Philosophy */}
          <div ref={textPhilosophyRef} className="absolute inset-0 flex items-center justify-center z-30 p-6 md:p-12 opacity-0 pointer-events-none transition-opacity duration-100 ease-out">
             <div className="max-w-4xl text-center">
               <span className="material-symbols-outlined text-6xl text-copper mb-8 animate-pulse-slow">architecture</span>
               <h2 className="font-serif text-5xl md:text-7xl text-white mb-12">
                 The Architect's <span className="text-gold-foil italic">Philosophy</span>
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div className="bg-navy/90 border border-white/5 p-8 backdrop-blur-md hover:border-copper/50 transition-colors">
                    <span className="text-copper font-serif text-3xl block mb-4">I.</span>
                    <h4 className="text-white text-sm uppercase tracking-widest mb-2 font-bold">Sovereignty</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Control is not negotiated; it is assumed. We return full asset ownership to the creator.</p>
                  </div>
                  <div className="bg-navy/90 border border-white/5 p-8 backdrop-blur-md transform md:-translate-y-8 hover:border-copper/50 transition-colors">
                    <span className="text-copper font-serif text-3xl block mb-4">II.</span>
                    <h4 className="text-white text-sm uppercase tracking-widest mb-2 font-bold">Permanence</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Trends fade. Legacy endures. We build visual systems designed to outlast the market cycle.</p>
                  </div>
                  <div className="bg-navy/90 border border-white/5 p-8 backdrop-blur-md hover:border-copper/50 transition-colors">
                    <span className="text-copper font-serif text-3xl block mb-4">III.</span>
                    <h4 className="text-white text-sm uppercase tracking-widest mb-2 font-bold">Eclipse</h4>
                    <p className="text-white/50 text-sm leading-relaxed">The brightest stars are often obscured. We manage your visibility to ensure maximum impact.</p>
                  </div>
               </div>
             </div>
          </div>

        </div>
      </section>

      {/* 2. NON-DISCLOSURE (Static Breaker) */}
      <section className="py-32 px-6 bg-navy relative z-40 border-t border-white/10">
        <div className="max-w-4xl mx-auto bg-navy-light border border-white/5 p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="material-symbols-outlined text-[12rem] text-copper">lock</span>
          </div>
          
          <div className="relative z-10 text-center">
            <span className="material-symbols-outlined text-5xl text-copper mb-6">verified_user</span>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">The Non-Disclosure Standard</h2>
            <p className="font-sans text-white/60 leading-loose">
              In an era of exposure, we offer the luxury of concealment. Your visual data is siloed, encrypted, 
              and legally bound by our ironclad NDA framework. We do not showcase your work; we protect it.
            </p>
          </div>
        </div>
      </section>

      {/* 3. VISUAL AUDIT (Horizontal Scroll) */}
      <section className="py-24 border-t border-white/5 bg-navy relative z-40">
        <div className="px-12 mb-12">
          <h2 className="font-serif text-4xl text-white mb-2">The Visual Audit</h2>
          <p className="text-white/40 text-sm uppercase tracking-widest">Process & Methodology</p>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar pl-12 pr-12 gap-24 h-[60vh] items-center"
        >
          {/* Step 1 */}
          <div className="flex-shrink-0 w-[80vw] md:w-[40vw] h-full flex flex-col justify-end group cursor-crosshair">
            <div 
              className="h-[70%] w-full bg-cover bg-center mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 skew-x-3 group-hover:skew-x-0 transform transition-transform border border-white/5 group-hover:border-copper/50"
              style={{ backgroundImage: `url('${ASSETS.INSTITUTION.STEP_1}')`}}
            ></div>
            <span className="text-gold-foil text-6xl font-serif mb-2">01</span>
            <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-2">Extraction</h3>
            <p className="text-white/50 text-sm max-w-sm">We audit every existing visual asset for compliance and quality, identifying leaks in your visual sovereignty.</p>
          </div>

          {/* Step 2 */}
          <div className="flex-shrink-0 w-[80vw] md:w-[40vw] h-full flex flex-col justify-end group cursor-crosshair">
            <div 
              className="h-[70%] w-full bg-cover bg-center mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 skew-x-3 group-hover:skew-x-0 transform transition-transform border border-white/5 group-hover:border-copper/50"
              style={{ backgroundImage: `url('${ASSETS.INSTITUTION.STEP_2}')`}}
            ></div>
            <span className="text-gold-foil text-6xl font-serif mb-2">02</span>
            <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-2">Refinement</h3>
            <p className="text-white/50 text-sm max-w-sm">Elevating the aesthetic baseline to institutional standards. Discarding the noise to reveal the signal.</p>
          </div>

          {/* Step 3 */}
          <div className="flex-shrink-0 w-[80vw] md:w-[40vw] h-full flex flex-col justify-end group cursor-crosshair">
            <div 
              className="h-[70%] w-full bg-cover bg-center mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 skew-x-3 group-hover:skew-x-0 transform transition-transform border border-white/5 group-hover:border-copper/50"
              style={{ backgroundImage: `url('${ASSETS.INSTITUTION.STEP_3}')`}}
            ></div>
            <span className="text-gold-foil text-6xl font-serif mb-2">03</span>
            <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-2">Preservation</h3>
            <p className="text-white/50 text-sm max-w-sm">Archiving assets in our secure Vault for future deployment. Your legacy, secured for the next century.</p>
          </div>
          
          {/* Spacer */}
          <div className="w-12 flex-shrink-0"></div>
        </div>
      </section>

    </div>
  );
};

export default Institution;