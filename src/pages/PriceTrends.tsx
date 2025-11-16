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
import { useMasterData } from "@/hooks/useMasterData";
import { useState } from "react";

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
  const { commodities, districts, centers } = useMasterData();
  const [selectedCommodity, setSelectedCommodity] = useState<string>("Tomato");
  const [selectedCenter, setSelectedCenter] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("7days");

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Price Trend Analysis</h1>
          <p className="text-sm text-muted-foreground">Commodity → Center → District hierarchy</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Filters Row - Commodity First */}
      <div className="grid grid-cols-4 gap-3">
        <Select value={selectedCommodity} onValueChange={setSelectedCommodity}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Select Commodity" />
          </SelectTrigger>
          <SelectContent>
            {commodities.map((commodity) => (
              <SelectItem key={commodity} value={commodity}>
                {commodity}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCenter} onValueChange={setSelectedCenter}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Select Center" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Centers</SelectItem>
            {centers.map((center) => (
              <SelectItem key={center} value={center}>
                {center}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Compact KPIs */}
      <div className="grid grid-cols-4 gap-3">
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground mb-1">7-Day Avg</div>
            <div className="text-xl font-bold">₹44.14</div>
            <p className="text-xs text-success mt-0.5 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +5.2%
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground mb-1">Peak Price</div>
            <div className="text-xl font-bold">₹49</div>
            <p className="text-xs text-muted-foreground mt-0.5">Dec 6</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground mb-1">Lowest Price</div>
            <div className="text-xl font-bold">₹40</div>
            <p className="text-xs text-muted-foreground mt-0.5">Dec 1</p>
          </CardContent>
        </Card>
        <Card className="border-warning/30 bg-warning/5 shadow-sm">
          <CardContent className="p-3">
            <div className="text-xs text-muted-foreground mb-1">Volatility</div>
            <div className="text-xl font-bold">High</div>
            <p className="text-xs text-warning mt-0.5">22.5%</p>
          </CardContent>
        </Card>
      </div>

      {/* Compact Chart */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Trend: {selectedCommodity}</CardTitle>
          <p className="text-xs text-muted-foreground">Center → District → State comparison</p>
        </CardHeader>
        <CardContent>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 11 }} />
                <YAxis className="text-xs" tick={{ fontSize: 11 }} label={{ value: '₹/kg', angle: -90, position: 'insideLeft', style: { fontSize: 11 } }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="center" stroke="hsl(var(--primary))" strokeWidth={2} name="Center" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="district" stroke="hsl(var(--secondary))" strokeWidth={2} name="District" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="state" stroke="hsl(var(--accent))" strokeWidth={2} name="State" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Compact Comparison Table */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Day-over-Day Comparison</CardTitle>
          <p className="text-xs text-muted-foreground">Price changes and volatility</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <TableHead className="h-8">Commodity</TableHead>
                  <TableHead className="text-right h-8">Yesterday</TableHead>
                  <TableHead className="text-right h-8">Today</TableHead>
                  <TableHead className="text-right h-8">Change %</TableHead>
                  <TableHead className="h-8">Volatility</TableHead>
                  <TableHead className="text-right h-8">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commodityComparison.map((item) => (
                  <TableRow key={item.commodity} className="text-xs">
                    <TableCell className="font-medium py-2">{item.commodity}</TableCell>
                    <TableCell className="text-right py-2">₹{item.yesterday}</TableCell>
                    <TableCell className="text-right font-semibold py-2">₹{item.today}</TableCell>
                    <TableCell className="text-right py-2">
                      <div className={`flex items-center justify-end gap-1 ${
                        item.change > 0 ? 'text-success' : item.change < 0 ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        {item.change > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : item.change < 0 ? (
                          <TrendingDown className="h-3 w-3" />
                        ) : null}
                        {Math.abs(item.change).toFixed(2)}%
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <Badge 
                        variant={
                          item.volatility === "High" ? "destructive" : 
                          item.volatility === "Medium" ? "secondary" : 
                          "outline"
                        }
                        className="text-xs px-2 py-0"
                      >
                        {item.volatility}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right py-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs px-2">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
