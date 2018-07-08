import faker from "faker";
import prettier from "prettier";
import { fakeProps, getType } from "./fakes/props";
import { range } from "lodash";

faker.seed(5348312);

const DEFAULTS = {
  chaos: 0, // % chance of non-syntax runtime errors
  componentSize: 25, // size of individual components
  connections: 50, // % of components connected to redux
  depth: 5, // max depth of component hierarchies
  endpoints: 10, // number of different API endpoints
  fetch: false, // whether to fetch needed data or leave that part to you
  indirection: 0, // % chance of useless "rename and pass along" components
  legacy: 0, // % known bad practices for bundling
  localState: 10, // % of local state vs. redux state
  maxSize: 100, // max number of components per split point
  minSize: 100, // min number of components per split point
  parallelRequests: 2, // max number of parallel API requests per scene
  rest: false, // pass props with ...rest where possible
  reuse: 100, // % chance of reusing existing components
  renaming: 0, // % chance of renaming props within a component
  snapshots: 25, // % of tests using Jest snapshots
  split: 5, // number of root-level elements
  tests: 25, // % of test coverage
  types: false, // typescript, flow, or false
  variation: 50, // % difference between scene size
};

type PropHandlers = {
  [key: string]: (name: string) => string;
};

const propChildren: PropHandlers = {
  string: name => `<h4>${name}: {${name}}</h4>`,
  "string[]": name => {
    return `<ul>{${name}.map(item => <li>{item}</li>)}</ul>`;
  },
};

const Stateless = ({ name, props: ownProps, children }: Template) => {
  // for simplicity: two props with the same name will have the same type
  const mergeChildProps = (props, child) => {
    if (child.children.length) {
      return {
        ...child.props,
        ...child.children.reduce(mergeChildProps, props),
      };
    }
    return { ...props, ...child.props };
  };
  const mergedProps = children.reduce(mergeChildProps, ownProps);
  const imports = children.map(child => {
    return `import {${child.name}} from "./${child.name}";\n`;
  });
  const propTypes = Object.entries(mergedProps)
    .map(([key, value]) => {
      return `${key}: ${value};`;
    })
    .join("\n");
  const childComponents = children.map(({ name, props }) => {
    const attrs = Object.keys(props)
      .map(prop => {
        return `${prop}={${prop}}`;
      })
      .join(" ");
    return `<${name} ${attrs} />`;
  });
  const internalChildren = Object.entries(ownProps)
    .map(([name, type]) => propChildren[type](name))
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

const templates = { Stateless };

interface Template {
  name: string;
  template: string;
  props: { [key: string]: string };
  children: Template[];
}

const child: Template = {
  name: "Child",
  template: "Stateless",
  props: {
    name: "string",
    address: "string",
    phone: "string",
  },
  children: [],
};

const parent: Template = {
  name: "Parent",
  template: "Stateless",
  props: {
    scsi: "string",
    phrases: "string[]",
  },
  children: [child],
};

const grandparent: Template = {
  name: "Grandparent",
  template: "Stateless",
  props: {
    hacky: "string[]",
  },
  children: [parent],
};

// const appStructure: Template[] = [grandparent, parent, child];

const appStructure = ({ propCount, componentCount }) => {
  const props = faker.helpers.shuffle(fakeProps).slice(0, propCount - 1);
  const components = faker.helpers
    .shuffle(componentNames)
    .slice(0, componentCount - 1);
  return faker.helpers
    .shuffle(fakeProps)
    .slice(0, propCount - 1)
    .map(prop => {});
};

const main = () => {
  appStructure({ propCount: 8, componentCount: 3 }).forEach(component => {
    const code = templates[component.template](component);
    console.log(prettier.format(code, { parser: "typescript" }));
  });
};

main();
