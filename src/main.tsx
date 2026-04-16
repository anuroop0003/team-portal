import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./global.css";
import "./index.css";
import { router } from "@/routes";
import { Suspense } from "react";
import { PageLoader } from "@/routes/components/page-loader";
import { ThemeProvider } from "@/components/theme-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
