export type PropType =
  | "text"
  | "url"
  | "image"
  | "date"
  | "email"
  | "boolean"
  | "case";

export interface Prop {
  name: string;
  func: Function;
  type: PropType;
  category: string | null;
}

export interface Template {
  name: string;
  template: string;
  props: Prop[];
  children: Template[];
  importPath: string;
}
