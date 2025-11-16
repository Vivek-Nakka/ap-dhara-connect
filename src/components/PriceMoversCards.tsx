import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const topMovers = [
  { commodity: "Tomato", district: "Guntur", change: "+18.5%", price: "₹42/kg", status: "up", changeValue: 18.5 },
  { commodity: "Onion", district: "Kurnool", change: "+12.3%", price: "₹35/kg", status: "up", changeValue: 12.3 },
  { commodity: "Potato", district: "Anantapur", change: "+9.7%", price: "₹28/kg", status: "up", changeValue: 9.7 },
  { commodity: "Rice", district: "Krishna", change: "-8.2%", price: "₹38/kg", status: "down", changeValue: -8.2 },
  { commodity: "Dal (Toor)", district: "Visakhapatnam", change: "-5.4%", price: "₹98/kg", status: "down", changeValue: -5.4 },
];

export function PriceMoversCards() {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Top Price Movers Today</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/price-trends')}
        >
          View All
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {topMovers.map((mover, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors"
            onClick={() => navigate('/price-trends')}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-full ${mover.status === "up" ? "bg-success/10" : "bg-destructive/10"}`}>
                {mover.status === "up" ? (
                  <TrendingUp className="h-3.5 w-3.5 text-success" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                )}
              </div>
              <div>
                <div className="font-medium text-sm text-foreground">{mover.commodity}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-2.5 w-2.5" />
                  {mover.district}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-foreground">{mover.price}</div>
              <div
                className={`text-xs font-semibold ${
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
