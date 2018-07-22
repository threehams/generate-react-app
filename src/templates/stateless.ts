import { Template } from "../types";
import { heading, text, image, emailLink, link } from "../partials";
import {
  mergeChildProps,
  childImport,
  propInterface,
  createChild,
  createPartials,
} from "./shared";
import { concat } from "lodash";

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
  importPath,
}: Template) => {
  const mergedProps = children.reduce(mergeChildProps, ownProps);
  const imports = children.map(childImport(importPath));
  const propTypes = mergedProps.map(propInterface);
  const childComponents = concat(
    children.map(createChild),
    ownProps.map(createPartials(propChildren)),
  );
  const propKeys = mergedProps.map(prop => prop.name);
  return template({
    imports,
    propTypes,
    children: childComponents,
    name,
    propKeys,
  });
};

// split template for better type safety
// anything with a `.toString()` is valid for interpolation
// but that doesn't mean it will result in valid code
type TemplateProps = {
  imports: string[];
  propTypes: string[];
  name: string;
  propKeys: string[];
  children: string[];
};

const template = ({
  imports,
  propTypes,
  name,
  propKeys,
  children,
}: TemplateProps) => {
  return `
  import React from "react";
  ${imports.join("\n")}
  
  interface Props {
    ${propTypes.join("\n")}
  }
  
  export const ${name}: React.SFC<Props> = ({${propKeys.join(", ")}}) => {
    return (
      <div>
        ${children.join("\n")}
      </div>
    );
  };
  `;
};
