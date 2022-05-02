import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { ComponentProps } from "react";

export const theme = createTheme({
  components: {
    MuiStack: {
      defaultProps: {
        spacing: 2,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});

type ThemeProviderProps = Omit<
  ComponentProps<typeof MuiThemeProvider>,
  "theme"
>;

export const ThemeProvider = (props: ThemeProviderProps) => (
  <MuiThemeProvider theme={theme} children={props.children} />
);
