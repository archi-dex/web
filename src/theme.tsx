import {
  createTheme,
  darken,
  lighten,
  ThemeOptions,
} from "@mui/material/styles";
import createPalette, { Palette } from "@mui/material/styles/createPalette";
import { Shadows } from "@mui/material/styles/shadows";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    code: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    code?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    code: true;
  }
}
const paletteLight = createPalette({
  mode: "light",
  background: { default: darken("#FFFFFF", 0.01) },
  primary: { dark: "#490000", main: "#690000", light: "#873333" },
  secondary: { dark: "#253037", main: "#36454F", light: "#5E6A72" },
});

const paletteDark = createPalette({
  mode: "dark",
  background: { default: lighten("#000000", 0.01) },
  primary: { dark: "#5C0F10", main: "#841617", light: "#9C4445" },
  secondary: { dark: "#767679", main: "#AAA9AD", light: "#BBBABD" },
});

const createThemeOptions = (
  palette: Palette,
  modifier: typeof lighten | typeof darken
): ThemeOptions => ({
  palette,
  shadows: Array(25).fill("none") as Shadows,
  typography: {
    code: {
      fontFamily: "monospace",
      display: "inline-block",
      padding: "6px",
      borderRadius: "6px",
      backgroundColor: modifier(palette.background.default, 0.05),
    },
  },
  components: {
    MuiStack: {
      defaultProps: {
        spacing: 2,
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(even)": {
            backgroundColor: modifier(palette.background.default, 0.04),
          },
          "&:hover": {
            backgroundColor: modifier(palette.background.default, 0.08),
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: modifier(palette.background.default, 0.1),
          textTransform: "uppercase",
          fontSize: "0.7rem",
        },
        root: {
          border: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          fontSize: "12px",
          color:
            palette.mode === "dark" ? palette.primary.contrastText : undefined,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});

export const themeLight = createTheme(createThemeOptions(paletteLight, darken));
export const themeDark = createTheme(createThemeOptions(paletteDark, lighten));
