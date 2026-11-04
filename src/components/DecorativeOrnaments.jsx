import React from 'react';

// Royal Indian Mandala Rosette
export function MandalaIcon({ className = "w-12 h-12 text-[#C5A059]" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.85" />
      
      {/* 8 Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50 14 C46 25 43 32 50 42 C57 32 54 25 50 14 Z"
            fill="currentColor"
            opacity="0.75"
          />
          <circle cx="50" cy="11" r="2" fill="currentColor" />
          <path
            d="M48 24 Q50 20 52 24"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </g>
      ))}

      {/* 8 Intermediary Paisley Accents */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50 22 C48 28 47 34 50 38 C53 34 52 28 50 22 Z"
            stroke="currentColor"
            strokeWidth="0.9"
            fill="none"
            opacity="0.8"
          />
          <circle cx="50" cy="18" r="1.5" fill="currentColor" opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

// Royal Gold Section Divider with central Lotus
export function GoldDivider({ className = "my-6", text = null }) {
  return (
    <div className={`flex items-center justify-center gap-4 w-full max-w-xl mx-auto ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059] to-[#C5A059]" />
      
      <div className="flex items-center gap-2 text-[#C5A059]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] rotate-45 transform" />
        {text ? (
          <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#8E6D2F] font-semibold px-2">
            {text}
          </span>
        ) : (
          <LotusIcon className="w-6 h-6 text-[#C5A059]" />
        )}
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] rotate-45 transform" />
      </div>

      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059] to-[#C5A059]" />
    </div>
  );
}

// Sacred Lotus Flower Motif
export function LotusIcon({ className = "w-6 h-6 text-[#C5A059]" }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Central petal */}
      <path
        d="M32 10 C27 24 26 38 32 48 C38 38 37 24 32 10 Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* Left inner petal */}
      <path
        d="M30 18 C20 28 18 40 28 48 C27 38 27 28 30 18 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Right inner petal */}
      <path
        d="M34 18 C44 28 46 40 36 48 C37 38 37 28 34 18 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Left outer petal */}
      <path
        d="M26 28 C12 36 10 46 22 52 C21 44 23 36 26 28 Z"
        fill="currentColor"
        opacity="0.65"
      />
      {/* Right outer petal */}
      <path
        d="M38 28 C52 36 54 46 42 52 C43 44 41 36 38 28 Z"
        fill="currentColor"
        opacity="0.65"
      />
      {/* Base water ripple */}
      <path
        d="M16 52 C24 55 40 55 48 52 C42 55 22 55 16 52 Z"
        fill="currentColor"
        opacity="0.7"
      />
      <circle cx="32" cy="54" r="1.5" fill="currentColor" />
    </svg>
  );
}

// Corner Ornamental Filigree (for invitation cards, photo frames)
export function CornerOrnament({ position = "top-left", className = "w-16 h-16 text-[#C5A059]" }) {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale-x-[-1]";
      case "bottom-left":
        return "scale-y-[-1]";
      case "bottom-right":
        return "scale-[-1]";
      default:
        return "";
    }
  };

  return (
    <div className={`pointer-events-none select-none ${getTransform()} ${className}`}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Main outer border */}
        <path d="M4 80 L4 18 C4 10 10 4 18 4 L80 4" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
        <path d="M12 80 L12 24 C12 17 17 12 24 12 L80 12" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.6" />
        
        {/* Corner flourish paisley */}
        <path
          d="M16 16 Q32 16 38 24 Q32 32 24 38 Q16 32 16 16 Z"
          fill="currentColor"
          opacity="0.4"
        />
        <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.8" />
        <circle cx="30" cy="6" r="1.5" fill="currentColor" />
        <circle cx="6" cy="30" r="1.5" fill="currentColor" />
        <path d="M4 4 L14 14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// Royal Rajputana Cusped Arch Silhouette (Framing Graphic)
export function RoyalArchFrame({ children, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      {/* Top decorative arch apex */}
      <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2 z-10 pointer-events-none">
        <svg viewBox="0 0 200 40" fill="none" className="w-48 h-10 text-[#C5A059]">
          <path
            d="M0 40 C40 40 60 20 80 15 C92 12 96 2 100 0 C104 2 108 12 120 15 C140 20 160 40 200 40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="100" cy="6" r="3" fill="currentColor" />
          <path d="M90 20 Q100 12 110 20" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {children}
    </div>
  );
}

// Royal Monogram Crest: "A & A"
export function RoyalCrest({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-14 h-14 text-sm",
    md: "w-20 h-20 text-lg",
    lg: "w-28 h-28 text-2xl",
    xl: "w-36 h-36 text-3xl",
  }[size] || "w-20 h-20 text-lg";

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses} ${className}`}>
      {/* Outer concentric ornate ring */}
      <div className="absolute inset-0 rounded-full border-2 border-[#C5A059]/80 shadow-[0_0_15px_rgba(197,160,89,0.3)] animate-[spin_40s_linear_infinite]" />
      <div className="absolute inset-1 rounded-full border border-dashed border-[#C5A059]/60" />
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#4A0E17] to-[#2A060C] shadow-inner" />
      
      {/* Monogram letters */}
      <div className="relative z-10 flex items-center justify-center font-serif text-[#FAF7F2] font-semibold tracking-wider">
        <span className="font-cinzel text-gold-gradient font-bold">A</span>
        <span className="font-script text-[#E7D5AA] text-[0.8em] mx-0.5">✦</span>
        <span className="font-cinzel text-gold-gradient font-bold">A</span>
      </div>
    </div>
  );
}

