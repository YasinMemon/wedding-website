import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MandalaIcon, GoldDivider, LotusIcon } from './DecorativeOrnaments';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export function HeroSection() {
  const { couple } = weddingData;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(couple.weddingDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [couple.weddingDate]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20 pb-16">
      
      {/* Background Photography with Warm Vignette & Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={couple.heroImage}
          alt="Aarav and Ananya Royal Indian Wedding"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          onError={(e) => {
            // Fallback image if needed
            e.currentTarget.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85';
          }}
        />
        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0306] via-[#2A060C]/65 to-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(42,6,12,0.8)_90%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        {/* Floating Top Emblem */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2]/10 backdrop-blur-md border border-[#C5A059]/50 text-[#E7D5AA] font-cinzel text-xs tracking-[0.3em] uppercase">
            <LotusIcon className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>The Royal Wedding</span>
            <LotusIcon className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.35em' }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-cinzel text-xs sm:text-sm uppercase text-[#E7D5AA] font-medium tracking-[0.35em] mb-2 drop-shadow-md"
        >
          {couple.tagline}
        </motion.p>

        {/* Couple Names Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="my-3 sm:my-6"
        >
          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FAF7F2] tracking-wide leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
            Aarav
          </h1>
          <div className="my-1 sm:my-2 flex items-center justify-center gap-3 text-[#C5A059]">
            <span className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#C5A059]" />
            <span className="font-cinzel text-2xl sm:text-3xl text-gold-gradient font-light">&</span>
            <span className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>
          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FAF7F2] tracking-wide leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
            Ananya
          </h1>
        </motion.div>

        {/* Date and Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 my-4 text-[#FAF7F2] font-cinzel text-sm sm:text-base tracking-[0.25em] uppercase"
        >
          <div className="flex items-center gap-2 text-[#E7D5AA]">
            <Calendar className="w-4 h-4 text-[#C5A059]" />
            <span>{couple.dateDisplay}</span>
          </div>
          <span className="hidden sm:inline text-[#C5A059]">•</span>
          <div className="flex items-center gap-2 text-[#E7D5AA]">
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <span>{couple.city}</span>
          </div>
        </motion.div>

        {/* Wedding Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 sm:mt-10 w-full max-w-2xl"
        >
          <div className="p-4 sm:p-6 rounded-2xl bg-black/45 backdrop-blur-md border border-[#C5A059]/40 shadow-2xl">
            <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A059] mb-4 font-semibold">
              Countdown to the Sacred Vows
            </p>

            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HOURS', value: timeLeft.hours },
                { label: 'MINUTES', value: timeLeft.minutes },
                { label: 'SECONDS', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center p-2.5 sm:p-4 rounded-xl bg-gradient-to-b from-white/10 to-white/5 border border-[#C5A059]/30 relative overflow-hidden group hover:border-[#C5A059]"
                >
                  <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#FAF7F2] tabular-nums tracking-wider">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="font-cinzel text-[9px] sm:text-[11px] tracking-[0.25em] text-[#E7D5AA] uppercase mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-10 sm:mt-14"
        >
          <a
            href="#couple"
            className="group flex flex-col items-center gap-2 text-[#E7D5AA]/80 hover:text-[#FAF7F2] transition-colors"
          >
            <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase">
              Discover the Royal Celebration
            </span>
            <div className="w-8 h-8 rounded-full border border-[#C5A059]/50 flex items-center justify-center group-hover:border-[#C5A059] group-hover:translate-y-1 transition-all">
              <ChevronDown className="w-4 h-4 text-[#C5A059]" />
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}

