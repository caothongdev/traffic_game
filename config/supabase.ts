import { createClient } from '@supabase/supabase-js';

// Thay thế bằng URL và API Key từ Supabase Dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DailyChallengeRecord {
  id?: number;
  date: string;
  player_name: string;
  score: number;
  accuracy: number;
  avg_response_time: number;
  violations: number;
  total_questions: number;
  completed_at: number;
  created_at?: string;
}
