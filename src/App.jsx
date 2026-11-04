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
  // Has the visitor passed through the opening cinematic screen initially?
  const [hasEnteredWebsite, setHasEnteredWebsite] = useState(false);
  // Is the invitation card currently being viewed?
  const [isCardModalOpen, setIsCardModalOpen] = useState(true);

  const handleOpenInvitation = () => {
    setIsCardModalOpen(false);
    setHasEnteredWebsite(true);
  };

  const handleReopenInvitation = () => {
    setIsCardModalOpen(true);
  };

  const handleCloseCard = () => {
    setIsCardModalOpen(false);
    setHasEnteredWebsite(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#2D241E] font-sans overflow-x-hidden selection:bg-[#C5A059]/30 selection:text-[#4A0E17]">
      {/* Background Floating Petals & Gold Dust */}
      <PetalRain active={true} speed={0.8} />

      {/* Cinematic Opening / Invitation Card Modal */}
      <OpeningExperience
        isOpen={!isCardModalOpen}
        onOpenInvitation={handleOpenInvitation}
        onClose={handleCloseCard}
        isReopened={hasEnteredWebsite}
      />

      {/* Main Website Content - stays rendered and visible */}
      <div className={`transition-opacity duration-700 ${hasEnteredWebsite || !isCardModalOpen ? 'opacity-100' : 'opacity-10'}`}>
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
