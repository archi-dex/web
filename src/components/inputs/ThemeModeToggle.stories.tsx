import Paper from "@mui/material/Paper";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThemeModeToggle } from "./ThemeModeToggle";

export default {
  title: "Components/Inputs/ThemeModeToggle",
  component: ThemeModeToggle,
} as ComponentMeta<typeof ThemeModeToggle>;

export const Primary: ComponentStory<typeof ThemeModeToggle> = () => (
  <div>
    <Paper sx={{ p: 2 }}>
      <ThemeModeToggle />
    </Paper>
  </div>
);
