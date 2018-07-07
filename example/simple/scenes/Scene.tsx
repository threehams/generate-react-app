import faker from "faker";
import { Grandparent } from "../components/Grandparent";

const range = count => {
  return Array.from(Array(count).keys());
};

const RESPONSE = {
  name: faker.name.firstName(),
  address: faker.address.streetAddress(),
  phone: faker.phone.phoneNumber(),
  scsi: faker.hacker.noun(),
  active: faker.random.boolean(),
  phrases: range(faker.random).map(faker.hacker.phrase),
};

export default () => {
  const { name, address, phone, scsi, active, phrases } = RESPONSE;

  return (
    <Grandparent
      name={name}
      address={address}
      phone={phone}
      scsi={scsi}
      active={active}
      phrases={phrases}
    />
  );
};
