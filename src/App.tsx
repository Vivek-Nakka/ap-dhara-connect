import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import StateOverview from "./pages/StateOverview";
import DistrictConsole from "./pages/DistrictConsole";
import ValidationQueue from "./pages/ValidationQueue";
import PriceTrends from "./pages/PriceTrends";
import MarketIntervention from "./pages/MarketIntervention";
import ForecastInsights from "./pages/ForecastInsights";
import InterventionPlanner from "./pages/InterventionPlanner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><StateOverview /></Layout>} />
          <Route path="/district-console" element={<Layout><DistrictConsole /></Layout>} />
          <Route path="/validation-queue" element={<Layout><ValidationQueue /></Layout>} />
          <Route path="/price-trends" element={<Layout><PriceTrends /></Layout>} />
          <Route path="/market-intervention" element={<Layout><MarketIntervention /></Layout>} />
          <Route path="/forecast-insights" element={<Layout><ForecastInsights /></Layout>} />
          <Route path="/intervention-planner" element={<Layout><InterventionPlanner /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
