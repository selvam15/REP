
import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Category, EventData } from './types';
import { EVENTS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventCard from './components/EventCard';
import EventModal from './components/EventModal';
import AnimatedBackground from './components/AnimatedBackground';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<Category>('All');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = useMemo(() => {
    if (currentCategory === 'All') return EVENTS;
    return EVENTS.filter(e => e.category === currentCategory);
  }, [currentCategory]);

  return (
    <div className="min-h-screen selection:bg-teal-500 selection:text-black">
      <AnimatePresence>
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      <CustomCursor />
      <AnimatedBackground />
      
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Navbar currentCategory={currentCategory} onCategoryChange={setCurrentCategory} />
          
          <main className="max-w-7xl mx-auto pb-24 sm:pb-40">
            <Hero />

            {/* Event Section Title */}
            <motion.div 
              id="protocol-sector"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="px-6 mb-12 sm:mb-24 flex flex-col md:flex-row items-start sm:items-end justify-between gap-6 sm:gap-10 pt-20"
            >
              <div className="max-w-2xl">
                <span className="text-teal-400 font-orbitron font-bold text-[10px] sm:text-xs tracking-[0.5em] sm:tracking-[1em] uppercase block mb-2 sm:mb-4">Discovery Phase</span>
                <h2 className="text-3xl sm:text-5xl md:text-8xl font-orbitron font-black text-white leading-tight sm:leading-[0.9] uppercase tracking-tighter">
                  Explore <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">Mutant Protocols</span>
                </h2>
              </div>
              <div className="text-gray-500 text-sm sm:text-lg font-mono border-l-2 border-teal-400/30 pl-6 sm:pl-8 py-2 sm:py-4 max-w-sm">
                Nodes of technical evolution designed to test your biological limits and computational depth for the year 2026.
              </div>
            </motion.div>

            {/* Events Grid */}
            <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-12">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event, idx) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: idx * 0.05, 
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <EventCard 
                      event={event} 
                      onClick={setSelectedEvent} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 sm:py-40 text-center px-6"
              >
                <div className="w-20 h-20 sm:w-24 h-24 border border-teal-400/20 rounded-full flex items-center justify-center mb-6 sm:mb-8 relative group">
                  <div className="absolute inset-0 bg-teal-400/5 rounded-full blur-xl animate-pulse" />
                  <span className="text-3xl sm:text-4xl text-teal-400/40 relative font-orbitron">?</span>
                </div>
                <p className="text-white font-orbitron font-black text-xl sm:text-2xl uppercase tracking-[0.2em] sm:tracking-[0.3em]">Protocol Offline</p>
                <p className="text-gray-500 mt-4 max-w-md font-mono text-xs sm:text-sm">No data packets found in this sector. Try selecting a different category or wait for system updates.</p>
              </motion.div>
            )}
          </main>

          {/* Simple Bottom Bar */}
          <div className="py-12 border-t border-white/5 text-center px-6 opacity-30">
            <p className="text-gray-600 text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.3em]">
              © 2026 BIOMUTANTZ CORE. Systems Optimal.
            </p>
          </div>

          <AnimatePresence>
            {selectedEvent && (
              <EventModal 
                key="modal"
                event={selectedEvent} 
                onClose={() => setSelectedEvent(null)} 
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default App;
