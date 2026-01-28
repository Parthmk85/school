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

        {/* School Supplies Decorations - Now Interactive */}
        <div className="absolute inset-0 flex flex-col z-40 h-full">
            
            {/* TOP: Eraser with HOME text */}
            <div 
                className="flex-1 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Go to Home"
            >
                <div className="w-8 h-12 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-400 rounded-md shadow-lg border border-slate-500/30 relative flex items-center justify-center">
                    {/* Eraser texture lines */}
                    <div className="absolute inset-0 flex flex-col justify-around py-2 pointer-events-none">
                        <div className="w-full h-px bg-slate-500/20"></div>
                        <div className="w-full h-px bg-slate-500/20"></div>
                        <div className="w-full h-px bg-slate-500/20"></div>
                    </div>
                    {/* HOME text */}
                    <span className="text-[8px] font-black text-slate-700 transform -rotate-90 tracking-wider z-10">HOME</span>
                </div>
            </div>

            {/* MIDDLE: Sharpener with DATA text */}
            <div 
                className="flex-1 flex items-center justify-center border-y border-yellow-600/20 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                title="Go to Data"
            >
                <div className="relative w-10 h-10">
                    {/* Sharpener body - metallic */}
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-sm shadow-lg border border-blue-700/50 relative flex items-center justify-center">
                        {/* Hole in center */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black/60 rounded-full shadow-inner"></div>
                        {/* Blade detail */}
                        <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-gray-300 to-gray-500 rounded-sm transform rotate-45"></div>
                        {/* DATA text */}
                        <span className="text-[7px] font-black text-blue-100 transform -rotate-90 tracking-wider z-10">DATA</span>
                    </div>
                </div>
            </div>

            {/* BOTTOM: Brush with FOOTER text */}
            <div 
                className="flex-1 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                title="Go to Footer"
            >
                <div className="flex flex-col items-center gap-1">
                    {/* Bristles */}
                    <div className="w-6 h-4 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-sm relative overflow-hidden">
                        {/* Bristle lines */}
                        <div className="absolute inset-0 flex justify-around">
                            <div className="w-px h-full bg-amber-950/40"></div>
                            <div className="w-px h-full bg-amber-950/40"></div>
                            <div className="w-px h-full bg-amber-950/40"></div>
                        </div>
                    </div>
                    {/* Metal ferrule */}
                    <div className="w-5 h-2 bg-gradient-to-b from-gray-400 to-gray-600 shadow-sm"></div>
                    {/* Handle with FOOTER text */}
                    <div className="w-2 h-6 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-b-sm shadow-sm relative flex items-center justify-center">
                        <span className="text-[6px] font-black text-yellow-200 transform -rotate-90 tracking-tighter whitespace-nowrap">FOOTER</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}
