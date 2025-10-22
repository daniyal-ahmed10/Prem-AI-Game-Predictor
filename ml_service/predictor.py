import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
from typing import Dict, List, Tuple
from datetime import datetime

class MatchPredictor:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        
    def prepare_features(self, data: pd.DataFrame) -> Tuple[np.ndarray, np.ndarray]:
        """Prepare features for training/prediction"""
        # Calculate rolling averages and form
        features = []
        labels = []
        
        for team_id in data["home_team_id"].unique():
            team_matches = data[(data["home_team_id"] == team_id) | (data["away_team_id"] == team_id)]
            team_matches = team_matches.sort_values("date")
            
            for idx, match in team_matches.iterrows():
                prev_matches = team_matches[team_matches["date"] < match["date"]].tail(5)
                
                if len(prev_matches) >= 3:  # Require at least 3 previous matches
                    # Calculate features
                    goals_scored = []
                    goals_conceded = []
                    wins = 0
                    
                    for _, prev_match in prev_matches.iterrows():
                        if prev_match["home_team_id"] == team_id:
                            goals_scored.append(prev_match["home_team_goals"])
                            goals_conceded.append(prev_match["away_team_goals"])
                            wins += prev_match["home_team_wins"]
                        else:
                            goals_scored.append(prev_match["away_team_goals"])
                            goals_conceded.append(prev_match["home_team_goals"])
                            wins += prev_match["away_team_wins"]
                    
                    feature = {
                        "avg_goals_scored": np.mean(goals_scored),
                        "avg_goals_conceded": np.mean(goals_conceded),
                        "form": wins / len(prev_matches),
                        "is_home": 1 if match["home_team_id"] == team_id else 0
                    }
                    
                    features.append(feature)
                    
                    # Prepare label
                    if match["home_team_id"] == team_id:
                        labels.append(match["home_team_wins"])
                    else:
                        labels.append(match["away_team_wins"])
        
        X = pd.DataFrame(features)
        y = np.array(labels)
        
        return X, y
    
    def train(self, data: pd.DataFrame):
        """Train the model on historical match data"""
        X, y = self.prepare_features(data)
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled, y)
    
    def predict_match(self, home_team_data: Dict, away_team_data: Dict) -> Dict:
        """Predict the outcome of a match"""
        # Prepare features for both teams
        home_features = pd.DataFrame([{
            "avg_goals_scored": home_team_data["avg_goals_scored"],
            "avg_goals_conceded": home_team_data["avg_goals_conceded"],
            "form": home_team_data["form"],
            "is_home": 1
        }])
        
        away_features = pd.DataFrame([{
            "avg_goals_scored": away_team_data["avg_goals_scored"],
            "avg_goals_conceded": away_team_data["avg_goals_conceded"],
            "form": away_team_data["form"],
            "is_home": 0
        }])
        
        # Scale features
        home_scaled = self.scaler.transform(home_features)
        away_scaled = self.scaler.transform(away_features)
        
        # Get win probabilities
        home_win_prob = self.model.predict_proba(home_scaled)[0][1]
        away_win_prob = self.model.predict_proba(away_scaled)[0][1]
        draw_prob = 1 - (home_win_prob + away_win_prob)
        
        # Predict scores based on average goals
        predicted_home_goals = round(home_team_data["avg_goals_scored"] * 0.6 + 
                                   away_team_data["avg_goals_conceded"] * 0.4)
        predicted_away_goals = round(away_team_data["avg_goals_scored"] * 0.6 + 
                                   home_team_data["avg_goals_conceded"] * 0.4)
        
        return {
            "home_win_probability": float(home_win_prob),
            "away_win_probability": float(away_win_prob),
            "draw_probability": float(draw_prob),
            "predicted_home_goals": int(predicted_home_goals),
            "predicted_away_goals": int(predicted_away_goals)
        }
    
    def save_model(self, path: str):
        """Save the trained model and scaler"""
        joblib.dump({
            "model": self.model,
            "scaler": self.scaler
        }, path)
    
    def load_model(self, path: str):
        """Load a trained model and scaler"""
        saved_model = joblib.load(path)
        self.model = saved_model["model"]
        self.scaler = saved_model["scaler"]