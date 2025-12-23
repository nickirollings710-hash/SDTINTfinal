import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const HorizontalScroll: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const panels = [
    {
      title: "AUTOMOTIVE",
      img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
      desc: "Precision Heat Rejection"
    },
    {
      title: "RESIDENTIAL",
      img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
      desc: "Architectural Clarity"
    },
    {
      title: "COMMERCIAL",
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      desc: "Security & Aesthetics"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    
    if (!section || !trigger) return;

    // A slightly sharper ease for a faster "feel"
    CustomEase.create("fastFlow", "0.2, 0.8, 0.2, 1");

    // Master Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        pin: true,
        scrub: 0.5, // Lower scrub value for more responsiveness (less lag)
        end: "+=1500", // Significantly reduced distance (was 3000) for faster flow
      }
    });

    // 1. Horizontal Scroll Logic
    const scrollAmount = -(section.scrollWidth - window.innerWidth);
    
    tl.to(section, {
      x: scrollAmount,
      ease: "none", // Using linear here, controlled by scroll
      duration: 1
    });

    // 2. Parallax Text Logic
    textRefs.current.forEach((text) => {
      if (text) {
        tl.to(text, {
          x: -100, // Reduced parallax shift to match faster speed
          ease: "none",
          duration: 1
        }, "<");
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const addToRefs = (el: HTMLHeadingElement | null, index: number) => {
    textRefs.current[index] = el;
  };

  return (
    <div ref={triggerRef} className="relative h-screen overflow-hidden bg-brand-black">
        {/* The horizontal track container */}
        <div ref={sectionRef} className="flex flex-nowrap h-full w-[300vw]">
            
            {panels.map((panel, index) => (
                <div key={index} className="relative w-screen h-full flex items-center justify-center shrink-0 overflow-hidden">
                    {/* Background Image - Optimized loading */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={panel.img} 
                            alt={panel.title} 
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover grayscale brightness-50 contrast-125 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80" />
                        <div className="absolute inset-0 bg-brand-neon/5 mix-blend-overlay" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center px-4 mix-blend-screen">
                        <p className="text-brand-neon font-mono text-sm tracking-[0.5em] mb-4 uppercase opacity-80">
                            {panel.desc}
                        </p>
                        <h2 
                            ref={(el) => addToRefs(el, index)}
                            className="text-[12vw] font-display font-black text-white leading-none tracking-tighter"
                            style={{ 
                                textShadow: '0 20px 40px rgba(0,0,0,0.5)',
                                WebkitTextStroke: '1px rgba(255,255,255,0.1)'
                            }}
                        >
                            {panel.title}
                        </h2>
                         <div className="w-24 h-1 bg-brand-neon mx-auto mt-8 opacity-0 animate-pulse-slow"></div>
                    </div>

                    {/* Decorative Index Number */}
                    <div className="absolute bottom-20 right-20 z-20">
                        <span className="font-display text-8xl text-white/5 font-bold">0{index + 1}</span>
                    </div>
                </div>
            ))}

        </div>
    </div>
  );
};

export default HorizontalScroll;