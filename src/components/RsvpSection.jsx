import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MandalaIcon, GoldDivider, CornerOrnament, RoyalCrest } from './DecorativeOrnaments';
import { Heart, Send, CheckCircle2, Users, Utensils, CalendarCheck, Mail, User, Phone, MessageSquare, Download, Trash2, X } from 'lucide-react';
import { weddingData } from '../data/weddingData';

const STORAGE_KEY = 'aarav_ananya_wedding_rsvps';

export function RsvpSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: 'attending', // 'attending' | 'not_attending'
    guestsCount: '2',
    events: ['mehendi', 'sangeet', 'wedding', 'reception'],
    dietary: 'Vegetarian',
    specialNotes: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [allSubmissions, setAllSubmissions] = useState([]);

  // Load existing submissions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAllSubmissions(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading RSVPs from localStorage', e);
    }
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (formData.attendance === 'attending' && formData.events.length === 0) {
      errs.events = 'Please select at least one event you will attend.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submissionRecord = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    };

    // Save to localStorage
    const updated = [submissionRecord, ...allSubmissions];
    setAllSubmissions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed saving to localStorage', e);
    }

    setLastSubmission(submissionRecord);
    setIsSubmitted(true);

    // Trigger celebratory confetti
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#E7D5AA', '#4A0E17', '#6E1B28'],
    });
  };

  const handleEventToggle = (eventId) => {
    setFormData((prev) => {
      const exists = prev.events.includes(eventId);
      const newEvents = exists
        ? prev.events.filter((id) => id !== eventId)
        : [...prev.events, eventId];
      return { ...prev, events: newEvents };
    });
  };

  const handleSelectAllEvents = () => {
    if (formData.events.length === 4) {
      setFormData((prev) => ({ ...prev, events: [] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        events: ['mehendi', 'sangeet', 'wedding', 'reception'],
      }));
    }
  };

  const handleResetForAnotherGuest = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      attendance: 'attending',
      guestsCount: '2',
      events: ['mehendi', 'sangeet', 'wedding', 'reception'],
      dietary: 'Vegetarian',
      specialNotes: '',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const clearAllSubmissions = () => {
    if (window.confirm('Clear all demo RSVP records from local storage?')) {
      localStorage.removeItem(STORAGE_KEY);
      setAllSubmissions([]);
    }
  };

  const exportToCsv = () => {
    if (allSubmissions.length === 0) return;
    const headers = ['Name,Email,Phone,Attendance,Guests,Events,Dietary,Message,Date'];
    const rows = allSubmissions.map((s) => [
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.phone || ''}"`,
      `"${s.attendance}"`,
      `"${s.guestsCount}"`,
      `"${s.events ? s.events.join('; ') : ''}"`,
      `"${s.dietary}"`,
      `"${(s.message || '').replace(/"/g, '""')}"`,
      `"${new Date(s.submittedAt).toLocaleDateString()}"`,
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'wedding-rsvps-aarav-ananya.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="rsvp" className="py-24 sm:py-32 relative bg-[#F7F2E7] text-[#2D241E] overflow-hidden">
      
      {/* Decorative Gold Dividers */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/15 text-[#8E6D2F] font-cinzel text-xs tracking-[0.25em] uppercase mb-3">
            <Send className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Celebrate With Us</span>
            <Send className="w-3.5 h-3.5 text-[#C5A059]" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#4A0E17] font-normal leading-tight">
            Royal RSVP
          </h2>
          <p className="font-script text-3xl sm:text-4xl text-[#C5A059] mt-2">
            Please grace us with your kind presence
          </p>
          <p className="font-cinzel text-xs tracking-[0.2em] text-[#6B5A4B] uppercase mt-3">
            Kindly confirm your attendance by 15 January 2027
          </p>
          <GoldDivider className="my-6" />
        </div>

        {/* RSVP Card Container */}
        <div className="relative p-6 sm:p-10 md:p-12 bg-[#FAF7F2] rounded-3xl border-2 border-[#C5A059]/70 shadow-2xl">
          <CornerOrnament position="top-left" className="absolute top-2 left-2 w-14 h-14 text-[#C5A059]" />
          <CornerOrnament position="top-right" className="absolute top-2 right-2 w-14 h-14 text-[#C5A059]" />
          <CornerOrnament position="bottom-left" className="absolute bottom-2 left-2 w-14 h-14 text-[#C5A059]" />
          <CornerOrnament position="bottom-right" className="absolute bottom-2 right-2 w-14 h-14 text-[#C5A059]" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8 relative z-10"
              >
                {/* Attendance Toggle Options */}
                <div className="space-y-3">
                  <label className="block text-center font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase text-[#4A0E17] font-semibold">
                    Will you be joining our celebration? *
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                    {/* Joyfully Accept */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                      className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                        formData.attendance === 'attending'
                          ? 'bg-[#4A0E17] text-[#FAF7F2] border-[#C5A059] shadow-lg scale-102'
                          : 'bg-[#F7F2E7] text-[#4E4137] border-[#C5A059]/40 hover:border-[#C5A059]'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${formData.attendance === 'attending' ? 'text-[#E7D5AA] fill-[#E7D5AA]' : 'text-[#8E6D2F]'}`} />
                      <span className="font-cinzel text-xs font-bold tracking-wider uppercase">
                        Joyfully Accept
                      </span>
                      <span className="text-[11px] font-sans opacity-80">
                        I will celebrate with Aarav & Ananya
                      </span>
                    </button>

                    {/* Regretfully Decline */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attendance: 'not_attending' })}
                      className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                        formData.attendance === 'not_attending'
                          ? 'bg-[#4A0E17] text-[#FAF7F2] border-[#C5A059] shadow-lg scale-102'
                          : 'bg-[#F7F2E7] text-[#4E4137] border-[#C5A059]/40 hover:border-[#C5A059]'
                      }`}
                    >
                      <X className={`w-5 h-5 ${formData.attendance === 'not_attending' ? 'text-[#E7D5AA]' : 'text-[#8E6D2F]'}`} />
                      <span className="font-cinzel text-xs font-bold tracking-wider uppercase">
                        Regretfully Decline
                      </span>
                      <span className="text-[11px] font-sans opacity-80">
                        Sending blessings from afar
                      </span>
                    </button>
                  </div>
                </div>

                {/* Guest Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label className="font-cinzel text-xs tracking-wider uppercase text-[#4A0E17] font-semibold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#C5A059]" />
                      Full Guest Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maharani Gayatri Devi / Mr. Rohan Verma"
                      className={`w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-[#2D241E] focus:outline-none focus:ring-2 focus:ring-[#C5A059] font-sans text-sm ${
                        errors.name ? 'border-red-500 bg-red-50/20' : 'border-[#C5A059]/50'
                      }`}
                    />
                    {errors.name && <p className="text-red-600 text-xs font-sans">{errors.name}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="font-cinzel text-xs tracking-wider uppercase text-[#4A0E17] font-semibold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="youremail@example.com"
                      className={`w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-[#2D241E] focus:outline-none focus:ring-2 focus:ring-[#C5A059] font-sans text-sm ${
                        errors.email ? 'border-red-500 bg-red-50/20' : 'border-[#C5A059]/50'
                      }`}
                    />
                    {errors.email && <p className="text-red-600 text-xs font-sans">{errors.email}</p>}
                  </div>

                  {/* Phone / WhatsApp Field */}
                  <div className="space-y-1.5">
                    <label className="font-cinzel text-xs tracking-wider uppercase text-[#4A0E17] font-semibold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                      Phone / WhatsApp (For Concierge Updates)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/50 text-[#2D241E] focus:outline-none focus:ring-2 focus:ring-[#C5A059] font-sans text-sm"
                    />
                  </div>

                  {/* Number of Guests Attending */}
                  <div className="space-y-1.5">
                    <label className="font-cinzel text-xs tracking-wider uppercase text-[#4A0E17] font-semibold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                      Number of Guests Attending
                    </label>
                    <select
                      value={formData.guestsCount}
                      disabled={formData.attendance === 'not_attending'}
                      onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/50 text-[#2D241E] focus:outline-none focus:ring-2 focus:ring-[#C5A059] font-sans text-sm disabled:opacity-50"
                    >
                      <option value="1">1 Guest (Only Me)</option>
                      <option value="2">2 Guests (Couple / With Plus One)</option>
                      <option value="3">3 Guests (Family)</option>
                      <option value="4">4 Guests (Family)</option>
                      <option value="5">5 Guests (Family)</option>
                      <option value="6">6+ Guests (Royal Delegation)</option>
                    </select>
                  </div>

                </div>

                {/* Event Attendance Checkboxes (Only shown if attending) */}
                {formData.attendance === 'attending' && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-cinzel text-xs sm:text-sm tracking-wider uppercase text-[#4A0E17] font-semibold flex items-center gap-1.5">
                        <CalendarCheck className="w-4 h-4 text-[#C5A059]" />
                        Which Events Will You Attend? *
                      </label>
                      <button
                        type="button"
                        onClick={handleSelectAllEvents}
                        className="text-xs font-cinzel text-[#8E6D2F] hover:text-[#4A0E17] underline"
                      >
                        {formData.events.length === 4 ? 'Deselect All' : 'Select All Events'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {weddingData.events.map((event) => {
                        const isChecked = formData.events.includes(event.id);
                        return (
                          <div
                            key={event.id}
                            onClick={() => handleEventToggle(event.id)}
                            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                              isChecked
                                ? 'bg-[#4A0E17]/5 border-[#C5A059] shadow-sm'
                                : 'bg-[#FAF7F2] border-black/10 opacity-70'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="mt-1 accent-[#4A0E17] w-4 h-4 cursor-pointer"
                            />
                            <div>
                              <span className="font-cinzel text-xs font-bold text-[#4A0E17] tracking-wider uppercase block">
                                {event.name}
                              </span>
                              <span className="font-sans text-xs text-[#7D6B5A]">
                                {event.date} • {event.venue}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.events && <p className="text-red-600 text-xs font-sans">{errors.events}</p>}
                  </div>
                )}

                {/* Dietary Preferences */}
                {formData.attendance === 'attending' && (
                  <div className="space-y-1.5 pt-2">
                    <label className="font-cinzel text-xs tracking-wider uppercase text-[#4A0E17] font-semibold flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-[#C5A059]" />
                      Dietary Preferences
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['Vegetarian', 'Pure Jain', 'Non-Vegetarian', 'Vegan'].map((diet) => (
                        <button
                          key={diet}
                          type="button"
                          onClick={() => setFormData({ ...formData, dietary: diet })}
                          className={`py-2 px-3 rounded-lg border text-xs font-sans transition-all cursor-pointer ${
                            formData.dietary === diet
                              ? 'bg-[#4A0E17] text-[#FAF7F2] border-[#C5A059] font-medium'
                              : 'bg-[#FAF7F2] text-[#4E4137] border-[#C5A059]/40'
                          }`}
                        >
                          {diet}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personal Message & Blessings */}
                <div className="space-y-1.5 pt-2">
                  <label className="font-cinzel text-xs tracking-wider uppercase text-[#4A0E17] font-semibold flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#C5A059]" />
                    Wishes & Blessings for the Couple
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your heartfelt blessings, memories, or a song request for the Sangeet..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#C5A059]/50 text-[#2D241E] focus:outline-none focus:ring-2 focus:ring-[#C5A059] font-sans text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-[#4A0E17] via-[#631420] to-[#4A0E17] text-[#FAF7F2] font-cinzel text-sm tracking-[0.25em] uppercase font-semibold border border-[#C5A059] shadow-xl hover:shadow-[0_0_25px_rgba(197,160,89,0.6)] hover:scale-102 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#E7D5AA]" />
                    <span>Submit RSVP Confirmation</span>
                  </button>
                  <p className="text-[11px] font-sans text-[#7D6B5A] mt-2">
                    A formal confirmation will be logged for the palace concierge.
                  </p>
                </div>

              </motion.form>
            ) : (
              /* Confirmation Success State */
              <motion.div
                key="rsvp-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 sm:py-12 px-4 space-y-6 relative z-10"
              >
                <div className="w-20 h-20 rounded-full bg-[#4A0E17] border-2 border-[#C5A059] flex items-center justify-center mx-auto text-[#E7D5AA] shadow-xl">
                  <CheckCircle2 className="w-10 h-10 text-[#C5A059]" />
                </div>

                <div className="space-y-2 max-w-xl mx-auto">
                  <span className="font-cinzel text-xs tracking-[0.3em] uppercase text-[#8E6D2F] font-semibold">
                    Reservation Confirmed
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#4A0E17] font-semibold">
                    {lastSubmission?.attendance === 'attending'
                      ? 'We Rejoice In Your Presence!'
                      : 'Thank You for Your Blessings'}
                  </h3>
                  <p className="font-serif text-lg text-[#3E3228] leading-relaxed">
                    {lastSubmission?.attendance === 'attending'
                      ? `Dearest ${lastSubmission?.name}, your RSVP for ${lastSubmission?.guestsCount} guest(s) has been graciously received. We look forward to celebrating these momentous days together at Rambagh Palace.`
                      : `Dearest ${lastSubmission?.name}, we are deeply touched by your kind blessings and wishes. You will be warmly remembered in our hearts.`}
                  </p>
                </div>

                {/* Summary Box */}
                {lastSubmission?.attendance === 'attending' && (
                  <div className="max-w-md mx-auto p-4 rounded-xl bg-[#F4EFE6] border border-[#C5A059]/40 text-left text-xs font-sans space-y-2">
                    <p className="font-cinzel font-semibold text-[#4A0E17] uppercase tracking-wider text-center pb-1 border-b border-[#C5A059]/30">
                      Guest Reservation Summary
                    </p>
                    <div className="flex justify-between">
                      <span className="text-[#6B5A4B]">Guest Name:</span>
                      <span className="font-semibold text-[#2D241E]">{lastSubmission.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B5A4B]">Number of Guests:</span>
                      <span className="font-semibold text-[#2D241E]">{lastSubmission.guestsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B5A4B]">Confirmed Events:</span>
                      <span className="font-semibold text-[#2D241E]">{lastSubmission.events?.length} celebration(s)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B5A4B]">Dietary Preference:</span>
                      <span className="font-semibold text-[#2D241E]">{lastSubmission.dietary}</span>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleResetForAnotherGuest}
                    className="px-6 py-2.5 rounded-full border border-[#C5A059] text-xs font-cinzel tracking-wider uppercase text-[#4A0E17] hover:bg-[#C5A059]/10 transition-colors"
                  >
                    Submit Another Guest RSVP
                  </button>
                  <a
                    href="#venue"
                    className="px-6 py-2.5 rounded-full bg-[#4A0E17] text-[#FAF7F2] text-xs font-cinzel tracking-wider uppercase font-semibold border border-[#C5A059]"
                  >
                    Explore Venue & Itinerary
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Demo Submissions Drawer Trigger (For Luxury Portfolio Demonstration) */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAdminModal(true)}
            className="text-xs font-cinzel tracking-widest text-[#8E6D2F] hover:text-[#4A0E17] underline transition-colors"
          >
            📋 View Concierge RSVP Log ({allSubmissions.length} Guest{allSubmissions.length === 1 ? '' : 's'})
          </button>
        </div>

      </div>

      {/* Admin / Demo RSVP Log Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAdminModal(false)}
          >
            <div
              className="bg-[#FAF7F2] rounded-2xl border-2 border-[#C5A059] max-w-2xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden text-[#2D241E]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-[#C5A059]/30 flex items-center justify-between bg-[#F4EFE6]">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#4A0E17]" />
                  <h3 className="font-cinzel text-sm font-bold tracking-wider uppercase text-[#4A0E17]">
                    Concierge Guest Roster (Demo Database)
                  </h3>
                </div>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="p-1 rounded-full hover:bg-black/5"
                >
                  <X className="w-5 h-5 text-[#4A0E17]" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 overflow-y-auto flex-1 space-y-3">
                {allSubmissions.length === 0 ? (
                  <div className="text-center py-8 text-[#7D6B5A]">
                    <p className="font-serif italic text-lg">No guest RSVPs recorded yet in this browser.</p>
                    <p className="text-xs font-sans mt-1">Submit the RSVP form to see simulated records here.</p>
                  </div>
                ) : (
                  allSubmissions.map((sub, idx) => (
                    <div
                      key={sub.id || idx}
                      className="p-3.5 rounded-xl border border-[#C5A059]/40 bg-white space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel font-bold text-sm text-[#4A0E17]">{sub.name}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          sub.attendance === 'attending' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {sub.attendance === 'attending' ? `Attending (${sub.guestsCount} guests)` : 'Declined'}
                        </span>
                      </div>
                      <p className="text-gray-600">Email: {sub.email} | Phone: {sub.phone || 'N/A'}</p>
                      {sub.events && <p className="text-gray-600">Events: {sub.events.join(', ')}</p>}
                      <p className="text-gray-600">Diet: {sub.dietary}</p>
                      {sub.message && <p className="italic text-gray-700 mt-1">"{sub.message}"</p>}
                    </div>
                  ))
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-[#C5A059]/30 bg-[#F4EFE6] flex items-center justify-between">
                <button
                  onClick={clearAllSubmissions}
                  disabled={allSubmissions.length === 0}
                  className="flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-900 disabled:opacity-40"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Demo Data</span>
                </button>

                <button
                  onClick={exportToCsv}
                  disabled={allSubmissions.length === 0}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4A0E17] text-[#FAF7F2] text-xs font-cinzel font-semibold tracking-wider uppercase disabled:opacity-40"
                >
                  <Download className="w-3.5 h-3.5 text-[#E7D5AA]" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

