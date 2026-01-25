
import React from 'react';
import { motion } from 'framer-motion';

const Preloader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-32 h-32 border border-teal-400/30 rounded-full flex items-center justify-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center font-orbitron font-black text-black text-4xl shadow-[0_0_30px_rgba(45,212,191,0.5)]">
            <img
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_lGbV6_kJz2ojc0k1nD-kJPpgXJj1PFGoBRc_sNtBRIGW9zcypvqlvhDv5ZGJMKkF7EFj2VCNibbRz9858SG4YAA5Yj-D5YNGZYTIWNlajxH7dRezvJqEoiL7poEW5aEpyRrpuaq5x4Lm2XzbuHXTDknWfjLU4AEHIrqmXCYGNYao1ikfKpGirVyslxJt/s320/BIOMUTANTZ'26%20(3).png"   
      alt="Logo"
      className="w-16 h-16 object-contain"
    />
          </div>
        </motion.div>
        
        {/* Scanning Line */}
        <motion.div
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-0.5 bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,1)] blur-[1px] z-10"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 flex flex-col items-center"
      >
        <h2 className="font-orbitron font-bold text-white tracking-[0.5em] text-xl mb-2">INITIALIZING</h2>
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="h-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,1)]"
          />
        </div>
        <div className="mt-4 font-mono text-[10px] text-teal-400/60 uppercase tracking-widest flex space-x-4">
          <span>Systems Stable</span>
          <span className="animate-pulse">●</span>
          <span>Bio-Sync Active</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
