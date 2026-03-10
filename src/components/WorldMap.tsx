import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Globe } from 'lucide-react';

const ORIGINS = [
  { country: 'Turkey', ingredient: 'Damask Rose', coords: { top: '35%', left: '55%' } },
  { country: 'Madagascar', ingredient: 'Vanilla', coords: { top: '75%', left: '62%' } },
  { country: 'India', ingredient: 'Sandalwood', coords: { top: '50%', left: '72%' } },
  { country: 'Italy', ingredient: 'Bergamot', coords: { top: '32%', left: '48%' } },
  { country: 'France', ingredient: 'Lavender', coords: { top: '28%', left: '45%' } },
];

export const WorldMap: React.FC = () => {
  return (
    <section className="py-32 px-8 md:px-24 relative overflow-hidden bg-synra-black">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">Global Origins</h2>
        <p className="text-white/40 max-w-2xl mx-auto">
          We source the rarest molecular essences from the most remote corners of the physical world.
        </p>
      </div>

      <div className="relative aspect-[21/9] w-full glass-panel rounded-[40px] overflow-hidden group">
        {/* Abstract Map Background */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/seed/map/1920/1080?blur=10')] bg-cover bg-center grayscale" />
        
        {/* Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Origin Points */}
        {ORIGINS.map((origin, index) => (
          <motion.div
            key={origin.country}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            style={{ top: origin.coords.top, left: origin.coords.left }}
            className="absolute z-10"
          >
            <div className="relative flex items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute w-8 h-8 bg-synra-purple/20 rounded-full blur-md"
              />
              <div className="w-3 h-3 bg-synra-purple rounded-full border-2 border-white shadow-lg cursor-pointer group/pin">
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover/pin:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="glass-panel p-4 rounded-xl whitespace-nowrap">
                    <div className="text-[10px] uppercase tracking-widest text-synra-gold font-bold mb-1">{origin.country}</div>
                    <div className="text-sm font-serif">{origin.ingredient}</div>
                  </div>
                  <div className="w-2 h-2 bg-white/10 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 border-r border-b border-white/10" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Floating Stats */}
        <div className="absolute bottom-10 left-10 space-y-4">
          <div className="flex items-center gap-4 glass-panel px-6 py-3 rounded-full">
            <Globe className="w-4 h-4 text-synra-purple" />
            <span className="text-[10px] uppercase tracking-widest font-bold">12 Countries Sourced</span>
          </div>
          <div className="flex items-center gap-4 glass-panel px-6 py-3 rounded-full">
            <MapPin className="w-4 h-4 text-synra-gold" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Ethical Harvesting</span>
          </div>
        </div>
      </div>
    </section>
  );
};
