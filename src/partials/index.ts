export const heading = (name: string): string => `<h4>${name}: {${name}}</h4>`;
export const text = (name: string) => `<div>${name}: {${name}}</div>`;
export const image = (name: string) => `<img src={${name}} alt="${name}" />`;
export const emailLink = (name: string) => {
  return `<a href={"mailto:" + ${name}}>{${name}}</a>`;
};
export const link = (name: string) => `<a href={${name}}>{${name}}</a>`;
export const branch = (name: string, a: string, b: string) => {
  return `{${name} ? ${a} : ${b}}`;
};
export const guard = (name: string, a: string) => `{${name} && ${a}}`;
export const toggle = (name: string) => {
  return `
    <button onClick={() => this.setState({ ${name}: !${name} })}>
      Toggle ${name}
    </button>
  `;
};
