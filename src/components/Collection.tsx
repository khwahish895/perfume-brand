import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERFUMES, Perfume } from '../constants';
import { ArrowRight, Info, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Modal } from './Modal';

export const Collection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, perfume: Perfume) => {
    e.stopPropagation();
    addToCart({
      id: perfume.id,
      name: perfume.name,
      price: 185.00, // Standard luxury price
      image: perfume.image,
      color: perfume.color
    });
  };

  return (
    <section id="collection" className="py-32 px-8 md:px-24 bg-synra-black">
      <div className="flex justify-between items-end mb-20">
        <div>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-4">The Collection</h2>
          <p className="text-white/40 max-w-md">Five distinct olfactory dimensions, crafted for the modern pioneer.</p>
        </div>
        <button className="text-xs uppercase tracking-widest border-b border-white/20 pb-2 hover:border-white transition-colors">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PERFUMES.map((perfume, index) => (
          <motion.div
            key={perfume.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredId(perfume.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedPerfume(perfume)}
            className="group relative h-[600px] glass-panel rounded-3xl overflow-hidden cursor-pointer"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={perfume.image} 
                alt={perfume.name} 
                className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-synra-black via-synra-black/40 to-transparent" />
            </div>

            {/* Background Glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle at 50% 50%, ${perfume.color}, transparent 70%)` }}
            />

            {/* Content */}
            <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2 block">
                  {perfume.tagline}
                </span>
                <h3 className="text-3xl font-serif font-bold group-hover:text-synra-gold transition-colors">
                  {perfume.name.split('SYNRA ')[1]}
                </h3>
              </div>

              <div className="space-y-6">
                <p className="text-sm text-white/60 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {perfume.description}
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={(e) => handleAddToCart(e, perfume)}
                    className="flex-1 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-synra-purple hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedPerfume(perfume); }}
                    className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full hover:bg-white/10 transition-all"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Abstract Visual Representation (Placeholder for 3D) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
              <motion.div
                animate={{ 
                  scale: hoveredId === perfume.id ? 1.2 : 1,
                  rotate: hoveredId === perfume.id ? 45 : 0
                }}
                className="w-full h-full border border-white/5 rounded-full flex items-center justify-center"
              >
                <div 
                  className="w-32 h-48 rounded-lg blur-3xl opacity-40"
                  style={{ backgroundColor: perfume.color }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Details Modal */}
      <Modal 
        isOpen={!!selectedPerfume} 
        onClose={() => setSelectedPerfume(null)} 
        title={selectedPerfume?.name || ''}
      >
        {selectedPerfume && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden glass-panel">
              <img src={selectedPerfume.image} alt={selectedPerfume.name} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-synra-gold text-synra-gold" />
                  ))}
                  <span className="text-xs text-white/40 ml-2">(124 Reviews)</span>
                </div>
                <p className="text-white/60 leading-relaxed">{selectedPerfume.description}</p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest font-bold text-synra-gold">Fragrance Notes</h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Top</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerfume.notes.top.map(note => (
                        <span key={note} className="px-3 py-1 glass-panel rounded-full text-[10px]">{note}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Heart</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerfume.notes.heart.map(note => (
                        <span key={note} className="px-3 py-1 glass-panel rounded-full text-[10px]">{note}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">Base</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedPerfume.notes.base.map(note => (
                        <span key={note} className="px-3 py-1 glass-panel rounded-full text-[10px]">{note}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <span className="text-3xl font-serif font-bold">$185.00</span>
                <button 
                  onClick={() => {
                    addToCart({
                      id: selectedPerfume.id,
                      name: selectedPerfume.name,
                      price: 185.00,
                      image: selectedPerfume.image,
                      color: selectedPerfume.color
                    });
                    setSelectedPerfume(null);
                  }}
                  className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-synra-purple hover:text-white transition-all"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
