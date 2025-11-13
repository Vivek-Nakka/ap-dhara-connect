import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, Download, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const trendData = [
  { date: "Dec 1", district: 42, state: 40, center: 43 },
  { date: "Dec 2", district: 43, state: 41, center: 44 },
  { date: "Dec 3", district: 45, state: 42, center: 46 },
  { date: "Dec 4", district: 44, state: 41, center: 45 },
  { date: "Dec 5", district: 46, state: 43, center: 47 },
  { date: "Dec 6", district: 48, state: 44, center: 49 },
  { date: "Dec 7", district: 47, state: 44, center: 48 },
];

const commodityComparison = [
  { commodity: "Tomato", yesterday: 32, today: 42, change: 31.25, volatility: "High" },
  { commodity: "Onion", yesterday: 28, today: 35, change: 25.0, volatility: "High" },
  { commodity: "Potato", yesterday: 24, today: 28, change: 16.67, volatility: "Medium" },
  { commodity: "Rice (Sona Masoori)", yesterday: 45, today: 38, change: -15.56, volatility: "Medium" },
  { commodity: "Wheat", yesterday: 32, today: 33, change: 3.13, volatility: "Low" },
  { commodity: "Dal (Toor)", yesterday: 98, today: 96, change: -2.04, volatility: "Low" },
  { commodity: "Sugar", yesterday: 42, today: 42, change: 0, volatility: "Low" },
];

export default function PriceTrends() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Commodity Price Trend Explorer</h1>
          <p className="text-muted-foreground">Time-series analysis and price movement patterns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">7-Day Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹44.14</div>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +5.2% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Peak Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹49</div>
            <p className="text-xs text-muted-foreground mt-1">On Dec 6, 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lowest Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹40</div>
            <p className="text-xs text-muted-foreground mt-1">On Dec 1, 2024</p>
          </CardContent>
        </Card>
        <Card className="border-warning/30 bg-warning/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Volatility Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">6.8</div>
            <p className="text-xs text-muted-foreground mt-1">Medium volatility</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Price Trend Analysis</CardTitle>
            <div className="flex items-center gap-2">
              <Select defaultValue="tomato">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select commodity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tomato">Tomato</SelectItem>
                  <SelectItem value="onion">Onion</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="daily">
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="district"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                name="District Avg (Guntur)"
              />
              <Line
                type="monotone"
                dataKey="state"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="State Avg (AP)"
              />
              <Line
                type="monotone"
                dataKey="center"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Center (Guntur Market)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price Movement Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Commodity</TableHead>
                <TableHead className="text-right">Yesterday Price</TableHead>
                <TableHead className="text-right">Today Price</TableHead>
                <TableHead className="text-right">Change %</TableHead>
                <TableHead>Volatility</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commodityComparison.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item.commodity}</TableCell>
                  <TableCell className="text-right">₹{item.yesterday}</TableCell>
                  <TableCell className="text-right font-medium">₹{item.today}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {item.change > 0 ? (
                        <TrendingUp className="h-3 w-3 text-warning" />
                      ) : item.change < 0 ? (
                        <TrendingDown className="h-3 w-3 text-success" />
                      ) : null}
                      <span
                        className={
                          item.change > 0
                            ? "text-warning font-medium"
                            : item.change < 0
                            ? "text-success font-medium"
                            : "text-muted-foreground"
                        }
                      >
                        {item.change > 0 ? "+" : ""}
                        {item.change.toFixed(2)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.volatility === "High"
                          ? "bg-destructive/10 text-destructive border-destructive/30"
                          : item.volatility === "Medium"
                          ? "bg-warning/10 text-warning border-warning/30"
                          : "bg-success/10 text-success border-success/30"
                      }
                    >
                      {item.volatility}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
