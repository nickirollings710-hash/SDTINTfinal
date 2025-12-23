import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Automotive', 'Residential', 'Commercial'];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-3' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-white/5 border border-white/20 rounded-sm flex items-center justify-center group-hover:border-brand-neon/50 group-hover:bg-brand-neon/10 transition-all duration-300 relative overflow-hidden">
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
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 hover:text-brand-neon transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-brand-neon transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <button className="px-6 py-2.5 bg-white text-black font-display font-bold text-[10px] uppercase tracking-widest hover:bg-brand-neon transition-all duration-300 active:scale-95">
            Book Appointment
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
             {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-3xl font-black text-white hover:text-brand-neon transition-colors tracking-tighter"
              >
                {item.toUpperCase()}
              </a>
            ))}
            <button className="mt-8 px-10 py-4 bg-brand-neon text-black font-display font-bold text-xs uppercase tracking-[0.2em]">
              Book Appointment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;