import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, Search, User, X, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Modal } from './Modal';

export const Navigation: React.FC = () => {
  const { totalItems, cart, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold tracking-widest text-white cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          SYNRA
        </motion.div>

        <div className="hidden md:flex gap-12 text-xs uppercase tracking-[0.3em] font-medium text-white/70">
          {['Collection', 'Scent Lab', 'Experience', 'About'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              whileHover={{ color: '#fff', letterSpacing: '0.4em' }}
              className="transition-all cursor-pointer"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <div className="flex gap-6 items-center text-white/70">
          <Search 
            className="w-5 h-5 cursor-pointer hover:text-white transition-colors" 
            onClick={() => setIsSearchOpen(true)}
          />
          <User 
            className="w-5 h-5 cursor-pointer hover:text-white transition-colors" 
            onClick={() => setIsProfileOpen(true)}
          />
          <div 
            className="relative cursor-pointer group"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5 group-hover:text-white transition-colors" />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-synra-purple rounded-full text-[8px] flex items-center justify-center text-white font-bold"
              >
                {totalItems}
              </motion.span>
            )}
          </div>
          <Menu className="w-6 h-6 md:hidden cursor-pointer" />
        </div>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-synra-black border-l border-white/10 p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-serif font-bold">Your Bag</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/20 space-y-4">
                    <ShoppingBag className="w-16 h-16" />
                    <p className="font-serif italic text-xl">Your bag is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-6 glass-panel p-4 rounded-2xl group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-white/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif font-bold">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-white/40 mt-1">Qty: {item.quantity}</p>
                        <p className="text-synra-gold font-mono text-sm mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-8 border-t border-white/10 space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-white/40 uppercase tracking-widest text-xs">Total</span>
                    <span className="text-2xl font-serif font-bold">
                      ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full py-5 bg-white text-black font-bold uppercase tracking-[0.2em] rounded-full hover:bg-synra-purple hover:text-white transition-all">
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <Modal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} title="Search SYNRA">
        <div className="space-y-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
            <input 
              type="text" 
              placeholder="Search fragrances, notes, or labs..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-synra-purple transition-all"
              autoFocus
            />
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Trending Searches</h4>
            <div className="flex flex-wrap gap-2">
              {['Velour Mist', 'Molecular Lab', 'Custom Scent', 'Oud', 'Sandalwood'].map(tag => (
                <button key={tag} className="px-4 py-2 glass-panel rounded-full text-xs hover:bg-white/10 transition-all">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Profile Modal */}
      <Modal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} title="Member Profile">
        <div className="space-y-8 text-center">
          <div className="w-24 h-24 bg-synra-purple/20 rounded-full flex items-center justify-center mx-auto border border-synra-purple/30">
            <User className="w-12 h-12 text-synra-purple" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold">Scent Pioneer</h3>
            <p className="text-white/40 text-sm">Member since 2026</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-2xl">
              <div className="text-2xl font-serif font-bold">12</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Scent Creations</div>
            </div>
            <div className="glass-panel p-6 rounded-2xl">
              <div className="text-2xl font-serif font-bold">2.4k</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Aura Points</div>
            </div>
          </div>
          <button className="w-full py-4 glass-panel rounded-full hover:bg-white/5 transition-all">
            Manage Account
          </button>
          <button className="text-xs text-white/20 hover:text-white transition-colors">
            Sign Out
          </button>
        </div>
      </Modal>
    </>
  );
};
