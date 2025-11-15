import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const districtCompleteness = [
  { district: "Visakhapatnam", percentage: 95, submitted: 95, total: 100 },
  { district: "Krishna", percentage: 100, submitted: 70, total: 70 },
  { district: "Guntur", percentage: 89, submitted: 89, total: 100 },
  { district: "Vijayawada", percentage: 88, submitted: 88, total: 100 },
  { district: "Kurnool", percentage: 86, submitted: 86, total: 100 },
  { district: "Tirupati", percentage: 90, submitted: 90, total: 100 },
  { district: "Nellore", percentage: 67, submitted: 67, total: 100 },
  { district: "Anantapur", percentage: 88, submitted: 70, total: 80 },
  { district: "Chittoor", percentage: 86, submitted: 60, total: 70 },
  { district: "Prakasam", percentage: 80, submitted: 48, total: 60 },
  { district: "Kadapa", percentage: 100, submitted: 50, total: 50 },
  { district: "East Godavari", percentage: 86, submitted: 60, total: 70 },
  { district: "West Godavari", percentage: 83, submitted: 50, total: 60 },
];

export function ReportingCompletenessChart() {
  const getBarColor = (percentage: number) => {
    if (percentage >= 90) return "hsl(var(--success))";
    if (percentage >= 75) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          District-wise Reporting Completeness
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={districtCompleteness}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
            <YAxis
              type="category"
              dataKey="district"
              stroke="hsl(var(--muted-foreground))"
              width={90}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              formatter={(value: number, name: string, props: any) => {
                if (name === "percentage") {
                  return [`${value}% (${props.payload.submitted}/${props.payload.total} centers)`, "Completion"];
                }
                return [value, name];
              }}
            />
            <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
              {districtCompleteness.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {districtCompleteness.filter((d) => d.percentage >= 90).length}
            </div>
            <div className="text-sm text-muted-foreground">≥90% Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {districtCompleteness.filter((d) => d.percentage >= 75 && d.percentage < 90).length}
            </div>
            <div className="text-sm text-muted-foreground">75-89% Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">
              {districtCompleteness.filter((d) => d.percentage < 75).length}
            </div>
            <div className="text-sm text-muted-foreground">&lt;75% Complete</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
