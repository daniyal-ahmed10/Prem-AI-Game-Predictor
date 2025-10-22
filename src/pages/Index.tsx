import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PredictionCard } from "@/components/ui/prediction-card";
import { LeagueTable } from "@/components/ui/league-table";
import { StatsCard } from "@/components/ui/stats-card";
import { Target, TrendingUp, Calculator, BarChart3 } from "lucide-react";
import { Prediction, LeagueStanding } from "@/types/prediction";
import { UpcomingMatch } from "@/types/api";
import { mockLeagueStandings } from "@/data/mock-data";
import { PredictionService } from "@/services/prediction";

const predictionService = new PredictionService();

const Index = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPredictions = useCallback(async () => {
    try {
      setIsLoading(true);
      const upcomingPredictions = await predictionService.getUpcomingPredictions();
      
      // Transform the predictions into our frontend format
      const formattedPredictions: Prediction[] = upcomingPredictions.map((p: UpcomingMatch) => ({
        id: p.match_id,
        homeTeam: p.home_team,
        awayTeam: p.away_team,
        homeWinProb: Math.round(p.prediction.home_win_probability * 100),
        drawProb: Math.round(p.prediction.draw_probability * 100),
        awayWinProb: Math.round(p.prediction.away_win_probability * 100),
        predictedScore: `${p.prediction.predicted_home_goals} - ${p.prediction.predicted_away_goals}`,
        confidence: getConfidence(p.prediction),
        matchDate: new Date(p.date).toLocaleDateString(),
      }));

      setPredictions(formattedPredictions);
      setError(null);
    } catch (err) {
      setError("Failed to load predictions. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPredictions();
  }, [loadPredictions]);

  const getConfidence = (prediction: UpcomingMatch["prediction"]) => {
    const maxProb = Math.max(
      prediction.home_win_probability,
      prediction.away_win_probability,
      prediction.draw_probability
    );
    
    if (maxProb > 0.6) return "high";
    if (maxProb > 0.4) return "medium";
    return "low";
  };

  const handleRefreshPredictions = async () => {
    try {
      setIsLoading(true);
      await predictionService.trainModel();
      await loadPredictions();
    } catch (err) {
      setError("Failed to refresh predictions. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
              AI-Powered Predictions
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Premier League<br />Outcome Predictor
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Advanced machine learning algorithms analyze historical data, team form, and player statistics to predict match outcomes and final league standings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary-glow transition-smooth shadow-glow">
                View Predictions
              </Button>
              <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <StatsCard
            title="Prediction Accuracy"
            value="87.3%"
            subtitle="Last 100 matches"
            progress={87}
            trend="up"
            icon={<Target className="h-4 w-4" />}
          />
          <StatsCard
            title="Matches Analyzed"
            value="15,847"
            subtitle="Historical data points"
            trend="up"
            icon={<BarChart3 className="h-4 w-4" />}
          />
          <StatsCard
            title="Active Models"
            value="3"
            subtitle="XGBoost, Random Forest, Neural Net"
            icon={<Calculator className="h-4 w-4" />}
          />
          <StatsCard
            title="Win Rate"
            value="73.2%"
            subtitle="Profitable betting suggestions"
            trend="up"
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>
      </section>

      {/* Latest Predictions */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Latest Match Predictions</h2>
          <p className="text-muted-foreground">
            AI-powered predictions for upcoming Premier League fixtures
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {predictions.map((prediction) => (
            <PredictionCard key={prediction.id} {...prediction} />
          ))}
        </div>
      </section>

      {/* Predicted League Table */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Predicted Final Standings</h2>
          <p className="text-muted-foreground">
            Simulated end-of-season table based on current form and remaining fixtures
          </p>
        </div>
        <LeagueTable standings={mockLeagueStandings} />
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Our AI Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our advanced machine learning models analyze multiple data sources to provide accurate predictions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Data Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Historical match data, player statistics, team form, and performance metrics are processed through advanced algorithms.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                ML Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Multiple machine learning models including XGBoost, Random Forest, and Neural Networks ensure robust predictions.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Real-time match outcome probabilities and season simulations with confidence intervals and accuracy metrics.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 container mx-auto px-4">
        <div className="text-center text-muted-foreground">
          <p>© 2024 Premier League Predictor. AI-powered football analytics.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;