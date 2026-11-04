import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CornerOrnament, MandalaIcon, GoldDivider, RoyalCrest } from './DecorativeOrnaments';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

export function OpeningExperience({ isOpen, onOpenInvitation }) {
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(false);

  const handleAudioPreToggle = () => {
    const newState = soundEngine.toggle();
    setIsAudioReady(newState);
  };

  const handleOpenClick = () => {
    setIsOpeningAnimation(true);

    // Trigger celebratory royal rose petal & gold glitter confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#E7D5AA', '#8E6D2F', '#4A0E17', '#6E1B28'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    setTimeout(() => {
      onOpenInvitation();
    }, 900);
  };

  if (isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="opening-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#1E0509]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(74, 14, 23, 0.85) 0%, rgba(26, 4, 8, 0.98) 100%),
            url('https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=40')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply',
        }}
      >
        {/* Ambient floating gold dust background overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80 pointer-events-none" />

        {/* Music toggle on Opening Screen */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={handleAudioPreToggle}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A060C]/80 border border-[#C5A059]/50 text-[#E7D5AA] hover:text-white hover:border-[#C5A059] transition-all text-xs font-cinzel tracking-wider backdrop-blur-md"
            title="Toggle Royal Palace Ambience"
          >
            {isAudioReady ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                <span>Music Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#C5A059]/60" />
                <span>Turn On Music</span>
              </>
            )}
          </button>
        </div>

        {/* Luxury Invitation Envelope & Royal Card */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative w-full max-w-xl mx-auto"
        >
          {/* Outer Gold Aura Glow */}
          <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#C5A059]/30 via-[#E7D5AA]/40 to-[#8E6D2F]/30 blur-xl opacity-70 animate-pulse pointer-events-none" />

          {/* Card Container */}
          <div className="relative bg-[#FAF7F2] text-[#2A060C] rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] p-6 sm:p-10 md:p-12 border-2 border-[#C5A059]/70 overflow-hidden">
            {/* Subtle Textured Background inside card */}
            <div className="absolute inset-0 bg-[radial-gradient(#C5A059_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

            {/* Corner Ornamental Filigrees */}
            <CornerOrnament position="top-left" className="absolute top-2 left-2 w-14 h-14 text-[#C5A059]" />
            <CornerOrnament position="top-right" className="absolute top-2 right-2 w-14 h-14 text-[#C5A059]" />
            <CornerOrnament position="bottom-left" className="absolute bottom-2 left-2 w-14 h-14 text-[#C5A059]" />
            <CornerOrnament position="bottom-right" className="absolute bottom-2 right-2 w-14 h-14 text-[#C5A059]" />

            {/* Inner Gold Foil Frame */}
            <div className="relative border border-[#C5A059]/60 p-6 sm:p-8 rounded-lg flex flex-col items-center text-center">
              
              {/* Royal Monogram Wax Seal */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-4"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#7A1524] to-[#36070E] border-2 border-[#C5A059] shadow-[0_4px_20px_rgba(74,14,23,0.4)]">
                  {/* Wax edge texture */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#E7D5AA]/50" />
                  <div className="font-cinzel text-xl font-bold text-gold-gradient tracking-widest flex items-center">
                    A<span className="text-[#E7D5AA] font-script text-sm mx-0.5">✦</span>A
                  </div>
                </div>
              </motion.div>

              {/* Invitation Heading */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="space-y-1 mb-2"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="h-[1px] w-8 bg-[#C5A059]/60" />
                  <MandalaIcon className="w-4 h-4 text-[#C5A059]" />
                  <span className="h-[1px] w-8 bg-[#C5A059]/60" />
                </div>
                <p className="font-cinzel text-xs sm:text-sm tracking-[0.28em] uppercase text-[#6B5A4B] font-medium">
                  Together with their families
                </p>
              </motion.div>

              {/* Couple Names Typography */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.9 }}
                className="my-3 sm:my-4"
              >
                <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#4A0E17] leading-tight select-none">
                  Aarav <span className="font-cinzel text-3xl sm:text-4xl text-[#C5A059] font-normal align-middle mx-1">&</span> Ananya
                </h1>
              </motion.div>

              {/* Invitation Subtext */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="space-y-2 mb-6"
              >
                <p className="font-serif italic text-lg sm:text-xl text-[#3E3228]">
                  Invite you to celebrate their wedding
                </p>
                <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
                <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-[#8E6D2F] font-semibold pt-1">
                  15 February 2027
                </p>
                <p className="font-sans text-[11px] sm:text-xs tracking-wider text-[#6B5A4B] uppercase">
                  The Royal Rambagh Palace • Jaipur, Rajasthan
                </p>
              </motion.div>

              {/* Action: Open Invitation Button */}
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenClick}
                disabled={isOpeningAnimation}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#4A0E17] via-[#631420] to-[#4A0E17] text-[#FAF7F2] font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold border border-[#C5A059] shadow-[0_8px_25px_rgba(74,14,23,0.35)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(197,160,89,0.6)] cursor-pointer"
              >
                {/* Gold border shine */}
                <span className="absolute inset-0 rounded-full border border-[#E7D5AA] opacity-50 group-hover:opacity-100 transition-opacity" />
                <Sparkles className="w-4 h-4 text-[#E7D5AA] group-hover:rotate-45 transition-transform duration-500" />
                <span>{isOpeningAnimation ? 'Unveiling...' : 'Open Invitation'}</span>
                <Heart className="w-4 h-4 text-[#E7D5AA] fill-[#E7D5AA]/40 group-hover:scale-125 transition-transform duration-300" />
              </motion.button>

              <p className="text-[10px] tracking-wider text-[#8A7968] font-sans uppercase mt-4">
                Click to begin the royal wedding experience
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

