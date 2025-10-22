export interface Prediction {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeWinProb: number;
  drawProb: number;
  awayWinProb: number;
  predictedScore: string;
  confidence: 'high' | 'medium' | 'low';
  matchDate: string;
}

export interface LeagueStanding {
  position: number;
  teamName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
  predictedPosition: number;
  predictedPoints: number;
}

export interface TeamStats {
  id: number;
  name: string;
  form: number;
  avgGoalsScored: number;
  avgGoalsConceded: number;
}