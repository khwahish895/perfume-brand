import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const PYRAMID_DATA = [
  {
    level: 'Top Notes',
    description: 'The initial impression. Volatile molecules that evaporate within 15 minutes.',
    ingredients: ['Bergamot', 'Lemon', 'Pink Pepper', 'Yuzu'],
    color: '#fbbf24'
  },
  {
    level: 'Heart Notes',
    description: 'The soul of the fragrance. Emerges as the top notes fade, lasting 2-4 hours.',
    ingredients: ['Damask Rose', 'Jasmine', 'Lavender', 'Iris'],
    color: '#6d28d9'
  },
  {
    level: 'Base Notes',
    description: 'The foundation. Heavy molecules that provide depth and longevity for 8+ hours.',
    ingredients: ['Sandalwood', 'Vanilla', 'Oud', 'White Musk'],
    color: '#050505'
  }
];

export const ScentPyramid: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-32 px-8 md:px-24 bg-synra-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative aspect-square flex items-center justify-center">
          {/* Abstract Pyramid Visual */}
          <div className="relative w-full max-w-md aspect-square">
            {PYRAMID_DATA.map((level, i) => (
              <motion.div
                key={level.level}
                initial={false}
                animate={{
                  scale: activeIndex === i ? 1.05 : 1,
                  opacity: activeIndex === i ? 1 : 0.3,
                  y: i * 20
                }}
                onClick={() => setActiveIndex(i)}
                className="absolute left-1/2 -translate-x-1/2 cursor-pointer transition-all duration-500"
                style={{
                  top: `${i * 30}%`,
                  width: `${100 - i * 25}%`,
                  zIndex: 3 - i
                }}
              >
                <div 
                  className="h-32 glass-panel rounded-2xl flex items-center justify-center border-2"
                  style={{ borderColor: activeIndex === i ? level.color : 'transparent' }}
                >
                  <span className="text-xl font-serif font-bold uppercase tracking-widest">{level.level}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <span className="text-synra-purple uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">Olfactory Structure</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">The Scent Pyramid</h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <p className="text-xl text-white/60 leading-relaxed font-light">
                {PYRAMID_DATA[activeIndex].description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {PYRAMID_DATA[activeIndex].ingredients.map((ing) => (
                  <div key={ing} className="flex items-center gap-4 glass-panel p-4 rounded-xl">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PYRAMID_DATA[activeIndex].color }} />
                    <span className="text-sm font-medium">{ing}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4">
            {PYRAMID_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-12 h-1 bg-white transition-all duration-500 ${activeIndex === i ? 'opacity-100 w-24' : 'opacity-20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
