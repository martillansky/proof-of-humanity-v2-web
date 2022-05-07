declare module "typography-theme-sutro" {
  export = any;
}

declare module "*.svg" {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}
