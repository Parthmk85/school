'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const sectionsData = [
  {
    id: 'facilities',
    title: 'Facilities',
    color: 'amber',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-amber-500/30">
          <span className="text-4xl mb-4 block">🏫</span>
          <h3 className="text-2xl font-bold text-amber-400 mb-2">Smart Campus</h3>
          <p className="text-slate-300">Technology integrated in every corner to enhance learning.</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-amber-500/30">
          <span className="text-4xl mb-4 block">🔬</span>
          <h3 className="text-2xl font-bold text-amber-400 mb-2">Adv. Labs</h3>
          <p className="text-slate-300">Physics, Chemistry, and Robotics labs for hands-on experience.</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-amber-500/30">
            <span className="text-4xl mb-4 block">🏟️</span>
            <h3 className="text-2xl font-bold text-amber-400 mb-2">Sports Arena</h3>
            <p className="text-slate-300">Olympic-size swimming pool and multi-sport grounds.</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-amber-500/30">
            <span className="text-4xl mb-4 block">🎭</span>
            <h3 className="text-2xl font-bold text-amber-400 mb-2">Auditorium</h3>
            <p className="text-slate-300">State-of-the-art acoustics for cultural events.</p>
        </div>
      </div>
    )
  },
  {
    id: 'about',
    title: 'About Us',
    color: 'blue',
    content: (
      <div className="max-w-3xl text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Shaping Future Leaders
        </h2>
        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
          Founded in 1995, we have been a beacon of educational excellence. Our mission is to foster a community of lifelong learners who are compassionate, creative, and critical thinkers.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <div className="px-6 py-3 bg-blue-500/20 rounded-full border border-blue-400 text-blue-200">25+ Years</div>
          <div className="px-6 py-3 bg-blue-500/20 rounded-full border border-blue-400 text-blue-200">100% Results</div>
        </div>
      </div>
    )
  },
  {
    id: 'brochures',
    title: 'Brochures',
    color: 'red',
    content: (
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
         <div className="group relative w-full md:w-80 h-96 bg-white rotate-[-2deg] hover:rotate-0 transition-transform duration-500 shadow-2xl p-2 rounded-sm cursor-pointer">
            <div className="w-full h-full bg-slate-100 border-2 border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-6xl mb-6">📄</span>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">School Prospectus</h3>
                <p className="text-slate-500 mb-6">Complete guide to our philosophy.</p>
                <button className="px-6 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors">Download PDF</button>
            </div>
            {/* Paper clip visual */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-12 bg-gray-300 rounded-full z-10"></div>
         </div>

         <div className="group relative w-full md:w-80 h-96 bg-white rotate-[3deg] hover:rotate-0 transition-transform duration-500 shadow-2xl p-2 rounded-sm cursor-pointer">
            <div className="w-full h-full bg-slate-100 border-2 border-slate-200 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-6xl mb-6">🗓️</span>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Academic Calendar</h3>
                <p className="text-slate-500 mb-6">Events, Holidays & Exams.</p>
                <button className="px-6 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors">Download PDF</button>
            </div>
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-12 bg-gray-300 rounded-full z-10"></div>
         </div>
      </div>
    )
  },
  {
    id: 'contact',
    title: 'Contact Us',
    color: 'emerald',
    content: (
       <div className="bg-slate-800/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-emerald-500/30 w-full max-w-4xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="space-y-8">
                <h2 className="text-3xl font-bold text-emerald-400">Get in Touch</h2>
                <div className="space-y-4 text-slate-300">
                   <p className="flex items-center gap-3"><span className="text-2xl">📍</span> 123 Education Lane, Smart City</p>
                   <p className="flex items-center gap-3"><span className="text-2xl">📞</span> +1 234 567 8900</p>
                   <p className="flex items-center gap-3"><span className="text-2xl">✉️</span> info@school.edu</p>
                </div>
             </div>
             <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-400 outline-none" />
                <input type="email" placeholder="Email Address" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-400 outline-none" />
                <textarea placeholder="Message" className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-400 outline-none h-32"></textarea>
                <button type="button" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02]">Send Message</button>
             </form>
          </div>
       </div>
    )
  }
];

export default function VerticalRodScroll() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    // Loop through each section to setup triggers
    sectionsData.forEach((section) => {
      // 1. NOTE ANIMATION
      gsap.fromTo(`#note-${section.id}`, 
        { y: -150, autoAlpha: 0 }, 
        {
          y: 0, 
          autoAlpha: 1,
          ease: "elastic.out(1, 0.5)",
          duration: 1.2,
          scrollTrigger: {
            trigger: `#section-${section.id}`,
            start: "top center+=100", // Start slightly before center
            end: "bottom center-=100",
            toggleActions: "play reverse play reverse",
          }
        }
      );

      // 2. CONTENT ANIMATION
      gsap.fromTo(`#content-${section.id}`,
        { y: 100, autoAlpha: 0, scale: 0.95, filter: "blur(10px)" }, // Start state
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 1,
          scrollTrigger: {
            trigger: `#section-${section.id}`,
            start: "top center+=100",
            end: "bottom center-=100",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-slate-900 min-h-screen font-sans overflow-x-hidden selection:bg-orange-500/30">
      
      {/* --- FIXED ROD --- */}
      <div className="fixed top-24 left-0 w-full h-4 z-50 pointer-events-none">
          {/* Rod Body */}
          <div className="w-full h-full bg-gradient-to-b from-gray-400 via-gray-200 to-gray-500 shadow-lg border-y border-gray-500 relative">
             <div className="absolute top-[1px] left-0 w-full h-[1px] bg-white/50"></div>
          </div>
      </div>

      {/* --- FIXED NOTES CONTAINER (Z-Index higher than rod, but notes animate behind content?) --- */}
      {/* Note: They are fixed relative to screen, so they stay with rod. */}
      {sectionsData.map((section) => (
        <div 
            key={section.id}
            id={`note-${section.id}`}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[45] pointer-events-none invisible"
        >
             <Note label={section.title} color={section.color} />
        </div>
      ))}

      {/* --- SCROLLABLE SECTIONS --- */}
      <div className="relative z-40">
        
        {/* Intro Spacer */}
        <div className="h-[50vh] flex items-center justify-center">
            <p className="text-slate-500 animate-pulse">Scroll down to begin...</p>
        </div>

        {sectionsData.map((section) => (
          <section 
            key={section.id} 
            id={`section-${section.id}`}
            className="min-h-screen w-full flex items-center justify-center p-4 py-32"
          >
             {/* Content Container */}
             <div id={`content-${section.id}`} className="w-full max-w-6xl flex justify-center invisible">
                {section.content}
             </div>
          </section>
        ))}

        {/* Footer Spacer */}
        <div className="h-[50vh] flex items-center justify-center text-slate-600">
            End of Page
        </div>

      </div>

    </div>
  );
}

// --- SUB-COMPONENT: HANGING NOTE ---
const Note = ({ label, color }) => {
    const themes = {
      yellow: { bg: "bg-yellow-400", border: "border-yellow-600", text: "text-yellow-900", shadow: "shadow-yellow-500/20" },
      amber:  { bg: "bg-amber-400", border: "border-amber-600", text: "text-amber-900", shadow: "shadow-amber-500/20" },
      red:    { bg: "bg-rose-400", border: "border-rose-600", text: "text-rose-900", shadow: "shadow-rose-500/20" },
      blue:   { bg: "bg-sky-400", border: "border-sky-600", text: "text-sky-900", shadow: "shadow-sky-500/20" },
      emerald:{ bg: "bg-emerald-400", border: "border-emerald-600", text: "text-emerald-900", shadow: "shadow-emerald-500/20" },
    };
    const theme = themes[color] || themes.yellow;
  
    return (
      <div className="flex flex-col items-center origin-top">
         {/* The Hook/Binder */}
         <div className="relative -mt-6 mb-[-5px] z-10 w-8 h-12">
            {/* Back Ring */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-gray-400 clip-top-half"></div>
         </div>
         
         {/* The Card */}
         <div className={`relative w-64 h-24 ${theme.bg} rounded-xl border-b-4 border-r-4 ${theme.border} shadow-xl ${theme.shadow} flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300`}>
             {/* Punch Hole */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rounded-full shadow-inner ring-2 ring-gray-400/50"></div>
             
             <h2 className={`text-3xl font-black ${theme.text} tracking-wider uppercase drop-shadow-sm`}>{label}</h2>
             
             {/* Decorative Lines */}
             <div className="absolute bottom-3 w-3/4 h-1 bg-black/10 rounded-full"></div>
             <div className="absolute bottom-1.5 w-1/2 h-1 bg-black/5 rounded-full"></div>
         </div>
      </div>
    );
};
