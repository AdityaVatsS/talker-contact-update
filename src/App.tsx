import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import PhoneNumbers from "./pages/PhoneNumbers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="phone-numbers" element={<PhoneNumbers />} />
            <Route path="voice-agents" element={<div className="p-6"><h1 className="text-2xl font-bold">Voice Agents</h1><p className="text-gray-600">Voice agents management coming soon...</p></div>} />
            <Route path="knowledge-base" element={<div className="p-6"><h1 className="text-2xl font-bold">Knowledge Base</h1><p className="text-gray-600">Knowledge base management coming soon...</p></div>} />
            <Route path="batch-call" element={<div className="p-6"><h1 className="text-2xl font-bold">Batch Call</h1><p className="text-gray-600">Batch calling features coming soon...</p></div>} />
            <Route path="call-history" element={<div className="p-6"><h1 className="text-2xl font-bold">Call History</h1><p className="text-gray-600">Call history and logs coming soon...</p></div>} />
            <Route path="analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Analytics</h1><p className="text-gray-600">Analytics dashboard coming soon...</p></div>} />
            <Route path="billing" element={<div className="p-6"><h1 className="text-2xl font-bold">Billing</h1><p className="text-gray-600">Billing management coming soon...</p></div>} />
            <Route path="api-keys" element={<div className="p-6"><h1 className="text-2xl font-bold">API Keys</h1><p className="text-gray-600">API keys management coming soon...</p></div>} />
            <Route path="webhooks" element={<div className="p-6"><h1 className="text-2xl font-bold">Webhooks</h1><p className="text-gray-600">Webhook configuration coming soon...</p></div>} />
            <Route path="help-center" element={<div className="p-6"><h1 className="text-2xl font-bold">Help Center</h1><p className="text-gray-600">Help and documentation coming soon...</p></div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
