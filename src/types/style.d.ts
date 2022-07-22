import { ContractInterface } from "ethers";

declare module "*.svg" {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.jpg";
declare module "*.png";

// declare module "*.json" {
//   const value: ContractInterface;
//   export default value;
// }
