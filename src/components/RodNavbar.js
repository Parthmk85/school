"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const RodNavbar = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = containerRef.current.offsetHeight;
      
      // Calculate how far we are into the section (0 to 1)
      // When rect.top is 0, we are at start.
      // When rect.bottom is windowHeight, we are at end.
      const totalScrollDistance = elementHeight - windowHeight;
      const currentScroll = -rect.top;
      
      let progress = currentScroll / totalScrollDistance;
      
      // Allow slight buffer before starting and after ending for smoother snap
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to determine position based on phase
  // Phase 0: About -> Phase 1: Facilities -> Phase 2: Brochures -> Phase 3: Location
  
  const getPosition = (phaseIndex) => {
    const p = scrollProgress;
    const speed = 400; 

    // ABOUT (0)
    if (phaseIndex === 0) {
      if (p < 0.1) return 50; 
      if (p < 0.3) return 50 - (p - 0.1) * speed; 
      return -50; 
    }
    
    // FACILITIES (1)
    if (phaseIndex === 1) {
      if (p < 0.1) return 150; 
      if (p < 0.3) return 150 - (p - 0.1) * speed; 
      if (p < 0.45) return 50; 
      if (p < 0.65) return 50 - (p - 0.45) * speed; 
      return -50; 
    }
    
    // BROCHURES (2)
    if (phaseIndex === 2) {
       if (p < 0.45) return 150; 
       if (p < 0.65) return 150 - (p - 0.45) * speed; 
       if (p < 0.8) return 50;
       if (p < 0.95) return 50 - (p - 0.8) * speed;
       return -50;
    }

    // LOCATION (3)
    if (phaseIndex === 3) {
      if (p < 0.8) return 150;
      if (p < 0.95) return 150 - (p - 0.8) * speed;
      return 50;
    }

    return 150;
  };
  
  const getOpacity = (phaseIndex) => {
    const pos = getPosition(phaseIndex);
    const dist = Math.abs(pos - 50);
    if (dist < 10) return 1;
    if (dist > 40) return 0;
    return 1 - (dist - 10) / 30;
  };

  return (
    // BUFFEREd CONTAINER FOR SCROLLING TRACK (Increased height for 4 sections)
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[300vh] z-10 select-none pointer-events-auto"
    >
      
      {/* STICKY VIEWPORT - Stays fixed while parent scrolls */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center overflow-hidden">
        
        {/* GO TO HOME BUTTON */}
        <Link href="#home" className="absolute top-6 right-6 z-[60] group">
            <div className="flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300">
               <span className="text-xl group-hover:-translate-y-1 transition-transform duration-300">🏠</span>
               <span className="text-sm font-bold text-slate-100 hidden md:block">Home</span>
            </div>
        </Link>
        
        {/* ---------------- ROD SECTION ---------------- */}
        <div className="absolute top-52 left-[-10px] w-[calc(100%-20px)] h-4 bg-linear-to-b from-gray-300 via-gray-100 to-gray-400 rounded-r-full shadow-lg border-y border-gray-400 pointer-events-auto flex items-center z-50">
          <div className="w-4 h-6 bg-gray-400 rounded-l-md -ml-2 border-r border-gray-500 shadow-sm relative z-10"></div>
          <div className="absolute top-1 left-0 w-full h-1 bg-white/40 pointer-events-none"></div>
        </div>

        {/* ---------------- HANGING NOTES ---------------- */}
        
        {/* About Note */}
        <div className="absolute top-52 pointer-events-none z-50 transition-all duration-300 ease-out"
             style={{ left: `${getPosition(0)}%`, opacity: getOpacity(0), transform: "translateX(-50%)" }}>
          <NavItem label="About Us" href="#about" color="amber" rotate="0" />
        </div>

        {/* Facilities Note */}
        <div className="absolute top-52 pointer-events-none z-50 transition-all duration-300 ease-out"
             style={{ left: `${getPosition(1)}%`, opacity: getOpacity(1), transform: "translateX(-50%)" }}>
          <NavItem label="Facilities" href="#facilities" color="blue" rotate="-2" />
        </div>

        {/* Brochures Note */}
        <div className="absolute top-52 pointer-events-none z-50 transition-all duration-300 ease-out"
             style={{ left: `${getPosition(2)}%`, opacity: getOpacity(2), transform: "translateX(-50%)" }}>
          <NavItem label="Brochures" href="#brochures" color="red" rotate="2" />
        </div>

        {/* Location Note (New) */}
        <div className="absolute top-52 pointer-events-none z-50 transition-all duration-300 ease-out"
             style={{ left: `${getPosition(3)}%`, opacity: getOpacity(3), transform: "translateX(-50%)" }}>
          <NavItem label="Location" href="#location" color="green" rotate="-1" ringing={true} icon="🔔" />
        </div>


        {/* ---------------- CONTENT AREA ---------------- */}
        
        <div className="relative mt-72 px-4 flex-1 w-full max-w-6xl">
            
            {/* CONTENT A: ABOUT US */}
            <div 
              className="absolute top-0 left-1/2 w-full max-w-4xl transition-all duration-500 ease-out"
              style={{ left: `${getPosition(0)}%`, opacity: getOpacity(0), transform: "translateX(-50%)" }}
            >
              <div className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg border border-amber-100 dark:border-slate-700">
                  <h2 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600 drop-shadow-sm">About Us</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                    We are dedicated to providing the best education for children. Our methodology focuses on creativity, critical thinking, and character building.
                    We believe in nurturing every child's potential through a balanced curriculum and state-of-the-art resources.
                  </p>
                  <div className="mt-8 flex justify-center gap-4">
                      <span className="text-4xl">🎨</span>
                      <span className="text-4xl">♟️</span>
                      <span className="text-4xl">🌱</span>
                  </div>
              </div>
            </div>

            {/* CONTENT B: FACILITIES */}
            <div 
              className="absolute top-0 left-1/2 w-full max-w-6xl transition-all duration-500 ease-out"
              style={{ left: `${getPosition(1)}%`, opacity: getOpacity(1), transform: "translateX(-50%)" }}
            >
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 drop-shadow-sm">Our Facilities</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FacCard icon="🏫" title="Smart Classrooms" desc="Interactive panels & digital tools." bg="bg-linear-to-br from-orange-100 to-amber-100" />
                    <FacCard icon="🔬" title="Science Labs" desc="Advanced physics & chemistry labs." bg="bg-linear-to-br from-blue-100 to-cyan-100" />
                    <FacCard icon="📚" title="Modern Library" desc="Vast collection of digital resources." bg="bg-linear-to-br from-emerald-100 to-green-100" />
                    <FacCard icon="🏅" title="Sports Complex" desc="Indoor & outdoor sports facilities." bg="bg-linear-to-br from-rose-100 to-pink-100" />
                </div>
            </div>

            {/* CONTENT C: BROCHURES */}
            <div 
              className="absolute top-0 left-1/2 w-full max-w-4xl transition-all duration-500 ease-out"
              style={{ left: `${getPosition(2)}%`, opacity: getOpacity(2), transform: "translateX(-50%)" }}
            >
               <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl border-2 border-red-100 dark:border-red-900/30 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 text-center md:text-left">
                     <h2 className="text-4xl font-extrabold mb-4 text-slate-800 dark:text-white">Downloads</h2>
                     <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">Get all the detailed information about our curriculum, fee structure, and academic calendar.</p>
                     <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-red-500/30 transition-all transform hover:-translate-y-1">
                        Download Now
                     </button>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 gap-4 w-full">
                      <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-red-400 transition-colors cursor-pointer group">
                          <span className="text-3xl group-hover:scale-110 transition-transform">📅</span>
                          <div>
                              <h4 className="font-bold text-slate-800 dark:text-gray-100">Academic Calendar</h4>
                              <p className="text-xs text-slate-500">2025-2026 Session</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-red-400 transition-colors cursor-pointer group">
                          <span className="text-3xl group-hover:scale-110 transition-transform">📄</span>
                          <div>
                              <h4 className="font-bold text-slate-800 dark:text-gray-100">Fee Structure</h4>
                              <p className="text-xs text-slate-500">Updated for new admissions</p>
                          </div>
                      </div>
                  </div>
               </div>
            </div>

            {/* CONTENT D: LOCATION (New) */}
            <div 
              className="absolute top-0 left-1/2 w-full max-w-4xl transition-all duration-500 ease-out"
              style={{ left: `${getPosition(3)}%`, opacity: getOpacity(3), transform: "translateX(-50%)" }}
            >
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-green-500/20">
                  <h2 className="text-4xl font-extrabold mb-6 text-center text-green-700 dark:text-green-400 flex items-center justify-center gap-3">
                    <span>🔔</span> Our Location
                  </h2>
                  <div className="flex flex-col md:flex-row gap-8">
                     {/* Map Placeholder */}
                     <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-2xl h-64 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-linear-to-br from-green-50 to-emerald-100 dark:from-slate-700 dark:to-slate-600 opacity-50"></div>
                        <span className="text-6xl group-hover:scale-125 transition-transform duration-500">🗺️</span>
                        <p className="absolute bottom-4 text-xs font-bold uppercase tracking-widest text-slate-500">Google Maps Integration</p>
                     </div>
                     {/* Info */}
                     <div className="flex-1 flex flex-col justify-center space-y-6">
                        <div className="flex items-start gap-4">
                           <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-2xl">📍</div>
                           <div>
                              <h4 className="font-bold text-lg text-slate-800 dark:text-white">Visit Us</h4>
                              <p className="text-slate-600 dark:text-slate-400">123 Learning Lane,<br/>Knowledge City, ED 45001</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4">
                           <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-2xl">📞</div>
                           <div>
                              <h4 className="font-bold text-lg text-slate-800 dark:text-white">Call Us</h4>
                              <p className="text-slate-600 dark:text-slate-400">+1 (555) 123-4567<br/>Mon-Fri, 8am - 4pm</p>
                           </div>
                        </div>
                     </div>
                  </div>
              </div>
            </div>


        </div>

      </div>
    </div>
  );
};

// Helper for Facilities Card
const FacCard = ({ icon, title, desc, bg }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 group">
      <div className={`h-32 w-full ${bg} rounded-xl mb-4 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}>
          {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
  </div>
);

const NavItem = ({ label, href, color, rotate, ringing, icon }) => {
  // Color configurations
  const themes = {
    yellow: {
      header: "bg-yellow-500",
      body: "bg-yellow-100",
      border: "border-yellow-600",
      text: "text-yellow-900",
    },
    amber: {
      header: "bg-amber-500",
      body: "bg-amber-100",
      border: "border-amber-600",
      text: "text-amber-900",
    },
    red: {
      header: "bg-rose-500",
      body: "bg-rose-100",
      border: "border-rose-600",
      text: "text-rose-900",
    },
    blue: {
      header: "bg-sky-600",
      body: "bg-sky-100",
      border: "border-sky-700",
      text: "text-sky-900",
    },
    green: {
      header: "bg-emerald-500",
      body: "bg-emerald-100",
      border: "border-emerald-600",
      text: "text-emerald-900",
    },
  };

  const theme = themes[color] || themes.yellow;
  
  // Custom Ringing Animation Keyframes in Tailwind (or inline style)
  // Simple CSS swing animation
  const ringStyle = ringing ? {
     animation: "swing 2s ease-in-out infinite"
  } : {};

  return (
    <div
      className={`relative group transition-transform duration-300 hover:scale-105 hover:z-50 pointer-events-auto flex flex-col items-center top-[-14px]`}
      style={ringStyle}
    >
      <style jsx>{`
        @keyframes swing {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
      
      {/* Binder Clip */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Metal Handles */}
        <div className="w-8 h-8 rounded-full border-[3px] border-gray-300 absolute -top-5 z-0 clip-handle"></div>
        {/* Black Clip Body */}
        <div className="w-10 h-8 bg-black bg-linear-to-b from-gray-800 to-black rounded-b-md shadow-md z-10 flex items-center justify-center">
          <div className="w-8 h-px bg-gray-500"></div>
        </div>
      </div>

      {/* Card */}
      <Link href={href} className="outline-none">
        <div
          className={`relative w-44 h-20 ${theme.body} border-2 ${theme.border} rounded-sm shadow-xl flex flex-col -mt-2 transform origin-top hover:rotate-0 transition-transform duration-300 ${!ringing ? `rotate-[${rotate || 0}deg]` : ''}`}
        >
          {/* Header Strip */}
          <div
            className={`h-5 w-full ${theme.header} border-b ${theme.border} flex items-center px-2 justify-between`}
          >
            <div className="w-full h-px border-t border-dashed border-white/40"></div>
          </div>
          {/* Label */}
          <div className="flex-1 flex items-center justify-center gap-2">
            {icon && <span className="text-xl animate-pulse">{icon}</span>}
            <h3
              className={`text-2xl font-bold ${theme.text} font-sans tracking-wide drop-shadow-sm`}
            >
              {label}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RodNavbar;
