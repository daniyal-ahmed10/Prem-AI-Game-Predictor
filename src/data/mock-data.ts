export const mockPredictions = [
  {
    id: 1,
    homeTeam: "Manchester City",
    awayTeam: "Arsenal",
    homeWinProb: 45,
    drawProb: 25,
    awayWinProb: 30,
    predictedScore: "2 - 1",
    confidence: "high" as const,
    matchDate: "March 15, 2024"
  },
  {
    id: 2,
    homeTeam: "Liverpool",
    awayTeam: "Chelsea",
    homeWinProb: 55,
    drawProb: 25,
    awayWinProb: 20,
    predictedScore: "3 - 1",
    confidence: "medium" as const,
    matchDate: "March 16, 2024"
  },
  {
    id: 3,
    homeTeam: "Manchester United",
    awayTeam: "Tottenham",
    homeWinProb: 35,
    drawProb: 30,
    awayWinProb: 35,
    predictedScore: "1 - 1",
    confidence: "low" as const,
    matchDate: "March 17, 2024"
  },
  {
    id: 4,
    homeTeam: "Newcastle United",
    awayTeam: "Brighton",
    homeWinProb: 50,
    drawProb: 30,
    awayWinProb: 20,
    predictedScore: "2 - 0",
    confidence: "high" as const,
    matchDate: "March 18, 2024"
  }
];

export const mockLeagueStandings = [
  {
    position: 1,
    team: "Manchester City",
    played: 28,
    wins: 22,
    draws: 4,
    losses: 2,
    goalsFor: 68,
    goalsAgainst: 22,
    goalDifference: 46,
    points: 70,
    form: ["W", "W", "D", "W", "W"]
  },
  {
    position: 2,
    team: "Arsenal",
    played: 28,
    wins: 20,
    draws: 5,
    losses: 3,
    goalsFor: 62,
    goalsAgainst: 25,
    goalDifference: 37,
    points: 65,
    form: ["W", "L", "W", "W", "D"]
  },
  {
    position: 3,
    team: "Liverpool",
    played: 28,
    wins: 19,
    draws: 7,
    losses: 2,
    goalsFor: 58,
    goalsAgainst: 28,
    goalDifference: 30,
    points: 64,
    form: ["W", "W", "W", "D", "W"]
  },
  {
    position: 4,
    team: "Newcastle United",
    played: 28,
    wins: 16,
    draws: 8,
    losses: 4,
    goalsFor: 52,
    goalsAgainst: 32,
    goalDifference: 20,
    points: 56,
    form: ["D", "W", "W", "L", "W"]
  },
  {
    position: 5,
    team: "Manchester United",
    played: 28,
    wins: 15,
    draws: 7,
    losses: 6,
    goalsFor: 48,
    goalsAgainst: 38,
    goalDifference: 10,
    points: 52,
    form: ["L", "D", "W", "W", "D"]
  },
  {
    position: 6,
    team: "Tottenham Hotspur",
    played: 28,
    wins: 14,
    draws: 8,
    losses: 6,
    goalsFor: 55,
    goalsAgainst: 40,
    goalDifference: 15,
    points: 50,
    form: ["W", "L", "D", "W", "L"]
  },
  {
    position: 7,
    team: "Brighton & Hove Albion",
    played: 28,
    wins: 13,
    draws: 8,
    losses: 7,
    goalsFor: 45,
    goalsAgainst: 38,
    goalDifference: 7,
    points: 47,
    form: ["D", "W", "L", "D", "W"]
  },
  {
    position: 8,
    team: "Chelsea",
    played: 28,
    wins: 12,
    draws: 9,
    losses: 7,
    goalsFor: 42,
    goalsAgainst: 35,
    goalDifference: 7,
    points: 45,
    form: ["L", "W", "D", "L", "D"]
  },
  {
    position: 9,
    team: "Aston Villa",
    played: 28,
    wins: 12,
    draws: 6,
    losses: 10,
    goalsFor: 40,
    goalsAgainst: 42,
    goalDifference: -2,
    points: 42,
    form: ["W", "L", "L", "W", "D"]
  },
  {
    position: 10,
    team: "West Ham United",
    played: 28,
    wins: 11,
    draws: 8,
    losses: 9,
    goalsFor: 38,
    goalsAgainst: 45,
    goalDifference: -7,
    points: 41,
    form: ["D", "L", "W", "D", "L"]
  }
];

export const mockTeamStats = {
  "Manchester City": {
    avgGoalsScored: 2.4,
    avgGoalsConceded: 0.8,
    homeWinRate: 85,
    awayWinRate: 75,
    possession: 68,
    passAccuracy: 89
  },
  "Arsenal": {
    avgGoalsScored: 2.2,
    avgGoalsConceded: 0.9,
    homeWinRate: 80,
    awayWinRate: 65,
    possession: 61,
    passAccuracy: 87
  },
  "Liverpool": {
    avgGoalsScored: 2.1,
    avgGoalsConceded: 1.0,
    homeWinRate: 75,
    awayWinRate: 70,
    possession: 63,
    passAccuracy: 85
  }
};