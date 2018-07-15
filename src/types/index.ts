export type PropType = "text" | "url" | "image" | "date" | "email";

export interface Prop {
  name: string;
  func: Function;
  type: PropType;
  category: string;
}

export type Props = { [key: string]: PropType };

export interface Template {
  name: string;
  template: string;
  props: Props;
  children: Template[];
  scene: boolean;
}
