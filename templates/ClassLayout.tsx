interface Props {
  imports: string[];
  props: Object;
  children: string;
}

export const ClassLayout = ({ imports, props, children }: Props) => `
import React from "react";
${imports}

export const ClassLayout = (${JSON.stringify(props)}) => {
  return (
    <div>
      ${children}
    </div>
  );
};
`;
