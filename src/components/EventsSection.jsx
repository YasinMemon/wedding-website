import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MandalaIcon, GoldDivider, CornerOrnament, LotusIcon } from './DecorativeOrnaments';
import { Calendar, Clock, MapPin, Sparkles, Navigation, CalendarPlus, Check, ChevronDown } from 'lucide-react';
import { weddingData } from '../data/weddingData';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';

export function EventsSection() {
  const { events } = weddingData;
  const [downloadedEventId, setDownloadedEventId] = useState(null);

  const handleDownloadIcs = (event) => {
    downloadIcsFile({
      id: event.id,
      title: event.name,
      description: `${event.description}\n\nDress Code: ${event.dressCode}`,
      location: `${event.venue}, ${event.address}`,
      startDate: event.startDate,
      endDate: event.endDate,
    });
    setDownloadedEventId(event.id);
    setTimeout(() => setDownloadedEventId(null), 3000);
  };

  const handleOpenGoogleCal = (event) => {
    const url = getGoogleCalendarUrl({
      id: event.id,
      title: event.name,
      description: `${event.description}\n\nDress Code: ${event.dressCode}`,
      location: `${event.venue}, ${event.address}`,
      startDate: event.startDate,
      endDate: event.endDate,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="events" className="py-24 sm:py-32 relative bg-[#FAF7F2] text-[#2D241E] overflow-hidden">
      
      {/* Background Mandala Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
        <MandalaIcon className="w-[700px] h-[700px] text-[#C5A059]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/10 text-[#8E6D2F] font-cinzel text-xs tracking-[0.25em] uppercase mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Sacred Celebrations</span>
            <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#4A0E17] font-normal leading-tight">
            Wedding Events
          </h2>
          <p className="font-script text-3xl sm:text-4xl text-[#C5A059] mt-2">
            Four days of royal festivities & joyous rituals
          </p>
          <GoldDivider className="my-6" />
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative bg-[#F7F2E7] rounded-2xl border border-[#C5A059]/50 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-[#C5A059] flex flex-col justify-between"
            >
              {/* Corner Ornaments */}
              <CornerOrnament position="top-left" className="absolute top-2 left-2 w-10 h-10 text-[#C5A059] z-20 pointer-events-none" />
              <CornerOrnament position="top-right" className="absolute top-2 right-2 w-10 h-10 text-[#C5A059] z-20 pointer-events-none" />

              <div>
                {/* Event Photo Header */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A060C] via-[#2A060C]/40 to-transparent" />
                  
                  {/* Badge Over Photo */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#4A0E17]/90 text-[#FAF7F2] font-cinzel text-xs tracking-widest uppercase px-3.5 py-1 rounded-full border border-[#C5A059]/50 shadow-md">
                      Event 0{index + 1}
                    </span>
                  </div>

                  {/* Title Overlay in Photo Base */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-gold-gradient drop-shadow-md">
                      {event.name}
                    </h3>
                    <p className="font-serif italic text-sm text-[#E7D5AA]">
                      {event.subtitle}
                    </p>
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Date, Time, Venue Pills */}
                  <div className="space-y-2.5 pb-2 border-b border-[#C5A059]/20 text-xs sm:text-sm font-cinzel tracking-wider text-[#3E3228]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center text-[#4A0E17] shrink-0">
                        <Calendar className="w-4 h-4 text-[#C5A059]" />
                      </div>
                      <span className="font-semibold text-[#4A0E17]">{event.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center text-[#4A0E17] shrink-0">
                        <Clock className="w-4 h-4 text-[#C5A059]" />
                      </div>
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#C5A059]/40 flex items-center justify-center text-[#4A0E17] shrink-0">
                        <MapPin className="w-4 h-4 text-[#C5A059]" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#4A0E17]">{event.venue}</span>
                        <p className="text-[11px] font-sans text-[#7D6B5A] tracking-normal">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-serif text-base sm:text-lg text-[#4E4137] leading-relaxed">
                    {event.description}
                  </p>

                  {/* Dress Code Tag */}
                  <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#C5A059]/30 text-xs">
                    <span className="font-cinzel tracking-wider uppercase text-[#8E6D2F] font-semibold block mb-0.5">
                      Attire Recommendation:
                    </span>
                    <span className="font-sans text-[#4A0E17] italic">
                      {event.dressCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Calendar & Get Directions */}
              <div className="p-6 sm:p-7 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Add to Calendar Dropdown or Dual Trigger */}
                <div className="relative group/cal">
                  <button
                    onClick={() => handleDownloadIcs(event)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#4A0E17] font-cinzel text-xs tracking-wider uppercase font-semibold border border-[#C5A059] shadow-sm transition-all"
                  >
                    {downloadedEventId === event.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Saved to Calendar</span>
                      </>
                    ) : (
                      <>
                        <CalendarPlus className="w-4 h-4 text-[#C5A059]" />
                        <span>Add to Calendar</span>
                      </>
                    )}
                  </button>

                  {/* Quick Google Cal shortcut */}
                  <button
                    onClick={() => handleOpenGoogleCal(event)}
                    className="text-[10px] text-[#8E6D2F] hover:text-[#4A0E17] font-sans underline text-center w-full block mt-1"
                  >
                    or open Google Calendar
                  </button>
                </div>

                {/* Get Directions */}
                <div>
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#4A0E17] to-[#631420] text-[#FAF7F2] font-cinzel text-xs tracking-wider uppercase font-semibold border border-[#C5A059] shadow-sm hover:shadow-[0_0_15px_rgba(197,160,89,0.4)] transition-all"
                  >
                    <Navigation className="w-4 h-4 text-[#E7D5AA]" />
                    <span>Get Directions</span>
                  </a>
                  <span className="text-[10px] text-[#7D6B5A] font-sans text-center w-full block mt-1">
                    Opens in Google Maps
                  </span>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

