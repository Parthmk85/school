'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Sidebar = () => {
  const ticksRef = useRef(null);

  useGSAP(() => {
    // Direct 1:1 mapping of scroll position to ruler movement
    // "scrollbar etlu fare etluj" - Moves exactly with the page scroll
    const updateRuler = () => {
      if (ticksRef.current) {
        ticksRef.current.style.transform = `translateY(${-window.scrollY}px)`;
      }
    };

    // Update on every frame for smoothness with Lenis
    gsap.ticker.add(updateRuler);

    return () => {
      gsap.ticker.remove(updateRuler);
    };
  });

  return (
    <>
      {/* Sidebar Container - Fixed/Locked on Screen */}
      <div className="fixed left-0 top-0 h-screen w-0 lg:w-14 flex-col items-start z-40 hidden lg:flex pointer-events-none">
        
        {/* Ruler Base */}
        <div className="absolute left-0 top-0 h-full w-14 bg-yellow-400 border-r-2 border-yellow-600 shadow-[4px_0_15px_rgba(0,0,0,0.3)] flex flex-col pointer-events-auto overflow-hidden">
           
           {/* Moving Part: Ticks & Numbers */}
           <div ref={ticksRef} className="w-full relative opacity-60 will-change-transform">
               
               {/* Container for the repeating pattern that covers the full potential scroll height */}
               {/* 80 items * 40px = 3200px. If page is longer (5000px), we might need more? 
                   Let's stick to 80 as requested. */}
               <div className="w-full relative">
                   {/* Ticks Pattern layer - repeated for the full height */}
                    <div className="absolute right-0 top-0 w-full h-[20000px]" 
                        style={{backgroundImage: 'repeating-linear-gradient(180deg, transparent 0, transparent 39px, #333 39px, #333 40px)'}}>
                    </div>
                    <div className="absolute right-0 top-0 w-1/2 h-[20000px] border-r border-black/5" 
                        style={{backgroundImage: 'repeating-linear-gradient(180deg, transparent 0, transparent 9px, #555 9px, #555 10px)'}}>
                    </div>

                   {/* Numbers */}
                   <div className="absolute right-0 top-2 w-full flex flex-col items-center pt-1">
                       {[...Array(500)].map((_, i) => (
                           <span key={i} className="block h-[40px] text-[10px] font-bold text-gray-800 pr-1 text-right w-full leading-[40px] align-middle">{i + 1}</span>
                       ))}
                   </div>
               </div>
           </div>
           
           {/* Stationary Glossy Effect (Overlay) */}
           <div className="absolute left-0 top-0 w-2 h-full bg-linear-to-r from-white/40 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Note: Removed Hanging Notes as they don't scroll with fixed sidebar naturally unless handled separately. 
            Keeping the "Accessories" if desired, but sticking to just the ruler for "Locked" request. */}

         {/* Bottom Accessories (Eraser/Tape) - Fixed at bottom of viewport? OR scroll with ticks? 
             Let's attach them to the fixed frame for visual flair that stays. */}
           <div className="absolute bottom-10 -left-2 flex flex-col gap-2 pointer-events-auto z-50">
               <div className="w-12 h-8 bg-blue-500 rounded-sm shadow-md skew-y-3 flex items-center justify-center border-b-4 border-blue-700">
                  <div className="w-full h-1/2 bg-red-400 rounded-t-sm"></div>
               </div>
               <div className="w-10 h-10 bg-yellow-200 rounded-full border-4 border-yellow-400 shadow-md flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
               </div>
           </div>

      </div>
    </>
  );
};

export default Sidebar;
