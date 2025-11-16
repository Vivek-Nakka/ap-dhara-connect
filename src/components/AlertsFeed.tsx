import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, Info, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Real-Time Alerts</CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/validation-queue')}
          >
            View All
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
        {alerts.slice(0, 4).map((alert, index) => (
          <Alert 
            key={index} 
            className={`${getSeverityColor(alert.severity)} transition-colors cursor-pointer hover:shadow-sm`}
            onClick={() => navigate('/validation-queue')}
          >
            <div className="flex items-start gap-2">
              <div className={`mt-0.5 ${alert.severity === "high" ? "text-destructive" : alert.severity === "medium" ? "text-warning" : "text-muted-foreground"}`}>
                {getSeverityIcon(alert.severity)}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={getSeverityVariant(alert.severity)} className="text-xs">
                    {alert.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </span>
                </div>
                <AlertDescription className="text-xs line-clamp-2">
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
