
import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest('button, a, select, [role="button"], .interactive-card'));
    };

    const handleClick = (e: MouseEvent) => {
      setRipples(prev => [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }]);
      setTimeout(() => setRipples(prev => prev.slice(1)), 800);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    window.addEventListener('mousedown', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-teal-400 rounded-full pointer-events-none z-[10001]"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
      />
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-teal-400/50 rounded-full pointer-events-none z-[10000]"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          scale: isHovered ? 2 : 1,
          borderColor: isHovered ? "rgba(20, 184, 166, 1)" : "rgba(20, 184, 166, 0.5)",
          backgroundColor: isHovered ? "rgba(20, 184, 166, 0.1)" : "rgba(20, 184, 166, 0)"
        }}
      />

      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-8 h-8 border border-teal-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_20px_rgba(20,184,166,0.5)]"
            style={{ left: ripple.x, top: ripple.y, translateX: '-50%', translateY: '-50%' }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
