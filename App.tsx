import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import Institution from './pages/Institution';
import Vault from './pages/Vault';
import Concierge from './pages/Concierge';
import { Page } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [pageTransitioning, setPageTransitioning] = useState(false);

  // Handle Page Navigation with simple fade transition
  const handleNavigate = (page: Page) => {
    if (page === currentPage) return;
    setPageTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
      setPageTransitioning(false);
    }, 500); // Wait for fade out
  };

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div className="min-h-screen bg-navy flex flex-col">
          <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
          
          <main 
            className={`flex-grow transition-opacity duration-500 ease-in-out ${pageTransitioning ? 'opacity-0' : 'opacity-100'}`}
          >
            {currentPage === Page.HOME && <Home onNavigate={handleNavigate} />}
            {currentPage === Page.INSTITUTION && <Institution />}
            {currentPage === Page.VAULT && <Vault />}
            {currentPage === Page.CONCIERGE && <Concierge />}
          </main>

          <Footer onNavigate={handleNavigate} />
        </div>
      )}
    </>
  );
};

export default App;
