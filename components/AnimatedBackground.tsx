
import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid motion
  const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5 range
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Layer 1 (Deepest) - Very subtle parallax
  const l1X = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const l1Y = useTransform(springY, [-0.5, 0.5], [-15, 15]);
  
  // Layer 2 (Middle) - Moderate parallax + Scroll
  const l2X = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const l2Y = useTransform(springY, [-0.5, 0.5], [-40, 40]);
  const scrollY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Layer 3 (Foreground) - High intensity parallax + Faster Scroll
  const l3X = useTransform(springX, [-0.5, 0.5], [-80, 80]);
  const l3Y = useTransform(springY, [-0.5, 0.5], [-80, 80]);
  const scrollY2 = useTransform(scrollYProgress, [0, 1], [0, -600]);

  // Generate random shapes once (ideally this would be static or memoized)
  const layer2Elements = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 150 + 50,
    rotation: Math.random() * 360,
    type: i % 3 === 0 ? 'circle' : 'rect',
    opacity: Math.random() * 0.05 + 0.02,
  }));

  const layer3Elements = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 5 + 2,
    opacity: Math.random() * 0.3 + 0.1,
    color: i % 2 === 0 ? '#14b8a6' : '#f43f5e',
  }));

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#020202]">
      {/* Deep Background - Distant Glows (Layer 1) */}
      <motion.div 
        style={{ x: l1X, y: l1Y }}
        className="absolute inset-[-10%] pointer-events-none"
      >
        <div className="absolute top-[10%] left-[15%] w-[40%] h-[40%] bg-teal-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-rose-500/10 blur-[200px] rounded-full" />
        <div className="absolute top-[40%] right-[30%] w-[30%] h-[30%] bg-cyan-500/5 blur-[150px] rounded-full" />
      </motion.div>

      {/* Dynamic Grid Overlay */}
      <motion.div 
        style={{ x: useTransform(l1X, x => x * 0.5), y: useTransform(l1Y, y => y * 0.5) }}
        className="absolute inset-[-5%] opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:100px_100px]" 
      />

      {/* Middle Layer - Floating Abstract Geometry (Layer 2) */}
      <motion.div 
        style={{ x: l2X, y: l2Y, translateZ: 0 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div style={{ y: scrollY1 }} className="absolute inset-0">
          {layer2Elements.map((el) => (
            <div
              key={el.id}
              className={`absolute border border-white/5 bg-white/5 backdrop-blur-[1px]`}
              style={{
                width: el.size,
                height: el.size,
                left: el.left,
                top: el.top,
                transform: `rotate(${el.rotation}deg)`,
                borderRadius: el.type === 'circle' ? '50%' : '12px',
                opacity: el.opacity,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Foreground Layer - "Digital Dust" / Technical Nodes (Layer 3) */}
      <motion.div 
        style={{ x: l3X, y: l3Y }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div style={{ y: scrollY2 }} className="absolute inset-0">
          {layer3Elements.map((el) => (
            <motion.div
              key={el.id}
              animate={{ 
                opacity: [el.opacity, el.opacity * 2, el.opacity],
                scale: [1, 1.2, 1] 
              }}
              transition={{ 
                duration: 2 + Math.random() * 3, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute rounded-full"
              style={{
                width: el.size,
                height: el.size,
                left: el.left,
                top: el.top,
                backgroundColor: el.color,
                boxShadow: `0 0 10px ${el.color}`,
                opacity: el.opacity,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Global Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-60" />

      {/* Interactive Scanlines (Very subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
    </div>
  );
};

export default AnimatedBackground;
