import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MandalaIcon, GoldDivider, CornerOrnament } from './DecorativeOrnaments';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, MapPin } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export function GallerySection() {
  const { gallery } = weddingData;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    'All',
    'Romantic Couple',
    'Bride Portraits',
    'Groom Portraits',
    'Traditional Outfits',
    'Engagement',
  ];

  const filteredImages = selectedCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 relative bg-[#F7F2E7] text-[#2D241E] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/15 text-[#8E6D2F] font-cinzel text-xs tracking-[0.25em] uppercase mb-3">
            <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Memories in Royal Splendor</span>
            <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#4A0E17] font-normal leading-tight">
            The Gallery
          </h2>
          <p className="font-script text-3xl sm:text-4xl text-[#C5A059] mt-2">
            Capturing timeless whispers of affection
          </p>
          <GoldDivider className="my-6" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-full font-cinzel text-xs tracking-wider uppercase transition-all duration-300 border ${
                selectedCategory === category
                  ? 'bg-[#4A0E17] text-[#FAF7F2] border-[#C5A059] shadow-md scale-105'
                  : 'bg-[#FAF7F2] text-[#6B5A4B] border-[#C5A059]/40 hover:border-[#C5A059] hover:text-[#4A0E17]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[280px]"
        >
          <AnimatePresence>
            {filteredImages.map((item, index) => {
              const isLarge = item.aspect === 'tall';
              const isWide = item.aspect === 'wide';

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative rounded-2xl overflow-hidden border border-[#C5A059]/50 bg-[#FAF7F2] shadow-lg cursor-pointer ${
                    isLarge ? 'row-span-2' : isWide ? 'sm:col-span-2' : 'row-span-1'
                  }`}
                >
                  {/* Photo */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white" />

                  {/* Corner Ornaments on Hover */}
                  <CornerOrnament position="top-left" className="absolute top-2 left-2 w-8 h-8 text-[#E7D5AA] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <CornerOrnament position="bottom-right" className="absolute bottom-2 right-2 w-8 h-8 text-[#E7D5AA] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-cinzel text-[10px] tracking-widest uppercase bg-[#4A0E17]/90 text-[#E7D5AA] px-3 py-1 rounded-full border border-[#C5A059]/40 backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom Info on Hover */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-semibold leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#E7D5AA] font-sans mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4 text-[#E7D5AA]" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Lightbox Bar */}
            <div
              className="w-full max-w-6xl flex items-center justify-between py-2 text-white z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="font-cinzel text-xs tracking-widest text-[#E7D5AA] uppercase">
                  {filteredImages[lightboxIndex].category}
                </span>
                <span className="text-white/40">•</span>
                <span className="font-sans text-xs text-white/70">
                  {lightboxIndex + 1} of {filteredImages.length}
                </span>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] flex items-center justify-center transition-colors border border-white/20"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Image & Controls */}
            <div
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-auto px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-[#4A0E17] text-[#FAF7F2] border border-[#C5A059]/60 flex items-center justify-center transition-all hover:scale-110 shadow-xl"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6 text-[#E7D5AA]" />
              </button>

              {/* Displayed Image */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[72vh] rounded-xl overflow-hidden border-2 border-[#C5A059]/70 shadow-2xl bg-black"
              >
                <img
                  src={filteredImages[lightboxIndex].image}
                  alt={filteredImages[lightboxIndex].title}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-[#4A0E17] text-[#FAF7F2] border border-[#C5A059]/60 flex items-center justify-center transition-all hover:scale-110 shadow-xl"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6 text-[#E7D5AA]" />
              </button>
            </div>

            {/* Bottom Caption & Thumbnails */}
            <div
              className="w-full max-w-4xl text-center py-2 text-white z-20 space-y-1"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-semibold">
                {filteredImages[lightboxIndex].title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#E7D5AA]/90 max-w-xl mx-auto">
                {filteredImages[lightboxIndex].description}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-white/60 font-cinzel pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{filteredImages[lightboxIndex].location}</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

