import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

export function MusicPlayer({ isSticky = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((state) => {
      setIsPlaying(state);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    const nextState = soundEngine.toggle();
    setIsPlaying(nextState);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundEngine.setVolume(val);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${isSticky ? 'opacity-100' : 'opacity-90'}`}>
      <div className="relative group">
        {/* Floating audio control pill */}
        <div className="flex items-center bg-[#2A060C]/90 hover:bg-[#2A060C] text-[#FAF7F2] backdrop-blur-md border border-[#C5A059]/60 rounded-full px-4 py-2.5 shadow-2xl transition-all duration-300 hover:border-[#C5A059] hover:shadow-[0_0_20px_rgba(197,160,89,0.35)]">
          <button
            onClick={handleToggle}
            className="flex items-center gap-3 cursor-pointer focus:outline-none"
            title={isPlaying ? "Mute Royal Ambiance" : "Play Royal Sitar Ambiance"}
            aria-label={isPlaying ? "Mute Royal Ambiance" : "Play Royal Sitar Ambiance"}
          >
            {/* Spinning decorative disc */}
            <div className={`w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center bg-gradient-to-tr from-[#4A0E17] to-[#1A0306] ${isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''}`}>
              <Disc className="w-4 h-4 text-[#C5A059]" />
            </div>

            <div className="flex flex-col text-left">
              <span className="font-cinzel text-[10px] tracking-[0.2em] text-[#E7D5AA] uppercase font-semibold">
                Royal Ambience
              </span>
              <span className="font-sans text-[11px] text-[#FAF7F2]/80 flex items-center gap-1.5">
                {isPlaying ? (
                  <>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Sitar & Shehnai
                  </>
                ) : (
                  <>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                    Music Paused
                  </>
                )}
              </span>
            </div>

            {/* Animated Equalizer bars */}
            <div className="flex items-end gap-[3px] h-4 ml-1 px-1">
              {[0.4, 0.9, 0.6, 0.7].map((height, i) => (
                <span
                  key={i}
                  className={`w-[2.5px] rounded-full bg-[#C5A059] transition-all duration-300 ${
                    isPlaying ? 'animate-pulse' : 'h-1 opacity-40'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(4, height * 16)}px` : '4px',
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '0.6s',
                  }}
                />
              ))}
            </div>

            {/* Toggle Icon */}
            <div className="ml-1 p-1 text-[#C5A059] hover:text-[#E7D5AA]">
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#C5A059]/60" />}
            </div>
          </button>

          {/* Volume control hover toggle */}
          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            className="ml-2 pl-2 border-l border-[#C5A059]/30 text-[#C5A059] hover:text-white transition-colors"
            title="Adjust volume"
          >
            <Music className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Volume popover slider */}
        {showVolumeSlider && (
          <div className="absolute bottom-full right-0 mb-3 bg-[#2A060C] border border-[#C5A059]/70 rounded-xl p-3 shadow-2xl backdrop-blur-md w-48 text-center animate-fade-in">
            <span className="font-cinzel text-[10px] tracking-wider text-[#E7D5AA] block mb-2 uppercase">
              Palace Volume: {Math.round(volume * 100)}%
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#C5A059] cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}

