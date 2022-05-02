import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Code } from "./Code";

export default {
  title: "Components/Code",
  component: Code,
} as ComponentMeta<typeof Code>;

export const Primary: ComponentStory<typeof Code> = (props) => (
  <Code {...props} />
);
