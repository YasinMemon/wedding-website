import React, { useState } from 'react';
import { OpeningExperience } from './components/OpeningExperience';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { LoveStorySection } from './components/LoveStorySection';
import { EventsSection } from './components/EventsSection';
import { GallerySection } from './components/GallerySection';
import { VenueSection } from './components/VenueSection';
import { RsvpSection } from './components/RsvpSection';
import { ClosingSection } from './components/ClosingSection';
import { MusicPlayer } from './components/MusicPlayer';
import { PetalRain } from './components/PetalRain';

export default function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
  };

  const handleReopenInvitation = () => {
    setIsInvitationOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#2D241E] font-sans overflow-x-hidden selection:bg-[#C5A059]/30 selection:text-[#4A0E17]">
      {/* Background Floating Petals & Gold Dust */}
      <PetalRain active={true} speed={0.8} />

      {/* Cinematic Opening Screen */}
      <OpeningExperience
        isOpen={isInvitationOpen}
        onOpenInvitation={handleOpenInvitation}
      />

      {/* Main Website Content */}
      <div className={`transition-opacity duration-1000 ${isInvitationOpen ? 'opacity-100' : 'opacity-0'}`}>
        {/* Sticky Luxury Navbar */}
        <Navbar onReopenInvitation={handleReopenInvitation} />

        {/* Hero Section */}
        <HeroSection />

        {/* Couple Editorial Section */}
        <CoupleSection />

        {/* Love Story Timeline */}
        <LoveStorySection />

        {/* Wedding Events Section */}
        <EventsSection />

        {/* Gallery Section */}
        <GallerySection />

        {/* Venue Section */}
        <VenueSection />

        {/* RSVP Section */}
        <RsvpSection />

        {/* Closing Section */}
        <ClosingSection onReopenInvitation={handleReopenInvitation} />

        {/* Floating Royal Music Player */}
        <MusicPlayer />
      </div>
    </div>
  );
}
