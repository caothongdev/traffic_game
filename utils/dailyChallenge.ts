import { QUESTIONS } from '../constants';
import { Question } from '../types';
import { supabase } from '../config/supabase';

// Seeded Random Generator
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

// Lấy seed theo ngày (YYYYMMDD)
export const getDailySeed = (): number => {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
};

// Lấy ngày hiện tại dạng string
export const getTodayString = (): string => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

// Random câu hỏi dựa trên seed
export const getDailyQuestions = (count: number = 10): Question[] => {
  const seed = getDailySeed();
  const rng = new SeededRandom(seed);
  
  const shuffled = [...QUESTIONS].sort(() => rng.next() - 0.5);
  return shuffled.slice(0, count);
};

// Kiểm tra đã chơi hôm nay chưa
export const hasPlayedToday = async (): Promise<boolean> => {
  const today = getTodayString();
  const playerName = localStorage.getItem('playerName') || '';
  if (!playerName) return false;

  // Ưu tiên kiểm tra localStorage trước
  const lastPlayed = localStorage.getItem('dailyChallenge_lastPlayed');
  if (lastPlayed === today) {
    return true;
  }

  // Nếu chưa có trong localStorage, kiểm tra Supabase
  try {
    const { data, error } = await supabase
      .from('daily_challenges')
      .select('id')
      .eq('date', today)
      .eq('player_name', playerName)
      .single();

    if (!!data && !error) {
      // Nếu có trên Supabase thì cũng lưu vào localStorage để lần sau kiểm tra nhanh hơn
      localStorage.setItem('dailyChallenge_lastPlayed', today);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

// Lưu kết quả daily challenge
export interface DailyChallengeResult {
  date: string;
  score: number;
  accuracy: number; // %
  avgResponseTime: number; // seconds
  violations: number; // số câu sai
  totalQuestions: number;
  completedAt: number; // timestamp
  playerName?: string; // optional player name
}

export const saveDailyChallengeResult = async (result: DailyChallengeResult): Promise<void> => {
  try {
    const { error } = await supabase
      .from('daily_challenges')
      .insert([{
        date: result.date,
        player_name: result.playerName,
        score: result.score,
        accuracy: result.accuracy,
        avg_response_time: result.avgResponseTime,
        violations: result.violations,
        total_questions: result.totalQuestions,
        completed_at: result.completedAt
      }]);
    
    if (error) {
      console.error('Error saving to Supabase:', error);
      // Fallback to localStorage
      saveToLocalStorage(result);
    } else {
      // Cũng lưu vào localStorage để backup
      localStorage.setItem('dailyChallenge_lastPlayed', result.date);
      localStorage.setItem('dailyChallenge_lastResult', JSON.stringify(result));
    }
  } catch (err) {
    console.error('Error:', err);
    saveToLocalStorage(result);
  }
};

// Fallback function
const saveToLocalStorage = (result: DailyChallengeResult): void => {
  const today = getTodayString();
  
  localStorage.setItem('dailyChallenge_lastPlayed', today);
  localStorage.setItem('dailyChallenge_lastResult', JSON.stringify(result));
  
  // Update Streak Logic
  updateStreak(today);
};

const updateStreak = (today: string) => {
  const lastStreakDate = localStorage.getItem('dailyChallenge_lastStreakDate');
  let currentStreak = parseInt(localStorage.getItem('dailyChallenge_streak') || '0');
  
  if (!lastStreakDate) {
    // First time playing
    currentStreak = 1;
  } else {
    const lastDate = new Date(lastStreakDate);
    const todayDate = new Date(today);
    const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Consecutive day
      currentStreak += 1;
    } else if (diffDays > 1) {
      // Missed a day (or more)
      currentStreak = 1;
    }
    // If diffDays === 0 (same day), do nothing (keep streak)
  }
  
  localStorage.setItem('dailyChallenge_streak', currentStreak.toString());
  localStorage.setItem('dailyChallenge_lastStreakDate', today);
};

export const getStreakInfo = () => {
  const streak = parseInt(localStorage.getItem('dailyChallenge_streak') || '0');
  const lastStreakDate = localStorage.getItem('dailyChallenge_lastStreakDate');
  
  // Check if streak is broken (if last played was more than 1 day ago)
  // But we only reset when they play again. For display, we might want to show if it's active.
  // For now, just return the stored streak.
  
  return {
    streak,
    lastStreakDate
  };
};

export const getLastResult = async (): Promise<DailyChallengeResult | null> => {
  const playerName = localStorage.getItem('playerName') || '';
  if (!playerName) return null;
  
  const today = getTodayString();
  
  try {
    const { data, error } = await supabase
      .from('daily_challenges')
      .select('*')
      .eq('date', today)
      .eq('player_name', playerName)
      .single();
    
    if (error || !data) {
      // Fallback to localStorage
      const localData = localStorage.getItem('dailyChallenge_lastResult');
      return localData ? JSON.parse(localData) : null;
    }
    
    return {
      date: data.date,
      score: data.score,
      accuracy: data.accuracy,
      avgResponseTime: data.avg_response_time,
      violations: data.violations,
      totalQuestions: data.total_questions,
      playerName: data.player_name,
      completedAt: data.completed_at
    };
  } catch (err) {
    const localData = localStorage.getItem('dailyChallenge_lastResult');
    return localData ? JSON.parse(localData) : null;
  }
};

// Tính thời gian còn lại đến reset (00:00 ngày mai)
export const getTimeUntilReset = (): string => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours} giờ ${minutes} phút`;
};
