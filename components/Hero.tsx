import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax effects
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Smooth mouse movement for lighting effect
  const springConfig = { damping: 25, stiffness: 120 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Optimization: throttle could be added here if needed, but framer-motion springs handle rapid updates well
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized coordinates (-1 to 1)
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    
    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-brand-black"
    >
      {/* 1. Background Layer (Deep Void) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/40 via-black to-black z-0" />
      
      {/* 2. Grid Floor (Perspective) */}
      <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_top,_rgba(0,243,255,0.05)_1px,_transparent_1px),_linear-gradient(to_right,_rgba(0,243,255,0.05)_1px,_transparent_1px)] bg-[size:40px_40px] [transform:perspective(1000px)_rotateX(60deg)] opacity-20 pointer-events-none z-0" />

      {/* 3. Typography Layer (Architecture - The Sandwich Bread) */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="absolute w-full text-center z-0 pointer-events-none"
      >
        <h1 className="font-display font-black text-[18vw] leading-[0.8] text-white/5 uppercase tracking-tighter select-none">
          PERF<br/>ECTN
        </h1>
      </motion.div>

      {/* 4. The Hero Subject (Car) - The Sandwich Filling */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 aspect-[16/9] flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Base Image - High Priority */}
            <motion.img 
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                alt="Luxury Sports Car"
                // @ts-ignore
                fetchpriority="high"
                className="w-full h-full object-contain drop-shadow-2xl grayscale contrast-125 brightness-75"
                style={{ 
                    filter: "drop-shadow(0px 20px 50px rgba(0,0,0,0.8)) brightness(0.8) contrast(1.2)",
                }}
            />
            
            {/* 5. Interactive Lighting/Tint Overlay (Simulated Reflection) */}
            <motion.div 
                className="absolute inset-0 mix-blend-overlay pointer-events-none"
                style={{
                    background: `linear-gradient(${120 + mousePosition.x * 20}deg, rgba(255,255,255,0) 0%, rgba(0,243,255,0.2) 40%, rgba(255,255,255,0.4) 50%, rgba(0,243,255,0.2) 60%, rgba(255,255,255,0) 100%)`,
                    x: mouseX.get() * -20, // Parallax movement
                    y: mouseY.get() * -20
                }}
            />
            
            {/* Neon Accent Glow based on mouse */}
             <motion.div 
                className="absolute inset-0 blur-3xl opacity-20 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, #00f3ff, transparent 50%)`,
                }}
            />
        </div>
      </div>

      {/* 6. Foreground UI (Call to Actions) */}
      <div className="absolute bottom-20 left-0 w-full z-20 px-6">
        <div className="container mx-auto flex justify-between items-end">
          <div>
            <p className="font-sans text-brand-neon tracking-widest text-xs mb-2">IMMERSIVE AUTOMOTIVE PROTECTION</p>
            <h2 className="font-display text-4xl text-white">
              DEFINE YOUR <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">PRESENCE</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-4">
             <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-widest">Heat Rejection</p>
                <p className="text-xl font-display text-white">98%</p>
             </div>
             <div className="w-[1px] h-10 bg-white/20"></div>
             <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-widest">UV Protection</p>
                <p className="text-xl font-display text-white">99.9%</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;