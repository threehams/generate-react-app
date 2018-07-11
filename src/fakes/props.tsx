import faker from "faker";
import { concat, map, flatMap } from "lodash";

export type PropType = "text" | "url" | "image" | "date" | "email";

export interface Prop {
  name: string;
  func: Function;
  type: PropType;
  category: string;
}

/* prettier-ignore */
export const fakeProps: Prop[] = [
  { name: "zipCode", func: faker.address.zipCode, type: "text", category: "address" },
  { name: "city", func: faker.address.city, type: "text", category: "address" },
  { name: "cityPrefix", func: faker.address.cityPrefix, type: "text", category: "address" },
  { name: "citySuffix", func: faker.address.citySuffix, type: "text", category: "address" },
  { name: "streetName", func: faker.address.streetName, type: "text", category: "address" },
  { name: "streetAddress", func: faker.address.streetAddress, type: "text", category: "address" },
  { name: "streetSuffix", func: faker.address.streetSuffix, type: "text", category: "address" },
  { name: "streetPrefix", func: faker.address.streetPrefix, type: "text", category: "address" },
  { name: "secondaryAddress", func: faker.address.secondaryAddress, type: "text", category: "address" },
  { name: "county", func: faker.address.county, type: "text", category: "address" },
  { name: "country", func: faker.address.country, type: "text", category: "address" },
  { name: "countryCode", func: faker.address.countryCode, type: "text", category: "address" },
  { name: "state", func: faker.address.state, type: "text", category: "address" },
  { name: "stateAbbr", func: faker.address.stateAbbr, type: "text", category: "address" },
  { name: "latitude", func: faker.address.latitude, type: "text", category: "address" },
  { name: "longitude", func: faker.address.longitude, type: "text", category: "address" },
  { name: "color", func: faker.commerce.color, type: "text", category: "commerce" },
  { name: "department", func: faker.commerce.department, type: "text", category: "commerce" },
  { name: "productName", func: faker.commerce.productName, type: "text", category: "commerce" },
  { name: "price", func: faker.commerce.price, type: "text", category: "commerce" },
  { name: "productAdjective", func: faker.commerce.productAdjective, type: "text", category: "commerce" },
  { name: "productMaterial", func: faker.commerce.productMaterial, type: "text", category: "commerce" },
  { name: "email", func: faker.internet.email, type: "email", category: "internet" },
  { name: "exampleEmail", func: faker.internet.exampleEmail, type: "email", category: "internet" },
  { name: "userName", func: faker.internet.userName, type: "text", category: "internet" },
  { name: "protocol", func: faker.internet.protocol, type: "text", category: "internet" },
  { name: "url", func: faker.internet.url, type: "url", category: "internet" },
  { name: "domainName", func: faker.internet.domainName, type: "text", category: "internet" },
  { name: "domainSuffix", func: faker.internet.domainSuffix, type: "text", category: "internet" },
  { name: "domainWord", func: faker.internet.domainWord, type: "text", category: "internet" },
  { name: "ip", func: faker.internet.ip, type: "url", category: "internet" },
  { name: "ipv6", func: faker.internet.ipv6, type: "url", category: "internet" },
  { name: "userAgent", func: faker.internet.userAgent, type: "text", category: "internet" },
  { name: "color", func: faker.internet.color, type: "text", category: "internet" },
  { name: "mac", func: faker.internet.mac, type: "text", category: "internet" },
  { name: "password", func: faker.internet.password, type: "text", category: "internet" },
  { name: "commerceProduct", func: faker.commerce.product, type: "text", category: "commerce" },
  { name: "abbreviation", func: faker.hacker.abbreviation, type: "text", category: "hacker" },
  { name: "adjective", func: faker.hacker.adjective, type: "text", category: "hacker" },
  { name: "noun", func: faker.hacker.noun, type: "text", category: "hacker" },
  { name: "verb", func: faker.hacker.verb, type: "text", category: "hacker" },
  { name: "ingverb", func: faker.hacker.ingverb, type: "text", category: "hacker" },
  { name: "phrase", func: faker.hacker.phrase, type: "text", category: "hacker" },
  { name: "image", func: faker.image.image, type: "image", category: "image" },
  { name: "avatar", func: faker.image.avatar, type: "image", category: "image" },
  { name: "imageUrl", func: faker.image.imageUrl, type: "image", category: "image" },
  { name: "abstract", func: faker.image.abstract, type: "image", category: "image" },
  { name: "animals", func: faker.image.animals, type: "image", category: "image" },
  { name: "business", func: faker.image.business, type: "image", category: "image" },
  { name: "cats", func: faker.image.cats, type: "image", category: "image" },
  { name: "city", func: faker.image.city, type: "image", category: "image" },
  { name: "food", func: faker.image.food, type: "image", category: "image" },
  { name: "nightlife", func: faker.image.nightlife, type: "image", category: "image" },
  { name: "fashion", func: faker.image.fashion, type: "image", category: "image" },
  { name: "people", func: faker.image.people, type: "image", category: "image" },
  { name: "nature", func: faker.image.nature, type: "image", category: "image" },
  { name: "sports", func: faker.image.sports, type: "image", category: "image" },
  { name: "technics", func: faker.image.technics, type: "image", category: "image" },
  { name: "transport", func: faker.image.transport, type: "image", category: "image" },
  { name: "dataUri", func: faker.image.dataUri, type: "image", category: "image" },
  { name: "past", func: () => faker.date.past().toString(), type: "date", category: "date" },
  { name: "future", func: () => faker.date.future().toString(), type: "date", category: "date" },
  { name: "recent", func: () => faker.date.recent().toString(), type: "date", category: "date" },
  { name: "month", func: () => faker.date.month().toString(), type: "date", category: "date" },
  { name: "weekday", func: faker.date.weekday, type: "text", category: "date" },
  { name: "account", func: faker.finance.account, type: "text", category: "finance" },
  { name: "accountName", func: faker.finance.accountName, type: "text", category: "finance" },
  { name: "mask", func: faker.finance.mask, type: "text", category: "finance" },
  { name: "amount", func: faker.finance.amount, type: "text", category: "finance" },
  { name: "transactionType", func: faker.finance.transactionType, type: "text", category: "finance" },
  { name: "currencyCode", func: faker.finance.currencyCode, type: "text", category: "finance" },
  { name: "currencyName", func: faker.finance.currencyName, type: "text", category: "finance" },
  { name: "currencySymbol", func: faker.finance.currencySymbol, type: "text", category: "finance" },
  { name: "bitcoinAddress", func: faker.finance.bitcoinAddress, type: "text", category: "finance" },
  { name: "iban", func: faker.finance.iban, type: "text", category: "finance" },
  { name: "bic", func: faker.finance.bic, type: "text", category: "finance" },
];

const componentPrefixes = [
  "Main",
  "Side",
  "Body",
  "Header",
  "Footer",
  "Upper",
  "Lower",
];

const componentBases = [
  "Info",
  "List",
  "Detail",
  "Utility",
  "Value",
  "Data",
  "System",
];

const componentSuffixes = [
  "Group",
  "Component",
  "Container",
  "Wrapper",
  "Panel",
  "Card",
  "Block",
  "Bar",
  "Table",
  "Section",
  "Module",
  "Segment",
  "Board",
];

const permutations = (arr1: string[], arr2: string[]) => {
  return flatMap(arr1, item1 => {
    return map(arr2, item2 => {
      return item1 + item2;
    });
  });
};

export const getComponentNames = () => {
  const prefixes = faker.helpers.shuffle(componentPrefixes);
  const bases = faker.helpers.shuffle(componentBases);
  const suffixes = faker.helpers.shuffle(componentSuffixes);
  return concat(
    bases,
    permutations(permutations(prefixes, bases), suffixes),
    permutations(prefixes, bases),
    permutations(bases, suffixes),
  );
};

const typeMappings = {
  text: "string",
  date: "string",
  image: "string",
  email: "string",
  url: "string",
};

export const getTypescriptType = (type: PropType) => {
  return typeMappings[type];
};
