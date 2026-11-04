import React from 'react';
import { motion } from 'framer-motion';
import { MandalaIcon, GoldDivider, CornerOrnament, RoyalCrest, LotusIcon } from './DecorativeOrnaments';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export function ClosingSection({ onReopenInvitation }) {
  const { closing, couple } = weddingData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1E0509] text-[#FAF7F2] py-24 sm:py-32 overflow-hidden border-t-2 border-[#C5A059]/60">
      
      {/* Background Architectural Palace Silhouette */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none bg-center bg-cover"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=40')`,
          filter: 'grayscale(100%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#120204] via-[#1E0509]/90 to-[#1E0509]" />

      {/* Floating Mandalas in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <MandalaIcon className="w-[800px] h-[800px] text-[#C5A059]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        {/* Royal Crest Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <RoyalCrest size="lg" />
        </motion.div>

        {/* Closing Main Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-4 max-w-2xl mx-auto mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-12 bg-[#C5A059]/60" />
            <LotusIcon className="w-5 h-5 text-[#C5A059]" />
            <span className="h-[1px] w-12 bg-[#C5A059]/60" />
          </div>

          <h3 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-gold-light-gradient font-normal leading-tight">
            “{closing.messageTitle}”
          </h3>

          <p className="font-serif text-lg sm:text-xl text-[#E7D5AA]/90 leading-relaxed font-light">
            “{closing.messageBody}”
          </p>
        </motion.div>

        {/* Couple Signatures in Sweeping Calligraphy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="my-10"
        >
          <div className="font-script text-6xl sm:text-7xl md:text-8xl text-gold-gradient select-none">
            Aarav <span className="font-cinzel text-3xl sm:text-4xl text-[#E7D5AA] font-normal align-middle mx-1">&</span> Ananya
          </div>
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-[#C5A059] mt-3 font-semibold">
            {closing.dateDisplay}
          </p>
        </motion.div>

        {/* Wedding Hashtag */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white/5 border border-[#C5A059]/40 text-[#E7D5AA] font-cinzel text-xs sm:text-sm tracking-widest uppercase">
            {closing.hashtag}
          </span>
        </motion.div>

        <GoldDivider className="my-8" />

        {/* Family Notice */}
        <div className="space-y-1 text-sm text-[#FAF7F2]/80 font-serif whitespace-pre-line mb-12">
          {closing.familyNotice}
        </div>

        {/* Bottom Actions: Replay Card, Back to Top */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-[#C5A059]/20 text-xs font-cinzel tracking-wider uppercase text-[#E7D5AA]">
          <button
            onClick={onReopenInvitation}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Replay Opening Card</span>
          </button>
          <span>•</span>
          <button
            onClick={scrollToTop}
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Back to Top</span>
          </button>
        </div>

        <p className="text-[10px] text-white/40 font-sans tracking-widest uppercase mt-8">
          Royal Wedding Invitation Suite • Handcrafted for Aarav & Ananya • Jaipur, 2027
        </p>

      </div>
    </footer>
  );
}

