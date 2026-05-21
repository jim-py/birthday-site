// App.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Цветовая палитра
const colors = {
  light: '#dad7cd',
  lightGreen: '#a3b18a',
  mediumGreen: '#588157',
  darkGreen: '#3a5a40',
  darkestGreen: '#344e41',
} as const;

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: `linear-gradient(to bottom right, ${colors.light}, ${colors.lightGreen}, ${colors.mediumGreen})` 
      }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative cursor-pointer perspective-1000"
            onClick={handleOpen}
          >
            {/* Envelope Body */}
            <motion.div
              className="w-80 h-150 rounded-lg shadow-2xl relative overflow-hidden"
              style={{ 
                background: `linear-gradient(to bottom right, ${colors.darkGreen}, ${colors.darkestGreen})` 
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Envelope Triangle Flap */}
              <div 
                className="absolute top-0 left-0 right-0 h-0 border-l-[160px] border-r-[180px] border-t-[200px] border-l-transparent border-r-transparent z-10"
                style={{ borderTopColor: colors.mediumGreen }}
              />
              
              {/* Decorative Lines */}
              <div 
                className="absolute top-24 left-1/2 -translate-x-1/2 w-40 h-0.5" 
                style={{ backgroundColor: `${colors.lightGreen}80` }} 
              />
              <div 
                className="absolute top-28 left-1/2 -translate-x-1/2 w-32 h-0.5" 
                style={{ backgroundColor: `${colors.lightGreen}80` }} 
              />
              
              {/* Heart Icon */}
              <div className="absolute top-2 right-3 z-20">
                <svg 
                  className="w-8 h-8" 
                  style={{ color: colors.lightGreen }} 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* Names on Envelope */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 mt-8">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <h2 className="text-3xl font-serif font-bold tracking-wide mb-2" style={{ color: '#ffffff' }}>
                    Александр
                  </h2>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl" style={{ color: colors.lightGreen }}>♥</span>
                    <span className="text-lg font-serif" style={{ color: colors.lightGreen }}>&</span>
                    <span className="text-2xl" style={{ color: colors.lightGreen }}>♥</span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold tracking-wide" style={{ color: '#ffffff' }}>
                    Екатерина
                  </h2>
                </motion.div>
              </div>

              {/* Click Prompt */}
              <motion.div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <p className="text-sm font-serif" style={{ color: colors.lightGreen }}>
                  Нажмите, чтобы открыть
                </p>
              </motion.div>
            </motion.div>

            {/* Shadow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-60 h-4 bg-black/20 blur-lg rounded-full" />
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative"
          >
            {/* Opened Letter */}
            <div 
              className="w-80 rounded-lg shadow-2xl p-8 relative"
              style={{ backgroundColor: colors.light }}
            >
              {/* Letter Fold Effect */}
              <div 
                className="absolute -top-2 left-0 right-0 h-4 rounded-t-lg" 
                style={{ 
                  background: `linear-gradient(to bottom, ${colors.light}ee, ${colors.light})` 
                }} 
              />
              
              {/* Decorative Border */}
              <div 
                className="absolute inset-2 border-2 border-dashed rounded-lg" 
                style={{ borderColor: colors.lightGreen }}
              />
              
              {/* Letter Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-6"
                >
                  <div className="flex justify-center mb-4">
                    <svg 
                      className="w-12 h-12" 
                      style={{ color: colors.darkGreen }} 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <h1 
                    className="text-4xl font-serif font-bold mb-2" 
                    style={{ color: colors.darkestGreen }}
                  >
                    Приглашение
                  </h1>
                  <div 
                    className="w-24 h-0.5 mx-auto" 
                    style={{ backgroundColor: colors.mediumGreen }}
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center space-y-4"
                >
                  <p className="text-lg font-serif" style={{ color: colors.darkestGreen }}>
                    Дорогие
                  </p>
                  <p 
                    className="text-2xl font-serif font-semibold" 
                    style={{ color: colors.darkGreen }}
                  >
                    Александр и Екатерина
                  </p>
                  <p 
                    className="font-serif leading-relaxed" 
                    style={{ color: colors.darkestGreen }}
                  >
                    Мы будем рады видеть вас<br />
                    на нашем особенном торжестве
                  </p>
                  
                  <div 
                    className="rounded-lg p-4 mt-6" 
                    style={{ backgroundColor: `${colors.lightGreen}20` }}
                  >
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <svg 
                        className="w-5 h-5" 
                        style={{ color: colors.mediumGreen }} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p 
                        className="text-lg font-serif font-semibold" 
                        style={{ color: colors.darkestGreen }}
                      >
                        15 июня 2026
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <svg 
                        className="w-5 h-5" 
                        style={{ color: colors.mediumGreen }} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p 
                        className="text-lg font-serif font-semibold" 
                        style={{ color: colors.darkestGreen }}
                      >
                        18:00
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <svg 
                        className="w-5 h-5" 
                        style={{ color: colors.mediumGreen }} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p 
                        className="text-md font-serif" 
                        style={{ color: colors.darkestGreen }}
                      >
                        Ресторан "Эрмитаж"
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-serif mt-4" style={{ color: colors.mediumGreen }}>
                    С любовью и теплом ждем вас!
                  </p>
                </motion.div>
              </div>

              {/* Decorative Corners */}
              <div 
                className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2" 
                style={{ borderColor: colors.mediumGreen }}
              />
              <div 
                className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2" 
                style={{ borderColor: colors.mediumGreen }}
              />
              <div 
                className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2" 
                style={{ borderColor: colors.mediumGreen }}
              />
              <div 
                className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2" 
                style={{ borderColor: colors.mediumGreen }}
              />
            </div>

            {/* Close Button */}
            <motion.button
              onClick={handleClose}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg 
                className="w-5 h-5" 
                style={{ color: colors.darkestGreen }} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;