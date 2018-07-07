import faker from "faker";
import seedrandom from "seedrandom";

const seed = 5348312;
faker.seed(seed);
const random = seedrandom(seed.toString());

const DEFAULTS = {
  chaos: 0, // general amount of bugs, bad practices, and runtime errors
  componentSize: 25, // size of individual components
  connections: 50, // % of components connected to redux
  endpoints: 10, // number of different API endpoints
  fetch: false, // whether to fetch needed data in componentDidMount
  indirection: 0, // % of props renamed while passing through hierarchy
  legacy: 0, // % known bad practices for bundling
  localState: 10, // % of local state vs. redux state
  maxSize: 100, // max number of components per split point
  minSize: 100, // min number of components per split point
  parallelRequests: 2, // max number of parallel API requests per scene
  rest: false, // pass props with ...rest where possible
  snapshots: 25, // % of tests using Jest snapshots
  split: 5, // number of root-level elements
  tests: 25, // % of test coverage
  types: false, // typescript, flow, or false
  variation: 50, // %difference between split point size
};

const range = (count: number) => {
  return Array.from(Array(count).keys());
};

const RESPONSE = {
  name: faker.name.firstName(),
  address: faker.address.streetAddress(),
  phone: faker.phone.phoneNumber(),
  scsi: faker.hacker.noun(),
  active: faker.random.boolean(),
  phrases: range(faker.random.number()).map(faker.hacker.phrase),
};

const appStructure = [
  "Stateless",
  {
    name: "string",
    address: "string",
    phone: "string",
    scsi: "string",
    active: "boolean",
    phrases: "string[]",
  },
  [
    [
      "Stateless",
      {
        name: "string",
        address: "string",
        phone: "string",
        scsi: "string",
        active: "boolean",
        phrases: "string[]",
      },
      [
        [
          "Stateless",
          {
            name: "string",
            address: "string",
            phone: "string",
          },
        ],
      ],
    ],
  ],
];

const main = () => {
  appStructure.forEach(component => {
    console.log(component);
  });
};

main();
