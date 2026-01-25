
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EventData } from '../types';

interface EventCardProps {
  event: EventData;
  onClick: (event: EventData) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer spring for more fluid, "heavy" feel
  const springConfig = { damping: 30, stiffness: 120, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Tilt rotation - slightly reduced for better readability while maintaining depth
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  // Parallax translation for inner elements
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]);

  // Dynamic light/reflection position
  const glossX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glossY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layoutId={`card-container-${event.id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(event)}
      style={{ 
        perspective: 1500,
      }}
      className="group relative cursor-pointer h-full"
    >
      <motion.div 
        layoutId={`card-inner-${event.id}`}
        style={{ 
          rotateX: isMobile ? 0 : rotateX, 
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d" 
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 h-full flex flex-col bg-[#0d0d0d]/80 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] transition-colors duration-500 group-hover:border-teal-500/40"
      >
        {/* Poster Container */}
        <div 
          className="relative h-64 sm:h-72 overflow-hidden" 
          style={{ transform: isMobile ? "none" : "translateZ(50px)" }}
        >
          <motion.img
            layoutId={`card-image-${event.id}`}
            src={event.posterUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-5 left-5">
            <motion.span 
              layoutId={`card-tag-${event.id}`}
              className="px-4 py-2 rounded-xl text-[10px] font-orbitron font-bold tracking-widest text-white backdrop-blur-md border border-white/20 shadow-lg"
              style={{ 
                backgroundColor: `${event.accentColor}99`,
                transform: isMobile ? "none" : "translateZ(80px)"
              }}
            >
              {event.category.toUpperCase()}
            </motion.span>
          </div>
        </div>
        
        {/* Content area */}
        <div 
          className="p-8 flex-grow flex flex-col relative" 
          style={{ transform: isMobile ? "none" : "translateZ(30px)" }}
        >
          <motion.h3 
            layoutId={`card-title-${event.id}`}
            style={{ x: isMobile ? 0 : translateX, y: isMobile ? 0 : translateY }}
            className="text-2xl sm:text-3xl font-orbitron font-black text-white mb-3 group-hover:text-teal-400 transition-colors uppercase tracking-tight"
          >
            {event.title}
          </motion.h3>
          <motion.p 
            layoutId={`card-desc-${event.id}`}
            className="text-gray-400 text-sm line-clamp-3 mb-8 leading-relaxed font-medium"
          >
            {event.description}
          </motion.p>
          
          <div className="flex items-end justify-between border-t border-white/10 pt-6 mt-auto">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase text-gray-500 font-bold tracking-[0.2em] mb-1">CHALLENGE PROTOCOL</span>
              <span className="text-xs text-teal-400 font-mono font-bold">{event.date}</span>
            </div>
            
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-teal-400 group-hover:text-black group-hover:border-teal-400 transition-all duration-500 shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              {/* Pulsing indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full animate-ping opacity-20" />
            </div>
          </div>
        </div>

        {/* Gloss Overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useTransform(
              [glossX, glossY],
              ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.06) 0%, transparent 60%)`
            )
          }}
        />

        {/* Hover Highlight Ring */}
        <div className="absolute inset-0 border border-teal-500/0 group-hover:border-teal-500/20 transition-colors duration-500 rounded-3xl pointer-events-none" />
      </motion.div>

      {/* Dynamic Back-Shadow */}
      <motion.div 
        className="absolute inset-0 bg-teal-500/10 blur-[50px] rounded-3xl -z-10 opacity-0 group-hover:opacity-60 transition-opacity duration-700"
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], [30, -30]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [30, -30]),
        }}
      />
    </motion.div>
  );
};

export default EventCard;
