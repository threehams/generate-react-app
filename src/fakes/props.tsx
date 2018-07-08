import faker from "faker";
import { concat, map, flatMap } from "lodash";

/* prettier-ignore */
export const fakeProps = [
  { name: "zipCode", func: faker.address.zipCode, type: "text" },
  { name: "city", func: faker.address.city, type: "text" },
  { name: "cityPrefix", func: faker.address.cityPrefix, type: "text" },
  { name: "citySuffix", func: faker.address.citySuffix, type: "text" },
  { name: "streetName", func: faker.address.streetName, type: "text" },
  { name: "streetAddress", func: faker.address.streetAddress, type: "text" },
  { name: "streetSuffix", func: faker.address.streetSuffix, type: "text" },
  { name: "streetPrefix", func: faker.address.streetPrefix, type: "text" },
  { name: "secondaryAddress", func: faker.address.secondaryAddress, type: "text" },
  { name: "county", func: faker.address.county, type: "text" },
  { name: "country", func: faker.address.country, type: "text" },
  { name: "countryCode", func: faker.address.countryCode, type: "text" },
  { name: "state", func: faker.address.state, type: "text" },
  { name: "stateAbbr", func: faker.address.stateAbbr, type: "text" },
  { name: "latitude", func: faker.address.latitude, type: "text" },
  { name: "longitude", func: faker.address.longitude, type: "text" },
  { name: "color", func: faker.commerce.color, type: "text" },
  { name: "department", func: faker.commerce.department, type: "text" },
  { name: "productName", func: faker.commerce.productName, type: "text" },
  { name: "price", func: faker.commerce.price, type: "text" },
  { name: "productAdjective", func: faker.commerce.productAdjective, type: "text" },
  { name: "productMaterial", func: faker.commerce.productMaterial, type: "text" },
  { name: "email", func: faker.internet.email, type: "email" },
  { name: "exampleEmail", func: faker.internet.exampleEmail, type: "email" },
  { name: "userName", func: faker.internet.userName, type: "text" },
  { name: "protocol", func: faker.internet.protocol, type: "text" },
  { name: "url", func: faker.internet.url, type: "url" },
  { name: "domainName", func: faker.internet.domainName, type: "text" },
  { name: "domainSuffix", func: faker.internet.domainSuffix, type: "text" },
  { name: "domainWord", func: faker.internet.domainWord, type: "text" },
  { name: "ip", func: faker.internet.ip, type: "url" },
  { name: "ipv6", func: faker.internet.ipv6, type: "url" },
  { name: "userAgent", func: faker.internet.userAgent, type: "text" },
  { name: "color", func: faker.internet.color, type: "text" },
  { name: "mac", func: faker.internet.mac, type: "text" },
  { name: "password", func: faker.internet.password, type: "text" },
  { name: "commerceProduct", func: faker.commerce.product, type: "text" },
  { name: "abbreviation", func: faker.hacker.abbreviation, type: "text" },
  { name: "adjective", func: faker.hacker.adjective, type: "text" },
  { name: "noun", func: faker.hacker.noun, type: "text" },
  { name: "verb", func: faker.hacker.verb, type: "text" },
  { name: "ingverb", func: faker.hacker.ingverb, type: "text" },
  { name: "phrase", func: faker.hacker.phrase, type: "text" },
  { name: "image", func: faker.image.image, type: "image" },
  { name: "avatar", func: faker.image.avatar, type: "image" },
  { name: "imageUrl", func: faker.image.imageUrl, type: "image" },
  { name: "abstract", func: faker.image.abstract, type: "image" },
  { name: "animals", func: faker.image.animals, type: "image" },
  { name: "business", func: faker.image.business, type: "image" },
  { name: "cats", func: faker.image.cats, type: "image" },
  { name: "city", func: faker.image.city, type: "image" },
  { name: "food", func: faker.image.food, type: "image" },
  { name: "nightlife", func: faker.image.nightlife, type: "image" },
  { name: "fashion", func: faker.image.fashion, type: "image" },
  { name: "people", func: faker.image.people, type: "image" },
  { name: "nature", func: faker.image.nature, type: "image" },
  { name: "sports", func: faker.image.sports, type: "image" },
  { name: "technics", func: faker.image.technics, type: "image" },
  { name: "transport", func: faker.image.transport, type: "image" },
  { name: "dataUri", func: faker.image.dataUri, type: "image" },
  { name: "past", func: () => faker.date.past().toString(), type: "date" },
  { name: "future", func: () => faker.date.future().toString(), type: "date" },
  { name: "recent", func: () => faker.date.recent().toString(), type: "date" },
  { name: "month", func: () => faker.date.month().toString(), type: "date" },
  { name: "weekday", func: faker.date.weekday, type: "text" },
  { name: "account", func: faker.finance.account, type: "text" },
  { name: "accountName", func: faker.finance.accountName, type: "text" },
  { name: "mask", func: faker.finance.mask, type: "text" },
  { name: "amount", func: faker.finance.amount, type: "text" },
  { name: "transactionType", func: faker.finance.transactionType, type: "text" },
  { name: "currencyCode", func: faker.finance.currencyCode, type: "text" },
  { name: "currencyName", func: faker.finance.currencyName, type: "text" },
  { name: "currencySymbol", func: faker.finance.currencySymbol, type: "text" },
  { name: "bitcoinAddress", func: faker.finance.bitcoinAddress, type: "text" },
  { name: "iban", func: faker.finance.iban, type: "text" },
  { name: "bic", func: faker.finance.bic, type: "text" },
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

export const getTypescriptType = type => {
  return typeMappings[type];
};
