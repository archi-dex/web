import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SortDirection, SortDirectionIcon } from "./SortDirectionIcon";

export default {
  title: "Components/Inputs/SortDirectionIcon",
  component: SortDirectionIcon,
  argTypes: {
    direction: {
      options: Object.values(SortDirection),
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof SortDirectionIcon>;

export const Primary: ComponentStory<typeof SortDirectionIcon> = (props) => (
  <SortDirectionIcon {...props} />
);
