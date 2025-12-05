import { ArrowLeft, Trophy, Star, Award, Medal, Crown, Zap, Heart, Rocket, Target, Sparkles, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RobotMascot } from './RobotMascot';
import type { Screen, UserProgress } from '../App';

interface RewardsProps {
  userProgress: UserProgress;
  onNavigate: (screen: Screen) => void;
}

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

const allBadges: BadgeData[] = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Complete your first lesson',
    icon: Star,
    color: 'from-blue-400 to-blue-600',
    rarity: 'Common',
  },
  {
    id: 'loop-master',
    name: 'Loop Master',
    description: 'Master the art of loops',
    icon: Zap,
    color: 'from-yellow-400 to-yellow-600',
    rarity: 'Rare',
  },
  {
    id: 'variables-master',
    name: 'Variable Hero',
    description: 'Complete variables lesson',
    icon: Heart,
    color: 'from-pink-400 to-pink-600',
    rarity: 'Common',
  },
  {
    id: 'conditionals-master',
    name: 'Decision Maker',
    description: 'Master if-then statements',
    icon: Target,
    color: 'from-purple-400 to-purple-600',
    rarity: 'Rare',
  },
  {
    id: 'functions-master',
    name: 'Function Expert',
    description: 'Master functions and actions',
    icon: Rocket,
    color: 'from-green-400 to-green-600',
    rarity: 'Epic',
  },
  {
    id: 'challenge-master',
    name: 'Challenge Champion',
    description: 'Complete a daily challenge',
    icon: Trophy,
    color: 'from-orange-400 to-orange-600',
    rarity: 'Epic',
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Get 100% on 5 lessons',
    icon: Crown,
    color: 'from-yellow-300 to-yellow-500',
    rarity: 'Legendary',
  },
  {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Complete a challenge in under 30s',
    icon: Medal,
    color: 'from-cyan-400 to-cyan-600',
    rarity: 'Epic',
  },
];

const achievements = [
  { id: '1', title: '10 Lessons Completed', progress: 4, total: 10, icon: '📚', color: 'blue' },
  { id: '2', title: '100 Stars Collected', progress: 12, total: 100, icon: '⭐', color: 'yellow' },
  { id: '3', title: '50 Challenges Won', progress: 8, total: 50, icon: '🏆', color: 'orange' },
  { id: '4', title: 'All Badges Collected', progress: 2, total: 8, icon: '🎖️', color: 'purple' },
];

export function Rewards({ userProgress, onNavigate }: RewardsProps) {
  const earnedBadges = allBadges.filter((badge) => userProgress.badges.includes(badge.id));
  const lockedBadges = allBadges.filter((badge) => !userProgress.badges.includes(badge.id));

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'text-gray-600 bg-gray-100';
      case 'Rare':
        return 'text-blue-600 bg-blue-100';
      case 'Epic':
        return 'text-purple-600 bg-purple-100';
      case 'Legendary':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Robot Mascot */}
        <RobotMascot
          mood="excited"
          message={`You've earned ${earnedBadges.length} badge${earnedBadges.length !== 1 ? 's' : ''}! Keep going! 🌟`}
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
            className="text-8xl mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            🏆
          </motion.div>
          <h1 className="text-7xl mb-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Your Rewards
          </h1>
          <p className="text-2xl text-gray-700">
            Badges, achievements, and all your awesome progress!
          </p>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="p-8 bg-gradient-to-br from-yellow-400 to-orange-500 border-0 shadow-xl text-center hover:shadow-2xl transition-shadow">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
              </motion.div>
              <p className="text-white/90 mb-2 text-lg">Total Points</p>
              <p className="text-5xl text-white">{userProgress.points}</p>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="p-8 bg-gradient-to-br from-purple-400 to-pink-500 border-0 shadow-xl text-center hover:shadow-2xl transition-shadow">
              <Award className="w-16 h-16 text-white mx-auto mb-4" />
              <p className="text-white/90 mb-2 text-lg">Badges Earned</p>
              <p className="text-5xl text-white">{earnedBadges.length}/{allBadges.length}</p>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="p-8 bg-gradient-to-br from-blue-400 to-cyan-500 border-0 shadow-xl text-center hover:shadow-2xl transition-shadow">
              <Star className="w-16 h-16 text-white mx-auto mb-4 fill-white" />
              <p className="text-white/90 mb-2 text-lg">Stars Collected</p>
              <p className="text-5xl text-white">{userProgress.stars}</p>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="p-8 bg-gradient-to-br from-red-400 to-orange-500 border-0 shadow-xl text-center hover:shadow-2xl transition-shadow">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Flame className="w-16 h-16 text-white mx-auto mb-4" />
              </motion.div>
              <p className="text-white/90 mb-2 text-lg">Day Streak</p>
              <p className="text-5xl text-white">{userProgress.streak}</p>
            </Card>
          </motion.div>
        </motion.div>

        {/* Trophy Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="overflow-hidden border-4 border-yellow-400">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1574072357830-bff387367a16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHRyb3BoeSUyMHJld2FyZHxlbnwxfHx8fDE3NjMyODgzMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Trophy"
              className="w-full h-64 object-cover"
            />
          </Card>
        </motion.div>

        {/* Achievements Progress */}
        <div className="mb-12">
          <h2 className="text-3xl mb-6 text-gray-800 flex items-center gap-3">
            <Target className="w-8 h-8 text-purple-600" />
            Achievements in Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => {
              const progressPercent = (achievement.progress / achievement.total) * 100;
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-500',
                yellow: 'bg-yellow-500',
                orange: 'bg-orange-500',
                purple: 'bg-purple-500',
              };

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="p-6 bg-white/80 backdrop-blur border-2 border-gray-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl mb-1 text-gray-800">{achievement.title}</h3>
                        <p className="text-gray-600">
                          {achievement.progress} / {achievement.total}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full ${colorMap[achievement.color]}`}
                      />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Earned Badges */}
        <div className="mb-12">
          <h2 className="text-3xl mb-6 text-gray-800 flex items-center gap-3">
            <Award className="w-8 h-8 text-green-600" />
            Earned Badges
          </h2>
          {earnedBadges.length === 0 ? (
            <Card className="p-12 text-center bg-white/60 backdrop-blur border-2 border-gray-300">
              <p className="text-xl text-gray-600">Complete lessons to earn your first badge!</p>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {earnedBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                  >
                    <Card className="p-6 bg-white border-4 border-green-400 hover:scale-105 transition-transform cursor-pointer">
                      <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-center mb-2 text-gray-800">{badge.name}</h3>
                      <p className="text-center text-sm text-gray-600 mb-3">{badge.description}</p>
                      <Badge className={`w-full justify-center ${getRarityColor(badge.rarity)} border-0`}>
                        {badge.rarity}
                      </Badge>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Locked Badges */}
        <div>
          <h2 className="text-3xl mb-6 text-gray-800 flex items-center gap-3">
            <Medal className="w-8 h-8 text-gray-600" />
            Locked Badges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {lockedBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <Card className="p-6 bg-gray-100 border-2 border-gray-300 opacity-60">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-gray-500" />
                    </div>
                    <h3 className="text-center mb-2 text-gray-600">{badge.name}</h3>
                    <p className="text-center text-sm text-gray-500 mb-3">{badge.description}</p>
                    <Badge className={`w-full justify-center ${getRarityColor(badge.rarity)} border-0 opacity-60`}>
                      {badge.rarity}
                    </Badge>
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
