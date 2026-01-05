import React from 'react';

const Vault: React.FC = () => {
  const artifacts = [
    { id: '01', title: 'The Silent Architect', loc: 'Dubai', img: 'https://picsum.photos/seed/vault1/800/1000' },
    { id: '02', title: 'Liquid Equity', loc: 'London', img: 'https://picsum.photos/seed/vault2/800/1000' },
    { id: '03', title: 'Sovereign Frame', loc: 'New York', img: 'https://picsum.photos/seed/vault3/800/1000' },
    { id: '04', title: 'Gilded Horizon', loc: 'Singapore', img: 'https://picsum.photos/seed/vault4/800/1000' },
  ];

  return (
    <div className="bg-navy min-h-screen pt-20 overflow-hidden relative">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* Entrance Hero */}
      <section className="h-[60vh] flex flex-col justify-center px-12 md:px-24">
        <h1 className="font-serif text-7xl md:text-9xl text-gold-foil mb-4">THE VAULT</h1>
        <p className="font-sans text-white/60 text-sm uppercase tracking-[0.3em] pl-2">Collection I: The Sovereign</p>
        
        <div className="mt-12 flex items-center gap-4 group cursor-pointer w-fit">
          <div className="h-[1px] w-24 bg-copper group-hover:w-32 transition-all duration-500"></div>
          <span className="text-copper text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Horizontal Gallery */}
      <section className="flex overflow-x-auto no-scrollbar pb-32 px-12 md:px-24 gap-32 items-center h-[80vh]">
        {artifacts.map((item) => (
          <div key={item.id} className="relative flex-shrink-0 group">
            {/* Background Chapter Number */}
            <div className="absolute -top-20 -left-10 text-[12rem] font-serif text-navy-lighter opacity-30 select-none z-0">
              {item.id}
            </div>

            {/* Image Frame */}
            <div className="relative z-10 w-[70vw] md:w-[40vw] h-[60vh] border border-transparent group-hover:border-copper/30 transition-all duration-500 p-1">
              <div className="w-full h-full overflow-hidden bg-black">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
              </div>
              
              {/* Subtle Glow */}
              <div className="absolute inset-0 shadow-[0_0_30px_rgba(183,121,92,0)] group-hover:shadow-[0_0_30px_rgba(183,121,92,0.1)] transition-shadow duration-500 pointer-events-none"></div>
            </div>

            {/* Caption */}
            <div className="absolute -bottom-16 left-0 z-20">
              <p className="font-sans text-[10px] text-copper uppercase tracking-[0.2em] mb-1">
                FIG {item.id}. / {item.title} / {item.loc}
              </p>
            </div>
          </div>
        ))}
        
        {/* End Spacer */}
        <div className="w-24 flex-shrink-0"></div>
      </section>
    </div>
  );
};

export default Vault;
