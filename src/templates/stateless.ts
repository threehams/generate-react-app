import { Props, Template } from "../types";
import { getTypescriptType } from "../fakes/props";
import { heading, text, image, emailLink, link } from "../partials";

type PropHandlers = {
  [key: string]: (name: string) => string;
};

const propChildren: PropHandlers = {
  text: heading,
  date: text,
  image,
  email: emailLink,
  url: link,
};

export const stateless = ({
  name,
  props: ownProps,
  children,
  scene,
}: Template) => {
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
  const mergedProps = children.reduce(mergeChildProps, ownProps);
  const imports = children
    .map(child => {
      const importPath = scene ? "../components/" : "./";
      return `import {${child.name}} from "${importPath}${child.name}";`;
    })
    .join("\n");
  const propTypes = Object.entries(mergedProps)
    .map(([key, type]) => {
      return `${key}: ${getTypescriptType(type)};`;
    })
    .join("\n");
  const childComponents = children
    .map(child => {
      const combinedProps = [child].reduce(mergeChildProps, child.props);
      const attrs = Object.keys(combinedProps)
        .map(prop => {
          return `${prop}={${prop}}`;
        })
        .join(" ");
      return `<${child.name} ${attrs} />`;
    })
    .join("\n");
  const internalChildren = Object.entries(ownProps)
    .map(([name, type]) => {
      const handler = propChildren[type];
      if (!handler) {
        throw new Error(`No handler found for type: "${type}"`);
      }
      return handler(name);
    })
    .join("\n");

  const propKeys = Object.keys(mergedProps).join(", ");
  return `
import React from "react";
${imports}

interface Props {
  ${propTypes}
}

export const ${name}: React.SFC<Props> = ({${propKeys}}) => {
  return (
    <div>
      ${internalChildren}
      ${childComponents}
    </div>
  );
};
`;
};
