import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const topMovers = [
  { commodity: "Tomato", previousPrice: 32, currentPrice: 42, changePercent: 31.25, direction: "up" as const },
  { commodity: "Onion", previousPrice: 28, currentPrice: 35, changePercent: 25.0, direction: "up" as const },
  { commodity: "Potato", previousPrice: 24, currentPrice: 28, changePercent: 16.67, direction: "up" as const },
  { commodity: "Rice (Sona Masoori)", previousPrice: 45, currentPrice: 38, changePercent: -15.56, direction: "down" as const },
  { commodity: "Dal (Toor)", previousPrice: 98, currentPrice: 96, changePercent: -2.04, direction: "down" as const },
];

export function PriceMoversCards() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Top Price Movers Today</CardTitle>
        <p className="text-xs text-muted-foreground">Significant price changes requiring attention</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {topMovers.map((mover, idx) => {
            const absChange = Math.abs(mover.changePercent);
            const thresholdType = absChange >= 30 ? "MTP" : absChange >= 15 ? "Warning" : null;
            
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => navigate('/price-trends')}
              >
                <div className="flex items-center gap-2">
                  {mover.direction === "up" ? (
                    <TrendingUp className="h-4 w-4 text-destructive" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-success" />
                  )}
                  <span className="text-sm font-medium">{mover.commodity}</span>
                  {thresholdType && (
                    <Badge 
                      variant={thresholdType === "MTP" ? "destructive" : "outline"}
                      className={cn(
                        "text-xs px-1.5 py-0 h-5",
                        thresholdType === "Warning" && "border-warning text-warning"
                      )}
                    >
                      {thresholdType}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    ₹{mover.previousPrice} → ₹{mover.currentPrice}
                  </span>
                  <Badge
                    variant={mover.direction === "up" ? "destructive" : "default"}
                    className="text-xs"
                  >
                    {mover.direction === "up" ? "+" : ""}{mover.changePercent.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
