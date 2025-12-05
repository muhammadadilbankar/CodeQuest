import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Code, Trophy, Timer, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { RobotMascot } from './RobotMascot';
import { Confetti } from './Confetti';
import type { Screen } from '../App';

interface CodeChallengeProps {
  onNavigate: (screen: Screen) => void;
  onComplete: (lessonId: string, points: number, badge?: string) => void;
}

interface CodeBlock {
  id: string;
  code: string;
  type: 'correct' | 'wrong';
}

const challenges = [
  {
    id: 'fix-loop',
    title: 'Fix the Loop! 🔄',
    description: 'Drag the correct code blocks to make the robot jump 5 times!',
    difficulty: 'Easy',
    timeLimit: 60,
    blocks: [
      { id: '1', code: 'for (let i = 0; i < 5; i++)', type: 'correct' },
      { id: '2', code: 'for (let i = 0; i > 5; i++)', type: 'wrong' },
      { id: '3', code: 'robot.jump()', type: 'correct' },
      { id: '4', code: 'robot.sleep()', type: 'wrong' },
      { id: '5', code: '}', type: 'correct' },
    ] as CodeBlock[],
    correctSequence: ['1', '3', '5'],
    hint: 'Remember: loops use < to count up!',
  },
  {
    id: 'if-statement',
    title: 'Make a Decision! 🤔',
    description: 'Build an if-statement to check if score is greater than 100!',
    difficulty: 'Medium',
    timeLimit: 90,
    blocks: [
      { id: '1', code: 'if (score > 100)', type: 'correct' },
      { id: '2', code: 'if (score < 100)', type: 'wrong' },
      { id: '3', code: 'console.log("You win!")', type: 'correct' },
      { id: '4', code: 'console.log("You lose!")', type: 'wrong' },
      { id: '5', code: '}', type: 'correct' },
    ] as CodeBlock[],
    correctSequence: ['1', '3', '5'],
    hint: 'Use > for greater than!',
  },
];

export function CodeChallenge({ onNavigate, onComplete }: CodeChallengeProps) {
  const [challenge] = useState(challenges[0]);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<CodeBlock[]>(
    [...challenge.blocks].sort(() => Math.random() - 0.5)
  );
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isComplete]);

  const handleBlockClick = (blockId: string) => {
    const block = availableBlocks.find((b) => b.id === blockId);
    if (block) {
      setSelectedBlocks([...selectedBlocks, blockId]);
      setAvailableBlocks(availableBlocks.filter((b) => b.id !== blockId));
    }
  };

  const handleRemoveBlock = (index: number) => {
    const blockId = selectedBlocks[index];
    const block = challenge.blocks.find((b) => b.id === blockId);
    if (block) {
      setSelectedBlocks(selectedBlocks.filter((_, i) => i !== index));
      setAvailableBlocks([...availableBlocks, block]);
    }
  };

  const handleCheck = () => {
    setAttempts(attempts + 1);
    const isCorrect = JSON.stringify(selectedBlocks) === JSON.stringify(challenge.correctSequence);
    
    if (isCorrect) {
      setIsComplete(true);
      setShowConfetti(true);
      const pointsEarned = Math.max(100 - attempts * 10, 50);
      setTimeout(() => {
        onComplete('daily-challenge', pointsEarned, 'challenge-master');
      }, 3000);
    } else {
      // Reset after wrong attempt
      setAvailableBlocks([...challenge.blocks].sort(() => Math.random() - 0.5));
      setSelectedBlocks([]);
    }
  };

  const handleReset = () => {
    setSelectedBlocks([]);
    setAvailableBlocks([...challenge.blocks].sort(() => Math.random() - 0.5));
  };

  const getRobotMessage = () => {
    if (attempts === 0) {
      return "Drag the code blocks in the right order! You got this! 💪";
    }
    if (showHint) {
      return challenge.hint;
    }
    return "Keep trying! Think about what the code should do! 🤔";
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Robot Mascot */}
        <RobotMascot
          mood={isComplete ? "celebrating" : "thinking"}
          message={isComplete ? "Amazing work! You solved the challenge! 🏆" : getRobotMessage()}
        />

        {/* Confetti */}
        <Confetti active={showConfetti} />

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

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border-2 border-purple-300">
              <Timer className="w-5 h-5 text-purple-600" />
              <span className="text-lg">{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border-2 border-blue-300">
              <Code className="w-5 h-5 text-blue-600" />
              <span className="text-lg">Attempts: {attempts}</span>
            </div>
          </div>
        </div>

        {/* Challenge Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, -15, 15, -15, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Trophy className="w-14 h-14 text-yellow-500" />
            </motion.div>
            <h1 className="text-6xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              {challenge.title}
            </h1>
          </div>
          <p className="text-2xl text-gray-700 mb-3">{challenge.description}</p>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-3 rounded-full border-0 shadow-lg">
            <Zap className="w-5 h-5 text-white" />
            <span className="text-white">{challenge.difficulty} Challenge</span>
          </div>
        </motion.div>

        {/* Code Builder Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Available Blocks */}
          <Card className="p-6 bg-white/80 backdrop-blur border-2 border-blue-300">
            <h3 className="text-2xl mb-4 text-gray-800 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              Code Blocks
            </h3>
            <div className="space-y-3 min-h-[300px]">
              {availableBlocks.map((block) => (
                <motion.button
                  key={block.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBlockClick(block.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    block.type === 'correct'
                      ? 'bg-blue-50 border-blue-300 hover:bg-blue-100'
                      : 'bg-red-50 border-red-300 hover:bg-red-100'
                  }`}
                >
                  <code className="text-gray-800">{block.code}</code>
                </motion.button>
              ))}
            </div>
          </Card>

          {/* Solution Area */}
          <Card className="p-6 bg-gray-900 border-2 border-green-400">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-gray-400">Your Solution</span>
            </div>

            <div className="space-y-2 min-h-[300px] bg-black/30 rounded-lg p-4">
              {selectedBlocks.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Drag code blocks here to build your solution</p>
                </div>
              ) : (
                selectedBlocks.map((blockId, index) => {
                  const block = challenge.blocks.find((b) => b.id === blockId);
                  if (!block) return null;

                  return (
                    <motion.div
                      key={`${blockId}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-2"
                    >
                      <button
                        onClick={() => handleRemoveBlock(index)}
                        className="w-8 h-8 bg-red-500 rounded flex items-center justify-center hover:bg-red-600 transition-colors flex-shrink-0"
                      >
                        <XCircle className="w-5 h-5 text-white" />
                      </button>
                      <div className="flex-1 bg-green-500/20 border-2 border-green-500 rounded p-3">
                        <code className="text-green-400">{block.code}</code>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowHint(!showHint)}
            className="gap-2"
          >
            💡 {showHint ? 'Hide' : 'Show'} Hint
          </Button>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={selectedBlocks.length === 0}
            >
              Reset
            </Button>
            <Button
              size="lg"
              onClick={handleCheck}
              disabled={selectedBlocks.length !== challenge.correctSequence.length}
              className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <CheckCircle className="w-5 h-5" />
              Check Solution
            </Button>
          </div>
        </div>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6"
            >
              <Card className="p-6 bg-yellow-50 border-2 border-yellow-400">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xl mb-2 text-yellow-900">Hint</h4>
                    <p className="text-yellow-800">{challenge.hint}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0.5, rotate: 10 }}
                className="bg-white rounded-2xl p-12 text-center max-w-md"
              >
                <div className="text-8xl mb-6">🏆</div>
                <h2 className="text-4xl mb-4 text-gray-800">Challenge Complete!</h2>
                <p className="text-xl text-gray-600 mb-6">
                  You solved it in {attempts} attempt{attempts !== 1 ? 's' : ''}!
                </p>
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-lg">
                  <Trophy className="w-12 h-12 text-white mx-auto mb-2" />
                  <p className="text-3xl text-white">+{Math.max(100 - (attempts - 1) * 10, 50)} points</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
