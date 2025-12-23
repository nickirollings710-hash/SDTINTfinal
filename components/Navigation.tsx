import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-white/10 py-4' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-white/5 border border-white/20 rounded-sm flex items-center justify-center group-hover:border-brand-neon/50 group-hover:bg-brand-neon/10 transition-all duration-300 relative overflow-hidden">
             {/* Abstract Geometric Logo representing Precision/Layers */}
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" className="text-white group-hover:text-white transition-colors duration-300"/>
                <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="1.5" className="text-white/20 group-hover:text-white/40 transition-colors duration-300"/>
                <path d="M12 12V22" stroke="#00f3ff" strokeWidth="1.5" className="group-hover:stroke-[#00f3ff] transition-colors duration-300"/>
                <path d="M12 12L22 17" stroke="#00f3ff" strokeWidth="1.5" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
             </svg>
             <div className="absolute inset-0 bg-brand-neon/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter text-white">
            SD<span className="text-brand-neon">TINT</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {['Automotive', 'Residential', 'Commercial', 'Technology'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-sans text-sm tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-brand-neon transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button className="px-6 py-2 bg-brand-neon text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors duration-300">
            Book Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
           {['Automotive', 'Residential', 'Commercial', 'Technology'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-2xl text-white hover:text-brand-neon transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;