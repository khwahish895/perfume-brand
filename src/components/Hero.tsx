import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center px-8 md:px-24 overflow-hidden">
      <div className="z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-synra-purple uppercase tracking-[0.5em] text-xs font-semibold mb-4 block">
            Futuristic Fragrance
          </span>
          <h1 className="text-7xl md:text-9xl font-serif font-bold leading-tight mb-6">
            SYNRA
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light max-w-md mb-10 leading-relaxed">
            Experience the intersection of digital art and olfactory science. Design your signature scent in our interactive lab.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-black font-bold rounded-full flex items-center gap-3 hover:bg-synra-purple hover:text-white transition-all duration-300"
            >
              Explore Collection <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-10 py-4 border border-white/20 rounded-full flex items-center gap-3 hover:bg-white/10 transition-all"
            >
              <Play className="w-4 h-4 fill-current" /> Watch Story
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-synra-purple to-transparent" />
      </motion.div>
    </section>
  );
};
