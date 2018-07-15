import { Props, PropType, Template } from "../types";
import { getTypescriptType } from "../fakes/props";
import { heading, text, image, emailLink, link } from "../partials";

type PropHandlers = { [P in PropType]?: (name: string) => string };

const propChildren: PropHandlers = {
  text: heading,
  date: text,
  image,
  email: emailLink,
  url: link,
};

const createPartials = ([name, type]: [string, PropType]) => {
  const handler = propChildren[type];
  if (!handler) {
    throw new Error(`No handler found for type: "${type}"`);
  }
  return handler(name);
};

// for simplicity: two props with the same name will have the same type
const mergeChildProps = (props: Props, child: Template): Props => {
  if (child.children.length) {
    return {
      ...child.props,
      ...child.children.reduce(mergeChildProps, props),
    };
  }
  return { ...props, ...child.props };
};

const createChild = (child: Template) => {
  const combinedProps = [child].reduce(mergeChildProps, child.props);
  const attrs = Object.keys(combinedProps)
    .map(prop => {
      return `${prop}={${prop}}`;
    })
    .join(" ");
  return `<${child.name} ${attrs} />`;
};

const propInterface = ([key, type]: [string, PropType]) => {
  return `${key}: ${getTypescriptType(type)};`;
};

const childImport = (path: string) => (child: Template) => {
  return `import {${child.name}} from "${path}${child.name}";`;
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
  const propTypes = Object.entries(mergedProps).map(propInterface);
  const stateTypes = Object.entries(state).map(propInterface);
  const childComponents = children.map(createChild);
  const internalChildren = Object.entries(ownProps).map(createPartials);

  const propKeys = Object.keys(mergedProps);
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
