'use client';
import { useRef, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import VirtualTeacher from './VirtualTeacher';
import TechButton from './TechButton';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SingleCardScroll() {
  const containerRef = useRef(null);
  const cardContainerRef = useRef(null);
  const noteRef = useRef(null);
  const [activeSection, setActiveSection] = useState('about');
  
  // Data for the sections that will swap
  const contentData = [
    {
       id: 'about',
       title: 'About Us',
// ... (rest of contentData is same, I will use ... to keep it cleaner if tool allows, but I must match target content exactly or just replace the header/imports and then the insertion points)
// Wait, I can't use wildcards in ReplacementContent. I will rewrite the surrounding properly.

// Let's do this as a MultiReplace to be safer and cleaner.

       noteColor: 'amber',
       rotate: 2,
       content: (
          <div className="bg-slate-800/80 p-10 md:p-14 rounded-3xl border border-amber-500/30 max-w-4xl text-center shadow-2xl backdrop-blur-md">
            <h2 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">Who We Are</h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              We are dedicated to providing the best education for children. Our methodology focuses on creativity, critical thinking, and character building.
            </p>
             <div className="mt-8 flex justify-center gap-6">
                <span className="text-5xl">🎨</span>
                <span className="text-5xl">♟️</span>
                <span className="text-5xl">🌱</span>
            </div>
          </div>
       )
    },
    {
        id: 'pictures',
        title: 'Pictures',
        noteColor: 'yellow',
        rotate: 1,
        content: (
          <div className="bg-slate-800/80 p-6 md:p-8 rounded-3xl border border-yellow-500/30 max-w-3xl text-center shadow-2xl backdrop-blur-md">
             <h2 className="text-3xl font-bold text-yellow-400 mb-6">School Gallery</h2>
             <div className="grid grid-cols-3 gap-3">
                <div className="aspect-square bg-linear-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30 overflow-hidden">
                   <img src="/images/school_building.png" alt="School Building" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30 overflow-hidden">
                   <img src="/images/school_library.png" alt="School Library" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 overflow-hidden">
                   <img src="/images/art_classroom.png" alt="Art Classroom" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 overflow-hidden">
                   <img src="/images/sports_field.png" alt="Sports Field" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-linear-to-br from-red-500/20 to-rose-500/20 rounded-xl border border-red-500/30 overflow-hidden">
                   <img src="/images/science_lab.png" alt="Science Lab" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-linear-to-br from-indigo-500/20 to-violet-500/20 rounded-xl border border-indigo-500/30 overflow-hidden">
                   <img src="/images/drama_theater.png" alt="Drama Theater" className="w-full h-full object-cover" />
                </div>
             </div>
             <p className="text-slate-400 mt-4 text-sm">Capturing moments of learning and growth</p>
          </div>
        )
     },
    {
       id: 'facilities',
       title: 'Facilities',
       noteColor: 'blue',
       rotate: -3,
       content: (
          <div className="bg-slate-800/80 p-10 md:p-14 rounded-3xl border border-blue-500/30 max-w-4xl text-center shadow-2xl backdrop-blur-md">
             <h2 className="text-5xl font-bold text-blue-400 mb-8">World Class</h2>
             <div className="grid grid-cols-2 gap-8 text-left">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-3xl block mb-2">🔬</span>
                      <h3 className="text-xl font-bold text-white">Labs</h3>
                      <p className="text-slate-400 text-sm">Advanced Physics & Bio.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-3xl block mb-2">💻</span>
                      <h3 className="text-xl font-bold text-white">Tech</h3>
                      <p className="text-slate-400 text-sm">Mac Labs & Robotics.</p>
                  </div>
              </div>
          </div>
       )
    },
    {
       id: 'brochures',
       title: 'Brochures',
       noteColor: 'red',
       rotate: 1,
       content: (
          <div className="bg-slate-800/80 p-10 md:p-14 rounded-3xl border border-red-500/30 max-w-4xl text-center shadow-2xl backdrop-blur-md">
             <h2 className="text-5xl font-bold text-red-400 mb-8">Downloads</h2>
             <div className="flex justify-center gap-8">
                <div className="w-40 h-52 bg-white rotate-2 border-4 border-slate-200 flex flex-col items-center justify-center shadow-lg">
                    <span className="text-4xl text-red-500">⬇️</span>
                    <p className="text-slate-800 font-bold mt-4">Prospectus</p>
                </div>
                 <div className="w-40 h-52 bg-white -rotate-2 border-4 border-slate-200 flex flex-col items-center justify-center shadow-lg">
                    <span className="text-4xl text-red-500">📅</span>
                    <p className="text-slate-800 font-bold mt-4">Calendar</p>
                </div>
             </div>
          </div>
       )
    },
    {
       id: 'contact',
       title: 'Contact Us',
       noteColor: 'emerald',
       rotate: -2,
       content: (
          <div className="bg-slate-800/80 p-10 md:p-14 rounded-3xl border border-emerald-500/30 max-w-4xl text-center shadow-2xl backdrop-blur-md">
             <h2 className="text-5xl font-bold text-emerald-400 mb-8">Get In Touch</h2>
             <div className="space-y-4 max-w-lg mx-auto">
                <input type="text" placeholder="Name" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" />
                <div className="w-full">
                   <TechButton className="w-full">Send Message</TechButton>
                </div>
             </div>
          </div>
       )
    }
  ];

  useGSAP(() => {
    // Master Timeline for the pinned sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=2500", // Calibrated for ~5 distinct scroll strokes to complete
        scrub: 1, // Balanced smooth/snap feel
        snap: {
          snapTo: 1 / (contentData.length - 1),
          duration: { min: 0.3, max: 0.6 }, // Quick snap
          delay: 0.1, // Snap almost immediately after stopping
          ease: "power2.inOut"
        }
      }
    });

    // Define positions for notes (all visible on screen)
    const positions = {
      right: 500,   // Right side of viewport (visible, stacked)
      center: 0,    // Center of screen
      left: -500    // Left side of viewport (visible)
    };

    // Set initial state: About Us centered, others STACKED on the RIGHT (Top to Bottom)
    contentData.forEach((section, index) => {
        const noteId = `#note-${section.id}`;
        
        if (index === 0) {
            // About Us starts centered
            gsap.set(noteId, { 
                x: positions.center, 
                y: 0,
                opacity: 1,
                zIndex: 100 // Active is always Top
            });
        } else {
            // Other notes stacked on the right
            // Remove vertical offset so Rings stay ON THE ROD
            gsap.set(noteId, { 
                x: positions.right + (index * 2), 
                y: 0, 
                opacity: 1,
                zIndex: 50 - index 
            });
        }
    });

    // Animate through each section
    contentData.forEach((section, index) => {
        const currentContent = `#content-${section.id}`;
        const prevContent = index > 0 ? `#content-${contentData[index - 1].id}` : null;
        
        const currentNote = `#note-${section.id}`;
        const prevNote = index > 0 ? `#note-${contentData[index - 1].id}` : null;

        if (index === 0) {
            // First section: About Us note already centered
            gsap.set(currentContent, { autoAlpha: 1, scale: 1, y: 0 });
            tl.call(() => setActiveSection('about'), null, 0); 
            
        } else {
            tl.addLabel(`start-${section.id}`)
            .call(() => setActiveSection(section.id), null, `start-${section.id}`)
            
            // Content swap
            .to(prevContent, { 
                autoAlpha: 0, 
                scale: 0.9, 
                duration: 1, 
                ease: 'power2.inOut' 
            }, `start-${section.id}`)
            
            .fromTo(currentContent, 
                { autoAlpha: 0, scale: 1.1, y: 50 }, 
                { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: 'power2.inOut' }, 
                `start-${section.id}+=0.3`
            )
            
            // Note animations: 
            // Previous note slides LEFT to discard pile
            .to(prevNote, {
                x: positions.left - ((index - 1) * 2), // Tight horizontal stack
                y: 0, // Keep on rod 
                rotation: -5,
                zIndex: 10 + index, 
                duration: 1,
                ease: 'power2.inOut'
            }, `start-${section.id}`)
            
            // Current note slides to CENTER
            .to(currentNote, {
                x: positions.center,
                y: 0, 
                zIndex: 100, // Moves to Top
                duration: 1,
                ease: 'power2.out'
            }, `start-${section.id}+=0.2`)
            
            // Hold
            .addLabel(`end-${section.id}`)
            .to({}, { duration: 1 });
        }
    });

  }, { scope: containerRef });

  return (
    <div className="font-sans overflow-x-hidden min-h-screen">
      
      {/* INTRO SECTION */}
      <section className="h-screen w-full flex flex-col items-center justify-center z-20 relative">
        {/* LOGO IMAGE */}
        <div className="relative mb-6 transform hover:scale-105 transition-transform duration-500">
           <img src="/images/nice.png" alt="My School" className="h-32 md:h-48 object-contain drop-shadow-2xl" />
        </div>
        
        {/* NOTICE BOARD (Moved to Intro) */}
        <div className="transform scale-75 md:scale-95 origin-top mt-4 mb-24">
           <div className="w-[90vw] max-w-4xl mx-auto bg-[#5c4033] p-3 rounded-xl border-8 border-[#3e2723] shadow-2xl relative">
              <div className="bg-[#d2b48c] w-full min-h-[300px] rounded-sm relative overflow-hidden shadow-inner flex flex-col md:flex-row justify-center items-center gap-6 p-8">
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

                   {/* NOTICE 1 */}
                   <div className="w-56 aspect-3/4 bg-[#fff9c4] shadow-lg transform -rotate-2 hover:scale-105 transition-transform duration-300 relative p-4 flex flex-col items-center text-center">
                       <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full shadow-md border border-red-800 z-10"></div>
                       <h3 className="font-bold text-red-800 text-lg border-b border-red-200 pb-1 mb-2 w-full">Sports Day</h3>
                       <p className="font-handwriting font-bold text-slate-800 text-sm leading-relaxed">
                           Annual Meet on <span className="text-red-600">March 15th</span>. Kits ready!
                       </p>
                       <span className="mt-auto text-[10px] font-bold text-slate-500">Principal</span>
                   </div>

                   {/* NOTICE 2 */}
                   <div className="w-56 aspect-3/4 bg-[#e1bee7] shadow-lg transform rotate-2 hover:scale-105 transition-transform duration-300 relative p-4 flex flex-col items-center text-center z-10">
                       <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-600 rounded-full shadow-md border border-green-800 z-10"></div>
                       <h3 className="font-bold text-purple-900 text-lg border-b border-purple-300 pb-1 mb-2 w-full">Exams</h3>
                       <p className="font-handwriting font-bold text-slate-800 text-sm leading-relaxed">
                           Finals start <span className="text-purple-700">April 10th</span>. See office.
                       </p>
                       <span className="mt-auto text-[10px] font-bold text-slate-500">Admin</span>
                   </div>

                   {/* NOTICE 3 */}
                   <div className="w-56 aspect-3/4 bg-[#b2dfdb] shadow-lg transform -rotate-1 hover:scale-105 transition-transform duration-300 relative p-4 flex flex-col items-center text-center">
                       <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full shadow-md border border-blue-800 z-10"></div>
                       <h3 className="font-bold text-teal-900 text-lg border-b border-teal-200 pb-1 mb-2 w-full">Holiday</h3>
                       <p className="font-handwriting font-bold text-slate-800 text-sm leading-relaxed">
                           Closed on <span className="text-teal-700">Friday</span> for maintenance.
                       </p>
                       <span className="mt-auto text-[10px] font-bold text-slate-500">Notice</span>
                   </div>
              </div>
           </div>
        </div>
      </section>

      {/* PINNED CONTAINER */}
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden flex flex-col items-center justify-center">
         
         {/* THE ROD (Fixed in this container) */}
         <div className="absolute top-12 left-0 w-full h-4 bg-linear-to-b from-gray-400 via-gray-100 to-gray-500 border-y border-gray-600 shadow-xl z-30">
             <div className="absolute top-px left-0 w-full h-px bg-white/40"></div>
         </div>

         {/* VIRTUAL TEACHER (Fixed in this container) */}
         <VirtualTeacher activeSection={activeSection} />

         {/* HANGING NOTES LAYER - Individual Note Animations */}
         <div className="absolute top-12 left-0 w-full h-0 flex justify-center items-start z-40 overflow-visible pointer-events-none">
             {/* Render ALL notes - each will animate individually */}
             {contentData.map((item, i) => (
                 <div 
                    key={item.id} 
                    id={`note-${item.id}`}
                    className="absolute origin-top pointer-events-auto"
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                 >
                    <Note label={item.title} color={item.noteColor} rotate={item.rotate} />
                 </div>
             ))}
         </div>

         {/* CONTENT LAYER */}
         <div ref={cardContainerRef} className="w-full max-w-6xl px-4 flex items-center justify-center relative z-20 mt-32">
             {/* Render All Content Cards Stacked */}
             {contentData.map((item, i) => (
                 <div 
                    key={item.id} 
                    id={`content-${item.id}`}
                    className={`absolute inset-0 flex items-center justify-center ${i !== 0 ? 'opacity-0' : ''}`} // First one visible
                 >
                     {/* Wrap content to ensure centering works in absolute container */}
                     <div className="relative w-full flex justify-center">
                        {item.content}
                     </div>
                 </div>
             ))}
             {/* Spacer div to give the absolute container height */}
             <div className="invisible pointer-events-none">
                 {contentData[0].content} 
             </div>
         </div>

      </div>

      {/* BLACKBOARD FOOTER SECTION */}
      <section className="min-h-[35vh] w-full flex flex-col items-center justify-center relative py-8 z-20">
         
         <div className="relative w-full max-w-5xl mx-4 bg-[#222] rounded-xl border-16 border-[#5d4037] shadow-2xl flex flex-col items-center justify-center py-10 px-12 overflow-hidden box-border">
             
             {/* Dust/Smudge Texture */}
             <div className="absolute inset-0 opacity-20 pointer-events-none" 
                  style={{ 
                    backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-chalk.png")', 
                    backgroundBlendMode: 'overlay' 
                  }}>
             </div>
             
             {/* Chalk Text - Larger */}
             <h2 className="font-handwriting text-6xl md:text-8xl text-white/90 transform -rotate-2 mix-blend-screen opacity-90 tracking-widest mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                Footer
             </h2>
             
             <p className="font-handwriting text-2xl md:text-3xl text-white/70 transform rotate-1 mt-3 mb-8">
                Thanks for visiting!
             </p>

             {/* Navigation Buttons - Chalk Style */}
             <div className="flex gap-4 md:gap-6 mb-6 z-10 relative pointer-events-auto">
                 {/* TOP Button */}
                 <button
                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                     className="px-6 py-3 bg-white/10 border-2 border-white/40 rounded-lg font-handwriting text-white/90 text-lg md:text-xl hover:bg-white/20 hover:scale-105 transition-all transform -rotate-1 shadow-lg"
                 >
                     TOP
                 </button>

                 {/* DATA Button */}
                 <button
                     onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                     className="px-6 py-3 bg-white/10 border-2 border-white/40 rounded-lg font-handwriting text-white/90 text-lg md:text-xl hover:bg-white/20 hover:scale-105 transition-all transform rotate-1 shadow-lg"
                 >
                     DATA
                 </button>

                 {/* FOOTER Button */}
                 <button
                     onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                     className="px-6 py-3 bg-white/10 border-2 border-white/40 rounded-lg font-handwriting text-white/90 text-lg md:text-xl hover:bg-white/20 hover:scale-105 transition-all transform -rotate-1 shadow-lg"
                 >
                     FOOTER
                 </button>
             </div>

             {/* Chalk Tray / Ledge - Larger */}
             <div className="absolute bottom-0 left-0 w-full h-6 bg-[#4e342e] border-t border-[#3e2723] shadow-lg flex items-center px-8 gap-4">
                 <div className="w-10 h-2 bg-white/80 rounded-full transform rotate-12 shadow-sm"></div>
                 <div className="w-6 h-2 bg-yellow-100/80 rounded-full transform -rotate-6 shadow-sm"></div>
                 <div className="w-12 h-5 bg-slate-700 rounded-sm ml-auto shadow-inner border border-slate-600"></div> {/* Eraser */}
             </div>

         </div>

      </section>



    </div>
  );
}

// --- SUB COMPONENT ---
const Note = ({ label, color, rotate = 0 }) => {
    const themes = {
      yellow: { bg: "bg-yellow-400", border: "border-yellow-600", text: "text-yellow-950" },
      amber:  { bg: "bg-amber-400", border: "border-amber-600", text: "text-amber-950" },
      red:    { bg: "bg-rose-500", border: "border-rose-700", text: "text-rose-950" },
      blue:   { bg: "bg-sky-400", border: "border-sky-600", text: "text-sky-950" },
      emerald:{ bg: "bg-emerald-400", border: "border-emerald-600", text: "text-emerald-950" },
    };
    const theme = themes[color] || themes.amber;
  
    return (
      <div className={`flex flex-col items-center transform`} style={{ transform: `rotate(${rotate}deg)` }}>
         {/* Connector Ring & Rope */}
         <div className="-mt-1 mb-[-14px] z-0 relative flex flex-col items-center">
             {/* Arch/Hook over Rod (Open bottom for threading illusion) */}
             <div className="w-6 h-5 rounded-t-full border-x-4 border-t-4 border-b-0 border-gray-400 bg-transparent shadow-sm mb-[-2px]"></div>
             {/* Rope - Longer & White */}
             <div className="w-0.5 h-14 bg-white/70 relative">
                {/* Knot at bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white"></div>
             </div>
         </div>
         
         {/* Card - Higher visual Z to sit over the rope end */}
         <div className={`w-48 py-2.5 ${theme.bg} rounded-lg border-b-4 border-r-4 ${theme.border} shadow-xl flex flex-col items-center justify-center transition-transform hover:scale-105 relative z-10`}>
             {/* Punched Hole */}
             <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rounded-full shadow-inner ring-2 ring-gray-400/80"></div>
             
             {/* Text */}
             <h3 className={`text-lg font-extrabold ${theme.text} tracking-wide uppercase drop-shadow-sm`}>{label}</h3>
         </div>
      </div>
    );
};
