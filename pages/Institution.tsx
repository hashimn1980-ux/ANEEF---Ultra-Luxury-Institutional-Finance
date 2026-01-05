import React, { useRef, useEffect } from 'react';

const Institution: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If we are scrolling vertically, translate to horizontal scroll within this container
      // Ideally, we check if the container is in view and if we haven't reached end
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
            <div className="h-[70%] w-full bg-[url('https://picsum.photos/seed/step1/600/800')] bg-cover bg-center mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 skew-x-3 group-hover:skew-x-0 transform transition-transform"></div>
            <span className="text-gold-foil text-6xl font-serif mb-2">01</span>
            <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-2">Extraction</h3>
            <p className="text-white/50 text-sm">We audit every existing visual asset for compliance and quality.</p>
          </div>

          {/* Step 2 */}
          <div className="flex-shrink-0 w-[40vw] md:w-[30vw] h-full flex flex-col justify-end group">
            <div className="h-[70%] w-full bg-[url('https://picsum.photos/seed/step2/600/800')] bg-cover bg-center mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 skew-x-3 group-hover:skew-x-0 transform transition-transform"></div>
            <span className="text-gold-foil text-6xl font-serif mb-2">02</span>
            <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-2">Refinement</h3>
            <p className="text-white/50 text-sm">Elevating the aesthetic baseline to institutional standards.</p>
          </div>

          {/* Step 3 */}
          <div className="flex-shrink-0 w-[40vw] md:w-[30vw] h-full flex flex-col justify-end group">
            <div className="h-[70%] w-full bg-[url('https://picsum.photos/seed/step3/600/800')] bg-cover bg-center mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500 skew-x-3 group-hover:skew-x-0 transform transition-transform"></div>
            <span className="text-gold-foil text-6xl font-serif mb-2">03</span>
            <h3 className="text-white text-xl font-bold uppercase tracking-widest mb-2">Preservation</h3>
            <p className="text-white/50 text-sm">Archiving assets in our secure Vault for future deployment.</p>
          </div>
          
          {/* Spacer */}
          <div className="w-12 flex-shrink-0"></div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="py-24 px-6 text-center border-t border-white/5">
        <p className="font-serif italic text-2xl text-copper mb-8">"We define the standard, so you can lead the market."</p>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-white/40">Signed, The ANEEF Directorate</p>
      </section>
    </div>
  );
};

export default Institution;
