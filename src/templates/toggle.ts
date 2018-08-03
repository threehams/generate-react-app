import { PropType, Template } from "../types";
import { heading, text, image, emailLink, link } from "../partials";
import {
  mergeChildProps,
  childImport,
  propInterface,
  createChild,
  createPartials,
} from "./shared";
import { concat } from "lodash";

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
  const childComponents = concat(
    ownProps.map(createPartials(propChildren)),
    children.map(createChild),
  );
  const propKeys = mergedProps.map(prop => prop.name);
  const stateKeys = stateTypes.map(state => state.name);

  return template({
    name,
    imports,
    propTypes,
    stateTypes,
    defaultState,
    children: childComponents,
    propKeys,
  });
};

// split template for better type safety
// anything with a `.toString()` is valid for interpolation
// but that doesn't mean it will result in valid code
type TemplateProps = {
  imports: string[];
  defaultState: string[];
  propTypes: string[];
  stateTypes: string[];
  name: string;
  propKeys: string[];
  stateKeys: string[];
  children: string[];
};

const template = ({
  imports,
  propTypes,
  stateTypes,
  defaultState,
  propKeys,
  stateKeys,
  name,
  children,
}: TemplateProps) => {
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
      const {${stateKeys.join(", ")}} = this.state;
      return (
        <div>
          ${children.join("\n")}
        </div>
      );
    }
  };
  `;
};
