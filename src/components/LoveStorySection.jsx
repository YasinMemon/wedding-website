import React from 'react';
import { motion } from 'framer-motion';
import { MandalaIcon, GoldDivider, CornerOrnament } from './DecorativeOrnaments';
import { Sparkles, Calendar, Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export function LoveStorySection() {
  const { loveStory } = weddingData;

  return (
    <section id="story" className="py-24 sm:py-32 relative bg-[#F7F2E7] text-[#2D241E] overflow-hidden">
      
      {/* Decorative Gold Border Top and Bottom */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/15 text-[#8E6D2F] font-cinzel text-xs tracking-[0.25em] uppercase mb-3">
            <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]/30" />
            <span>How Destiny Unfolded</span>
            <Heart className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]/30" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#4A0E17] font-normal leading-tight">
            Our Love Story
          </h2>
          <p className="font-script text-3xl sm:text-4xl text-[#C5A059] mt-2">
            Written in the stars, nurtured by love
          </p>
          <GoldDivider className="my-6" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Central Vertical Timeline Vine Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#C5A059]/20 via-[#C5A059] to-[#C5A059]/20" />

          {/* Milestones List */}
          <div className="space-y-16 sm:space-y-24">
            {loveStory.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={milestone.year}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
                >
                  {/* Center Node Marker (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#4A0E17] border-2 border-[#C5A059] flex items-center justify-center shadow-lg group hover:scale-110 transition-transform">
                      <span className="font-cinzel text-xs font-bold text-gold-gradient">
                        {milestone.year.slice(2)}
                      </span>
                    </div>
                  </div>

                  {/* Card Image Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className={`${isEven ? 'md:order-1' : 'md:order-2'} relative`}
                  >
                    <div className="relative p-2.5 sm:p-3 bg-[#FAF7F2] rounded-2xl border border-[#C5A059]/50 shadow-xl overflow-hidden group">
                      <CornerOrnament position="top-left" className="absolute top-1 left-1 w-10 h-10 text-[#C5A059]" />
                      <CornerOrnament position="bottom-right" className="absolute bottom-1 right-1 w-10 h-10 text-[#C5A059]" />
                      
                      <div className="rounded-xl overflow-hidden aspect-[4/3] relative">
                        <img
                          src={milestone.image}
                          alt={milestone.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3">
                          <span className="bg-[#4A0E17]/85 backdrop-blur-md text-[#E7D5AA] font-cinzel text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-[#C5A059]/40">
                            {milestone.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Text Content Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                    className={`${isEven ? 'md:order-2 text-left' : 'md:order-1 md:text-right text-left'} space-y-3`}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A0E17] text-[#FAF7F2] border border-[#C5A059]">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span className="font-cinzel text-xs font-bold tracking-widest text-gold-gradient">
                        {milestone.year}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#4A0E17] font-semibold">
                      {milestone.title}
                    </h3>

                    <p className="font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase text-[#8E6D2F] font-medium">
                      {milestone.subtitle}
                    </p>

                    <p className="font-serif text-base sm:text-lg text-[#4E4137] leading-relaxed pt-1">
                      {milestone.description}
                    </p>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

