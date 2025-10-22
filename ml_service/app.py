from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict
import os
from dotenv import load_dotenv
from data_collector import FootballDataCollector
from predictor import MatchPredictor

load_dotenv()

app = FastAPI()
collector = FootballDataCollector(api_key=os.getenv("FOOTBALL_DATA_API_KEY"))
predictor = MatchPredictor()

class MatchPredictionRequest(BaseModel):
    home_team_id: int
    away_team_id: int
    date: str

class MatchPredictionResponse(BaseModel):
    home_win_probability: float
    away_win_probability: float
    draw_probability: float
    predicted_home_goals: int
    predicted_away_goals: int

@app.post("/train")
async def train_model():
    try:
        # Get historical data and train the model
        data = collector.get_current_season_data()
        predictor.train(data)
        predictor.save_model("model.joblib")
        return {"message": "Model trained successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict", response_model=MatchPredictionResponse)
async def predict_match(request: MatchPredictionRequest):
    try:
        # Load the model if not already loaded
        if not os.path.exists("model.joblib"):
            raise HTTPException(status_code=400, detail="Model not trained yet")
        
        predictor.load_model("model.joblib")
        
        # Get team stats
        home_team = collector.get_team_stats(request.home_team_id)
        away_team = collector.get_team_stats(request.away_team_id)
        
        # Make prediction
        prediction = predictor.predict_match(
            home_team_data={
                "avg_goals_scored": home_team["stats"]["goalsScored"] / home_team["stats"]["matches"],
                "avg_goals_conceded": home_team["stats"]["goalsConceded"] / home_team["stats"]["matches"],
                "form": home_team["stats"]["wins"] / home_team["stats"]["matches"]
            },
            away_team_data={
                "avg_goals_scored": away_team["stats"]["goalsScored"] / away_team["stats"]["matches"],
                "avg_goals_conceded": away_team["stats"]["goalsConceded"] / away_team["stats"]["matches"],
                "form": away_team["stats"]["wins"] / away_team["stats"]["matches"]
            }
        )
        
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/predictions/upcoming")
async def get_upcoming_predictions():
    try:
        # Get upcoming matches
        current_data = collector.get_current_season_data()
        upcoming_matches = current_data[current_data["status"] == "SCHEDULED"]
        
        predictions = []
        for _, match in upcoming_matches.iterrows():
            prediction = await predict_match(MatchPredictionRequest(
                home_team_id=match["home_team_id"],
                away_team_id=match["away_team_id"],
                date=match["date"]
            ))
            predictions.append({
                "match_id": match["id"],
                "prediction": prediction
            })
        
        return predictions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))