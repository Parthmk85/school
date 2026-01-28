'use client';
import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollSections() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  
  useGSAP(() => {
    const sections = gsap.utils.toArray('.horizontal-panel');
    
    // Horizontal scroll calculation
    const scrollTween = gsap.to(horizontalRef.current, {
      xPercent: -100 * (sections.length - 1) / sections.length, 
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1, 
        end: '+=7000', // Increased scroll distance to ensure ruler reaches 160+
      }
    });

  }, { scope: containerRef });

  return (
    <div className="overflow-x-hidden font-sans">
      {/* SECTION 1: Intro / Home */}
      <section id="home" className="h-screen w-full flex flex-col items-center justify-center bg-linear-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 z-10 relative snap-start">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-slate-800 dark:text-slate-100 tracking-tight opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
          Our School
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards', animationDelay: '0.5s' }}>
          Scroll down to take a tour along the rod.
        </p>
        <div className="absolute bottom-10 animate-bounce text-slate-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* SECTION 2: Horizontal Scroll containing Rod & Notes */}
      <section ref={containerRef} className="h-screen w-full overflow-hidden bg-neutral-50 dark:bg-slate-950 relative">
        <div 
          ref={horizontalRef} 
          className="flex h-full w-[400vw]" // 4 panels * 100vw
        >
          {/* THE ROD (Spanning across all panels) */}
          <div className="absolute top-24 left-0 w-full h-4 bg-linear-to-b from-gray-300 via-gray-100 to-gray-400 border-y border-gray-400 shadow-lg z-20 pointer-events-none">
             <div className="absolute top-1 left-0 w-full h-1 bg-white/40"></div>
          </div>

          {/* Panel 1: About Us */}
          <div className="horizontal-panel w-screen h-full relative flex items-center justify-center bg-transparent">

            {/* Hanging Note */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30">
               <NavItem label="About Us" href="#about" color="amber" rotate="0" />
            </div>

            {/* Content */}
            <div className="mt-40 p-8 max-w-4xl text-center">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg border border-amber-100 dark:border-slate-700">
                  <h2 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-linear-to-r from-amber-500 to-orange-600">Who We Are</h2>
                  <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                    We are dedicated to providing the best education for children. Our methodology focuses on creativity, critical thinking, and character building.
                    We believe in nurturing every child's potential.
                  </p>
                  <div className="mt-8 flex justify-center gap-6">
                      <span className="text-5xl hover:scale-125 transition-transform cursor-default">🎨</span>
                      <span className="text-5xl hover:scale-125 transition-transform cursor-default">♟️</span>
                      <span className="text-5xl hover:scale-125 transition-transform cursor-default">🌱</span>
                  </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Facilities */}
          <div className="horizontal-panel w-screen h-full relative flex items-center justify-center bg-transparent">

             {/* Hanging Note */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30">
               <NavItem label="Facilities" href="#facilities" color="blue" rotate="-2" />
            </div>

             {/* Content */}
             <div className="mt-40 w-full max-w-6xl px-4">
                 <div className="text-center mb-8">
                    <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white">World Class Facilities</h2>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FacCard icon="🏫" title="Smart Classrooms" desc="Interactive panels & digital tools." bg="bg-linear-to-br from-orange-100 to-amber-100" />
                    <FacCard icon="🔬" title="Science Labs" desc="Advanced physics & chemistry labs." bg="bg-linear-to-br from-blue-100 to-cyan-100" />
                    <FacCard icon="📚" title="Modern Library" desc="Vast collection of resources." bg="bg-linear-to-br from-emerald-100 to-green-100" />
                    <FacCard icon="🏅" title="Sports Complex" desc="Indoor & outdoor sports." bg="bg-linear-to-br from-rose-100 to-pink-100" />
                 </div>
             </div>
          </div>

          {/* Panel 3: Brochures */}
          <div className="horizontal-panel w-screen h-full relative flex items-center justify-center bg-transparent">

             {/* Hanging Note */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30">
               <NavItem label="Brochures" href="#brochures" color="red" rotate="2" />
            </div>

             {/* Content */}
             <div className="mt-40 w-full max-w-4xl p-4">
                 <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl border-2 border-red-100 dark:border-red-900/30 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 text-center md:text-left">
                     <h2 className="text-4xl font-extrabold mb-4 text-slate-800 dark:text-white">Downloads</h2>
                     <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">Get all the information about our curriculum and fees.</p>
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
          </div>

          {/* Panel 4: Contact Us */}
          <div className="horizontal-panel w-screen h-full relative flex items-center justify-center bg-transparent">
             {/* Hanging Note */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30">
               <NavItem label="Contact Us" href="#contact" color="yellow" rotate="-1" />
            </div>

             {/* Content */}
             <div className="mt-40 w-full max-w-4xl p-4">
                 <div className="bg-yellow-50 dark:bg-slate-800 shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:shadow-none p-8 transform rotate-1 rounded-xl border border-yellow-200 dark:border-yellow-900/30 relative">
                     {/* Sticky Tape Visual */}
                     <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/80 backdrop-blur-sm shadow-sm rotate-2"></div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Info */}
                        <div className="flex flex-col justify-center">
                            <h2 className="text-4xl font-black mb-6 text-slate-800 dark:text-yellow-500">Get in Touch</h2>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">📍</div>
                                    <div>
                                        <p className="font-bold text-slate-700 dark:text-slate-200">Visit Us</p>
                                        <p className="text-slate-500">123 School Lane, Education City</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">📞</div>
                                    <div>
                                        <p className="font-bold text-slate-700 dark:text-slate-200">Call Us</p>
                                        <p className="text-slate-500">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">✉️</div>
                                    <div>
                                        <p className="font-bold text-slate-700 dark:text-slate-200">Email</p>
                                        <p className="text-slate-500">admissions@school.edu</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-inner border border-slate-100 dark:border-slate-700">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Name</label>
                                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-slate-50 dark:bg-slate-800" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                    <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-slate-50 dark:bg-slate-800" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Message</label>
                                    <textarea className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-slate-50 dark:bg-slate-800 h-24" placeholder="How can we help?"></textarea>
                                </div>
                                <button type="button" className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-lg shadow-md transition-colors">
                                    Send Message
                                </button>
                            </form>
                        </div>
                     </div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="h-[50vh] w-full flex items-center justify-center bg-slate-800 text-white z-10 relative">
        <div className="text-center">
          <p className="mb-4 text-slate-400">© 2026 School Name. All rights reserved.</p>
          <a href="#home" className="underline decoration-wavy decoration-indigo-500 text-xl hover:text-indigo-400">Back to Top</a>
        </div>
      </section>
      
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation-name: fadeInUp;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
      `}</style>
    </div>
  );
}



// --- SUB COMPONENTS (Reused from RodNavbar) ---

const NavItem = ({ label, href, color, rotate }) => {
  const themes = {
    yellow: { header: "bg-yellow-500", body: "bg-yellow-100", border: "border-yellow-600", text: "text-yellow-900" },
    amber:  { header: "bg-amber-500", body: "bg-amber-100", border: "border-amber-600", text: "text-amber-900" },
    red:    { header: "bg-rose-500", body: "bg-rose-100", border: "border-rose-600", text: "text-rose-900" },
    blue:   { header: "bg-sky-600", body: "bg-sky-100", border: "border-sky-700", text: "text-sky-900" },
  };
  const theme = themes[color] || themes.yellow;
  const rotation = rotate ? `rotate-[${rotate}deg]` : "";

  return (
    <div className={`relative group transition-transform duration-300 hover:scale-105 pointer-events-auto flex flex-col items-center top-[-14px]`}>
      {/* Binder Clip */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border-[3px] border-gray-300 absolute -top-5 z-0"></div>
        <div className="w-10 h-8 bg-black bg-linear-to-b from-gray-800 to-black rounded-b-md shadow-md z-10 flex items-center justify-center">
          <div className="w-8 h-px bg-gray-500"></div>
        </div>
      </div>
      {/* Card */}
      <Link href={href} className="outline-none" onClick={(e) => e.preventDefault()}> 
        <div className={`relative w-44 h-20 ${theme.body} border-2 ${theme.border} rounded-sm shadow-xl flex flex-col -mt-2 transform origin-top hover:rotate-0 transition-transform duration-300 ${rotation}`}>
          <div className={`h-5 w-full ${theme.header} border-b ${theme.border} flex items-center px-2`}>
            <div className="w-full h-px border-t border-dashed border-white/40"></div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <h3 className={`text-2xl font-bold ${theme.text} font-sans tracking-wide drop-shadow-sm`}>{label}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

const FacCard = ({ icon, title, desc, bg }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 group text-center">
      <div className={`h-32 w-full ${bg} rounded-xl mb-4 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}>
          {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
  </div>
);
