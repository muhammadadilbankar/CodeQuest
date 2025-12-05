import { Trophy, Star, Award, Code, Zap, Rocket, Heart, Book, Flame, Target, Sparkles, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RobotMascot } from './RobotMascot';
import type { Screen, UserProgress } from '../App';

interface DashboardProps {
  userProgress: UserProgress;
  onNavigate: (screen: Screen, lessonId?: string) => void;
}

const lessons = [
  {
    id: 'variables',
    title: 'Variables & Data',
    description: 'Learn how to store information!',
    icon: Code,
    color: 'bg-blue-500',
    gradient: 'from-blue-400 to-blue-600',
    difficulty: 'Easy',
    emoji: '📦',
  },
  {
    id: 'loops',
    title: 'Loops & Repetition',
    description: 'Make your code repeat actions!',
    icon: Zap,
    color: 'bg-yellow-500',
    gradient: 'from-yellow-400 to-yellow-600',
    difficulty: 'Easy',
    emoji: '🔄',
  },
  {
    id: 'conditionals',
    title: 'If-Then Decisions',
    description: 'Teach your code to make choices!',
    icon: Rocket,
    color: 'bg-purple-500',
    gradient: 'from-purple-400 to-purple-600',
    difficulty: 'Medium',
    emoji: '🤔',
  },
  {
    id: 'functions',
    title: 'Functions & Actions',
    description: 'Create reusable code blocks!',
    icon: Heart,
    color: 'bg-pink-500',
    gradient: 'from-pink-400 to-pink-600',
    difficulty: 'Medium',
    emoji: '⚡',
  },
];

const dailyGoals = [
  { id: 1, text: 'Complete 1 lesson', completed: true },
  { id: 2, text: 'Earn 50 points', completed: true },
  { id: 3, text: 'Try the playground', completed: false },
];

export function Dashboard({ userProgress, onNavigate }: DashboardProps) {
  const progressToNextLevel = ((userProgress.points % 100) / 100) * 100;
  const completedGoals = dailyGoals.filter(g => g.completed).length;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Robot Mascot */}
        <RobotMascot
          mood="happy"
          message={`Welcome back! You're on a ${userProgress.streak} day streak! 🔥`}
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <h1 className="text-7xl mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              ⚡ CodeQuest ⚡
            </h1>
          </motion.div>
          <p className="text-2xl text-gray-700 mb-2">
            Your Epic Coding Adventure Awaits!
          </p>
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-4xl"
          >
            🎮
          </motion.div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <Card className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 border-0 shadow-xl hover:scale-105 transition-transform">
            <div className="text-center">
              <Trophy className="w-10 h-10 text-white mx-auto mb-2" />
              <p className="text-white/90 text-sm mb-1">Level</p>
              <p className="text-3xl text-white">{userProgress.level}</p>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-400 to-blue-600 border-0 shadow-xl hover:scale-105 transition-transform">
            <div className="text-center">
              <Zap className="w-10 h-10 text-white mx-auto mb-2" />
              <p className="text-white/90 text-sm mb-1">Points</p>
              <p className="text-3xl text-white">{userProgress.points}</p>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-purple-400 to-purple-600 border-0 shadow-xl hover:scale-105 transition-transform">
            <div className="text-center">
              <Star className="w-10 h-10 text-white mx-auto mb-2 fill-white" />
              <p className="text-white/90 text-sm mb-1">Stars</p>
              <p className="text-3xl text-white">{userProgress.stars}</p>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-pink-400 to-pink-600 border-0 shadow-xl hover:scale-105 transition-transform">
            <div className="text-center">
              <Award className="w-10 h-10 text-white mx-auto mb-2" />
              <p className="text-white/90 text-sm mb-1">Badges</p>
              <p className="text-3xl text-white">{userProgress.badges.length}</p>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-400 to-red-500 border-0 shadow-xl hover:scale-105 transition-transform">
            <div className="text-center">
              <Flame className="w-10 h-10 text-white mx-auto mb-2" />
              <p className="text-white/90 text-sm mb-1">Streak</p>
              <p className="text-3xl text-white">{userProgress.streak}</p>
            </div>
          </Card>
        </motion.div>

        {/* Daily Goals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Target className="w-7 h-7 text-cyan-600" />
                <h3 className="text-2xl text-gray-800">Today's Goals</h3>
              </div>
              <Badge className="bg-cyan-600 text-white border-0 text-lg px-4 py-1">
                {completedGoals}/{dailyGoals.length}
              </Badge>
            </div>
            <div className="space-y-3">
              {dailyGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    goal.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {goal.completed && <span className="text-white text-sm">✓</span>}
                  </div>
                  <span className={`text-lg ${goal.completed ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
                    {goal.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Progress to Next Level */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 mb-8 bg-white/90 backdrop-blur border-2 border-purple-400 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Rocket className="w-7 h-7 text-purple-600" />
                <span className="text-xl text-gray-800">Progress to Level {userProgress.level + 1}</span>
              </div>
              <span className="text-2xl text-purple-600">{Math.floor(progressToNextLevel)}%</span>
            </div>
            <Progress value={progressToNextLevel} className="h-4" />
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card 
              className="p-6 bg-gradient-to-br from-green-400 to-emerald-600 border-0 shadow-xl cursor-pointer"
              onClick={() => onNavigate('challenge')}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                  <Zap className="w-9 h-9 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-white mb-1">Daily Challenge</h3>
                  <p className="text-white/90">Solve today's puzzle! 🎯</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card 
              className="p-6 bg-gradient-to-br from-cyan-400 to-blue-600 border-0 shadow-xl cursor-pointer"
              onClick={() => onNavigate('playground')}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                  <Terminal className="w-9 h-9 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-white mb-1">Code Playground</h3>
                  <p className="text-white/90">Practice coding freely! 💻</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card 
              className="p-6 bg-gradient-to-br from-orange-400 to-red-600 border-0 shadow-xl cursor-pointer"
              onClick={() => onNavigate('rewards')}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                  <Award className="w-9 h-9 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl text-white mb-1">My Rewards</h3>
                  <p className="text-white/90">View achievements! 🏆</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Lessons Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-9 h-9 text-purple-600" />
            <h2 className="text-4xl text-gray-800">Learning Quests</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lessons.map((lesson, index) => {
              const isCompleted = userProgress.completedLessons.includes(lesson.id);
              const Icon = lesson.icon;

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className={`p-6 cursor-pointer transition-all duration-300 border-3 relative overflow-hidden ${
                      isCompleted
                        ? 'bg-white border-green-400 shadow-xl'
                        : 'bg-white/80 border-gray-300 shadow-lg hover:shadow-2xl'
                    }`}
                    onClick={() => onNavigate('lesson', lesson.id)}
                  >
                    {/* Background Gradient Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${lesson.gradient} opacity-5`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <motion.div 
                          className={`${lesson.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-9 h-9 text-white" />
                        </motion.div>
                        {isCompleted ? (
                          <Badge className="bg-green-500 text-white border-0 text-sm px-3 py-1">
                            ✓ Completed
                          </Badge>
                        ) : (
                          <span className="text-3xl">{lesson.emoji}</span>
                        )}
                      </div>
                      <h3 className="text-xl mb-2 text-gray-800">{lesson.title}</h3>
                      <p className="text-gray-600 mb-3 text-sm leading-relaxed">{lesson.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-white/50 border-gray-400">
                          {lesson.difficulty}
                        </Badge>
                        {isCompleted && (
                          <div className="flex gap-1">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
