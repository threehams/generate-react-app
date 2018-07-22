import { PropType, Template } from "../types";
import { heading, text, image, emailLink, link } from "../partials";
import {
  mergeChildProps,
  childImport,
  propInterface,
  createChild,
  createPartials,
} from "./shared";

type PropHandlers = { [P in PropType]?: (name: string) => string };

const propChildren: PropHandlers = {
  text: heading,
  date: text,
  image,
  email: emailLink,
  url: link,
};

export const toggle = ({
  name,
  props: ownProps,
  children,
  importPath,
  state,
}: Template) => {
  const mergedProps = children.reduce(mergeChildProps, ownProps);
  const imports = children.map(childImport(importPath));
  const propTypes = mergedProps.map(propInterface);
  const stateTypes = state.map(propInterface);
  const childComponents = children.map(createChild);
  const internalChildren = ownProps.map(createPartials(propChildren));
  const propKeys = mergedProps.map(prop => prop.name);
  return `
import React from "react";
${imports.join("\n")}

interface Props {
  ${propTypes.join("\n")}
}

interface State {
  ${stateTypes.join("\n")}
}

export class ${name} extends React.Component<Props, State> {
  state: State = {
    ${defaultState.join("\n")}
  }
  render() {
    const {${propKeys.join(", ")}} = this.props;
    return (
      <div>
        ${internalChildren.join("\n")}
        ${childComponents.join("\n")}
      </div>
    );
  }
};
`;
};
