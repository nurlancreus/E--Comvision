import { useEffect, useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";
import { useSelector } from "react-redux";
import { selectMode } from "@/state";

import Layout from "@/scenes/layout/";
import Dashboard from "@/scenes/dashboard/";
import Products from "@/scenes/products/";
import Customers from "@/scenes/customers/";
import Transactions from "@/scenes/transactions/";
import Geography from "@/scenes/geography/";
import Overview from "@/scenes/overview/";
import Daily from "@/scenes/daily/";
import Monthly from "@/scenes/monthly/";
import Breakdown from "@/scenes/breakdown/";
import Admin from "@/scenes/admin/";
import Performance from "@/scenes/performance/";

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
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
