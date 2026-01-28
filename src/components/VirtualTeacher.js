"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Float, Environment, OrbitControls, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useFrame } from "@react-three/fiber";
import { useState } from "react";

import { useRobot } from "../context/RobotContext";

// Robot Component with Button-Based Interaction + Cursor Tracking
function Robot({ scale = 2.5, mouse }) {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/techrobo.glb");
  const { actions, names } = useAnimations(animations, group);
  const { action } = useRobot(); // Global Robot State

  // Animation Manager: Reacts to Context State
  useEffect(() => {
    if (actions && names.length > 0) {
       // Stop all current animations
       Object.values(actions).forEach(act => act?.fadeOut(0.5));
       
       // Determine which animation to play based on 'action' state
       let targetAnimName = names[0]; // Default

       if (action === 'happy') {
           targetAnimName = names.find(n => n.toLowerCase().includes('happy') || n.toLowerCase().includes('jump')) || names[1] || names[0];
       } else if (action === 'wave') {
           targetAnimName = names.find(n => n.toLowerCase().includes('wave')) || names[2] || names[0];
       } else {
           // 'idle'
           targetAnimName = names.find(n => n.toLowerCase().includes('idle')) || names[0];
       }

       const targetAction = actions[targetAnimName];
       if (targetAction) {
           targetAction.reset().fadeIn(0.5).play();
       }
    }
  }, [action, actions, names]);

  // Frame Loop: Front Facing + Floating + Mouse Tracking
  useFrame((state) => {
    if (group.current) {
      // 1. Floating (Sine Wave) - "Alive" feel
      group.current.position.y = -0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
      
      // 2. Mouse Tracking (Standard Screen Center)
      if (mouse) {
          // Simple direct mapping (No locking, No complex relative math)
          // Clamped to keep head from spinning around (180 deg max)
          const targetY = Math.max(-1.5, Math.min(1.5, mouse.x * 1.5)); 
          const targetX = mouse.y * 0.5;
          
          // Smooth Lerp
          group.current.rotation.y += (targetY - group.current.rotation.y) * 0.1;
          group.current.rotation.x += (targetX - group.current.rotation.x) * 0.1;
      }
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} scale={scale} position={[0, -0.8, 0]} rotation={[0, -1.5, 0]} />
    </group>
  );
}

export default function VirtualTeacher({ activeSection }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  // Track global mouse movement Relative to SCREEN CENTER
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse to -1 to 1 based on full screen
      // 0,0 = Center of Screen
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const data = {
    about: { text: "Welcome! I'm here to show you around.", color: "border-amber-500" },
    pictures: { text: "Look at these amazing moments!", color: "border-yellow-500" },
    facilities: { text: "We have state-of-the-art labs!", color: "border-blue-500" },
    brochures: { text: "Download our prospectus.", color: "border-red-500" },
    contact: { text: "Contact us anytime.", color: "border-emerald-500" }
  };

  const current = data[activeSection] || data.about;

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-4 md:right-10 z-50 flex flex-col items-center pointer-events-none">
       {/* Speech Bubble */}
       <motion.div
        key={activeSection}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={`relative mb-4 w-60 bg-white/95 backdrop-blur-md border-l-4 ${current.color} shadow-2xl rounded-2xl p-4 pointer-events-auto`}
      >
         <h4 className="font-extrabold text-slate-800 text-xs uppercase mb-2">🤖 TechRobo</h4>
         <p className="text-slate-600 text-sm font-medium">{current.text}</p>
         {/* Chat Bubble Arrow - Pointing Down */}
         <div className="absolute -bottom-2 right-1/2 translate-x-1/2 w-4 h-4 bg-white border-b border-l border-slate-100 transform -rotate-45"></div>
      </motion.div>

      {/* 3D Scene */}
      <motion.div

        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-40 h-40 md:w-52 md:h-52 pointer-events-auto -mt-6"
      >
        <Canvas camera={{ position: [0, 1, 6], fov: 35 }} gl={{ alpha: true }}>
           <ambientLight intensity={1.2} />
           <spotLight position={[10, 10, 10]} intensity={2} />
           <Environment preset="city" />
           <Robot mouse={mouse} />
           <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
        </Canvas>
      </motion.div>
    </div>
  );
}
