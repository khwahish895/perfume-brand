import React from 'react';
import { motion } from 'motion/react';
import { Leaf, ShieldCheck, Cpu, Users } from 'lucide-react';

const VALUES = [
  {
    title: "Sustainability",
    description: "100% biodegradable molecular structures and recycled glass vessels.",
    icon: Leaf,
    color: "#10b981"
  },
  {
    title: "Craftsmanship",
    description: "Hand-finished caps and precision-engineered delivery systems.",
    icon: ShieldCheck,
    color: "#fbbf24"
  },
  {
    title: "Innovation",
    description: "AI-driven olfactory synthesis for scents that defy physical limits.",
    icon: Cpu,
    color: "#6d28d9"
  },
  {
    title: "Community",
    description: "A global network of scent pioneers sharing their digital creations.",
    icon: Users,
    color: "#3b82f6"
  }
];

export const BrandValues: React.FC = () => {
  return (
    <section className="py-32 px-8 md:px-24 bg-synra-black">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="glass-panel p-10 rounded-[32px] text-center group"
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 transition-all duration-500 group-hover:rotate-[360deg]"
              style={{ backgroundColor: `${v.color}20`, color: v.color }}
            >
              <v.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-4">{v.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              {v.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
