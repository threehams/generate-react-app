import { Prop } from "../types";

export const fixtures = ({ props }: { props: Prop[] }) => {
  const propValues = props
    .map(prop => {
      return `${prop.name}: ${JSON.stringify(prop.func())}`;
    })
    .join(",\n");
  return `
export const fixtures = {
  ${propValues}
}
`;
};
