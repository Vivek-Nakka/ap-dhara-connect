import { NavLink } from "@/components/NavLink";
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
  return (
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
  );
}
