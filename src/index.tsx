require("source-map-support").install();

import faker from "faker/locale/en";
import prettier from "prettier";
import mkdirp from "mkdirp";
import path from "path";
import fs from "fs";
import appRootPath from "app-root-path";
import { fixtures, stateless } from "./templates";

import { getComponentNames, fakeProps } from "./fakes/props";

import { Prop, Template } from "./types";

const basePath = path.join(appRootPath.toString(), "sample");
const componentsPath = path.join(basePath, "components");
const scenesPath = path.join(basePath, "scenes");
const fixturesPath = path.join(basePath, "fixtures");

faker.seed(5348312);

const componentNames = getComponentNames();

const DEFAULTS = {
  // chaos: 0, // % chance of runtime errors
  componentCountMax: 25, // max components per scene
  componentCountMin: 10, // min components per scene
  componentChildrenMax: 5, // max number of (component) children per component
  componentChildrenMin: 1, // min number of (component) children per component
  // connections: 50, // % of components connected to redux
  // depth: 5, // max depth of component hierarchies
  // endpoints: 10, // number of different API endpoints
  // fetch: false, // whether to fetch needed data or leave that part to you
  // indirection: 0, // % chance of useless "rename and pass along" components
  // legacy: 0, // % known bad practices for bundling
  // localState: 10, // % of local state vs. redux state
  // maxSize: 100, // max number of components per split point
  // minSize: 100, // min number of components per split point
  // parallelRequests: 2, // max number of parallel API requests per scene
  // rest: false, // pass props with ...rest where possible
  reuse: 50, // % chance of reusing components between scenes
  propCountMax: 20, // max total prop count per scene
  propCountMin: 5, // min total prop count per scene
  // renaming: 0, // % chance of renaming props within a component
  // seed: null, // number seed for predictable results
  // snapshots: 25, // % of tests using Jest snapshots
  // split: 5, // number of root-level elements
  // tests: 25, // % of test coverage
  // types: false, // typescript, flow, or false
  // variation: 50, // % difference between scene size
};

const templates = { stateless, fixtures };

// returns a tuple of [items, remainingItems] for reuse
const sample = <T extends any>(array: T[], count: number): [T[], T[]] => {
  const shuffled = faker.helpers.shuffle(array);
  return [shuffled.slice(0, count), shuffled.slice(count, array.length - 1)];
};

type SceneStructure = (
  options: {
    propsSample: Prop[];
    names: string[];
  },
) => Template[];

const createSceneStructure: SceneStructure = ({ propsSample, names }) => {
  return names.reduce((components: Template[], name, index) => {
    const numChildren = faker.random.number({
      min: 0,
      max: Math.max(names.length, components.length),
    });
    const [children] = sample(components, numChildren);
    const [propSample] = sample(
      propsSample,
      faker.random.number({
        min: 2,
        max: propsSample.length - 2,
      }),
    );
    const props = propSample.reduce((result, prop) => {
      result[prop.name] = prop.type;
      return result;
    }, {});
    const importPath = index === names.length - 1 ? "../components/" : "./";

    components.push({
      name,
      template: "stateless",
      props,
      children,
      importPath,
      // state,
    });
    return components;
  }, []);
};

const createPaths = () => {
  mkdirp.sync(componentsPath);
  mkdirp.sync(scenesPath);
  mkdirp.sync(fixturesPath);
};

const main = () => {
  const options = { ...DEFAULTS };
  createPaths();

  const propCount = Math.round(
    faker.random.number({
      min: options.propCountMin,
      max: options.propCountMax,
    }),
  );
  const componentCount = Math.round(
    faker.random.number({
      min: options.componentCountMin,
      max: options.componentCountMax,
    }),
  );
  const [propsSample, remainingProps] = sample(fakeProps, propCount);
  const [names, remainingNames] = sample(componentNames, componentCount);
  const fileContents = createSceneStructure({ propsSample, names }).map(
    component => {
      const code = templates[component.template](component);
      return {
        name: component.name,
        code: prettier.format(code, { parser: "typescript" }),
      };
    },
  );
  const root = fileContents[fileContents.length - 1];
  fs.writeFileSync(path.join(scenesPath, `${root.name}.tsx`), root.code);
  fileContents.slice(0, fileContents.length - 2).forEach(contents => {
    fs.writeFileSync(
      path.join(componentsPath, `${contents.name}.tsx`),
      contents.code,
    );
  });
  const fixtureContents = templates.fixtures({ props: propsSample });
  fs.writeFileSync(
    path.join(fixturesPath, "data.tsx"),
    prettier.format(fixtureContents, {
      parser: "typescript",
    }),
  );
};

main();
