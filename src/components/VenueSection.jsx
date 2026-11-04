import React from 'react';
import { motion } from 'framer-motion';
import { MandalaIcon, GoldDivider, CornerOrnament } from './DecorativeOrnaments';
import { MapPin, Navigation, Sparkles, Building2, Sun, Car, ShieldCheck } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export function VenueSection() {
  const { venue } = weddingData;

  return (
    <section id="venue" className="py-24 sm:py-32 relative bg-[#FAF7F2] text-[#2D241E] overflow-hidden">
      
      {/* Background Ornamentation */}
      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none">
        <MandalaIcon className="w-[600px] h-[600px] text-[#C5A059]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/10 text-[#8E6D2F] font-cinzel text-xs tracking-[0.25em] uppercase mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Imperial Setting</span>
            <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#4A0E17] font-normal leading-tight">
            The Royal Venue
          </h2>
          <p className="font-script text-3xl sm:text-4xl text-[#C5A059] mt-2">
            Where heritage meets timeless romance
          </p>
          <GoldDivider className="my-6" />
        </div>

        {/* Large Hero Palace Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl overflow-hidden border-2 border-[#C5A059]/60 shadow-2xl mb-16 group"
        >
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full relative overflow-hidden">
            <img
              src={venue.image}
              alt={venue.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            {/* Cinematic Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A060C] via-[#2A060C]/40 to-transparent" />
            
            {/* Corner Ornaments */}
            <CornerOrnament position="top-left" className="absolute top-4 left-4 w-14 h-14 text-[#E7D5AA] z-10" />
            <CornerOrnament position="top-right" className="absolute top-4 right-4 w-14 h-14 text-[#E7D5AA] z-10" />

            {/* Overlaid Palace Title & Address */}
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 right-6 sm:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
              <div className="space-y-2 max-w-2xl">
                <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#E7D5AA] font-semibold bg-[#4A0E17]/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#C5A059]/50 inline-block mb-1">
                  {venue.subname}
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2] font-bold drop-shadow-lg leading-tight">
                  {venue.name}
                </h3>
                <div className="flex items-start gap-2 text-sm sm:text-base text-[#FAF7F2]/90 font-sans">
                  <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{venue.address}</span>
                </div>
              </div>

              {/* Direct Directions Button */}
              <a
                href={venue.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#8E6D2F] text-[#2A060C] font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase font-bold shadow-lg hover:shadow-[0_0_20px_rgba(197,160,89,0.7)] hover:scale-105 transition-all shrink-0"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Palace Heritage Details & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Architectural History */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 bg-[#F7F2E7] rounded-2xl p-8 sm:p-10 border border-[#C5A059]/50 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#8E6D2F] font-cinzel text-xs tracking-[0.25em] uppercase font-semibold">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>A Living Legacy of Grandeur</span>
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#4A0E17] font-semibold">
                Centuries of Rajput Nobility
              </h4>
              <p className="font-serif text-lg text-[#3E3228] leading-relaxed">
                {venue.history}
              </p>
            </div>

            {/* Highlights List */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#C5A059]/30">
              {venue.features.map((feature, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/30 space-y-1">
                  <h5 className="font-cinzel text-xs font-bold text-[#4A0E17] tracking-wider uppercase">
                    {feature.title}
                  </h5>
                  <p className="font-sans text-xs text-[#6B5A4B] leading-normal">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Google Maps Interactive Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 rounded-2xl overflow-hidden border border-[#C5A059]/60 shadow-xl bg-[#F7F2E7] p-2 flex flex-col justify-between"
          >
            <div className="relative rounded-xl overflow-hidden w-full h-[380px] sm:h-[450px]">
              <iframe
                title="Rambagh Palace Jaipur Google Map"
                src={venue.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-[1.05]"
              />
              <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C5A059]/60 shadow-md flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#4A0E17]" />
                <span className="font-cinzel text-xs font-semibold text-[#4A0E17] uppercase tracking-wider">
                  Jaipur, Rajasthan
                </span>
              </div>
            </div>

            <div className="p-3 text-center">
              <p className="font-sans text-xs text-[#6B5A4B]">
                Complimentary royal chauffeur valet service will be available at the main palace portico for all guests.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

