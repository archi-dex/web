import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { FacetsContextProvider } from "./lib/contexts/FacetsContext";
import { NotificationProvider } from "./lib/contexts/NotificationContext";
import { ThemeProvider } from "./lib/contexts/ThemeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <NotificationProvider>
          <FacetsContextProvider>
            <App />
          </FacetsContextProvider>
        </NotificationProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
