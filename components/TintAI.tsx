import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { getTintRecommendation, TintRecommendation } from '../services/geminiService';

const TintAI: React.FC = () => {
  const [vehicle, setVehicle] = useState('');
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<TintRecommendation | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle || !preferences) return;

    setLoading(true);
    setRecommendation(null);
    const result = await getTintRecommendation(preferences, vehicle);
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-brand-black">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-neon/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Column: Intro */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-brand-neon/10 rounded-full">
                 <Sparkles className="w-6 h-6 text-brand-neon" />
               </div>
               <span className="text-sm font-mono text-brand-neon uppercase tracking-widest">AI Consultant</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
              PRECISION <br/> MATCHING
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Not sure which film fits your lifestyle? Our Gemini-powered AI analyzes your vehicle type and needs (privacy, heat rejection, night driving) to recommend the perfect specification.
            </p>
            
            <div className="glass-panel p-6 rounded-lg">
                <h4 className="text-white font-bold mb-2">Why use AI?</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-brand-neon"/> Unbiased technical analysis</li>
                    <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-brand-neon"/> Heat rejection optimization</li>
                    <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-brand-neon"/> Instant quote estimation</li>
                </ul>
            </div>
          </div>

          {/* Right Column: Interactive Form & Result */}
          <div className="lg:w-2/3 w-full">
            <div className="glass-panel p-8 md:p-12 rounded-2xl relative border-t border-white/10">
              
              {!recommendation ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Your Vehicle</label>
                    <input 
                      type="text" 
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      placeholder="e.g. 2024 Porsche 911 GT3"
                      className="w-full bg-black/50 border border-white/10 text-white p-4 rounded focus:outline-none focus:border-brand-neon transition-colors placeholder-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Your Priorities</label>
                    <textarea 
                      value={preferences}
                      onChange={(e) => setPreferences(e.target.value)}
                      placeholder="e.g. I want maximum privacy but I drive a lot at night. Heat rejection is important."
                      className="w-full bg-black/50 border border-white/10 text-white p-4 rounded h-32 focus:outline-none focus:border-brand-neon transition-colors placeholder-gray-700 resize-none"
                    />
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full bg-brand-neon text-black font-display font-bold py-4 hover:bg-white transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : 'GENERATE CONFIGURATION'}
                  </button>
                </form>
              ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                >
                    <div className="flex justify-between items-start border-b border-white/10 pb-6">
                        <div>
                            <p className="text-gray-500 text-sm">Recommended Configuration</p>
                            <h3 className="text-3xl font-display text-white mt-2">{recommendation.type}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-gray-500 text-sm">VLT</p>
                            <h3 className="text-3xl font-display text-brand-neon mt-2">{recommendation.percentage}</h3>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-bold">Analysis</h4>
                        <p className="text-gray-300 leading-relaxed">
                            {recommendation.reasoning}
                        </p>
                    </div>

                    <div className="bg-brand-neon/10 p-4 rounded border border-brand-neon/20 flex justify-between items-center">
                        <span className="text-brand-neon font-mono text-sm uppercase">Estimated Cost</span>
                        <span className="text-white font-bold font-display">{recommendation.estimatedCost}</span>
                    </div>

                    <button 
                        onClick={() => setRecommendation(null)}
                        className="text-gray-500 hover:text-white text-sm underline underline-offset-4"
                    >
                        Start New Consultation
                    </button>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TintAI;