import React from "react";

interface Props {
  name: string;
  address: string;
  phone: string;
}

export const Child: React.SFC<Props> = ({ name, address, phone }) => {
  return (
    <div>
      <h4>name: {name}</h4>
      <h4>address: {address}</h4>
      <h4>phone: {phone}</h4>
    </div>
  );
};
