import faker from "faker/locale/en";
import prettier from "prettier";
import { getComponentNames, fakeProps, getTypescriptType } from "./fakes/props";
import { range } from "lodash";
import pluralize from "pluralize";

// faker.seed(5348312);

const componentNames = getComponentNames();

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
  text: name => `<h4>${name}: {${name}}</h4>`,
  date: name => `<div>{${name}.toLocaleDateString()}</div>`,
  image: name => `<img src={${name}} alt="${name}" />`,
  email: name => `<a href={"mailto:" + ${name}}>{${name}}</a>`,
  url: name => `<a href={${name}}>{${name}}</a>`,
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
  const imports = children
    .map(child => {
      return `import {${child.name}} from "./${child.name}";`;
    })
    .join("\n");
  const propTypes = Object.entries(mergedProps)
    .map(([key, type]) => {
      return `${key}: ${getTypescriptType(type)};`;
    })
    .join("\n");
  const childComponents = children
    .map(({ name, props }) => {
      const attrs = Object.keys(props)
        .map(prop => {
          return `${prop}={${prop}}`;
        })
        .join(" ");
      return `<${name} ${attrs} />`;
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

const templates = { Stateless };

interface Template {
  name: string;
  template: string;
  props: { [key: string]: string };
  children: Template[];
}

const sample = (array: any[], count: number) => {
  return faker.helpers.shuffle(array).slice(0, count - 1);
};

type SceneStructure = (
  options: {
    propCount: number;
    componentCount: number;
  },
) => Template[];

const sceneStructure: SceneStructure = ({ propCount, componentCount }) => {
  const propsSample = sample(fakeProps, propCount);
  const names = sample(componentNames, componentCount);
  return names.reduce((components, name) => {
    const numChildren = faker.random.number({
      min: 0,
      max: Math.max(componentCount, components.length),
    });
    const children = sample(components, numChildren);
    const props = sample(
      propsSample,
      faker.random.number({
        min: 2,
        max: propCount - 2,
      }),
    ).reduce((result, prop) => {
      result[prop.name] = prop.type;
      return result;
    }, {});

    components.push({
      name,
      template: "Stateless",
      props,
      children,
    });
    return components;
  }, []);
};

const main = () => {
  sceneStructure({ propCount: 20, componentCount: 13 }).forEach(component => {
    const code = templates[component.template](component);
    console.log(prettier.format(code, { parser: "typescript" }));
    console.log("-----------");
  });
};

main();
