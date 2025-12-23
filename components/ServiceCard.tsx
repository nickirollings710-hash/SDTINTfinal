import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, subtitle, description, image, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[400px] w-full group cursor-pointer overflow-hidden rounded-sm"
    >
      {/* Background Image - Optimized */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
      </div>

      {/* Content Container (Glassmorphism) */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Animated Border */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-neon to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <div className="relative z-10">
          <p className="text-brand-neon text-xs font-mono uppercase tracking-widest mb-2">{subtitle}</p>
          <h3 className="font-display text-3xl text-white mb-4 flex items-center justify-between">
            {title}
            <ArrowUpRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-brand-neon" />
          </h3>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="text-gray-300 font-sans text-sm leading-relaxed mb-6 border-l-2 border-brand-neon pl-4">
                  {description}
                </p>
                <button className="text-xs uppercase tracking-widest text-white border border-white/20 px-4 py-2 hover:bg-brand-neon hover:text-black hover:border-transparent transition-all">
                  Explore Details
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;