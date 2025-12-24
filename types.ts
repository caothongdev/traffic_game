
export enum View {
  MENU = 'menu',
  GAME = 'game',
  CHALLENGE = 'challenge',
  MULTIPLAYER = 'multiplayer',
  LEADERBOARD = 'leaderboard'
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface Player {
  id: number;
  name: string;
  score: number;
  badges: string[];
}
