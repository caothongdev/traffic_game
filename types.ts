
export enum View {
  MENU = 'menu',
  GAME = 'game',
  CHALLENGE = 'challenge',
  MULTIPLAYER = 'multiplayer'
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
