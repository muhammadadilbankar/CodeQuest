import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Lesson } from './components/Lesson';
import { CodeChallenge } from './components/CodeChallenge';
import { Rewards } from './components/Rewards';
import { Playground } from './components/Playground';

export type Screen = 'dashboard' | 'lesson' | 'challenge' | 'rewards' | 'playground';

export interface UserProgress {
  points: number;
  level: number;
  completedLessons: string[];
  badges: string[];
  stars: number;
  streak: number;
  totalChallenges: number;
  perfectScores: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    points: 150,
    level: 2,
    completedLessons: ['variables', 'loops'],
    badges: ['first-step', 'loop-master'],
    stars: 12,
    streak: 5,
    totalChallenges: 8,
    perfectScores: 3,
  });

  const handleNavigation = (screen: Screen, lessonId?: string) => {
    setCurrentScreen(screen);
    if (lessonId) setSelectedLesson(lessonId);
  };

  const handleCompleteLesson = (lessonId: string, pointsEarned: number, badge?: string) => {
    setUserProgress((prev) => ({
      ...prev,
      points: prev.points + pointsEarned,
      stars: prev.stars + 3,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])],
      badges: badge ? [...new Set([...prev.badges, badge])] : prev.badges,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      {currentScreen === 'dashboard' && (
        <Dashboard
          userProgress={userProgress}
          onNavigate={handleNavigation}
        />
      )}
      {currentScreen === 'lesson' && (
        <Lesson
          lessonId={selectedLesson}
          onNavigate={handleNavigation}
          onComplete={handleCompleteLesson}
        />
      )}
      {currentScreen === 'challenge' && (
        <CodeChallenge
          onNavigate={handleNavigation}
          onComplete={handleCompleteLesson}
        />
      )}
      {currentScreen === 'rewards' && (
        <Rewards
          userProgress={userProgress}
          onNavigate={handleNavigation}
        />
      )}
      {currentScreen === 'playground' && (
        <Playground
          onNavigate={handleNavigation}
        />
      )}
    </div>
  );
}
