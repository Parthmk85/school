import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4 flex justify-center">
      {/* Pen Container */}
      <div className="relative flex items-center justify-center drop-shadow-2xl filter hover:scale-105 transition-transform duration-300">
        
        {/* Left Tip Section */}
        <div className="flex items-center relative z-20 -mr-px">
           {/* Metal Point */}
           <div className="w-0 h-0 
             border-r-[24px] border-r-stone-300
             border-y-[10px] border-y-transparent 
             drop-shadow-sm brightness-110 contrast-125" 
           />
           {/* Black Cone Tip / Grip */}
           <div className="h-[34px] w-[30px] bg-linear-to-r from-slate-950 via-slate-800 to-slate-900 flex items-center justify-end relative rounded-l-sm border-r border-slate-950"
                style={{ clipPath: 'polygon(100% 0, 0 15%, 0 85%, 100% 100%)' }}>
               <div className="w-full h-px bg-white/5 absolute top-1/3"></div>
               <div className="w-full h-px bg-white/5 absolute bottom-1/3"></div>
           </div>
           {/* Red Connector Ring */}
           <div className="h-[44px] w-4 bg-linear-to-b from-red-800 via-red-500 to-red-900 rounded-l-md shadow-[inset_-2px_0_4px_rgba(0,0,0,0.4)] border-r border-red-950 z-10 flex items-center justify-center">
             <div className="w-full h-[60%] bg-linear-to-b from-transparent via-white/20 to-transparent opacity-50"></div>
           </div>
        </div>

        {/* Main Body Section */}
        <div className="relative h-[52px] bg-linear-to-b from-slate-900 via-slate-700 to-slate-950 flex items-center px-4 shadow-[0_10px_20px_rgba(0,0,0,0.5)] w-[320px] md:w-[600px] border-y border-slate-600/20 -ml-px -mr-px z-10 rounded-sm">
            {/* Texture/Grip Lines */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.2)_4px,rgba(0,0,0,0.2)_5px)] opacity-10 mix-blend-overlay"></div>
            
            {/* Top Highlight for Cylinder Effect */}
            <div className="absolute top-[10%] left-0 w-full h-[20%] bg-linear-to-b from-white/10 to-transparent blur-sm"></div>

             {/* Book Icon - Floating Top */}
             <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-16 h-12 z-30 transition-transform hover:-translate-y-1">
                <div className="w-full h-full relative filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
                   <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="none">
                      {/* Back Cover */}
                      <path d="M2 17.5C2 17.5 4.5 19 11.5 18C18.5 19 21 17.5 21 17.5V6.5C21 6.5 18.5 8 11.5 7C4.5 8 2 6.5 2 6.5V17.5Z" fill="#14532d" />
                      
                      {/* Pages Layer (Bottom) */}
                      <path d="M2.5 17C2.5 17 5 18.5 11.5 17.5C18 18.5 20.5 17 20.5 17V6.5C20.5 6.5 18 8 11.5 7C5 8 2.5 6.5 2.5 6.5V17Z" fill="#fcd34d" />
                      
                      {/* Pages Layer (Top) */}
                      <path d="M3 16.5C3 16.5 5.5 18 12 17C18.5 18 21 16.5 21 16.5V6C21 6 18.5 7.5 12 6.5C5.5 7.5 3 6 3 6V16.5Z" fill="#fffbeb" />

                      {/* Spine Gradient / Fold */}
                      <path d="M12 6.5V17.5" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                      
                      {/* Text Lines Left */}
                      <path d="M5 8H10" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                      <path d="M5 10H10" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                      <path d="M5 12H9" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                      
                      {/* Text Lines Right */}
                      <path d="M14 8H19" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                      <path d="M14 10H19" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                      <path d="M15 12H19" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                   </svg>
                </div>
             </div>

             {/* Inner White Strip / Navigation */}
             <div className="w-full h-[36px] bg-linear-to-b from-gray-200 via-white to-gray-300 rounded-sm shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),0_1px_2px_rgba(255,255,255,0.5)] border border-gray-400/50 flex items-center justify-around px-2 md:px-8 text-sm font-bold text-slate-700 relative z-20">
                <Link href="#home" className="hover:text-blue-700 hover:scale-105 transition-all drop-shadow-sm">Home</Link>
                <div className="h-5 w-px bg-gray-400/50"></div>
                <Link href="#about" className="hover:text-blue-700 hover:scale-105 transition-all drop-shadow-sm">About Us</Link>
                
                {/* Visual balance spacer */}
                <div className="hidden md:block w-16"></div> 
             </div>
             
        </div>

        {/* Right End Section */}
        <div className="flex items-center relative z-0 -ml-px">
             {/* Red Connector Ring */}
             <div className="h-[44px] w-4 bg-linear-to-b from-red-800 via-red-500 to-red-900 rounded-r-md shadow-[inset_2px_0_4px_rgba(0,0,0,0.4)] border-l border-red-950 z-10 flex items-center justify-center">
                <div className="w-full h-[60%] bg-linear-to-b from-transparent via-white/20 to-transparent opacity-50"></div>
             </div>
             
             {/* Black Tail Cap */}
             <div className="h-[38px] w-[36px] bg-linear-to-l from-slate-950 to-slate-800 rounded-r-3xl border-l border-slate-700 flex items-center justify-center relative shadow-lg">
                 <div className="absolute right-3 w-px h-[50%] bg-white/10 blur-[0.5px]"></div>
             </div>
             
             {/* Clicker Mechanism */}
             <div className="h-[24px] w-5 bg-linear-to-r from-gray-400 to-gray-200 rounded-r-md shadow-inner border border-gray-500 -ml-2 z-[-1]"></div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
