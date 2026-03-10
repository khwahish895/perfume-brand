import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Scene } from './components/Scene';
import { Collection } from './components/Collection';
import { ScentLab } from './components/ScentLab';
import { ScentPyramid } from './components/ScentPyramid';
import { Quiz } from './components/Quiz';
import { WorldMap } from './components/WorldMap';
import { Timeline } from './components/Timeline';
import { BrandValues } from './components/BrandValues';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { Loader } from '@react-three/drei';
import { Sparkles } from 'lucide-react';
import { CartProvider } from './context/CartContext';

export default function App() {
  const { scrollYProgress } = useScroll();
  
  // Transform values for 3D scene based on scroll
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [1, 1, 0.5, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <CartProvider>
      <main className="relative bg-synra-black">
        <Navigation />
        
        {/* Easter Egg */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="fixed bottom-10 right-10 z-[100] cursor-help group"
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 text-synra-gold animate-pulse" />
            <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
              <div className="glass-panel p-4 rounded-xl whitespace-nowrap text-[10px] uppercase tracking-widest font-bold text-synra-purple">
                Secret Unlocked: The Eternal Scent
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fixed 3D Background Scene */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <motion.div 
            style={{ opacity: sceneOpacity, scale: sceneScale }}
            className="w-full h-full"
          >
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>

        <Loader />

        {/* Content Sections */}
        <div className="relative z-10">
          <Hero />
          
          {/* Fragrance Journey Spacer / Story */}
          <section className="h-[200vh] flex items-center justify-center px-8">
            <div className="max-w-4xl text-center">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-6xl md:text-8xl font-serif font-bold mb-12"
              >
                The Art of <span className="text-gradient">Synthesis</span>
              </motion.h2>
              <p className="text-xl text-white/40 leading-relaxed">
                Scroll to witness the molecular dance of fragrance creation. From the heart of the garden to the precision of the lab.
              </p>
            </div>
          </section>

          <Collection />

          <ScentPyramid />
          
          <ScentLab />

          <Quiz />

          <WorldMap />

          <Timeline />

          <BrandValues />

          <Testimonials />

          <Gallery />

          {/* Footer / Brand Values */}
          <footer className="py-32 px-8 md:px-24 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
              <div className="col-span-2">
                <h2 className="text-4xl font-serif font-bold mb-6">SYNRA</h2>
                <p className="text-white/40 max-w-sm">Redefining luxury through the lens of technology and tradition. Join us in the future of fragrance.</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Explore</h4>
                <ul className="space-y-4 text-sm text-white/60">
                  <li>Collection</li>
                  <li>Scent Lab</li>
                  <li>Customization</li>
                  <li>Digital Scent</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Connect</h4>
                <ul className="space-y-4 text-sm text-white/60">
                  <li>Instagram</li>
                  <li>Twitter</li>
                  <li>Discord</li>
                  <li>Newsletter</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[10px] uppercase tracking-widest text-white/20">
              <p>© 2026 SYNRA FRAGRANCES. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-8 mt-4 md:mt-0">
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </CartProvider>
  );
}
