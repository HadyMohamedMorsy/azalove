import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface CartItem {
  id: string;
  name: string;
  price: number;
  finalPrice?: number;
  quantity: number;
  image: string;
  skuQuantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
