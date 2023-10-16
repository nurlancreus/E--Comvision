import { useEffect, useMemo, lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";
import { useSelector } from "react-redux";
import { selectMode } from "@/state";
import Spinner from "@/components/Spinner";

import Layout from "@/scenes/layout/";
import Dashboard from "@/scenes/dashboard/";
import Products from "@/scenes/products/";
import Customers from "@/scenes/customers/";
import Transactions from "@/scenes/transactions/";
import Geography from "@/scenes/geography/";
import Admin from "@/scenes/admin/";
import Performance from "@/scenes/performance/";

// Dynamic Imports 
const Overview = lazy(() => import("@/scenes/overview/"));
const Daily = lazy(() => import("@/scenes/daily/"));
const Monthly = lazy(() => import("@/scenes/monthly/"));
const Breakdown = lazy(() => import("@/scenes/breakdown/"));

export default function App() {
  const mode = useSelector(selectMode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    if (mode === "dark") document.documentElement.className = "dark";
    if (mode === "light") document.documentElement.className = "light";
  }, [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="customers" element={<Customers />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="geography" element={<Geography />} />
                <Route path="overview" element={<Overview />} />
                <Route path="daily" element={<Daily />} />
                <Route path="monthly" element={<Monthly />} />
                <Route path="breakdown" element={<Breakdown />} />
                <Route path="admin" element={<Admin />} />
                <Route path="performance" element={<Performance />} />
              </Route>
            </Routes>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
