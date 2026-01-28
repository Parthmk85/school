'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const icons = [
  '⭐', '✨', '⚡', '💡', '🎨', '✏️', '📚', '📐', '🔬', '🧬', '🎵', '⚽', '🏀', '🏆',
  '🌍', '🪐', '🚀', '💻', '🖱️', '🔋', '🔌', '🔔', '📢', '🔍', '🗝️', '📅', '📝', '📌',
  '📎', '✂️', '📏', '🎒', '🧢', '👓', '🕰️', '⏰', '🍎', '🥪', '🥤', '🚲', '🛴', '🚌',
  '🏫', '🏛️', '🎭', '🧶', '🧵', '🧩', '🎲', '♟️', '🎮', '🕹️', '🎤', '🎧', '🎷', '🎺',
  '🎸', '🎻', '🎹', '🎼', '🩰', '🤸', '🏋️', '🤺', '🤼', '🤽', '🏊', '🚣', '🏄', '🧗'
];

const doodles = [
  'E=mc²', 'a²+b²=c²', 'x', 'y', 'π', '2+2=4', 'ABC', '123', '#1', 'School',
  'H₂O', 'CO₂', 'F=ma', 'sin(x)', 'cos(x)', 'tan(x)', 'log(x)', '√x', '∞', '∑',
  '∫', 'dx', 'dy', '∆', 'Ω', 'β', 'α', 'γ', 'θ', 'λ', 'µ', 'ρ', 'σ', 'τ', 'φ',
  'ω', 'Physics', 'Math', 'Chem', 'Bio', 'History', 'Geo', 'Art', 'Music', 'Sport',
  'Read', 'Write', 'Learn', 'Grow', 'Think', 'Create', 'Play', 'Win', 'Team', 'Goal'
];

// Combine all possible items
const allItems = [...icons, ...doodles];

export default function GraffitiBackground() {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Grid Setup for Non-Overlapping Placement
    const cols = 10;
    const rows = 12;
    const totalCells = cols * rows;
    
    // Shuffle helper
    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    // Create a large pool of unique items to draw from (shuffled)
    // Repeat the base list a few times if needed to fill grid, but shuffle well
    let itemPool = shuffle([...allItems, ...allItems]); 
    const gridItems = [];
    
    // Create grid positions
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Only fill 70% of cells to leave some empty space
            if (Math.random() > 0.3 && itemPool.length > 0) {
                const content = itemPool.pop(); // Take unique item
                
                // Random position WITHIN the cell (with padding to avoid edge overlap)
                const padding = 15; // % inside cell
                const randomX = Math.random() * (100 - padding * 2) + padding;
                const randomY = Math.random() * (100 - padding * 2) + padding;
                
                gridItems.push({
                    id: `item-${r}-${c}`,
                    content,
                    left: c * cellWidth + (randomX * cellWidth / 100),
                    top: r * cellHeight + (randomY * cellHeight / 100),
                    scale: Math.random() * 0.5 + 0.8, // More uniform scale
                    rotation: Math.random() * 60 - 30,
                    opacity: Math.random() * 0.3 + 0.1, // Low opacity for background
                    fontSize: Math.random() * 1.5 + 1.5 // Consistent size range
                });
            }
        }
    }
    setItems(gridItems);
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;

    // Target INNER elements for floating so it doesn't conflict with repulsion
    const elements = container.querySelectorAll('.graffiti-inner');
    
    elements.forEach((el) => {
      gsap.to(el, {
        x: 'random(-15, 15)', 
        y: 'random(-15, 15)',
        rotation: 'random(-15, 15)', // Add extra rotation drift
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

  }, { scope: containerRef, dependencies: [items] });

  // ... (handleMouseMove remains unchanged as it targets .graffiti-item)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
        mouse.current = { x: e.clientX, y: e.clientY };

        const elements = container.querySelectorAll('.graffiti-item');
        elements.forEach((el) => {
            // Revert: Calculate distance from CURRENT visual position (allowing them to fly away)
            const rect = el.getBoundingClientRect();
            const elX = rect.left + rect.width / 2;
            const elY = rect.top + rect.height / 2;
            
            const dx = mouse.current.x - elX;
            const dy = mouse.current.y - elY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            const radius = 300; // Large radius
            
            if (dist < radius) {
                const angle = Math.atan2(dy, dx);
                const force = (radius - dist) / radius;
                const moveDist = force * 50; // Push strength per frame
                
                // Push AWAY from cursor
                const moveX = -Math.cos(angle) * moveDist;
                const moveY = -Math.sin(angle) * moveDist;
                
                gsap.to(el, {
                    x: `+=${moveX}`,
                    y: `+=${moveY}`,
                    duration: 0.6,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            }
        });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [items]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        {items.map((item) => (
            <div 
                key={item.id} 
                className="graffiti-item absolute select-none"
                style={{
                    left: `${item.left}%`,
                    top: `${item.top}%`,
                    transform: 'translate(-50%, -50%)', // Centering for the wrapper
                    // Repulsion (x/y) will apply here
                }}
            >
                {/* Inner wrapper for Floating & Rotation */}
                <div 
                    className="graffiti-inner font-handwriting font-bold"
                    style={{
                        fontSize: `${item.fontSize}rem`,
                        // Intrinsic rotation & scale + Floating (x/y) will apply here
                        transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
                        opacity: item.opacity,
                        whiteSpace: 'nowrap',
                        color: 'rgba(148, 163, 184, 0.3)', 
                        filter: 'grayscale(100%) brightness(1.5)', 
                    }}
                >
                    {item.content}
                </div>
            </div>
        ))}
    </div>
  );
}
