import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DistrictData {
  name: string;
  centers: number;
  submitted: number;
  missing: number;
  deviations: number;
  riskLevel: "normal" | "moderate" | "high";
  position: { x: number; y: number }; // Position on map (percentage)
}

const districtData: DistrictData[] = [
  { name: "Visakhapatnam", centers: 8, submitted: 7, missing: 1, deviations: 0, riskLevel: "normal", position: { x: 75, y: 20 } },
  { name: "Vizianagaram", centers: 6, submitted: 5, missing: 1, deviations: 1, riskLevel: "moderate", position: { x: 70, y: 15 } },
  { name: "Srikakulam", centers: 5, submitted: 5, missing: 0, deviations: 0, riskLevel: "normal", position: { x: 65, y: 10 } },
  { name: "East Godavari", centers: 7, submitted: 6, missing: 1, deviations: 2, riskLevel: "moderate", position: { x: 65, y: 30 } },
  { name: "West Godavari", centers: 6, submitted: 5, missing: 1, deviations: 0, riskLevel: "normal", position: { x: 55, y: 35 } },
  { name: "Krishna", centers: 7, submitted: 7, missing: 0, deviations: 1, riskLevel: "normal", position: { x: 50, y: 45 } },
  { name: "Guntur", centers: 9, submitted: 8, missing: 1, deviations: 5, riskLevel: "high", position: { x: 45, y: 50 } },
  { name: "Prakasam", centers: 5, submitted: 4, missing: 1, deviations: 2, riskLevel: "moderate", position: { x: 40, y: 60 } },
  { name: "Nellore", centers: 6, submitted: 4, missing: 2, deviations: 3, riskLevel: "high", position: { x: 45, y: 70 } },
  { name: "Chittoor", centers: 7, submitted: 6, missing: 1, deviations: 1, riskLevel: "moderate", position: { x: 35, y: 80 } },
  { name: "Kadapa", centers: 5, submitted: 5, missing: 0, deviations: 0, riskLevel: "normal", position: { x: 30, y: 70 } },
  { name: "Anantapur", centers: 8, submitted: 7, missing: 1, deviations: 2, riskLevel: "moderate", position: { x: 20, y: 60 } },
  { name: "Kurnool", centers: 7, submitted: 6, missing: 1, deviations: 4, riskLevel: "high", position: { x: 25, y: 50 } },
];

export function APHeatMap() {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-destructive hover:bg-destructive/90";
      case "moderate":
        return "bg-warning hover:bg-warning/90";
      default:
        return "bg-success hover:bg-success/90";
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
          {districtData.map((district) => (
            <div
              key={district.name}
              className="absolute group cursor-pointer"
              style={{
                left: `${district.position.x}%`,
                top: `${district.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* District Dot */}
              <div
                className={`w-8 h-8 rounded-full ${getRiskColor(district.riskLevel)} flex items-center justify-center text-white text-xs font-bold shadow-lg transition-all group-hover:scale-125`}
              >
                {district.deviations || "✓"}
              </div>

              {/* Hover Card */}
              <div className="absolute left-1/2 -translate-x-1/2 top-10 w-64 bg-card border border-border rounded-lg shadow-xl p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">{district.name}</h4>
                    {getRiskBadge(district.riskLevel)}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Total Centers:</span>
                      <span className="font-medium text-foreground">{district.centers}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Submitted:</span>
                      <span className="font-medium text-success">{district.submitted}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Missing:</span>
                      <span className="font-medium text-warning">{district.missing}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Deviations:</span>
                      <span className="font-medium text-destructive">{district.deviations}</span>
                    </div>
                  </div>
                  {district.deviations > 0 && (
                    <div className="pt-2 mt-2 border-t border-border text-xs text-muted-foreground">
                      Key commodities: Tomato, Onion, Rice
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
