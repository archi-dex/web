import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FacetsContext } from "~/lib/contexts/FacetsContext";

import { Facet } from "./Facet";

const mock = [
  {
    id: "attributes.attribute_1",
    key: "attributes.attribute",
    sort: 1,
  },
];

type TemplateProps = {
  isLoading?: boolean;
  exists?: boolean;
  keyName?: string;
};

const Template = (props: TemplateProps) => (
  <FacetsContext.Provider
    value={{
      facets: props.exists ? mock : [],
      isLoading: props.isLoading ?? false,
      refresh: () => console.log("refresh"),
    }}
  >
    <Facet
      id="attributes.attribute_1"
      keyName={props.keyName ?? "attributes.attribute"}
    />
  </FacetsContext.Provider>
);

export const Primary: ComponentStory<typeof Template> = Template.bind({});

export default {
  title: "Components/Facet",
  component: Template,
  argTypes: {
    isLoading: { control: "boolean" },
    exists: { control: "boolean" },
    keyName: { control: "text" },
  },
} as ComponentMeta<typeof Template>;
