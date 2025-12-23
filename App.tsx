import React, { Suspense } from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import ServiceCard from './components/ServiceCard';
import TintAI from './components/TintAI';
import { Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Loader2 } from 'lucide-react';

// Lazy load heavy interactive components
const HorizontalScroll = React.lazy(() => import('./components/HorizontalScroll'));

function App() {
  const services = [
    {
      title: "Automotive",
      subtitle: "Precision Fit",
      description: "Computer-cut patterns for a flawless edge-to-edge finish. We use premium nano-ceramic films that reject up to 98% of infrared heat, protecting your interior and enhancing comfort.",
      image: "https://images.unsplash.com/photo-1605218427306-6354db69e563?q=80&w=1920&auto=format&fit=crop"
    },
    {
      title: "Residential",
      subtitle: "Home Efficiency",
      description: "Protect your furniture from fading and reduce cooling costs without sacrificing your view. Our architectural films offer privacy and energy efficiency for modern homes.",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Commercial",
      subtitle: "Security & Style",
      description: "Enhance building aesthetics and security. From anti-graffiti films to one-way privacy glass for offices, we provide scalable solutions for businesses.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-brand-black min-h-screen text-white selection:bg-brand-neon selection:text-black">
      <Navigation />
      
      {/* Hero Section - Loaded Immediately */}
      <Hero />

      {/* Horizontal Scroll Section (Scroll Jack) - Lazy Loaded */}
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-brand-black"><Loader2 className="animate-spin text-brand-neon" /></div>}>
        <HorizontalScroll />
      </Suspense>

      {/* AI Consultant Section - NEW INTEGRATION */}
      <div id="consultant">
        <TintAI />
      </div>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative">
         <div className="container mx-auto">
            <div className="mb-20">
                <h2 className="font-display text-5xl md:text-7xl text-white mb-6">
                  BEYOND <span className="text-brand-neon text-outline">FACTORY</span>
                </h2>
                <div className="w-24 h-1 bg-brand-neon"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index}
                  {...service}
                  delay={index * 0.2}
                />
              ))}
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="font-display text-2xl font-bold mb-6">SD<span className="text-brand-neon">TINT</span></h3>
              <p className="text-gray-500 max-w-sm leading-relaxed">
                Redefining automotive aesthetics through precision engineering and advanced material science. Experience the future of privacy.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6">Contact</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-brand-neon"/>
                    1234 Carbon Fiber Way, San Diego, CA
                </li>
                <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-brand-neon"/>
                    +1 (555) 000-TINT
                </li>
                <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-brand-neon"/>
                    concierge@sdtint.com
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Social</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-brand-neon hover:border-brand-neon transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-brand-neon hover:border-brand-neon transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-brand-neon hover:border-brand-neon transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs text-gray-600 uppercase tracking-widest">
            <p>&copy; 2024 SDTINT. All rights reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;