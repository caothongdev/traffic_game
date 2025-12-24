import { supabase } from '../config/supabase';

export interface MainLeaderboardEntry {
  playerName: string;
  totalScore: number;
  totalGames: number;
  lastPlayedAt: string;
}

const LOCAL_MAIN_LEADERBOARD_KEY = 'main_leaderboard_data';

export const getMainLeaderboard = async (): Promise<MainLeaderboardEntry[]> => {
  try {
    const { data, error } = await supabase
      .from('main_leaderboard')
      .select('*')
      .order('total_score', { ascending: false })
      .limit(50);

    if (error) throw error;

    return data.map((item: any) => ({
      playerName: item.player_name,
      totalScore: item.total_score,
      totalGames: item.total_games,
      lastPlayedAt: item.last_played_at
    }));
  } catch (error) {
    console.warn('Fetching from Supabase failed, using localStorage', error);
    const localData = localStorage.getItem(LOCAL_MAIN_LEADERBOARD_KEY);
    return localData ? JSON.parse(localData) : [];
  }
};

export const saveMainGameResult = async (playerName: string, score: number): Promise<void> => {
  // Always update local storage as backup/cache
  updateLocalLeaderboard(playerName, score);

  try {
    const { error } = await supabase.rpc('update_main_leaderboard', {
      p_name: playerName,
      p_score: score
    });
    
    if (error) {
        // If RPC fails (e.g. function not exists), try direct upsert logic (less safe but works)
        console.warn('RPC failed, trying direct upsert', error);
        
        const { data: existing } = await supabase
            .from('main_leaderboard')
            .select('total_score, total_games')
            .eq('player_name', playerName)
            .single();
            
        if (existing) {
            await supabase
                .from('main_leaderboard')
                .update({
                    total_score: existing.total_score + score,
                    total_games: existing.total_games + 1,
                    last_played_at: new Date().toISOString()
                })
                .eq('player_name', playerName);
        } else {
            await supabase
                .from('main_leaderboard')
                .insert([{
                    player_name: playerName,
                    total_score: score,
                    total_games: 1,
                    last_played_at: new Date().toISOString()
                }]);
        }
    }
  } catch (error) {
    console.error('Error saving to Supabase:', error);
  }
};

const updateLocalLeaderboard = (playerName: string, score: number) => {
  const localData = localStorage.getItem(LOCAL_MAIN_LEADERBOARD_KEY);
  let leaderboard: MainLeaderboardEntry[] = localData ? JSON.parse(localData) : [];
  
  const existingIndex = leaderboard.findIndex(p => p.playerName === playerName);
  if (existingIndex >= 0) {
    leaderboard[existingIndex].totalScore += score;
    leaderboard[existingIndex].totalGames += 1;
    leaderboard[existingIndex].lastPlayedAt = new Date().toISOString();
  } else {
    leaderboard.push({
      playerName,
      totalScore: score,
      totalGames: 1,
      lastPlayedAt: new Date().toISOString()
    });
  }
  
  // Sort
  leaderboard.sort((a, b) => b.totalScore - a.totalScore);
  localStorage.setItem(LOCAL_MAIN_LEADERBOARD_KEY, JSON.stringify(leaderboard));
}
