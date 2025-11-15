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
} from "lucide-react";

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
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">State Overview Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time price monitoring across Andhra Pradesh
          </p>
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

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Andhra Pradesh Heat Map */}
      <APHeatMap />

      {/* Reporting Completeness & Price Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportingCompletenessChart />
        <PriceMoversCards />
      </div>

      {/* Alerts Feed */}
      <AlertsFeed />
    </div>
  );
}
