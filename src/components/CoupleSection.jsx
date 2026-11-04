import React from 'react';
import { motion } from 'framer-motion';
import { MandalaIcon, GoldDivider, CornerOrnament, LotusIcon } from './DecorativeOrnaments';
import { Quote, Heart, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export function CoupleSection() {
  const { groom, bride } = weddingData.couple;

  return (
    <section id="couple" className="py-24 sm:py-32 relative bg-[#FAF7F2] text-[#2D241E] overflow-hidden">
      
      {/* Background Decorative Motifs */}
      <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 opacity-10 pointer-events-none">
        <MandalaIcon className="w-[600px] h-[600px] text-[#C5A059]" />
      </div>
      <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 opacity-10 pointer-events-none">
        <MandalaIcon className="w-[600px] h-[600px] text-[#C5A059]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/10 text-[#8E6D2F] font-cinzel text-xs tracking-[0.25em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Souls Uniting</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#4A0E17] font-normal leading-tight">
            The Bride & Groom
          </h2>
          <p className="font-script text-3xl sm:text-4xl text-[#C5A059] mt-2">
            Two lives, one eternal melody
          </p>
          <GoldDivider className="my-6" />
        </div>

        {/* Groom Profile Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          
          {/* Groom Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Gold Frame with Corner Ornaments */}
            <div className="relative p-3 sm:p-4 bg-[#F4EFE6] border border-[#C5A059]/60 rounded-2xl shadow-2xl">
              <CornerOrnament position="top-left" className="absolute top-1 left-1 w-12 h-12 text-[#C5A059]" />
              <CornerOrnament position="top-right" className="absolute top-1 right-1 w-12 h-12 text-[#C5A059]" />
              <CornerOrnament position="bottom-left" className="absolute bottom-1 left-1 w-12 h-12 text-[#C5A059]" />
              <CornerOrnament position="bottom-right" className="absolute bottom-1 right-1 w-12 h-12 text-[#C5A059]" />

              <div className="overflow-hidden rounded-xl aspect-[3/4] relative">
                <img
                  src={groom.image}
                  alt={groom.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#FAF7F2] font-semibold bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#C5A059]/40">
                    The Groom
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Offset Gold Shadow */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[#C5A059]/40 -z-10 hidden sm:block" />
          </motion.div>

          {/* Groom Editorial Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-5"
          >
            <div className="space-y-1">
              <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#8E6D2F] font-semibold">
                THE GROOM
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0E17] font-semibold">
                {groom.name}
              </h3>
              <p className="font-sans text-xs tracking-wider uppercase text-[#6B5A4B] font-medium pt-1">
                {groom.parents}
              </p>
            </div>

            <div className="w-20 h-[1.5px] bg-[#C5A059]" />

            <p className="font-serif text-lg sm:text-xl text-[#3E3228] leading-relaxed">
              {groom.bio}
            </p>

            {/* Quote Card */}
            <div className="relative p-6 rounded-xl bg-[#F4EFE6] border-l-4 border-[#C5A059] shadow-sm">
              <Quote className="w-6 h-6 text-[#C5A059]/50 mb-2" />
              <p className="font-serif italic text-lg sm:text-xl text-[#4A0E17] leading-relaxed">
                {groom.quote}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
                <span className="font-cinzel text-xs tracking-[0.2em] text-[#8E6D2F] uppercase">
                  Aarav’s Words
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bride Profile Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Bride Editorial Content (Desktop Left, Mobile Order 2) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-center space-y-5 order-2 lg:order-1"
          >
            <div className="space-y-1">
              <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#8E6D2F] font-semibold">
                THE BRIDE
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0E17] font-semibold">
                {bride.name}
              </h3>
              <p className="font-sans text-xs tracking-wider uppercase text-[#6B5A4B] font-medium pt-1">
                {bride.parents}
              </p>
            </div>

            <div className="w-20 h-[1.5px] bg-[#C5A059]" />

            <p className="font-serif text-lg sm:text-xl text-[#3E3228] leading-relaxed">
              {bride.bio}
            </p>

            {/* Quote Card */}
            <div className="relative p-6 rounded-xl bg-[#F4EFE6] border-l-4 border-[#4A0E17] shadow-sm">
              <Quote className="w-6 h-6 text-[#C5A059]/50 mb-2" />
              <p className="font-serif italic text-lg sm:text-xl text-[#4A0E17] leading-relaxed">
                {bride.quote}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
                <span className="font-cinzel text-xs tracking-[0.2em] text-[#8E6D2F] uppercase">
                  Ananya’s Words
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bride Portrait (Desktop Right, Mobile Order 1) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-5 relative order-1 lg:order-2"
          >
            {/* Gold Frame with Corner Ornaments */}
            <div className="relative p-3 sm:p-4 bg-[#F4EFE6] border border-[#C5A059]/60 rounded-2xl shadow-2xl">
              <CornerOrnament position="top-left" className="absolute top-1 left-1 w-12 h-12 text-[#C5A059]" />
              <CornerOrnament position="top-right" className="absolute top-1 right-1 w-12 h-12 text-[#C5A059]" />
              <CornerOrnament position="bottom-left" className="absolute bottom-1 left-1 w-12 h-12 text-[#C5A059]" />
              <CornerOrnament position="bottom-right" className="absolute bottom-1 right-1 w-12 h-12 text-[#C5A059]" />

              <div className="overflow-hidden rounded-xl aspect-[3/4] relative">
                <img
                  src={bride.image}
                  alt={bride.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#FAF7F2] font-semibold bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#C5A059]/40">
                    The Bride
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Offset Gold Shadow */}
            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-[#C5A059]/40 -z-10 hidden sm:block" />
          </motion.div>

        </div>

      </div>
    </section>
  );
}

