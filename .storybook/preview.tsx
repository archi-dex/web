import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming";
import { ThemeContext, ThemeProvider } from "../src/lib/contexts/ThemeContext";

export const decorators = [
  (Story, context) => (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {(value) => (
          <StorybookThemeProvider theme={value.theme}>
            <Story {...context} />
          </StorybookThemeProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  ),
];
