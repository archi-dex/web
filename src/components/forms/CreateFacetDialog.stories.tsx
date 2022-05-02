import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CreateFacetDialog } from "./CreateFacetDialog";

export default {
  title: "Components/Forms/CreateFacetDialog",
  component: CreateFacetDialog,
} as ComponentMeta<typeof CreateFacetDialog>;

export const Primary: ComponentStory<typeof CreateFacetDialog> = (props) => (
  <CreateFacetDialog {...props} open={true} />
);
