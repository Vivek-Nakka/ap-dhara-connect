import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Building2,
  ClipboardCheck,
  TrendingUp,
  ShieldAlert,
  LineChart,
  Calendar,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

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

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="px-3 py-4">
          <h2 className={`font-bold text-sidebar-foreground transition-all ${open ? "text-lg" : "text-xs text-center"}`}>
            {open ? "AP Consumer Affairs" : "AP"}
          </h2>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Price Monitoring</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {priceMonitoringItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Market Intervention</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {marketInterventionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
