import { GlobalFilterBar } from "@/components/GlobalFilterBar";
import { HeaderNav } from "@/components/HeaderNav";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="h-16 border-b bg-primary flex items-center justify-between px-6 text-primary-foreground">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold">Integrated Digital Platform for Consumer Affairs</h1>
          <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded">Government of Andhra Pradesh</span>
        </div>
        <HeaderNav />
      </header>
      <GlobalFilterBar />
      <main className="flex-1 bg-background overflow-auto">
        {children}
      </main>
    </div>
  );
}
