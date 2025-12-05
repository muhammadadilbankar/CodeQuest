import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

interface RobotMascotProps {
  mood?: 'happy' | 'excited' | 'thinking' | 'celebrating';
  message?: string;
  show?: boolean;
}

export function RobotMascot({ mood = 'happy', message, show = true }: RobotMascotProps) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  const getRobotExpression = () => {
    switch (mood) {
      case 'excited':
        return { eyes: '◕ ◕', mouth: '▿', color: 'from-yellow-400 to-orange-500' };
      case 'thinking':
        return { eyes: '◔ ◔', mouth: '○', color: 'from-blue-400 to-cyan-500' };
      case 'celebrating':
        return { eyes: '★ ★', mouth: '▿', color: 'from-pink-400 to-purple-500' };
      default:
        return { eyes: '◕ ◕', mouth: '◡', color: 'from-green-400 to-emerald-500' };
    }
  };

  const expression = getRobotExpression();

  if (!show) return null;

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="fixed bottom-8 left-8 z-40"
    >
      <div className="relative">
        {/* Speech Bubble */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute bottom-full left-0 mb-4 bg-white rounded-2xl p-4 shadow-xl border-2 border-purple-300 min-w-[200px] max-w-[280px]"
            >
              <p className="text-gray-800">{message}</p>
              <div className="absolute bottom-0 left-8 transform translate-y-1/2 rotate-45 w-4 h-4 bg-white border-r-2 border-b-2 border-purple-300"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          {/* Robot Body */}
          <div className={`w-32 h-32 bg-gradient-to-br ${expression.color} rounded-3xl shadow-2xl border-4 border-white relative overflow-hidden`}>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
            
            {/* Antenna */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-1 h-6 bg-white rounded-full"></div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 bg-red-500 rounded-full mx-auto shadow-lg"
              ></motion.div>
            </motion.div>

            {/* Face */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Eyes */}
              <div className="flex gap-6 mb-4">
                <motion.div
                  animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
                  transition={{ duration: 0.1 }}
                  className="text-3xl text-white"
                >
                  {expression.eyes.split(' ')[0]}
                </motion.div>
                <motion.div
                  animate={isBlinking ? { scaleY: 0.1 } : { scaleY: 1 }}
                  transition={{ duration: 0.1 }}
                  className="text-3xl text-white"
                >
                  {expression.eyes.split(' ')[1]}
                </motion.div>
              </div>

              {/* Mouth */}
              <motion.div
                animate={mood === 'celebrating' ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, repeat: mood === 'celebrating' ? Infinity : 0 }}
                className="text-3xl text-white"
              >
                {expression.mouth}
              </motion.div>
            </div>

            {/* Decorative circles */}
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-white/50 rounded-full"></div>
          </div>

          {/* Shadow */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-black/20 rounded-full blur-md"></div>
        </motion.div>
      </div>
    </motion.div>
  );
}
