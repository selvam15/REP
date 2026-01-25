
import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Hero: React.FC = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8
      }
    }
  };

  const textMaskVars = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const scrollToEvents = () => {
    const el = document.getElementById('protocol-sector');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden pt-10 pb-20">
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full"
      >
        <div className="overflow-hidden mb-4">
          <motion.span 
            variants={textMaskVars}
            className="text-teal-400 font-orbitron font-bold text-[10px] sm:text-xs md:text-sm tracking-[0.5em] sm:tracking-[1em] uppercase block"
          >
            ESTABLISHED 2026
          </motion.span>
        </div>

        <div className="overflow-hidden mb-4 sm:mb-6">
          <motion.h1 
            variants={textMaskVars}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] font-orbitron font-black tracking-tighter leading-[0.9] select-none relative"
          >
            <span className="text-white mix-blend-difference">BIOMUTANTZ</span>
            <motion.span 
              animate={{ opacity: [1, 0.3, 1, 1, 0.6, 1] }}
              transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 4 }}
              className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 blur-[10px] sm:blur-[20px] opacity-20 w-full"
            >
              BIOMUTANTZ
            </motion.span>
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-10 sm:mb-16">
          <motion.p 
            variants={textMaskVars}
            className="text-gray-500 text-xs sm:text-base md:text-2xl lg:text-3xl font-medium tracking-[0.2em] sm:tracking-[0.4em] max-w-4xl mx-auto uppercase leading-relaxed"
          >
            Biological <span className="text-white">Precision</span> meets Machine <span className="text-white">Might</span>
          </motion.p>
        </div>
        
        <motion.div variants={textMaskVars} className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center items-center w-full max-w-xl mx-auto px-4 lg:px-0">
          <MagneticButton
            onClick={scrollToEvents}
            className="w-full sm:w-auto px-10 py-5 sm:px-14 sm:py-5 lg:px-16 lg:py-6 bg-white text-black font-orbitron font-black text-sm sm:text-lg lg:text-xl rounded-2xl tracking-[0.2em] sm:tracking-[0.3em] shadow-[0_0_40px_rgba(255,255,255,0.2)] group overflow-hidden relative"
          >
            <span className="relative z-10">REGISTER NOW</span>
            <div className="absolute inset-0 bg-teal-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </MagneticButton>
          
          <div onClick={scrollToEvents} className="group cursor-pointer flex items-center space-x-4">
            <MagneticButton className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:border-teal-400 transition-colors">
               <div className="w-0 h-0 border-t-[8px] sm:border-t-[9px] lg:border-t-[10px] border-t-transparent border-l-[14px] sm:border-l-[16px] lg:border-l-[18px] border-l-white border-b-[8px] sm:border-b-[9px] lg:border-b-[10px] border-b-transparent ml-2 group-hover:border-l-teal-400 transition-colors" />
            </MagneticButton>
            <span className="font-orbitron font-bold text-white tracking-widest text-[10px] sm:text-xs lg:text-sm opacity-50 group-hover:opacity-100 transition-opacity uppercase">EXPLORE TEASER</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Visual Decor */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] md:w-[800px] h-[300px] sm:h-[600px] md:h-[800px] bg-teal-500/20 rounded-full blur-[80px] sm:blur-[160px]" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-6 sm:bottom-10 flex flex-col items-center space-y-3 sm:space-y-4"
      >
        <span className="font-orbitron text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] text-white/40 uppercase">Scroll to Evolve</span>
        <div className="w-px h-10 sm:h-16 bg-gradient-to-b from-teal-400 to-transparent relative">
          <motion.div 
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-[-2px] w-[5px] h-[5px] bg-white rounded-full shadow-[0_0_10px_#fff]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
