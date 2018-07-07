import React from "react";

interface Props {}

export const List: React.SFC<Props> = ({ children }) => {
  return <ul>{children}</ul>;
};
