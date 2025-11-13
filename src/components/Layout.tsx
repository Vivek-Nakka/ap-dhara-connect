import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { GlobalFilterBar } from "@/components/GlobalFilterBar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b bg-primary flex items-center px-4 text-primary-foreground">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold">Integrated Digital Platform for Consumer Affairs</h1>
              <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded">Government of Andhra Pradesh</span>
            </div>
          </header>
          <GlobalFilterBar />
          <main className="flex-1 bg-background overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
