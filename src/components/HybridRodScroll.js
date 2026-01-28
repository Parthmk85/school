'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const sectionsData = [
  // SECTION 0: INTRO
  {
      id: 'home',
      type: 'intro',
      title: 'Welcome',
      color: 'slate',
      content: (
          <div className="flex flex-col items-center justify-center h-full text-center">
              <h1 className="text-6xl md:text-9xl font-black mb-6 text-slate-100 tracking-tighter">
                  HIGH SCHOOL
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto">
                  A place where creativity meets disciplined learning.
              </p>
              <div className="mt-12 animate-bounce text-slate-500">
                  ↓ Scroll to Explore
              </div>
          </div>
      )
  },
  // SLIDING SECTIONS (1-3)
  {
    id: 'facilities',
    type: 'slide',
    title: 'Facilities',
    color: 'amber',
    icon: '🏫',
    content: (
        <div className="bg-slate-800/80 p-8 md:p-12 rounded-3xl border border-amber-500/30 max-w-4xl text-center shadow-2xl backdrop-blur-md">
            <h2 className="text-4xl font-bold text-amber-400 mb-6">World-Class Facilities</h2>
            <div className="grid grid-cols-2 gap-6 text-left">
                <div className="p-4 bg-black/20 rounded-xl border border-white/5 hover:border-amber-400/50 transition-colors">
                    <span className="text-3xl block mb-2">🔬</span>
                    <h3 className="text-xl font-bold text-white">Science Labs</h3>
                    <p className="text-slate-400 text-sm">Advanced equipment for Physics & Bio.</p>
                </div>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5 hover:border-amber-400/50 transition-colors">
                    <span className="text-3xl block mb-2">💻</span>
                    <h3 className="text-xl font-bold text-white">Computer Center</h3>
                    <p className="text-slate-400 text-sm">Latest Macs & High-end PCs.</p>
                </div>
            </div>
      </div>
    )
  },
  {
    id: 'about',
    type: 'slide',
    title: 'About Us',
    color: 'blue',
    icon: '📘',
    content: (
      <div className="max-w-4xl text-center space-y-8 p-4">
        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-cyan-200 drop-shadow-sm">
          Since 1995
        </h2>
        <p className="text-xl md:text-3xl text-slate-200 leading-relaxed font-light">
          "We don't just teach. We ignite curiosity, foster creativity, and build the leaders of tomorrow."
        </p>
        <div className="inline-flex gap-4">
           <span className="px-4 py-1 rounded-full border border-blue-400 text-blue-300 text-sm">🏆 Award Winning</span>
           <span className="px-4 py-1 rounded-full border border-blue-400 text-blue-300 text-sm">🌍 Global Alumni</span>
        </div>
      </div>
    )
  },
  {
    id: 'brochures',
    type: 'slide',
    title: 'Brochures',
    color: 'red',
    icon: '📄',
    content: (
      <div className="flex flex-col items-center gap-8 w-full max-w-5xl">
         <h2 className="text-4xl font-bold text-red-100">Downloads</h2>
         <div className="flex flex-col md:flex-row gap-8 justify-center w-full">
            {[
                { title: 'Prospectus 2025', size: '4.2 MB' },
                { title: 'Fee Structure', size: '1.1 MB' },
                { title: 'Syllabus', size: '2.8 MB' },
            ].map((item, i) => (
                <div key={i} className="group relative w-full md:w-64 h-80 bg-white rotate-1 hover:rotate-0 transition-all duration-300 shadow-xl rounded-sm p-2 cursor-pointer">
                    <div className="w-full h-full border-2 border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center p-4">
                        <span className="text-5xl mb-4 text-red-500 group-hover:scale-110 transition-transform">⬇️</span>
                        <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
                        <p className="text-xs text-slate-500 mt-2">{item.size}</p>
                    </div>
                </div>
            ))}
         </div>
      </div>
    )
  },
  // SPECIAL SECTION (4)
  {
    id: 'contact',
    type: 'static',
    title: 'Contact Us',
    color: 'emerald',
    icon: '📞',
    content: (
        <div className="w-full max-w-2xl bg-slate-800 p-8 rounded-2xl border border-emerald-500/30 shadow-2xl">
            <h2 className="text-3xl font-bold text-emerald-400 mb-6 text-center">Get In Touch</h2>
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" />
                    <input type="email" placeholder="Email" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none" />
                </div>
                <textarea placeholder="How can we help?" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-emerald-500 outline-none h-32"></textarea>
                <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-colors">Send Message</button>
            </form>
        </div>
    )
  }
];

export default function HybridRodScroll() {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const slidesRef = useRef([]);
  const [activeNote, setActiveNote] = useState(null); // Which note is currently visible?

  useGSAP(() => {
    const slides = slidesRef.current;
    
    // --- PART 1: SLIDING SECTIONS (1-3) ---
    // We create a master timeline that pins the container and scrubs through slides
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedRef.current,
        start: "top top",
        end: "+=3000", // 1000px per slide roughly
        pin: true,
        scrub: 1,
        // Using callbacks to manage the Hanging Note state independently of scrub timing
        onUpdate: (self) => {
            // Determine active slide index based on progress
            // 0-0.33: Slide 1, 0.33-0.66: Slide 2, 0.66-1: Slide 3
            // Actually, we should map this to the timeline labels
        }
      }
    });

    // Initial State: All slides off-screen right
    // Except maybe the first one? Prompt says "Enter from RIGHT". So starts empty?
    // Let's assume the pinned container starts empty, then Slide 1 enters.
    
    gsap.set(slides, { xPercent: 120, opacity: 0 });

    sectionsData.filter(s => s.type === 'slide').forEach((section, index) => {
        // We use callbacks to trigger the "Note Drop" animation at the START of each slide's window
        tl.call(() => setActiveNote(index), null, `slide${index}-start`);
        
        // 1. Slide In (Right -> Center)
        tl.to(slides[index], {
            xPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
        }, `slide${index}`);

        // 2. Hold (User reads)
        tl.to(slides[index], {
            xPercent: 0, // No movement
            duration: 1, // Determines read time
        });

        // 3. Slide Out (Center -> Left)
        // Only if it's not the last slide of the pinned section?
        // Actually, prompt says "Right -> Center -> Exit Left".
        tl.to(slides[index], {
            xPercent: -120,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
        });
    });
    
    // --- PART 2: CONTACT SECTION (4) ---
    // This is separate. Normal vertical scroll.
    // Hanging Note logic needs to handle this transition. 
    // When we leave the pinned area and enter contact, Note 3 should go up, Note 4 Down.
    
    ScrollTrigger.create({
        trigger: "#section-contact",
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveNote(3), // Index 3 is Contact
        onLeaveBack: () => setActiveNote(2), // Go back to Brochures note
    });

    // Content Animation for Contact (Fade Up)
    gsap.from("#contact-content", {
        y: 80,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#section-contact",
            start: "top 70%", // Triggers when top of section hits 70% viewport
            toggleActions: "play reverse play reverse"
        }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-slate-950 min-h-screen font-sans overflow-x-hidden text-slate-200 selection:bg-amber-500/30">
      
      {/* 1. FIXED ROD */}
      <div className="fixed top-12 left-0 w-full h-3 z-50 pointer-events-none">
          <div className="w-full h-full bg-linear-to-b from-gray-400 via-gray-200 to-gray-500 border-y border-gray-600 shadow-lg relative"></div>
      </div>

      {/* 2. FIXED HANGING NOTES (One shared component that changes content) */}
      <FixedHangingNote activeIndex={activeNote} data={sectionsData.filter(s => s.type !== 'intro')} />


      {/* 0. INTRO SECTION (Standard Vertical) */}
      <div className="h-screen w-full flex items-center justify-center bg-slate-950 relative z-20">
         {sectionsData.find(s => s.type === 'intro').content}
      </div>


      {/* 3. PINNED CONTAINER (Sections 1-3) */}
      <div ref={pinnedRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden z-20">
        
        {sectionsData.filter(s => s.type === 'slide').map((section, i) => (
             <div 
                key={section.id}
                ref={el => slidesRef.current[i] = el}
                className="absolute w-full max-w-6xl px-4 flex flex-col items-center justify-center p-12"
             >
                 {section.content}
             </div>
        ))}
      </div>


      {/* 4. STATIC SECTION (Contact Us) */}
      <div id="section-contact" className="min-h-screen w-full flex items-center justify-center relative bg-slate-900 z-10">
         <div id="contact-content" className="w-full flex justify-center p-4">
             {sectionsData[3].content}
         </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 bg-black">
         <p>© 2026 School Name.</p>
      </footer>

    </div>
  );
}

// --- SUB-COMPONENT: HANGING NOTE WITH ANIMATION ---
const FixedHangingNote = ({ activeIndex, data }) => {
    // We render ALL notes but only animate the active one in/out
    // Or we render ONE note and animate the content change?
    // "One section active at a time". "Note drops down".
    // If we swap content in one note, we can't easily cross-fade the note colors/shapes.
    // Better to have 4 absolute positioned notes that animate independently.

    return (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[48] pointer-events-none w-64 h-32">
            {data.map((section, index) => (
                <SingleNote 
                    key={section.id} 
                    isActive={activeIndex === index} 
                    {...section} 
                />
            ))}
        </div>
    );
};

const SingleNote = ({ isActive, title, color, icon }) => {
    const containerRef = useRef(null);
    
    useGSAP(() => {
        if (isActive) {
            // Drop Down
            gsap.fromTo(containerRef.current, 
                { y: -200, rotation: 5 },
                { y: 0, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)", delay: 0.1 } // Small delay to let previous one retract
            );
        } else {
            // Retract Up
            gsap.to(containerRef.current, 
                { y: -250, rotation: -5, duration: 0.6, ease: "back.in(1.2)" }
            );
        }
    }, [isActive]);

    // Theme styles
    const colors = {
        amber: 'bg-amber-400 border-amber-600 text-amber-950',
        blue:  'bg-blue-400 border-blue-600 text-blue-950',
        red:   'bg-red-400 border-red-600 text-red-950',
        emerald: 'bg-emerald-400 border-emerald-600 text-emerald-950'
    };
    const theme = colors[color] || colors.amber;

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full flex flex-col items-center">
            {/* Hook */}
            <div className="w-2 h-8 bg-gray-400 -mt-2 mb-[-8px] z-10 relative rounded-full shadow-sm"></div>
            
            {/* Card */}
            <div className={`w-64 py-4 ${theme} rounded-xl border-b-[6px] border-r-[6px] shadow-2xl flex flex-col items-center justify-center transform origin-top`}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 rounded-full shadow-inner ring-4 ring-gray-400"></div>
                <h3 className="text-2xl font-black uppercase tracking-widest flex items-center gap-2">
                    <span>{icon}</span> {title}
                </h3>
            </div>
        </div>
    )
};
