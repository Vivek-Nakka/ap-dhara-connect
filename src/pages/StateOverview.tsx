import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  MapPin,
  FileCheck,
  BarChart3,
  Download,
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const kpiData = [
  { title: "Entries Today", value: "1,247", icon: FileCheck, subtitle: "Across 26 districts", variant: "success" as const },
  { title: "On-Time Submission", value: "94.2%", icon: Clock, subtitle: "Before 2 PM", trend: "up" as const, trendValue: "+2.1% vs yesterday", variant: "success" as const },
  { title: "Anomalies Detected", value: "23", icon: AlertTriangle, subtitle: "Pending validation", variant: "warning" as const },
  { title: "Data Quality Score", value: "96.8%", icon: BarChart3, subtitle: "GPS & proof compliance", trend: "up" as const, trendValue: "+0.5%", variant: "success" as const },
];

const topMovers = [
  { commodity: "Tomato", district: "Guntur", change: "+18.5%", price: "₹42/kg", status: "up" },
  { commodity: "Onion", district: "Kurnool", change: "+12.3%", price: "₹35/kg", status: "up" },
  { commodity: "Rice", district: "Krishna", change: "-8.2%", price: "₹38/kg", status: "down" },
  { commodity: "Potato", district: "Anantapur", change: "+9.7%", price: "₹28/kg", status: "up" },
  { commodity: "Dal", district: "Visakhapatnam", change: "-5.4%", price: "₹98/kg", status: "down" },
];

const alerts = [
  { time: "10:45 AM", message: "Tomato prices in Guntur exceeded 15% threshold", severity: "high" },
  { time: "09:30 AM", message: "3 centers in Nellore pending submission", severity: "medium" },
  { time: "08:15 AM", message: "Weekly report generation completed", severity: "low" },
];

const districtData = [
  { name: "Visakhapatnam", entries: 95, pending: 5, quality: 98 },
  { name: "Vijayawada", entries: 88, pending: 12, quality: 94 },
  { name: "Guntur", entries: 92, pending: 8, quality: 96 },
  { name: "Nellore", entries: 78, pending: 22, quality: 89 },
  { name: "Kurnool", entries: 85, pending: 15, quality: 92 },
  { name: "Tirupati", entries: 90, pending: 10, quality: 95 },
];

const trendData = [
  { date: "Mon", avgPrice: 38, submissions: 1180 },
  { date: "Tue", avgPrice: 39, submissions: 1205 },
  { date: "Wed", avgPrice: 41, submissions: 1190 },
  { date: "Thu", avgPrice: 40, submissions: 1220 },
  { date: "Fri", avgPrice: 42, submissions: 1247 },
];

export default function StateOverview() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">State Overview Dashboard</h1>
          <p className="text-muted-foreground">Real-time price monitoring across Andhra Pradesh</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Badge variant="outline" className="text-xs">
            <Clock className="mr-1 h-3 w-3" />
            Edit until 2 PM
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              District Submission Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entries" fill="hsl(var(--chart-1))" name="Submitted" />
                <Bar dataKey="pending" fill="hsl(var(--chart-2))" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, i) => (
              <Alert
                key={i}
                variant={alert.severity === "high" ? "destructive" : "default"}
                className="py-2"
              >
                <AlertDescription className="text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex-1">{alert.message}</span>
                    <span className="text-muted-foreground whitespace-nowrap">{alert.time}</span>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top 5 Price Movers (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMovers.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {item.status === "up" ? (
                      <TrendingUp className="h-4 w-4 text-warning" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-success" />
                    )}
                    <div>
                      <div className="font-medium">{item.commodity}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.district}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{item.price}</div>
                    <div
                      className={`text-xs font-medium ${
                        item.status === "up" ? "text-warning" : "text-success"
                      }`}
                    >
                      {item.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Submission Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="submissions"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  name="Submissions"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgPrice"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  name="Avg Price (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Data Quality Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="text-2xl font-bold text-success">98.2%</div>
              <div className="text-xs text-muted-foreground mt-1">GPS Match Rate</div>
            </div>
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="text-2xl font-bold text-success">95.7%</div>
              <div className="text-xs text-muted-foreground mt-1">Photo Proof Submitted</div>
            </div>
            <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
              <div className="text-2xl font-bold text-warning">2.3%</div>
              <div className="text-xs text-muted-foreground mt-1">Missing Proofs</div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary">96.8%</div>
              <div className="text-xs text-muted-foreground mt-1">Overall Quality Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
