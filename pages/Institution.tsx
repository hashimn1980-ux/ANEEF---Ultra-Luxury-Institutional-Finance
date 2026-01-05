import React, { useRef, useEffect, useState } from 'react';
import { ASSETS } from '../constants';

const Institution: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Cinematic Scroll Refs
  const cinematicWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Horizontal Scroll Effect for Audit Section
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (el.scrollLeft < el.scrollWidth - el.clientWidth && e.deltaY > 0) {
         e.preventDefault();
         el.scrollLeft += e.deltaY;
      } else if (el.scrollLeft > 0 && e.deltaY < 0) {
         e.preventDefault();
         el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // Cinematic Scroll Scrubbing Logic
  useEffect(() => {
    const wrapper = cinematicWrapperRef.current;
    const video = videoRef.current;

    if (!wrapper || !video) return;

    const handleScrollScrub = () => {
      if (!videoLoaded && video.readyState < 2) return; // Ensure metadata loaded

      const rect = wrapper.getBoundingClientRect();
      const startScroll = rect.top;
      // Total scrollable distance is the wrapper height minus the viewport height
      const scrollDistance = wrapper.offsetHeight - window.innerHeight;
      
      // Calculate progress (0 to 1)
      let progress = 0;
      
      if (startScroll <= 0 && scrollDistance > 0) {
        // We are scrubbing
        progress = Math.abs(startScroll) / scrollDistance;
      } else if (startScroll > 0) {
        // Before section
        progress = 0;
      } else {
        // After section
        progress = 1;
      }

      // Clamp progress
      progress = Math.min(Math.max(progress, 0), 1);

      // Set video time
      if (Number.isFinite(video.duration)) {
        video.currentTime = video.duration * progress;
      }
    };

    window.addEventListener('scroll', handleScrollScrub);
    window.addEventListener('resize', handleScrollScrub);
    
    // Initial call
    handleScrollScrub();

    return () => {
      window.removeEventListener('scroll', handleScrollScrub);
      window.removeEventListener('resize', handleScrollScrub);
    };
  }, [videoLoaded]);

  return (
    <div className="bg-navy min-h-screen pt-20">
      
      {/* Manifesto Hero */}
      <section className="min-h-[80vh] flex flex-col md:flex-row border-b border-white/5">
        {/* Left Vertical Text */}
        <div className="w-full md:w-[20%] lg:w-[15%] h-[20vh] md:h-auto border-b md:border-b-0 md:border-r border-white/5 flex items-center justify-center relative bg-navy-light">
          <div className="md:absolute md:rotate-180 md:[writing-mode:vertical-rl] text-copper text-xs font-bold tracking-[0.3em] uppercase p-8 whitespace-nowrap">
            EST. 2024 / DUBAI / PRIVATE
          </div>
        </div>
        
        {/* Right Content */}
        <div className="w-full md:w-[80%] lg:w-[85%] p-12 md:p-24 flex items-center">
          <div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-12">
              WE DO NOT <br />
              <span className="text-white/30">SELL IMAGES.</span><br />
              WE MANAGE <br />
              <span className="text-gold-foil">ASSETS.</span>
            </h1>
            <p className="text-white/60 font-sans max-w-xl text-lg leading-relaxed">
              We are not a creative agency. We are the custodians of your institutional legacy, operating in the shadows to illuminate your vision.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Guarantee */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto bg-navy-light border border-white/5 p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <span className="material-symbols-outlined text-9xl text-copper">lock</span>
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

      {/* Visual Audit Process (Horizontal Scroll) */}
      <section className="py-24 border-t border-white/5">
        <div className="px-12 mb-12">
          <h2 className="font-serif text-4xl text-white mb-2">The Visual Audit</h2>
          <p className="text-white/40 text-sm uppercase tracking-widest">Process & Methodology</p>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto no-scrollbar pl-12 pr-12 gap-24 h-[60vh] items-center"
        >
          {/* Step 1 */}
          <div className="flex-shrink-0 w-[40vw] md:w-[30vw] h-full flex flex-col justify-end group">
            <div 
              className="h-[70%] w-full bg-cover bg-center mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 skew-x-3 group-hover:skew-x-0 transform transition-transform"
              style={{ backgroundImage: `url('${ASSETS.INSTITUTION.STEP_1}')`}}
            ></div>
            <span className="text-gold-foil text-6xl font-serif mb-2">01</span>
            <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-2">Extraction</h3>
            <p className="text-white/50 text-sm">We audit every existing visual asset for compliance and quality.</p>
          </div>

          {/* Step 2 */}
          <div className="flex-shrink-0 w-[40vw] md:w-[30vw] h-full flex flex-col justify-end group">
            <div 
              className="h-[70%] w-full bg-cover bg-center mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 skew-x-3 group-hover:skew-x-0 transform transition-transform"
              style={{ backgroundImage: `url('${ASSETS.INSTITUTION.STEP_2}')`}}
            ></div>
            <span className="text-gold-foil text-6xl font-serif mb-2">02</span>
            <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-2">Refinement</h3>
            <p className="text-white/50 text-sm">Elevating the aesthetic baseline to institutional standards.</p>
          </div>

          {/* Step 3 */}
          <div className="flex-shrink-0 w-[40vw] md:w-[30vw] h-full flex flex-col justify-end group">
            <div 
              className="h-[70%] w-full bg-cover bg-center mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 skew-x-3 group-hover:skew-x-0 transform transition-transform"
              style={{ backgroundImage: `url('${ASSETS.INSTITUTION.STEP_3}')`}}
            ></div>
            <span className="text-gold-foil text-6xl font-serif mb-2">03</span>
            <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-2">Preservation</h3>
            <p className="text-white/50 text-sm">Archiving assets in our secure Vault for future deployment.</p>
          </div>
          
          {/* Spacer */}
          <div className="w-12 flex-shrink-0"></div>
        </div>
      </section>

      {/* Cinematic Scroll Section (Genesis & Philosophy) */}
      <section 
        ref={cinematicWrapperRef}
        className="relative h-[300vh] w-full"
      >
        {/* Sticky Background Container */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          {/* Video Layer */}
          <video
            ref={videoRef}
            src={ASSETS.INSTITUTION.CINEMATIC_VIDEO}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={() => setVideoLoaded(true)}
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-navy/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy opacity-90"></div>
        </div>

        {/* Floating Overlay Content */}
        <div className="absolute inset-0 w-full z-20 pointer-events-none">
          
          {/* 1. The Founder's Genesis (Appears early) */}
          <div className="h-screen w-full flex items-center justify-center p-6 md:p-12">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="absolute -left-12 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-copper to-transparent"></div>
                <h3 className="text-copper text-xs uppercase tracking-[0.3em] mb-4 font-bold">The Founder's Genesis</h3>
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
                  Born from the <br/>
                  <span className="italic text-white/50">Necessity of Silence.</span>
                </h2>
                <p className="text-white/70 font-sans text-lg leading-relaxed max-w-md bg-navy/40 backdrop-blur-sm p-6 border-l border-white/10 pointer-events-auto">
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

          {/* 2. The Architect's Philosophy (Appears later) */}
          <div className="h-screen w-full flex items-center justify-center p-6 md:p-12">
             <div className="max-w-4xl text-center">
               <span className="material-symbols-outlined text-6xl text-copper mb-8 animate-pulse-slow">architecture</span>
               <h2 className="font-serif text-5xl md:text-7xl text-white mb-12">
                 The Architect's <span className="text-gold-foil italic">Philosophy</span>
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pointer-events-auto">
                  <div className="bg-navy/80 border border-white/5 p-8 backdrop-blur-md">
                    <span className="text-copper font-serif text-3xl block mb-4">I.</span>
                    <h4 className="text-white text-sm uppercase tracking-widest mb-2 font-bold">Sovereignty</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Control is not negotiated; it is assumed. We return full asset ownership to the creator.</p>
                  </div>
                  <div className="bg-navy/80 border border-white/5 p-8 backdrop-blur-md transform md:-translate-y-8">
                    <span className="text-copper font-serif text-3xl block mb-4">II.</span>
                    <h4 className="text-white text-sm uppercase tracking-widest mb-2 font-bold">Permanence</h4>
                    <p className="text-white/50 text-sm leading-relaxed">Trends fade. Legacy endures. We build visual systems designed to outlast the market cycle.</p>
                  </div>
                  <div className="bg-navy/80 border border-white/5 p-8 backdrop-blur-md">
                    <span className="text-copper font-serif text-3xl block mb-4">III.</span>
                    <h4 className="text-white text-sm uppercase tracking-widest mb-2 font-bold">Eclipse</h4>
                    <p className="text-white/50 text-sm leading-relaxed">The brightest stars are often obscured. We manage your visibility to ensure maximum impact.</p>
                  </div>
               </div>
             </div>
          </div>

          {/* Spacer for smooth exit */}
          <div className="h-[50vh]"></div>
        </div>
      </section>
    </div>
  );
};

export default Institution;