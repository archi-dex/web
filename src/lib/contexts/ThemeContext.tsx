import { Theme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createContext, PropsWithChildren, useContext, useState } from "react";

import { themeDark, themeLight } from "~/theme";

type PaletteMode = Theme["palette"]["mode"];

export interface ThemeContextValue {
  theme: Theme;
  toggleMode: (mode?: PaletteMode) => void;
}

export const ThemeContext =
  createContext<ThemeContextValue | undefined>(undefined);

export const useThemeContext = () => {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("ThemeContext consumer does not have a matching provider");
  }
  return value;
};

export const ThemeProvider = (props: PropsWithChildren<{}>) => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const theme = mode === "light" ? themeLight : themeDark;

  const toggleMode: ThemeContextValue["toggleMode"] = (newMode) =>
    setMode((oldMode) => (newMode ?? oldMode === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
