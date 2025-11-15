import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const topMovers = [
  { commodity: "Tomato", district: "Guntur", change: "+18.5%", price: "₹42/kg", status: "up", changeValue: 18.5 },
  { commodity: "Onion", district: "Kurnool", change: "+12.3%", price: "₹35/kg", status: "up", changeValue: 12.3 },
  { commodity: "Potato", district: "Anantapur", change: "+9.7%", price: "₹28/kg", status: "up", changeValue: 9.7 },
  { commodity: "Rice", district: "Krishna", change: "-8.2%", price: "₹38/kg", status: "down", changeValue: -8.2 },
  { commodity: "Dal (Toor)", district: "Visakhapatnam", change: "-5.4%", price: "₹98/kg", status: "down", changeValue: -5.4 },
];

export function PriceMoversCards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top 5 Price Movers (Last 24 Hours)
          </span>
          <Badge variant="outline" className="text-xs">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topMovers.map((mover, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${mover.status === "up" ? "bg-success/10" : "bg-destructive/10"}`}>
                {mover.status === "up" ? (
                  <TrendingUp className="h-5 w-5 text-success" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-destructive" />
                )}
              </div>
              <div>
                <div className="font-semibold text-foreground">{mover.commodity}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {mover.district}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">{mover.price}</div>
              <div
                className={`text-sm font-semibold ${
                  mover.status === "up" ? "text-success" : "text-destructive"
                }`}
              >
                {mover.change}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
