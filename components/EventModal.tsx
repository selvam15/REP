
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { EventData } from '../types';
import MagneticButton from './MagneticButton';

interface EventModalProps {
  event: EventData | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  // Stagger animation variants
  const rulesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5
      }
    }
  };

  const ruleItemVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-8">
        {/* Deep Frost Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
        />

        {/* Modal Content */}
        <motion.div
          layoutId={`card-container-${event.id}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full h-full lg:h-auto lg:max-h-[90vh] max-w-7xl overflow-hidden bg-[#080808] border border-white/10 sm:rounded-[2.5rem] shadow-[0_0_120px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row z-10"
        >
          {/* Dynamic Background Aura */}
          <div 
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/2" 
            style={{ backgroundColor: event.accentColor }} 
          />

          {/* Left: Media Column */}
          <div className="w-full lg:w-[42%] h-[35vh] sm:h-[45vh] lg:h-auto overflow-hidden relative flex-shrink-0 group">
            <motion.img
              layoutId={`card-image-${event.id}`}
              src={event.posterUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#080808]" />
            
            <div className="absolute top-6 left-6">
               <motion.span 
                layoutId={`card-tag-${event.id}`}
                className="px-5 py-2 rounded-xl text-xs font-bold font-orbitron tracking-[0.2em] text-white shadow-2xl backdrop-blur-md border border-white/20"
                style={{ backgroundColor: `${event.accentColor}dd` }}
              >
                {event.category.toUpperCase()}
              </motion.span>
            </div>

            {/* Mobile Close */}
            <button 
              onClick={onClose}
              className="lg:hidden absolute top-6 right-6 p-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 text-white z-20 hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Right: Content Column */}
          <div className="w-full lg:w-[58%] flex flex-col p-8 sm:p-12 lg:p-16 overflow-y-auto no-scrollbar relative z-10">
            {/* Desktop Close & Header */}
            <div className="hidden lg:flex justify-between items-start mb-12">
              <div className="space-y-4">
                <motion.h2 
                  layoutId={`card-title-${event.id}`}
                  className="text-5xl xl:text-7xl font-orbitron font-black text-white tracking-tighter uppercase leading-none"
                >
                  {event.title}
                </motion.h2>
                <div className="h-1.5 w-24 bg-teal-400 rounded-full shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
              </div>
              
              <MagneticButton onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 group">
                <X size={24} className="text-white group-hover:rotate-90 transition-transform duration-500" />
              </MagneticButton>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden mb-10">
              <h2 className="text-4xl sm:text-5xl font-orbitron font-black text-white tracking-tighter uppercase leading-[0.85]">
                {event.title}
              </h2>
              <div className="h-1 w-20 mt-4 bg-teal-400 rounded-full" />
            </div>

            <div className="space-y-12 pb-32 lg:pb-0">
              {/* Description */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <p className="text-teal-400 font-mono text-[10px] uppercase tracking-[0.4em]">Protocol Briefing</p>
                </div>
                <motion.p 
                  layoutId={`card-desc-${event.id}`}
                  className="text-gray-300 leading-relaxed text-lg xl:text-xl font-medium"
                >
                  {event.description}
                </motion.p>
              </motion.section>

              {/* Rules List */}
              <motion.section 
                variants={rulesContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <h4 className="text-white font-orbitron text-xs sm:text-sm tracking-[0.3em] uppercase mb-8 flex items-center opacity-70">
                  <span className="w-8 h-px bg-white/20 mr-4" /> Operational Rules
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {event.rules.map((rule, idx) => (
                    <motion.div 
                      key={idx} 
                      variants={ruleItemVariants}
                      whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.08)' }}
                      className="flex items-center space-x-4 p-5 rounded-2xl bg-white/5 border border-white/5 transition-colors cursor-default"
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: event.accentColor, boxShadow: `0 0 10px ${event.accentColor}` }} />
                      <span className="text-gray-300 text-sm md:text-base font-medium">{rule}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Logistics Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6 }} 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-md group hover:bg-white/10 transition-colors">
                   <div className="flex items-center space-x-5">
                      <div className="p-4 bg-teal-400/10 rounded-2xl text-teal-400 group-hover:scale-110 transition-transform">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-1">Execution Date</p>
                        <p className="text-white font-mono text-sm">{event.date}</p>
                      </div>
                   </div>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5 backdrop-blur-md group hover:bg-white/10 transition-colors">
                   <div className="flex items-center space-x-5">
                      <div className="p-4 bg-rose-400/10 rounded-2xl text-rose-400 group-hover:scale-110 transition-transform">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-1">Terminal Zone</p>
                        <p className="text-white font-mono text-sm">{event.venue}</p>
                      </div>
                   </div>
                </div>
              </motion.div>

              {/* Coordinators */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.7 }}
              >
                 <h4 className="text-white font-orbitron text-xs sm:text-sm tracking-[0.3em] uppercase mb-8 flex items-center opacity-70">
                  <span className="w-8 h-px bg-white/20 mr-4" /> Network Leads
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.coordinators.map((c, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-black/40 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all">
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-white font-black font-orbitron text-lg leading-tight mb-1">{c.name}</p>
                            <p className="text-teal-400 text-[10px] font-bold uppercase tracking-[0.2em]">{c.role}</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <a href={`tel:${c.phone}`} className="p-3 bg-white/5 hover:bg-teal-400 hover:text-black rounded-xl transition-all"><Phone size={16} /></a>
                          <a href={`mailto:${c.email}`} className="p-3 bg-white/5 hover:bg-teal-400 hover:text-black rounded-xl transition-all"><Mail size={16} /></a>
                        </div>
                      </div>
                      {/* Decorative background element */}
                      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-teal-400/10 transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            {/* Sticky Action Button */}
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 lg:mt-20 sticky bottom-0 left-0 right-0 p-4 lg:p-0 bg-gradient-to-t from-[#080808] via-[#080808]/90 to-transparent z-30 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full group"
              >
                <MagneticButton
                  style={{ backgroundColor: event.accentColor }}
                  className="w-full py-5 lg:py-7 rounded-[2rem] flex items-center justify-center space-x-4 font-orbitron font-black text-lg sm:text-2xl tracking-[0.3em] text-black shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:brightness-110 active:scale-[0.98] relative overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10 hidden sm:inline">REGISTER NOW</span>
                  <span className="relative z-10 sm:hidden">REGISTER NOW</span>
                  <ExternalLink size={24} className="relative z-10 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  
                  {/* High-speed shimmer sweep */}
                  <motion.div 
                    animate={{ left: ['-150%', '150%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    className="absolute top-0 bottom-0 w-32 bg-white/40 skew-x-[45deg] blur-xl pointer-events-none"
                  />
                </MagneticButton>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EventModal;
