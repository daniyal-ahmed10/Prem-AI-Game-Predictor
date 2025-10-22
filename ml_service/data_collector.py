import requests
import pandas as pd
from typing import List, Dict
from datetime import datetime, timedelta

class FootballDataCollector:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = "http://api.football-data.org/v4"
        self.headers = {"X-Auth-Token": api_key}

    def get_premier_league_matches(self, season: str) -> List[Dict]:
        """Fetch Premier League matches for a specific season"""
        url = f"{self.base_url}/competitions/PL/matches"
        params = {"season": season}
        response = requests.get(url, headers=self.headers, params=params)
        
        if response.status_code == 200:
            return response.json()["matches"]
        else:
            raise Exception(f"Failed to fetch matches: {response.status_code}")

    def get_team_stats(self, team_id: int) -> Dict:
        """Fetch team statistics"""
        url = f"{self.base_url}/teams/{team_id}"
        response = requests.get(url, headers=self.headers)
        
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Failed to fetch team stats: {response.status_code}")

    def prepare_match_features(self, matches: List[Dict]) -> pd.DataFrame:
        """Transform raw match data into features for ML model"""
        features = []
        
        for match in matches:
            if match["status"] == "FINISHED":
                feature = {
                    "match_id": match["id"],
                    "home_team_id": match["homeTeam"]["id"],
                    "away_team_id": match["awayTeam"]["id"],
                    "home_team_goals": match["score"]["fullTime"]["home"],
                    "away_team_goals": match["score"]["fullTime"]["away"],
                    "home_team_wins": 1 if match["score"]["winner"] == "HOME_TEAM" else 0,
                    "away_team_wins": 1 if match["score"]["winner"] == "AWAY_TEAM" else 0,
                    "draw": 1 if match["score"]["winner"] == "DRAW" else 0,
                    "date": match["utcDate"]
                }
                features.append(feature)
        
        return pd.DataFrame(features)

    def get_current_season_data(self) -> pd.DataFrame:
        """Get data for the current season"""
        current_year = datetime.now().year
        season = f"{current_year-1}/{current_year}"
        matches = self.get_premier_league_matches(season)
        return self.prepare_match_features(matches)