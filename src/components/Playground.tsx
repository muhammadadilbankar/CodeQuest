import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { CodePlayground } from './CodePlayground';
import { RobotMascot } from './RobotMascot';
import { motion } from 'motion/react';
import type { Screen } from '../App';

interface PlaygroundProps {
  onNavigate: (screen: Screen) => void;
}

export function Playground({ onNavigate }: PlaygroundProps) {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Robot Mascot */}
        <RobotMascot
          mood="thinking"
          message="Try writing your own code! Change variables, use math, and see what happens!"
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => onNavigate('dashboard')}
            className="gap-2 bg-white/80 backdrop-blur border-2 border-purple-300 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <h1 className="text-6xl mb-4 bg-gradient-to-r from-cyan-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              💻 Code Playground 🎮
            </h1>
          </motion.div>
          <p className="text-xl text-gray-700 mb-4">
            Experiment with code and see it run in real-time!
          </p>
          <div className="inline-flex items-center gap-2 bg-cyan-50 px-6 py-3 rounded-full border-2 border-cyan-300">
            <BookOpen className="w-5 h-5 text-cyan-600" />
            <span className="text-cyan-900">Practice makes perfect!</span>
          </div>
        </motion.div>

        {/* Code Playground */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CodePlayground />
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white/80 backdrop-blur p-6 rounded-xl border-2 border-blue-300">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="text-xl mb-2 text-gray-800">Try Variables</h3>
            <code className="text-sm text-gray-700 block bg-gray-100 p-2 rounded">
              let name = "Coder"
            </code>
          </div>

          <div className="bg-white/80 backdrop-blur p-6 rounded-xl border-2 border-green-300">
            <div className="text-4xl mb-3">➕</div>
            <h3 className="text-xl mb-2 text-gray-800">Do Math</h3>
            <code className="text-sm text-gray-700 block bg-gray-100 p-2 rounded">
              let sum = 5 + 10
            </code>
          </div>

          <div className="bg-white/80 backdrop-blur p-6 rounded-xl border-2 border-purple-300">
            <div className="text-4xl mb-3">📢</div>
            <h3 className="text-xl mb-2 text-gray-800">Show Output</h3>
            <code className="text-sm text-gray-700 block bg-gray-100 p-2 rounded">
              console.log("Hi!")
            </code>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
