import React from 'react';
import { motion } from 'motion/react';

const EVENTS = [
  { year: '2022', title: 'The Spark', description: 'SYNRA was born from a vision to merge digital art with olfactory science.' },
  { year: '2023', title: 'Molecular Breakthrough', description: 'Our team synthesized the first digital-native scent molecule, SYN-01.' },
  { year: '2024', title: 'The Lab Opens', description: 'Launch of the interactive scent lab, allowing pioneers to design their own bottles.' },
  { year: '2025', title: 'Global Expansion', description: 'SYNRA experiences opened in 12 cities across 3 continents.' },
  { year: '2026', title: 'The Future', description: 'Redefining the boundaries of sensory experience through AI and molecular engineering.' },
];

export const Timeline: React.FC = () => {
  return (
    <section className="py-32 px-8 md:px-24 bg-synra-black overflow-hidden">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our Journey</h2>
        <p className="text-white/40 max-w-2xl mx-auto">From a single molecular spark to a global sensory revolution.</p>
      </div>

      <div className="relative">
        {/* Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 hidden md:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pt-12 md:pt-0"
            >
              {/* Dot */}
              <div className="absolute top-0 md:top-1/2 left-0 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-synra-purple rounded-full border-4 border-synra-black z-10" />
              
              <div className={`md:absolute left-0 w-full ${i % 2 === 0 ? 'md:bottom-full md:mb-8' : 'md:top-full md:mt-8'}`}>
                <div className="glass-panel p-6 rounded-2xl hover:border-synra-purple transition-all group">
                  <div className="text-synra-gold font-mono text-xs mb-2">{event.year}</div>
                  <h4 className="text-lg font-serif font-bold mb-2 group-hover:text-synra-purple transition-colors">{event.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
