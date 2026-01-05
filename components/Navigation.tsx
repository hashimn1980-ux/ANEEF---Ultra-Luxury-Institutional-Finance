import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', page: Page.HOME },
    { label: 'The Institution', page: Page.INSTITUTION },
    { label: 'The Vault', page: Page.VAULT },
    { label: 'Concierge', page: Page.CONCIERGE },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-6 
        ${scrolled ? 'bg-navy border-b border-copper' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div 
          className="font-serif text-2xl font-bold tracking-widest cursor-pointer text-gold-foil"
          onClick={() => onNavigate(Page.HOME)}
        >
          ANEEF
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => onNavigate(link.page)}
              className={`text-xs uppercase tracking-[0.2em] font-sans transition-colors duration-300
                ${currentPage === link.page ? 'text-white border-b border-copper pb-1' : 'text-white/60 hover:text-copper'}
              `}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Icon (Placeholder) */}
        <button className="md:hidden text-copper">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
