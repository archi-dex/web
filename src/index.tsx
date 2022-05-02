import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { Grow } from "./components/Grow";
import { FacetsContextProvider } from "./lib/contexts/FacetsContext";
import { NotificationProvider } from "./lib/contexts/NotificationContext";
import { ThemeProvider } from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <CssBaseline />
      <BrowserRouter>
        <NotificationProvider>
          <FacetsContextProvider>
            <Grow>
              <App />
            </Grow>
          </FacetsContextProvider>
        </NotificationProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
