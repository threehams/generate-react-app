import React from "react";
import { Child } from "./Child";

interface Props {
  name: string;
  address: string;
  phone: string;
  scsi: string;
  phrases: string[];
}

export const Parent: React.SFC<Props> = ({
  name,
  address,
  phone,
  scsi,
  phrases,
}) => {
  return (
    <div>
      <h4>scsi: {scsi}</h4>
      <ul>{phrases.map(item => <li>{item}</li>)}</ul>
      <Child name={name} address={address} phone={phone} />
    </div>
  );
};
