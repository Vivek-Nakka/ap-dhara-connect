import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const alerts = [
  { time: "10:45 AM", message: "Tomato +44% spike detected", location: "Guntur District", severity: "high" as const },
  { time: "10:30 AM", message: "Onion +18% deviation", location: "Kurnool District", severity: "high" as const },
  { time: "09:30 AM", message: "Potato +15% threshold breach", location: "Anantapur District", severity: "medium" as const },
  { time: "09:15 AM", message: "Rice -12% price drop", location: "Krishna District", severity: "medium" as const },
  { time: "08:45 AM", message: "3 centers pending submission", location: "Nellore District", severity: "low" as const },
];

export function AlertsFeed() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <CardTitle className="text-lg">Real-Time Alerts</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">Threshold breaches & critical updates</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {alerts.map((alert, idx) => {
            const changeMatch = alert.message.match(/[+-]?\d+(\.\d+)?%/);
            const changePercent = changeMatch ? parseFloat(changeMatch[0]) : 0;
            const absChange = Math.abs(changePercent);
            const thresholdType = absChange >= 30 ? "MTP" : absChange >= 15 ? "Warning" : null;
            
            return (
              <div
                key={idx}
                className={cn(
                  "p-2.5 rounded-md hover:bg-accent/50 transition-colors cursor-pointer border-l-2",
                  alert.severity === "high" && "border-l-destructive bg-destructive/5",
                  alert.severity === "medium" && "border-l-warning bg-warning/5",
                  alert.severity === "low" && "border-l-primary bg-primary/5"
                )}
                onClick={() => navigate('/validation-queue')}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-xs font-medium line-clamp-1">{alert.message}</p>
                      {thresholdType && (
                        <Badge 
                          variant={thresholdType === "MTP" ? "destructive" : "outline"}
                          className={cn(
                            "text-xs px-1.5 py-0 h-4",
                            thresholdType === "Warning" && "border-warning text-warning"
                          )}
                        >
                          {thresholdType}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.location}</p>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "high"
                        ? "destructive"
                        : alert.severity === "medium"
                        ? "outline"
                        : "default"
                    }
                    className="text-xs shrink-0"
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
