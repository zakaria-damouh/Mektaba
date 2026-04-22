"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={client}>
        <TooltipProvider>
            {children}
        </TooltipProvider>
    </QueryClientProvider>
  );
}