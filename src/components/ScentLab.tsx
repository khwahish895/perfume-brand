import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Beaker, Sparkles, Droplets, Wind, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

const INGREDIENTS = [
  { id: 'rose', name: 'Damask Rose', icon: Sparkles, color: '#ef4444', type: 'Heart' },
  { id: 'vanilla', name: 'Madagascar Vanilla', icon: Droplets, color: '#fbbf24', type: 'Base' },
  { id: 'bergamot', name: 'Calabrian Bergamot', icon: Wind, color: '#10b981', type: 'Top' },
  { id: 'sandalwood', name: 'Mysore Sandalwood', icon: Zap, color: '#d97706', type: 'Base' },
  { id: 'oud', name: 'Black Oud', icon: Beaker, color: '#4c1d95', type: 'Base' },
];

export const ScentLab: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isMixing, setIsMixing] = useState(false);
  const { addToCart } = useCart();

  const toggleIngredient = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id));
    } else if (selected.length < 3) {
      setSelected([...selected, id]);
    }
  };

  const handleMix = () => {
    setIsMixing(true);
    setTimeout(() => {
      setIsMixing(false);
      const customName = `SYNRA Custom Blend #${Math.floor(Math.random() * 1000)}`;
      addToCart({
        id: `custom-${Date.now()}`,
        name: customName,
        price: 245.00, // Premium price for custom
        image: 'https://picsum.photos/seed/custom/800/1200',
        color: '#6d28d9'
      });
      setSelected([]);
    }, 3000);
  };

  return (
    <section id="scent-lab" className="py-32 px-8 md:px-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(109,40,217,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-synra-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">Interactive Lab</span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8">Digital Scent Builder</h2>
          <p className="text-white/60 text-lg mb-12 leading-relaxed">
            Drag and drop molecular ingredients to synthesize your own unique fragrance. Our AI will generate a custom 3D bottle based on your composition.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-12">
            {INGREDIENTS.map((ing) => (
              <motion.button
                key={ing.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleIngredient(ing.id)}
                className={`p-6 rounded-2xl flex items-center gap-4 transition-all ${
                  selected.includes(ing.id) 
                    ? 'bg-synra-purple border-synra-purple shadow-lg shadow-synra-purple/20' 
                    : 'glass-panel hover:bg-white/10'
                }`}
              >
                <ing.icon className={`w-6 h-6 ${selected.includes(ing.id) ? 'text-white' : 'text-white/40'}`} />
                <div className="text-left">
                  <div className="text-xs font-bold uppercase tracking-widest">{ing.name}</div>
                  <div className="text-[10px] text-white/40">{ing.type} Note</div>
                </div>
              </motion.button>
            ))}
          </div>

          <button
            disabled={selected.length === 0 || isMixing}
            onClick={handleMix}
            className="w-full py-5 bg-gradient-to-r from-synra-purple to-synra-gold text-black font-bold uppercase tracking-[0.2em] rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-synra-purple/40 transition-all"
          >
            {isMixing ? 'Synthesizing...' : 'Create My Fragrance'}
          </button>
        </div>

        <div className="relative aspect-square glass-panel rounded-[40px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {isMixing ? (
              <motion.div
                key="mixing"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-48 h-48">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-synra-purple rounded-full"
                  />
                  <div className="absolute inset-4 bg-synra-purple/20 rounded-full blur-xl animate-pulse" />
                </div>
                <div className="mt-8 text-synra-gold font-mono text-sm animate-pulse">Synthesizing Molecular Bonds...</div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-12"
              >
                {selected.length === 0 ? (
                  <div className="space-y-4">
                    <Beaker className="w-16 h-16 text-white/10 mx-auto" />
                    <p className="text-white/30 font-serif italic text-xl">Select ingredients to begin</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="flex justify-center -space-x-4">
                      {selected.map((id) => {
                        const ing = INGREDIENTS.find(i => i.id === id);
                        return (
                          <motion.div
                            key={id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-20 h-20 rounded-full glass-panel flex items-center justify-center shadow-2xl"
                            style={{ borderColor: ing?.color }}
                          >
                            {ing && <ing.icon className="w-8 h-8" style={{ color: ing.color }} />}
                          </motion.div>
                        );
                      })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold mb-2">Custom Blend #01</h3>
                      <p className="text-white/40 text-sm">A unique harmony of {selected.length} elements</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
