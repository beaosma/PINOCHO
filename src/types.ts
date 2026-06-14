export type TeamId = 'team1' | 'team2' | 'team3' | 'team4';

export interface Team {
  id: TeamId;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  unlockedKeys: {
    station1: boolean;
    station2: boolean;
    station3: boolean;
    station4: boolean;
  };
}

export interface Station {
  id: string;
  name: string;
  storyRelation: string;
  educationalObjective: string;
  materials: string[];
  steps: string[];
  secretWord: string;
  dilema: {
    question: string;
    options: {
      text: string;
      isCorrect: boolean; // Reflects the value/morality target for Pinocho (helpfulness, sincerity)
      feedback: string;
    }[];
  };
}

export interface GameState {
  currentView: 'home' | 'interactive' | 'print' | 'instructions';
  teams: Team[];
  selectedTeamId: TeamId;
  activeStationIndex: number;
}
