import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Select } from "./Select";

export default {
  title: "Components/Inputs/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

export const Primary: ComponentStory<typeof Select> = (props) => (
  <Select {...props} options={["Foo", "Bar", "Baz"]} />
);
