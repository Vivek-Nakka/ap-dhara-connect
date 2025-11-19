import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  LayoutDashboard,
  Building2,
  ClipboardCheck,
  TrendingUp,
  ShieldAlert,
  LineChart,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const priceMonitoringItems = [
  { title: "State Overview", url: "/", icon: LayoutDashboard },
  { title: "District Console", url: "/district-console", icon: Building2 },
  { title: "Validation Queue", url: "/validation-queue", icon: ClipboardCheck },
  { title: "Price Trends", url: "/price-trends", icon: TrendingUp },
];

const marketInterventionItems = [
  { title: "MI Overview", url: "/market-intervention", icon: ShieldAlert },
  { title: "Forecast Insights", url: "/forecast-insights", icon: LineChart },
  { title: "Intervention Planner", url: "/intervention-planner", icon: Calendar },
];

export function HeaderNav() {
  const location = useLocation();
  const currentModule = location.pathname.includes('market-intervention') || 
                        location.pathname.includes('forecast-insights') || 
                        location.pathname.includes('intervention-planner')
                        ? 'Market Intervention'
                        : 'Price Monitoring';

  const getSubsection = () => {
    const path = location.pathname;
    if (path === '/') return 'State Overview';
    if (path === '/district-console') return 'District Console';
    if (path === '/validation-queue') return 'Validation Queue';
    if (path === '/price-trends') return 'Price Trends';
    if (path === '/market-intervention') return 'MI Overview';
    if (path === '/forecast-insights') return 'Forecast Insights';
    if (path === '/intervention-planner') return 'Intervention Planner';
    return '';
  };

  return (
    <div className="flex items-center gap-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90">
              Price Monitoring
            </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              {priceMonitoringItems.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      activeClassName="bg-accent text-accent-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <div className="text-sm font-medium leading-none">
                          {item.title}
                        </div>
                      </div>
                    </NavLink>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90">
            Market Intervention
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              {marketInterventionItems.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <NavLink
                      to={item.url}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      activeClassName="bg-accent text-accent-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <div className="text-sm font-medium leading-none">
                          {item.title}
                        </div>
                      </div>
                    </NavLink>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    {getSubsection() && (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/50 border border-border">
        <span className="text-xs font-medium text-muted-foreground">{currentModule}</span>
        <span className="text-xs text-muted-foreground">/</span>
        <Badge variant="secondary" className="text-xs font-medium">
          {getSubsection()}
        </Badge>
      </div>
    )}
  </div>
  );
}
