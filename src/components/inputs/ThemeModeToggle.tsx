import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";

import { useThemeContext } from "~/lib/contexts/ThemeContext";

export const ThemeModeToggle = () => {
  const { theme, toggleMode } = useThemeContext();

  return (
    <IconButton onClick={() => toggleMode()}>
      {theme.palette.mode === "light" && <Brightness4Icon />}
      {theme.palette.mode === "dark" && <Brightness7Icon />}
    </IconButton>
  );
};
