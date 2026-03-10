import React from 'react';
import { motion } from 'motion/react';

const IMAGES = [
  'https://picsum.photos/seed/perfume1/800/1000',
  'https://picsum.photos/seed/perfume2/800/600',
  'https://picsum.photos/seed/perfume3/800/800',
  'https://picsum.photos/seed/perfume4/800/1200',
  'https://picsum.photos/seed/perfume5/800/700',
  'https://picsum.photos/seed/perfume6/800/900',
];

export const Gallery: React.FC = () => {
  return (
    <section className="py-32 px-8 md:px-24 bg-synra-black">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">Visual Echoes</h2>
        <p className="text-white/40 max-w-2xl mx-auto">Capturing the essence of SYNRA through the lens of our community.</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {IMAGES.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-[32px] overflow-hidden group cursor-pointer"
          >
            <img 
              src={src} 
              alt={`Gallery ${i}`} 
              referrerPolicy="no-referrer"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <div className="text-xs uppercase tracking-widest font-bold">@synra_pioneer</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
