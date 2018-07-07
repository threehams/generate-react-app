import React from "react";

interface Props {}

export const ListItem: React.SFC<Props> = ({ children }) => {
  return <li>{children}</li>;
};
