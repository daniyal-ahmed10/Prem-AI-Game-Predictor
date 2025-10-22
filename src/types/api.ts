export interface UpcomingMatch {
  match_id: string;
  home_team: string;
  away_team: string;
  date: string;
  prediction: {
    home_win_probability: number;
    away_win_probability: number;
    draw_probability: number;
    predicted_home_goals: number;
    predicted_away_goals: number;
  };
}