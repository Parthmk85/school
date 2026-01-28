'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function SchoolRuler() {
  const ticksRef = useRef(null);

  useGSAP(() => {
    // Sync ruler ticks with page scroll
    const updateRuler = () => {
      if (ticksRef.current) {
        ticksRef.current.style.transform = `translateY(${-window.scrollY}px)`;
      }
    };

    gsap.ticker.add(updateRuler);
    return () => gsap.ticker.remove(updateRuler);
  });

  return (
    <div className="fixed left-0 top-0 h-screen w-12 md:w-16 bg-yellow-400 border-r-2 border-yellow-600 shadow-[2px_0_10px_rgba(0,0,0,0.2)] z-50 flex flex-col overflow-hidden">
        
        {/* Stationary Glossy Effect (Overlay) */}
        <div className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent pointer-events-none z-20"></div>

        {/* Moving Part: Ticks & Numbers */}
        <div ref={ticksRef} className="w-full relative will-change-transform">
             {/* We create a tall container of ticks that will move up as we scroll down */}
             <div className="flex flex-col items-end w-full pt-48"> 
                {Array.from({ length: 1500 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-end w-full relative h-[6px]"> {/* Spacing for visual mm */}
                        
                        {/* Major Tick (every 10 units = 1 cm) */}
                        {i % 10 === 0 ? (
                           <>
                             <div className="w-3/4 h-0.5 bg-black/80 mb-px relative z-10"></div>
                             <span className="absolute left-1 -top-2 text-[10px] font-bold text-yellow-900 font-mono tracking-tighter">
                                {i / 10}
                             </span>
                           </>
                        ) : i % 5 === 0 ? (
                            /* Medium Tick (0.5 cm) */
                            <div className="w-1/2 h-0.5 bg-black/60 mb-px"></div>
                        ) : (
                            /* Minor Tick (1 mm) */
                            <div className="w-1/4 h-px bg-black/40 mb-px"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Navigation Sections Overlay - Interactive */}
        <div className="absolute inset-0 flex flex-col z-40 h-full">
            
            {/* TOP SECTION LINK */}
            <div 
                className="flex-1 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors group"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Go to Top"
            >
                <span className="transform -rotate-90 text-sm font-black text-yellow-900/50 group-hover:text-yellow-900 group-hover:scale-125 transition-all tracking-widest">TOP</span>
            </div>

            {/* DATA SECTION LINK - Hooks to Content */}
            <div 
                className="flex-1 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors group border-y border-yellow-600/20"
                onClick={() => {
                    // Scroll to the pinned container (approx 100vh down)
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }}
                title="Go to Content"
            >
                <span className="transform -rotate-90 text-sm font-black text-yellow-900/50 group-hover:text-yellow-900 group-hover:scale-125 transition-all tracking-widest">DATA</span>
            </div>

            {/* FOOTER SECTION LINK */}
            <div 
                className="flex-1 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors group"
                onClick={() => {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
                title="Go to End"
            >
                <span className="transform -rotate-90 text-sm font-black text-yellow-900/50 group-hover:text-yellow-900 group-hover:scale-125 transition-all tracking-widest">FOOTER</span>
            </div>

        </div>
    </div>
  );
}
