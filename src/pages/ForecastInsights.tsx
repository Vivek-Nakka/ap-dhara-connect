import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Upload, CheckCircle, TrendingUp, BarChart3 } from "lucide-react";
import {
  LineChart as RechartsLine,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const forecastData = [
  { date: "Dec 8", actual: 47, predicted: 48, lower: 45, upper: 51 },
  { date: "Dec 9", actual: 48, predicted: 49, lower: 46, upper: 52 },
  { date: "Dec 10", predicted: 51, lower: 48, upper: 54 },
  { date: "Dec 11", predicted: 52, lower: 49, upper: 55 },
  { date: "Dec 12", predicted: 54, lower: 51, upper: 57 },
  { date: "Dec 13", predicted: 56, lower: 53, upper: 59 },
  { date: "Dec 14", predicted: 55, lower: 52, upper: 58 },
];

const forecasts = [
  {
    commodity: "Tomato",
    currentPrice: 47,
    predictedRange: "₹52-57",
    confidence: 87,
    period: "Next 7 days",
    trend: "Increasing",
    factors: ["Supply shortage", "Transport issues", "Festival demand"],
  },
  {
    commodity: "Onion",
    currentPrice: 35,
    predictedRange: "₹38-42",
    confidence: 92,
    period: "Next 7 days",
    trend: "Increasing",
    factors: ["Seasonal demand", "Export restrictions"],
  },
  {
    commodity: "Potato",
    currentPrice: 28,
    predictedRange: "₹26-29",
    confidence: 78,
    period: "Next 7 days",
    trend: "Stable",
    factors: ["Good harvest", "Adequate supply"],
  },
];

const agencies = [
  {
    name: "AgriWatch India",
    status: "Connected",
    lastSync: "2 hours ago",
    reliability: 94,
  },
  {
    name: "DES Ministry",
    status: "Connected",
    lastSync: "1 hour ago",
    reliability: 98,
  },
  {
    name: "AGMARK Network",
    status: "Pending",
    lastSync: "Manual upload required",
    reliability: 89,
  },
];

export default function ForecastInsights() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Forecast Insights & Agency Panel</h1>
          <p className="text-muted-foreground">Predictive analytics and external data integration</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Agency Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Forecasts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Commodities tracked</p>
          </CardContent>
        </Card>
        <Card className="border-success/30 bg-success/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Forecast Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">88.5%</div>
            <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Connected Agencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2/3</div>
            <p className="text-xs text-muted-foreground mt-1">Real-time sync active</p>
          </CardContent>
        </Card>
        <Card className="border-warning/30 bg-warning/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Risk Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">3</div>
            <p className="text-xs text-muted-foreground mt-1">Price surge expected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Price Forecast Analysis
            </CardTitle>
            <Badge variant="outline">Tomato - Guntur District</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <RechartsLine data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                name="Actual Price"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted Price"
              />
              <Line
                type="monotone"
                dataKey="upper"
                stroke="hsl(var(--chart-3))"
                strokeWidth={1}
                strokeDasharray="3 3"
                name="Upper Bound"
              />
              <Line
                type="monotone"
                dataKey="lower"
                stroke="hsl(var(--chart-3))"
                strokeWidth={1}
                strokeDasharray="3 3"
                name="Lower Bound"
              />
            </RechartsLine>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Commodity Forecasts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {forecasts.map((forecast, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-lg">{forecast.commodity}</div>
                    <div className="text-sm text-muted-foreground">Current: ₹{forecast.currentPrice}</div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      forecast.trend === "Increasing"
                        ? "bg-warning/10 text-warning border-warning/30"
                        : "bg-success/10 text-success border-success/30"
                    }
                  >
                    {forecast.trend}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Predicted Range ({forecast.period})</span>
                    <span className="font-bold">{forecast.predictedRange}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Confidence</span>
                    <span className="font-medium">{forecast.confidence}%</span>
                  </div>
                  <Progress value={forecast.confidence} className="h-2" />
                  <div className="mt-3">
                    <div className="text-xs font-medium text-muted-foreground mb-1">Major Influencing Factors:</div>
                    <div className="flex flex-wrap gap-1">
                      {forecast.factors.map((factor, j) => (
                        <Badge key={j} variant="secondary" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Agency Integration Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {agencies.map((agency, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold">{agency.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Last sync: {agency.lastSync}
                    </div>
                  </div>
                  {agency.status === "Connected" ? (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
                      Pending
                    </Badge>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reliability Score</span>
                    <span className="font-medium">{agency.reliability}%</span>
                  </div>
                  <Progress value={agency.reliability} className="h-2" />
                </div>
                {agency.status === "Pending" && (
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    <Upload className="mr-2 h-3 w-3" />
                    Upload Report
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
