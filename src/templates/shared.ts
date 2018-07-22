import { Prop, PropType, Template } from "../types";
import { getTypescriptType } from "../fakes/props";
import { uniq } from "lodash";

type PropHandlers = { [P in PropType]?: (name: string) => string };

export const createPartials = (handlers: PropHandlers) => (prop: Prop) => {
  const handler = handlers[prop.type];
  if (!handler) {
    throw new Error(`No handler found for type: "${prop.type}"`);
  }
  return handler(prop.name);
};

// for simplicity: two props with the same name will have the same type
export const mergeChildProps = (props: Prop[], child: Template): Prop[] => {
  if (child.children.length) {
    return uniq([
      ...child.props,
      ...child.children.reduce(mergeChildProps, props),
    ]);
  }
  return uniq([...props, ...child.props]);
};

export const createChild = (child: Template) => {
  const combinedProps = [child].reduce(mergeChildProps, child.props);
  const attrs = combinedProps
    .map(prop => {
      return `${prop.name}={${prop.name}}`;
    })
    .join(" ");
  return `<${child.name} ${attrs} />`;
};

export const propInterface = (prop: Prop) => {
  return `${prop.name}: ${getTypescriptType(prop.type)};`;
};

export const childImport = (path: string) => (child: Template) => {
  return `import {${child.name}} from "${path}${child.name}";`;
};
