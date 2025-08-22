import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TeamStanding {
  position: number;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
}

interface LeagueTableProps {
  standings: TeamStanding[];
  title?: string;
}

export function LeagueTable({ standings, title = "Premier League Predictions" }: LeagueTableProps) {
  const getPositionColor = (position: number) => {
    if (position <= 4) return "text-win"; // Champions League
    if (position <= 6) return "text-draw"; // Europa League
    if (position >= 18) return "text-loss"; // Relegation
    return "text-foreground";
  };

  const getFormBadgeColor = (result: string) => {
    switch (result) {
      case "W": return "bg-win text-white";
      case "D": return "bg-draw text-white";
      case "L": return "bg-loss text-white";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="w-12">Pos</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">P</TableHead>
              <TableHead className="text-center">W</TableHead>
              <TableHead className="text-center">D</TableHead>
              <TableHead className="text-center">L</TableHead>
              <TableHead className="text-center">GF</TableHead>
              <TableHead className="text-center">GA</TableHead>
              <TableHead className="text-center">GD</TableHead>
              <TableHead className="text-center">Pts</TableHead>
              <TableHead>Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standings.map((team) => (
              <TableRow key={team.position} className="border-border hover:bg-muted/20">
                <TableCell className={cn("font-medium", getPositionColor(team.position))}>
                  {team.position}
                </TableCell>
                <TableCell className="font-medium">{team.team}</TableCell>
                <TableCell className="text-center">{team.played}</TableCell>
                <TableCell className="text-center">{team.wins}</TableCell>
                <TableCell className="text-center">{team.draws}</TableCell>
                <TableCell className="text-center">{team.losses}</TableCell>
                <TableCell className="text-center">{team.goalsFor}</TableCell>
                <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                <TableCell className="text-center font-medium">
                  {team.goalDifference > 0 ? "+" : ""}{team.goalDifference}
                </TableCell>
                <TableCell className="text-center font-bold">{team.points}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {team.form.map((result, index) => (
                      <Badge
                        key={index}
                        className={cn("w-6 h-6 p-0 text-xs flex items-center justify-center", getFormBadgeColor(result))}
                      >
                        {result}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}