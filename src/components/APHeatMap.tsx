import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DistrictData {
  name: string;
  centerCount: number;
  submitted: number;
  total: number;
  deviations: number;
  riskLevel: "normal" | "moderate" | "high";
  position: { x: string; y: string }; // Position on map (percentage)
}

const districtData: DistrictData[] = [
  { name: "Visakhapatnam", centerCount: 8, submitted: 7, total: 8, deviations: 0, riskLevel: "normal", position: { x: "75%", y: "20%" } },
  { name: "Vizianagaram", centerCount: 6, submitted: 5, total: 6, deviations: 1, riskLevel: "moderate", position: { x: "70%", y: "15%" } },
  { name: "Srikakulam", centerCount: 5, submitted: 5, total: 5, deviations: 0, riskLevel: "normal", position: { x: "65%", y: "10%" } },
  { name: "East Godavari", centerCount: 7, submitted: 6, total: 7, deviations: 2, riskLevel: "moderate", position: { x: "65%", y: "30%" } },
  { name: "West Godavari", centerCount: 6, submitted: 5, total: 6, deviations: 0, riskLevel: "normal", position: { x: "55%", y: "35%" } },
  { name: "Krishna", centerCount: 7, submitted: 7, total: 7, deviations: 1, riskLevel: "normal", position: { x: "50%", y: "45%" } },
  { name: "Guntur", centerCount: 9, submitted: 8, total: 9, deviations: 5, riskLevel: "high", position: { x: "45%", y: "50%" } },
  { name: "Prakasam", centerCount: 5, submitted: 4, total: 5, deviations: 2, riskLevel: "moderate", position: { x: "40%", y: "60%" } },
  { name: "Nellore", centerCount: 6, submitted: 4, total: 6, deviations: 3, riskLevel: "high", position: { x: "45%", y: "70%" } },
  { name: "Chittoor", centerCount: 7, submitted: 6, total: 7, deviations: 1, riskLevel: "moderate", position: { x: "35%", y: "80%" } },
  { name: "Kadapa", centerCount: 5, submitted: 5, total: 5, deviations: 0, riskLevel: "normal", position: { x: "30%", y: "70%" } },
  { name: "Anantapur", centerCount: 8, submitted: 7, total: 8, deviations: 2, riskLevel: "moderate", position: { x: "20%", y: "60%" } },
  { name: "Kurnool", centerCount: 7, submitted: 6, total: 7, deviations: 4, riskLevel: "high", position: { x: "25%", y: "50%" } },
];

export function APHeatMap() {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      case "moderate":
        return "bg-warning text-warning-foreground hover:bg-warning/90";
      default:
        return "bg-success text-success-foreground hover:bg-success/90";
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "high":
        return <Badge variant="destructive" className="text-xs">High Risk</Badge>;
      case "moderate":
        return <Badge className="bg-warning text-warning-foreground text-xs">Moderate</Badge>;
      default:
        return <Badge className="bg-success text-success-foreground text-xs">Normal</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Andhra Pradesh Price Deviation Heat Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[500px] bg-muted/20 rounded-lg border border-border overflow-hidden">
          {/* AP State Outline Background */}
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/10 text-6xl font-bold">
            ANDHRA PRADESH
          </div>

          {/* District Markers */}
          {districtData.map((district) => {
            const completeness = ((district.submitted / district.total) * 100).toFixed(1);
            const topCommodities = district.riskLevel === "high" 
              ? ["Tomato", "Onion"] 
              : district.riskLevel === "moderate" 
              ? ["Potato"] 
              : [];
            
            return (
              <div
                key={district.name}
                className="absolute group cursor-pointer"
                style={{
                  left: district.position.x,
                  top: district.position.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-110",
                    getRiskColor(district.riskLevel),
                    "shadow-lg border-2 border-background"
                  )}
                >
                  {district.deviations === 0 ? "✓" : district.deviations}
                </div>

                {/* Enhanced Hover Tooltip */}
                <div className="absolute left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <Card className="w-64 shadow-xl border-2">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">{district.name}</h4>
                        {getRiskBadge(district.riskLevel)}
                      </div>
                      <div className="text-xs space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Centers:</span>
                          <span className="font-medium">{district.centerCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Completeness:</span>
                          <span className="font-medium">{completeness}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Submission:</span>
                          <span className="font-medium">{district.submitted}/{district.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Deviations:</span>
                          <span className="font-medium text-warning">{district.deviations}</span>
                        </div>
                        {topCommodities.length > 0 && (
                          <div className="pt-1 border-t border-border">
                            <span className="text-muted-foreground">Flagged Commodities:</span>
                            <div className="flex gap-1 mt-1 flex-wrap">
                              {topCommodities.map(comm => (
                                <Badge key={comm} variant="destructive" className="text-xs px-1.5 py-0">
                                  {comm}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-success"></div>
            <span className="text-muted-foreground">Normal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-warning"></div>
            <span className="text-muted-foreground">Moderate Deviation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-destructive"></div>
            <span className="text-muted-foreground">High Deviation</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
