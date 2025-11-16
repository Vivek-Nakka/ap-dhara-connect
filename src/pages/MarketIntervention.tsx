import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShieldAlert, TrendingUp, Lightbulb, CheckCircle, Clock, AlertTriangle, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const districtRiskData = [
  { name: "Guntur", risk: "high", commodities: ["Tomato", "Onion"], forecast: "+22%" },
  { name: "Kurnool", risk: "high", commodities: ["Onion"], forecast: "+18%" },
  { name: "Krishna", risk: "medium", commodities: ["Potato"], forecast: "+12%" },
  { name: "Visakhapatnam", risk: "normal", commodities: [], forecast: "+2%" },
  { name: "Vijayawada", risk: "medium", commodities: ["Tomato"], forecast: "+8%" },
];

const interventions = [
  {
    id: 1,
    title: "Tomato Price Stabilization - Guntur",
    status: "In Progress",
    type: "Price Control",
    startDate: "Dec 1, 2024",
    targetDate: "Dec 15, 2024",
    progress: 65,
    impact: "High",
  },
  {
    id: 2,
    title: "Onion Import Program",
    status: "Planned",
    type: "Supply Augmentation",
    startDate: "Dec 10, 2024",
    targetDate: "Dec 31, 2024",
    progress: 0,
    impact: "Medium",
  },
  {
    id: 3,
    title: "Rice Distribution Scheme",
    status: "Completed",
    type: "Direct Distribution",
    startDate: "Nov 15, 2024",
    targetDate: "Nov 30, 2024",
    progress: 100,
    impact: "High",
  },
];

const riskAreas = [
  { district: "Guntur", commodity: "Tomato", riskLevel: "High", forecastIncrease: "+22%", days: 7 },
  { district: "Kurnool", commodity: "Onion", riskLevel: "High", forecastIncrease: "+18%", days: 5 },
  { district: "Krishna", commodity: "Potato", riskLevel: "Medium", forecastIncrease: "+12%", days: 10 },
];

const aiSuggestions = [
  {
    commodity: "Tomato",
    action: "Immediate import of 500 MT from Maharashtra",
    confidence: 87,
    rationale: "Price surge detected. Local supply deficit. Historical data shows similar patterns resolved by import.",
  },
  {
    commodity: "Onion",
    action: "Release 200 MT from buffer stock",
    confidence: 92,
    rationale: "Festival demand approaching. Buffer stock sufficient. Pre-emptive release recommended.",
  },
];

export default function MarketIntervention() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Market Intervention Overview</h1>
          <p className="text-muted-foreground">Risk monitoring and intervention management</p>
        </div>
        <Button onClick={() => navigate('/intervention-planner')}>
          <ShieldAlert className="mr-2 h-4 w-4" />
          Plan New Intervention
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Risk Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">5</div>
            <p className="text-xs text-muted-foreground mt-1">Districts requiring attention</p>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Interventions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
            <p className="text-xs text-muted-foreground mt-1">Currently in progress</p>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">7</div>
            <p className="text-xs text-muted-foreground mt-1">Successful interventions</p>
          </CardContent>
        </Card>
        <Card className="border-warning/30 bg-warning/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">2</div>
            <p className="text-xs text-muted-foreground mt-1">Pending review</p>
          </CardContent>
        </Card>
      </div>

      {/* District Risk Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            District Risk Map - Andhra Pradesh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {districtRiskData.map((district) => (
              <Card 
                key={district.name}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  district.risk === 'high' 
                    ? 'border-destructive/50 bg-destructive/5' 
                    : district.risk === 'medium'
                    ? 'border-warning/50 bg-warning/5'
                    : 'border-success/50 bg-success/5'
                }`}
                onClick={() => navigate('/forecast-insights')}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{district.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge 
                    variant={
                      district.risk === 'high' 
                        ? 'destructive' 
                        : district.risk === 'medium'
                        ? 'default'
                        : 'outline'
                    }
                    className="text-xs"
                  >
                    {district.risk.toUpperCase()}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    Forecast: {district.forecast}
                  </div>
                  {district.commodities.length > 0 && (
                    <div className="text-xs font-medium">
                      {district.commodities.join(", ")}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              High-Risk Commodities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {riskAreas.map((area, i) => (
              <div key={i} className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-lg">{area.commodity}</div>
                    <div className="text-sm text-muted-foreground">{area.district} District</div>
                  </div>
                  <Badge variant="destructive">{area.riskLevel} Risk</Badge>
                </div>
                <div className="flex items-center justify-between text-sm mt-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-destructive" />
                    <span className="font-medium text-destructive">{area.forecastIncrease}</span>
                    <span className="text-muted-foreground">in {area.days} days</span>
                  </div>
                  <Button size="sm" variant="destructive">
                    Escalate
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              AI-Suggested Interventions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiSuggestions.map((suggestion, i) => (
              <div key={i} className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-bold">{suggestion.commodity}</div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                    {suggestion.confidence}% Confidence
                  </Badge>
                </div>
                <div className="text-sm font-medium mb-2">{suggestion.action}</div>
                <div className="text-xs text-muted-foreground mb-3">{suggestion.rationale}</div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate('/intervention-planner')}
                  >
                    Accept
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate('/intervention-planner')}
                  >
                    Review
                  </Button>
                  <Button size="sm" variant="ghost">
                    Discard
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Interventions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {interventions.map((intervention) => (
            <div
              key={intervention.id}
              className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="font-bold text-lg mb-1">{intervention.title}</div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="outline">{intervention.type}</Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {intervention.startDate} - {intervention.targetDate}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    intervention.status === "In Progress"
                      ? "bg-primary/10 text-primary border-primary/30"
                      : intervention.status === "Completed"
                      ? "bg-success/10 text-success border-success/30"
                      : "bg-muted"
                  }
                >
                  {intervention.status === "Completed" && <CheckCircle className="mr-1 h-3 w-3" />}
                  {intervention.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{intervention.progress}%</span>
                </div>
                <Progress value={intervention.progress} className="h-2" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <Badge
                  variant="outline"
                  className={
                    intervention.impact === "High"
                      ? "bg-success/10 text-success border-success/30"
                      : "bg-warning/10 text-warning border-warning/30"
                  }
                >
                  {intervention.impact} Impact
                </Badge>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
