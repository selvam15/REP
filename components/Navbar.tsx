
import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../types';

interface NavbarProps {
  currentCategory: Category;
  onCategoryChange: (cat: Category) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentCategory, onCategoryChange }) => {
  const categories: Category[] = ['All', 'Technical', 'Non-Technical', 'Workshops'];

  return (
    <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="h-16 md:h-24 flex items-center justify-between">
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-3 flex-shrink-0 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-black rounded-xl flex items-center justify-center shadow-xl group-hover:bg-teal-400 transition-colors duration-300">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_lGbV6_kJz2ojc0k1nD-kJPpgXJj1PFGoBRc_sNtBRIGW9zcypvqlvhDv5ZGJMKkF7EFj2VCNibbRz9858SG4YAA5Yj-D5YNGZYTIWNlajxH7dRezvJqEoiL7poEW5aEpyRrpuaq5x4Lm2XzbuHXTDknWfjLU4AEHIrqmXCYGNYao1ikfKpGirVyslxJt/s320/BIOMUTANTZ'26%20(3).png"   // replace with your image path
                alt="Logo"
                className="w-6 h-6 md:w-7 md:h-7 object-contain"
              />
            </div>

            <div className="hidden sm:flex flex-col">
              <span className="font-orbitron font-black text-lg md:text-xl tracking-tighter leading-none uppercase">Biomutantz</span>
              <span className="text-[10px] font-orbitron font-bold text-teal-400 tracking-[0.4em] uppercase">Phase 2026</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 bg-white/5 p-1 rounded-2xl border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`relative px-6 py-2.5 rounded-xl text-xs font-orbitron font-bold transition-all ${
                  currentCategory === cat ? 'text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {currentCategory === cat && (
                  <motion.div
                    layoutId="active-nav-bg"
                    className="absolute inset-0 bg-white rounded-xl"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          {/* Action Area (Guidelines) */}
          <div className="flex items-center">
            <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-orbitron font-bold text-xs md:text-sm rounded-xl transition-all shadow-sm">
              GUIDELINES
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation - Simplified horizontal scroll */}
        <div className="md:hidden flex items-center space-x-2 overflow-x-auto no-scrollbar pb-4 -mx-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-xl text-[10px] font-orbitron font-black tracking-widest border transition-all ${
                currentCategory === cat 
                  ? 'bg-teal-400 border-teal-400 text-black shadow-[0_0_15px_rgba(45,212,191,0.3)]' 
                  : 'bg-white/5 border-white/10 text-gray-500'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
