import React, { useState, useEffect } from 'react';
import { Menu, X, Heart, Music, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

export function Navbar({ onReopenInvitation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = soundEngine.subscribe(setIsPlaying);
    return () => unsub();
  }, []);

  const navLinks = [
    { name: 'The Couple', href: '#couple' },
    { name: 'Our Story', href: '#story' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'The Palace', href: '#venue' },
    { name: 'RSVP', href: '#rsvp' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md py-3 border-b border-[#C5A059]/30'
          : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Royal Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className={`w-9 h-9 rounded-full border border-[#C5A059] flex items-center justify-center transition-transform group-hover:scale-105 ${
              isScrolled ? 'bg-[#4A0E17] text-[#FAF7F2]' : 'bg-[#4A0E17]/90 text-[#FAF7F2]'
            }`}>
              <span className="font-cinzel text-xs font-bold tracking-widest text-gold-gradient">
                A✦A
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className={`font-cinzel text-sm sm:text-base tracking-[0.2em] uppercase font-bold transition-colors ${
                isScrolled ? 'text-[#4A0E17]' : 'text-[#FAF7F2]'
              }`}>
                Aarav & Ananya
              </span>
              <span className={`font-sans text-[9px] tracking-[0.3em] uppercase ${
                isScrolled ? 'text-[#8E6D2F]' : 'text-[#E7D5AA]'
              }`}>
                15 Feb 2027 • Jaipur
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-cinzel text-xs tracking-[0.2em] uppercase transition-all duration-300 relative py-1 hover:text-[#C5A059] ${
                  isScrolled ? 'text-[#3E3228]' : 'text-[#FAF7F2]/90'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs: Music, Replay Card, RSVP Button */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Replay Invitation button */}
            <button
              onClick={onReopenInvitation}
              className={`px-3 py-1.5 rounded-full text-[11px] font-cinzel tracking-wider uppercase transition-all border ${
                isScrolled
                  ? 'border-[#C5A059]/60 text-[#8E6D2F] hover:bg-[#C5A059]/10'
                  : 'border-[#E7D5AA]/50 text-[#E7D5AA] hover:bg-white/10'
              }`}
              title="View opening invitation card"
            >
              Invitation Card
            </button>

            {/* Quick RSVP CTA */}
            <a
              href="#rsvp"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#4A0E17] to-[#631420] text-[#FAF7F2] font-cinzel text-xs tracking-[0.2em] uppercase font-semibold border border-[#C5A059] shadow-md hover:shadow-[0_0_15px_rgba(197,160,89,0.5)] transition-all hover:scale-105 flex items-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-[#E7D5AA] fill-[#E7D5AA]/50" />
              <span>RSVP</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <div className="flex items-center sm:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-[#4A0E17]' : 'text-white'}`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#C5A059]/40 px-6 py-6 shadow-xl animate-fade-in text-[#2A060C]">
          <div className="flex flex-col space-y-4 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-cinzel text-sm tracking-[0.2em] uppercase py-2 border-b border-[#C5A059]/20 text-[#4A0E17] hover:text-[#C5A059]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReopenInvitation();
                }}
                className="w-full py-2.5 rounded-full border border-[#C5A059] text-xs font-cinzel tracking-wider uppercase text-[#8E6D2F]"
              >
                View Opening Card
              </button>
              <a
                href="#rsvp"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#4A0E17] text-[#FAF7F2] text-xs font-cinzel tracking-wider uppercase font-semibold border border-[#C5A059]"
              >
                RSVP to Celebrate
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

