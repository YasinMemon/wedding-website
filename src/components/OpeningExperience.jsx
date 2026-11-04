import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CornerOrnament, MandalaIcon, GoldDivider, RoyalCrest } from './DecorativeOrnaments';
import { Volume2, VolumeX, Sparkles, Heart, X, ArrowLeft } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

export function OpeningExperience({ isOpen, onOpenInvitation, onClose, isReopened = false }) {
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isOpeningAnimation, setIsOpeningAnimation] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (onClose) onClose();
        else onOpenInvitation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onOpenInvitation]);

  const handleAudioPreToggle = () => {
    const newState = soundEngine.toggle();
    setIsAudioReady(newState);
  };

  const handleOpenClick = () => {
    setIsOpeningAnimation(true);

    // Trigger celebratory royal rose petal & gold glitter confetti
    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#E7D5AA', '#8E6D2F', '#7A1524', '#4A0E17'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    setTimeout(() => {
      setIsOpeningAnimation(false);
      onOpenInvitation();
    }, 700);
  };

  const handleDismiss = () => {
    if (onClose) {
      onClose();
    } else {
      onOpenInvitation();
    }
  };

  if (isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="opening-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleDismiss}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        style={{
          backgroundColor: '#350910',
          backgroundImage: `
            radial-gradient(ellipse at 50% 35%, rgba(138, 30, 48, 0.72) 0%, rgba(53, 9, 16, 0.92) 70%, rgba(28, 4, 8, 0.98) 100%),
            url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Soft Warm Golden Ambient Glow & Shimmer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,89,0.18)_0%,transparent_60%)] pointer-events-none" />

        {/* Top Control Bar (Close Button + Music Button) */}
        <div
          className="fixed top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex items-center justify-between pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close / Return to Website Button */}
          <button
            onClick={handleDismiss}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF7F2]/95 hover:bg-[#FAF7F2] text-[#4A0E17] hover:text-[#2A060C] border border-[#C5A059] shadow-xl font-cinzel text-xs tracking-wider uppercase font-semibold transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
            title="Return to Wedding Website (Esc)"
          >
            <X className="w-4 h-4 text-[#C5A059]" />
            <span>{isReopened ? 'Close & Return' : 'Enter Website'}</span>
          </button>

          {/* Music Toggle */}
          <button
            onClick={handleAudioPreToggle}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FAF7F2]/95 hover:bg-[#FAF7F2] text-[#4A0E17] border border-[#C5A059] shadow-xl font-cinzel text-xs tracking-wider uppercase font-semibold transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
            title="Toggle Royal Palace Ambience"
          >
            {isAudioReady ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                <span>Music Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#8E6D2F]" />
                <span>Turn On Music</span>
              </>
            )}
          </button>
        </div>

        {/* Luxury Invitation Envelope & Royal Card */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl mx-auto my-auto z-10"
        >
          {/* Outer Warm Gold Halo Glow */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#C5A059]/40 via-[#E7D5AA]/50 to-[#8E6D2F]/40 blur-2xl opacity-80 pointer-events-none" />

          {/* Card Container */}
          <div className="relative bg-[#FAF7F2] text-[#2A060C] rounded-2xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.65)] p-6 sm:p-10 md:p-11 border-2 border-[#C5A059]/80 overflow-hidden">
            {/* Subtle Parchment Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#C5A059_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

            {/* Corner Ornamental Filigrees */}
            <CornerOrnament position="top-left" className="absolute top-2 left-2 w-14 h-14 text-[#C5A059]" />
            <CornerOrnament position="top-right" className="absolute top-2 right-2 w-14 h-14 text-[#C5A059]" />
            <CornerOrnament position="bottom-left" className="absolute bottom-2 left-2 w-14 h-14 text-[#C5A059]" />
            <CornerOrnament position="bottom-right" className="absolute bottom-2 right-2 w-14 h-14 text-[#C5A059]" />

            {/* Card Internal Close 'X' Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#F4EFE6] hover:bg-[#EAE1D1] border border-[#C5A059]/60 text-[#4A0E17] flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-sm"
              title="Close invitation (Esc)"
              aria-label="Close invitation"
            >
              <X className="w-4 h-4 text-[#8E6D2F]" />
            </button>

            {/* Inner Gold Foil Frame */}
            <div className="relative border border-[#C5A059]/60 p-5 sm:p-7 rounded-lg flex flex-col items-center text-center">
              
              {/* Royal Monogram Wax Seal */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 220 }}
                className="mb-3"
              >
                <div className="relative inline-flex items-center justify-center w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#7A1524] to-[#36070E] border-2 border-[#C5A059] shadow-[0_4px_20px_rgba(74,14,23,0.35)]">
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#E7D5AA]/50" />
                  <div className="font-cinzel text-lg sm:text-xl font-bold text-gold-gradient tracking-widest flex items-center">
                    A<span className="text-[#E7D5AA] font-script text-sm mx-0.5">✦</span>A
                  </div>
                </div>
              </motion.div>

              {/* Invitation Heading */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
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
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="my-2 sm:my-3"
              >
                <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#4A0E17] leading-tight select-none">
                  Aarav <span className="font-cinzel text-3xl sm:text-4xl text-[#C5A059] font-normal align-middle mx-1">&</span> Ananya
                </h1>
              </motion.div>

              {/* Invitation Subtext */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="space-y-1.5 mb-5"
              >
                <p className="font-serif italic text-base sm:text-lg text-[#3E3228]">
                  Invite you to celebrate their wedding
                </p>
                <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mx-auto" />
                <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] uppercase text-[#8E6D2F] font-semibold pt-0.5">
                  15 February 2027
                </p>
                <p className="font-sans text-[11px] sm:text-xs tracking-wider text-[#6B5A4B] uppercase">
                  The Royal Rambagh Palace • Jaipur, Rajasthan
                </p>
              </motion.div>

              {/* Action Buttons: Open Invitation & Return */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleOpenClick}
                  disabled={isOpeningAnimation}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#4A0E17] via-[#631420] to-[#4A0E17] text-[#FAF7F2] font-cinzel text-xs sm:text-sm tracking-[0.22em] uppercase font-semibold border border-[#C5A059] shadow-[0_8px_25px_rgba(74,14,23,0.3)] transition-all duration-300 hover:shadow-[0_0_22px_rgba(197,160,89,0.55)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#E7D5AA] group-hover:rotate-45 transition-transform duration-500" />
                  <span>{isOpeningAnimation ? 'Unveiling...' : (isReopened ? 'Enter Website' : 'Open Invitation')}</span>
                  <Heart className="w-4 h-4 text-[#E7D5AA] fill-[#E7D5AA]/40 group-hover:scale-125 transition-transform duration-300" />
                </motion.button>

                {isReopened && (
                  <button
                    onClick={handleDismiss}
                    className="px-5 py-2.5 rounded-full border border-[#C5A059]/60 text-xs font-cinzel tracking-wider uppercase text-[#4A0E17] hover:bg-[#C5A059]/10 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#8E6D2F]" />
                    <span>Back to Page</span>
                  </button>
                )}
              </div>

              <p className="text-[10px] tracking-wider text-[#8A7968] font-sans uppercase mt-3">
                Click to explore the royal celebrations
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
