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

export interface Order {
  id: string;
  payment: string;
  paymentStatus: string;
  status: string;
  total: number;
  createdBy: string;
}

export interface Location {
  label: string;
  value: number;
}

export interface Address {
  id?: number;
  title: string;
  addressLine1: string;
  addressLine2?: string;
  countryId: number;
  regionId: number;
  cityId: number;
  areaId: number;
  country?: Location;
  region?: Location;
  city?: Location;
  area?: Location;
  postalCode: string;
  landmark?: string;
  phoneNumber: string;
  isDefault?: boolean;
}

export type AddressFormData = Omit<
  Address,
  "id" | "isDefault" | "country" | "region" | "city" | "area"
>;
