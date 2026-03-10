import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Elena Vance",
    role: "Digital Curator",
    content: "SYNRA has completely changed how I perceive fragrance. The 3D customization lab is a masterpiece of design and technology.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Futurist",
    content: "The scent of the future is here. Nocturne Ember is unlike anything I've ever experienced in the physical world.",
    rating: 5
  },
  {
    name: "Aria Chen",
    role: "Scent Architect",
    content: "A beautiful intersection of olfactory science and digital art. The attention to detail in the molecular synthesis is astounding.",
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-32 px-8 md:px-24 bg-synra-black overflow-hidden">
      <div className="flex flex-col items-center text-center mb-20">
        <Quote className="w-12 h-12 text-synra-purple mb-8 opacity-50" />
        <h2 className="text-5xl md:text-7xl font-serif font-bold">Voices of SYNRA</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-10 rounded-[32px] flex flex-col justify-between h-full relative"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-synra-gold text-synra-gold" />
              ))}
            </div>
            
            <p className="text-lg text-white/70 italic mb-10 leading-relaxed font-serif">
              "{t.content}"
            </p>

            <div>
              <div className="font-bold text-white mb-1">{t.name}</div>
              <div className="text-xs uppercase tracking-widest text-synra-purple font-medium">{t.role}</div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-synra-purple/5 rounded-full blur-3xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
