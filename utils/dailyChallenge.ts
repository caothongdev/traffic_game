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
  
  // Lấy player name từ localStorage (tạm thời)
  const playerName = localStorage.getItem('playerName') || '';
  if (!playerName) return false;
  
  try {
    const { data, error } = await supabase
      .from('daily_challenges')
      .select('id')
      .eq('date', today)
      .eq('player_name', playerName)
      .single();
    
    return !!data && !error;
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
  playerName: string;
  completedAt: number; // timestamp
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
  
  const leaderboardKey = `dailyChallenge_leaderboard_${today}`;
  const existingData = localStorage.getItem(leaderboardKey);
  const leaderboard: DailyChallengeResult[] = existingData ? JSON.parse(existingData) : [];
  
  leaderboard.push(result);
  leaderboard.sort((a, b) => b.score - a.score);
  
  localStorage.setItem(leaderboardKey, JSON.stringify(leaderboard));
};

export const getTodayLeaderboard = async (): Promise<DailyChallengeResult[]> => {
  const today = getTodayString();
  
  try {
    const { data, error } = await supabase
      .from('daily_challenges')
      .select('*')
      .eq('date', today)
      .order('score', { ascending: false })
      .limit(100);
    
    if (error) {
      console.error('Error fetching leaderboard:', error);
      return getLocalLeaderboard(today);
    }
    
    // Convert database format to app format
    return (data || []).map(record => ({
      date: record.date,
      score: record.score,
      accuracy: record.accuracy,
      avgResponseTime: record.avg_response_time,
      violations: record.violations,
      totalQuestions: record.total_questions,
      playerName: record.player_name,
      completedAt: record.completed_at
    }));
  } catch (err) {
    console.error('Error:', err);
    return getLocalLeaderboard(today);
  }
};

// Fallback to localStorage
const getLocalLeaderboard = (today: string): DailyChallengeResult[] => {
  const leaderboardKey = `dailyChallenge_leaderboard_${today}`;
  const data = localStorage.getItem(leaderboardKey);
  return data ? JSON.parse(data) : [];
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
