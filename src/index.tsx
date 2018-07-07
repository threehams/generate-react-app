import React from "react";
import faker from "faker";
import seedrandom from "seedrandom";
import prettier from "prettier";
import { flatMap, omit } from "lodash";

const seed = 5348312;
faker.seed(seed);
const random = seedrandom(seed.toString());

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

const range = (count: number) => {
  return Array.from(Array(count).keys());
};

type PropType = "string" | "";

type PropHandlers = {
  [key: string]: (name: string) => string;
};

const propChildren: PropHandlers = {
  string: name => `<h4>${name}: {${name}}</h4>`,
  "string[]": name => {
    return `<ul>{${name}.map(item => <li>{item}</li>)}</ul>`;
  },
};

const RESPONSE = {
  name: faker.name.firstName(),
  address: faker.address.streetAddress(),
  phone: faker.phone.phoneNumber(),
  scsi: faker.hacker.noun(),
  phrases: range(faker.random.number()).map(faker.hacker.phrase),
};

const Stateless = ({ name, props, children }: Template) => {
  const imports = children.map(child => {
    return `import {${child.name}} from "./${child.name}";\n`;
  });
  const propTypes = Object.entries(props)
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
  const childProps = flatMap(children, child => Object.keys(child.props));
  const internalChildren = Object.entries(omit(props, childProps))
    .map(([name, type]) => propChildren[type](name))
    .join("\n");

  const propKeys = Object.keys(props).join(", ");
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
    ...child.props,
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
    ...parent.props,
  },
  children: [parent],
};

const appStructure: Template[] = [grandparent, parent, child];

const main = () => {
  appStructure.forEach(component => {
    const code = templates[component.template](component);
    console.log(prettier.format(code, { parser: "typescript" }));
  });
};

main();
