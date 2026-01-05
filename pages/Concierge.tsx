import React, { useState } from 'react';

const Concierge: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-navy min-h-screen pt-20 flex flex-col md:flex-row">
      
      {/* Left Column: Info */}
      <div className="w-full md:w-[40%] bg-navy p-12 md:p-24 flex flex-col justify-between border-r border-white/5">
        <div>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-8 leading-tight">
            Application for <br/><span className="text-copper italic">Visual Audit</span>
          </h1>
          <p className="text-white/60 font-sans text-sm leading-relaxed max-w-sm">
            Membership is by invitation or application only. Please complete the mandate to initiate your dossier review.
          </p>
        </div>

        <div className="mt-16 md:mt-0">
          <div className="mb-8">
            <h4 className="text-copper text-xs uppercase tracking-widest mb-2">Secure Line</h4>
            <p className="text-white font-serif">+44 20 7123 4567</p>
          </div>
          <div>
            <h4 className="text-copper text-xs uppercase tracking-widest mb-2">Headquarters</h4>
            <p className="text-white/60 text-sm font-sans">
              1 Canada Square<br/>
              Canary Wharf, London<br/>
              E14 5AB
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full md:w-[60%] bg-navy-light p-12 md:p-24 flex items-center justify-center relative">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-12">
            
            {/* Input Group */}
            <div className="group">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/20 focus:outline-none focus:border-copper transition-colors font-serif text-xl"
                required
              />
            </div>

            <div className="group">
              <input 
                type="email" 
                placeholder="Corporate Email" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/20 focus:outline-none focus:border-copper transition-colors font-serif text-xl"
                required
              />
            </div>

            <div className="group">
              <input 
                type="text" 
                placeholder="Company Name" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/20 focus:outline-none focus:border-copper transition-colors font-serif text-xl"
              />
            </div>

            <div className="group">
              <input 
                type="text" 
                placeholder="LinkedIn URL" 
                className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-white/20 focus:outline-none focus:border-copper transition-colors font-serif text-xl"
              />
            </div>

            <div className="group">
              <select className="w-full bg-transparent border-b border-white/20 py-4 text-white/60 focus:outline-none focus:border-copper transition-colors font-serif text-xl appearance-none rounded-none">
                <option value="" disabled selected>Select Mandate Type</option>
                <option value="audit" className="bg-navy">Visual Audit</option>
                <option value="retainer" className="bg-navy">Monthly Retainer</option>
                <option value="advisory" className="bg-navy">Strategic Advisory</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full py-6 border border-white/10 hover:border-copper group transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 text-copper text-xs font-bold uppercase tracking-[0.3em] group-hover:text-white transition-colors">Submit Mandate</span>
              <div className="absolute inset-0 bg-copper transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>

          </form>
        ) : (
          <div className="text-center animate-shine">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-2 border-gold-foil mb-8 relative">
              <span className="material-symbols-outlined text-6xl text-gold-foil">verified</span>
              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-copper"></div>
            </div>
            <h2 className="font-serif text-3xl text-white mb-4">Mandate Received.</h2>
            <p className="text-white/60 font-sans max-w-sm mx-auto leading-relaxed">
              The Directorate will review your profile within 48 hours. Secure communication channels will be established upon approval.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Concierge;
