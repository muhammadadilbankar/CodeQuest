import { useState } from 'react';
import { ArrowLeft, CheckCircle, ChevronRight, Code, Lightbulb, Play, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { RobotMascot } from './RobotMascot';
import { Confetti } from './Confetti';
import type { Screen } from '../App';

interface LessonProps {
  lessonId: string;
  onNavigate: (screen: Screen) => void;
  onComplete: (lessonId: string, points: number, badge?: string) => void;
}

const lessonData: Record<string, any> = {
  variables: {
    title: 'Variables & Data',
    emoji: '📦',
    slides: [
      {
        title: 'What are Variables?',
        content: 'Variables are like labeled boxes where you can store information!',
        example: {
          code: 'let playerName = "Alex"\nlet score = 100',
          explanation: 'Here we store a name and a score!',
        },
        visual: 'boxes',
      },
      {
        title: 'Using Variables',
        content: 'You can use variables anywhere in your code!',
        example: {
          code: 'let points = 50\npoints = points + 10\nconsole.log(points)',
          explanation: 'We added 10 points! Now points = 60',
        },
        visual: 'math',
      },
      {
        title: 'Try It Yourself!',
        content: 'Create a variable for your favorite color!',
        interactive: true,
        question: 'What color will you choose?',
        options: ['let color = "blue"', 'let color = "red"', 'let color = "green"'],
      },
    ],
  },
  conditionals: {
    title: 'If-Then Decisions',
    emoji: '🤔',
    slides: [
      {
        title: 'Making Decisions',
        content: 'Your code can make choices using IF statements!',
        example: {
          code: 'if (score > 100) {\n  console.log("You win!")\n}',
          explanation: 'This checks if the score is greater than 100',
        },
        visual: 'decision',
      },
      {
        title: 'If-Else Choices',
        content: 'Use ELSE to do something different!',
        example: {
          code: 'if (raining) {\n  bringUmbrella()\n} else {\n  wearSunglasses()\n}',
          explanation: 'Pick umbrella OR sunglasses based on weather',
        },
        visual: 'branch',
      },
      {
        title: 'Try It Yourself!',
        content: 'What should happen when score is high?',
        interactive: true,
        question: 'Complete the code:',
        options: [
          'if (score > 50) { win() }',
          'if (score < 50) { win() }',
          'if (score == 50) { win() }',
        ],
      },
    ],
  },
  loops: {
    title: 'Loops & Repetition',
    emoji: '🔄',
    slides: [
      {
        title: 'What are Loops?',
        content: 'Loops let you repeat actions without writing the same code over and over!',
        example: {
          code: 'for (let i = 0; i < 5; i++) {\n  console.log("Hello!")\n}',
          explanation: 'This prints "Hello!" 5 times!',
        },
        visual: 'loop',
      },
      {
        title: 'While Loops',
        content: 'Keep doing something while a condition is true!',
        example: {
          code: 'let cookies = 10\nwhile (cookies > 0) {\n  eatCookie()\n  cookies--\n}',
          explanation: 'Eat cookies until they\'re all gone!',
        },
        visual: 'cookies',
      },
      {
        title: 'Try It Yourself!',
        content: 'Which loop will jump 3 times?',
        interactive: true,
        question: 'Pick the correct loop:',
        options: [
          'for (i = 0; i < 3; i++) { jump() }',
          'for (i = 0; i < 5; i++) { jump() }',
          'for (i = 0; i < 1; i++) { jump() }',
        ],
      },
    ],
  },
  functions: {
    title: 'Functions & Actions',
    emoji: '⚡',
    slides: [
      {
        title: 'What are Functions?',
        content: 'Functions are reusable blocks of code that do specific tasks!',
        example: {
          code: 'function sayHello(name) {\n  console.log("Hi " + name)\n}',
          explanation: 'Now you can say hello to anyone!',
        },
        visual: 'function',
      },
      {
        title: 'Using Functions',
        content: 'Call your function whenever you need it!',
        example: {
          code: 'sayHello("Alex")\nsayHello("Sam")\nsayHello("Jordan")',
          explanation: 'Reuse the same code with different names!',
        },
        visual: 'call',
      },
      {
        title: 'Try It Yourself!',
        content: 'Create a function to add two numbers!',
        interactive: true,
        question: 'Which function adds numbers?',
        options: [
          'function add(a, b) { return a + b }',
          'function add(a, b) { return a - b }',
          'function add(a, b) { return a * b }',
        ],
      },
    ],
  },
};

export function Lesson({ lessonId, onNavigate, onComplete }: LessonProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const lesson = lessonData[lessonId] || lessonData.variables;
  const slide = lesson.slides[currentSlide];
  const isLastSlide = currentSlide === lesson.slides.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      setShowCelebration(true);
      setShowConfetti(true);
      setTimeout(() => {
        onComplete(lessonId, 50, `${lessonId}-master`);
        onNavigate('dashboard');
      }, 3000);
    } else {
      setCurrentSlide(currentSlide + 1);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const getRobotMessage = () => {
    if (slide.interactive && selectedAnswer !== null) {
      return "Amazing! You got it right! 🎉";
    }
    if (currentSlide === 0) {
      return "Let's learn something cool today!";
    }
    if (isLastSlide) {
      return "One more question and you'll complete this quest!";
    }
    return "You're doing great! Keep going!";
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        {/* Robot Mascot */}
        <RobotMascot
          mood={slide.interactive && selectedAnswer !== null ? "celebrating" : "thinking"}
          message={getRobotMessage()}
        />

        {/* Confetti */}
        <Confetti active={showConfetti} />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => onNavigate('dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2">
            {lesson.slides.map((_: any, index: number) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-purple-600'
                    : index < currentSlide
                    ? 'w-2 bg-green-500'
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Lesson Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="text-7xl mb-4"
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 0.5,
              repeat: 0
            }}
            key={currentSlide}
          >
            {lesson.emoji}
          </motion.div>
          <h1 className="text-5xl mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {lesson.title}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <p className="text-xl text-gray-600">
              Slide {currentSlide + 1} of {lesson.slides.length}
            </p>
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
        </motion.div>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 bg-white/80 backdrop-blur border-2 border-purple-300 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <Lightbulb className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-3xl mb-3 text-gray-800">{slide.title}</h2>
                  <p className="text-xl text-gray-700">{slide.content}</p>
                </div>
              </div>

              {/* Code Example */}
              {slide.example && (
                <div className="mt-6">
                  <div className="bg-gray-900 rounded-lg p-6 mb-4 relative">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-4 text-gray-400 text-sm">Code Editor</span>
                    </div>
                    <pre className="text-green-400 overflow-x-auto">
                      <code>{slide.example.code}</code>
                    </pre>
                  </div>
                  <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <Code className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-900">{slide.example.explanation}</p>
                  </div>
                </div>
              )}

              {/* Interactive Question */}
              {slide.interactive && (
                <div className="mt-8">
                  <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-300 mb-6">
                    <h3 className="text-2xl mb-4 text-purple-900">{slide.question}</h3>
                    <div className="space-y-3">
                      {slide.options.map((option: string, index: number) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswerSelect(index)}
                          className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                            selectedAnswer === index
                              ? 'bg-purple-500 text-white border-purple-600'
                              : 'bg-white text-gray-800 border-gray-300 hover:border-purple-400'
                          }`}
                        >
                          <code>{option}</code>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 bg-green-50 p-4 rounded-lg border-2 border-green-300"
                    >
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <p className="text-green-900 text-lg">Great job! That's correct! 🎉</p>
                    </motion.div>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-end">
          <Button
            size="lg"
            onClick={handleNext}
            disabled={slide.interactive && selectedAnswer === null}
            className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isLastSlide ? (
              <>
                Complete Lesson
                <CheckCircle className="w-5 h-5" />
              </>
            ) : (
              <>
                Next Slide
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>

        {/* Celebration Modal */}
        <AnimatePresence>
          {showCelebration && (
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
                <div className="text-8xl mb-6">🎉</div>
                <h2 className="text-4xl mb-4 text-gray-800">Awesome!</h2>
                <p className="text-xl text-gray-600 mb-6">
                  You completed the lesson and earned:
                </p>
                <div className="flex justify-center gap-6">
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2 fill-yellow-500" />
                    <p className="text-2xl text-yellow-700">+50 pts</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded-lg">
                    <Star className="w-8 h-8 text-purple-500 mx-auto mb-2 fill-purple-500" />
                    <p className="text-2xl text-purple-700">+3 stars</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
