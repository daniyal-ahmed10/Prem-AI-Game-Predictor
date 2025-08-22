import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PredictionCardProps {
  homeTeam: string;
  awayTeam: string;
  homeWinProb: number;
  drawProb: number;
  awayWinProb: number;
  predictedScore: string;
  confidence: "high" | "medium" | "low";
  matchDate: string;
}

export function PredictionCard({
  homeTeam,
  awayTeam,
  homeWinProb,
  drawProb,
  awayWinProb,
  predictedScore,
  confidence,
  matchDate
}: PredictionCardProps) {
  const getConfidenceColor = (conf: string) => {
    switch (conf) {
      case "high": return "bg-win";
      case "medium": return "bg-draw";
      case "low": return "bg-loss";
      default: return "bg-muted";
    }
  };

  const maxProb = Math.max(homeWinProb, drawProb, awayWinProb);

  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-elegant transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{homeTeam} vs {awayTeam}</CardTitle>
          <Badge className={cn("text-xs", getConfidenceColor(confidence))}>
            {confidence.toUpperCase()} CONFIDENCE
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{matchDate}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Predicted Score */}
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {predictedScore}
            </div>
            <p className="text-xs text-muted-foreground">Predicted Score</p>
          </div>

          {/* Probabilities */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={cn("p-2 rounded-lg border", homeWinProb === maxProb ? "bg-win/20 border-win" : "bg-muted/20")}>
              <div className="font-semibold">{homeWinProb}%</div>
              <div className="text-xs text-muted-foreground">Win</div>
            </div>
            <div className={cn("p-2 rounded-lg border", drawProb === maxProb ? "bg-draw/20 border-draw" : "bg-muted/20")}>
              <div className="font-semibold">{drawProb}%</div>
              <div className="text-xs text-muted-foreground">Draw</div>
            </div>
            <div className={cn("p-2 rounded-lg border", awayWinProb === maxProb ? "bg-win/20 border-win" : "bg-muted/20")}>
              <div className="font-semibold">{awayWinProb}%</div>
              <div className="text-xs text-muted-foreground">Win</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}