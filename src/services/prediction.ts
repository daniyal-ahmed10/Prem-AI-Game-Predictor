export interface MatchPrediction {
  home_win_probability: number;
  away_win_probability: number;
  draw_probability: number;
  predicted_home_goals: number;
  predicted_away_goals: number;
}

export interface TeamStats {
  id: number;
  name: string;
  form: number;
  avgGoalsScored: number;
  avgGoalsConceded: number;
}

export class PredictionService {
  private readonly API_BASE_URL = 'http://localhost:8000';

  async getPrediction(homeTeamId: number, awayTeamId: number, date: string): Promise<MatchPrediction> {
    const response = await fetch(`${this.API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        home_team_id: homeTeamId,
        away_team_id: awayTeamId,
        date,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get prediction');
    }

    return response.json();
  }

  async getUpcomingPredictions(): Promise<{
    match_id: string;
    home_team: string;
    away_team: string;
    date: string;
    prediction: MatchPrediction;
  }[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/predictions/upcoming`);
      
      if (!response.ok) {
        throw new Error('API not available');
      }

      return response.json();
    } catch (error) {
      // Return mock data if the API is not available
      return [
        {
          match_id: '1',
          home_team: 'Manchester City',
          away_team: 'Arsenal',
          date: new Date().toISOString(),
          prediction: {
            home_win_probability: 0.45,
            draw_probability: 0.25,
            away_win_probability: 0.30,
            predicted_home_goals: 2,
            predicted_away_goals: 1
          }
        },
        {
          match_id: '2',
          home_team: 'Liverpool',
          away_team: 'Chelsea',
          date: new Date().toISOString(),
          prediction: {
            home_win_probability: 0.55,
            draw_probability: 0.25,
            away_win_probability: 0.20,
            predicted_home_goals: 3,
            predicted_away_goals: 1
          }
        }
      ];
    }
  }

  async trainModel(): Promise<void> {
    const response = await fetch(`${this.API_BASE_URL}/train`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to train model');
    }
  }

  // Placeholder for future Supabase integration
  async cachePrediction(matchId: string, prediction: MatchPrediction): Promise<void> {
    console.log('Caching prediction:', matchId, prediction);
  }

  async getCachedPrediction(matchId: string): Promise<MatchPrediction | null> {
    return null;
  }
}