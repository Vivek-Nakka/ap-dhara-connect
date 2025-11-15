import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info, Clock } from "lucide-react";

const alerts = [
  {
    time: "10:45 AM",
    message: "Tomato prices in Guntur exceeded 15% threshold",
    severity: "high" as const,
    category: "Price Spike",
  },
  {
    time: "10:30 AM",
    message: "Onion deviation detected in Kurnool - Requires validation",
    severity: "high" as const,
    category: "Validation Required",
  },
  {
    time: "09:30 AM",
    message: "3 centers in Nellore district pending submission",
    severity: "medium" as const,
    category: "Submission Alert",
  },
  {
    time: "09:15 AM",
    message: "Rice prices stable across 11 districts",
    severity: "low" as const,
    category: "Market Update",
  },
  {
    time: "08:45 AM",
    message: "Data quality check completed - 96.8% compliance",
    severity: "low" as const,
    category: "System",
  },
  {
    time: "08:15 AM",
    message: "Weekly summary report generation completed",
    severity: "low" as const,
    category: "Report",
  },
];

export function AlertsFeed() {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      case "medium":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getSeverityVariant = (severity: string): "destructive" | "default" | "secondary" => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-destructive/50 bg-destructive/5";
      case "medium":
        return "border-warning/50 bg-warning/5";
      default:
        return "border-border bg-muted/20";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recent Alerts
          </span>
          <Badge variant="outline" className="text-xs">
            {alerts.filter((a) => a.severity === "high").length} Critical
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
        {alerts.map((alert, index) => (
          <Alert key={index} className={`${getSeverityColor(alert.severity)} transition-colors`}>
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 ${alert.severity === "high" ? "text-destructive" : alert.severity === "medium" ? "text-warning" : "text-muted-foreground"}`}>
                {getSeverityIcon(alert.severity)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={getSeverityVariant(alert.severity)} className="text-xs">
                    {alert.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </span>
                </div>
                <AlertDescription className="text-sm">
                  {alert.message}
                </AlertDescription>
              </div>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
}
