import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";

import { theme } from "../src/theme";

export const decorators = [
  (Story, context) => (
    <MuiThemeProvider theme={theme}>
      <StorybookThemeProvider theme={theme}>
        <Story {...context} />
      </StorybookThemeProvider>
    </MuiThemeProvider>
  ),
];
