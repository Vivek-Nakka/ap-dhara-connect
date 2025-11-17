import { KPICard } from "@/components/KPICard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APHeatMap } from "@/components/APHeatMap";
import { ReportingCompletenessChart } from "@/components/ReportingCompletenessChart";
import { PriceMoversCards } from "@/components/PriceMoversCards";
import { AlertsFeed } from "@/components/AlertsFeed";
import {
  Clock,
  AlertTriangle,
  FileCheck,
  BarChart3,
  Download,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const kpiData = [
  {
    title: "Entries Today",
    value: "1,247",
    icon: FileCheck,
    subtitle: "Across 26 districts",
    variant: "success" as const,
  },
  {
    title: "Submitted Before 2 PM",
    value: "94.2%",
    icon: Clock,
    subtitle: "On-time submission rate",
    trend: "up" as const,
    trendValue: "+2.1% vs yesterday",
    variant: "success" as const,
  },
  {
    title: "Deviations Detected",
    value: "23",
    icon: AlertTriangle,
    subtitle: "Pending validation",
    variant: "warning" as const,
  },
  {
    title: "Data Quality Score",
    value: "96.8%",
    icon: BarChart3,
    subtitle: "GPS & proof compliance",
    trend: "up" as const,
    trendValue: "+0.5%",
    variant: "success" as const,
  },
];

export default function StateOverview() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">State Overview Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time price monitoring across Andhra Pradesh
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/price-trends')}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            View Trends
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Badge variant="default" className="text-xs px-3 py-1.5 bg-warning text-warning-foreground">
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            Edit until 2 PM
          </Badge>
        </div>
      </div>

      {/* KPI Row - Compact */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Price Trends Focus - Top Priority */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <PriceMoversCards />
        </div>
        <AlertsFeed />
      </div>

      {/* Andhra Pradesh Heat Map - Compact */}
      <APHeatMap />

      {/* Reporting Completeness - Compact */}
      <ReportingCompletenessChart />
    </div>
  );
}
