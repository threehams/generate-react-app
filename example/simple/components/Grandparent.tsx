import React from "react";
import { Parent } from "./Parent";

interface Props {
  hacky: string[];
  name: string;
  address: string;
  phone: string;
  scsi: string;
  phrases: string[];
}

export const Grandparent: React.SFC<Props> = ({
  hacky,
  name,
  address,
  phone,
  scsi,
  phrases,
}) => {
  return (
    <div>
      <ul>{hacky.map(item => <li>{item}</li>)}</ul>
      <Parent
        name={name}
        address={address}
        phone={phone}
        scsi={scsi}
        phrases={phrases}
      />
    </div>
  );
};
