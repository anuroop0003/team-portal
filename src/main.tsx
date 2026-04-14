import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./global.css";
import "./index.css";
import { router } from "@/routes";
import { Suspense } from "react";
import { PageLoader } from "@/routes/components/page-loader";
import { ThemeProvider } from "@/components/theme-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  </StrictMode>,
);
