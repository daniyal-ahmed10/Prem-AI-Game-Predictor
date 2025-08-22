import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  progress?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, subtitle, progress, trend, icon }: StatsCardProps) {
  const getTrendColor = (trendType?: string) => {
    switch (trendType) {
      case "up": return "text-win";
      case "down": return "text-loss";
      default: return "text-foreground";
    }
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-elegant transition-smooth">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${getTrendColor(trend)}`}>
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
        {progress !== undefined && (
          <div className="mt-2">
            <Progress 
              value={progress} 
              className="h-2" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              {progress}% accuracy
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}