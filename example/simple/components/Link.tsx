import React from "react";

interface Props {
  name: string;
  address: string;
  phone: string;
}

export const Link: React.SFC<Props> = ({ name, address, phone }) => {
  return (
    <div>
      <h1>name: {name}</h1>
      <h2>address: {address}</h2>
      <p>phone: {phone}</p>
    </div>
  );
};
