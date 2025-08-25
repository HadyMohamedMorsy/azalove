export interface PaymentMethod {
  id: number;
  name: string;
  icon: string;
  slug: string;
  is_active: boolean;
}

export interface Bank {
  id: number;
  accountName: string;
  accountNumber: string;
  featuredImage: string;
  branchName: string;
  bankName: string;
  iban: string;
  swiftCode: string;
  is_active: boolean;
  country: {
    id: number;
    name: string;
  };
  region: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
  };
  area: {
    id: number;
    name: string;
  };
}

export interface PaymentMethodsResponse {
  success: boolean;
  data: PaymentMethod[];
  message: string;
}

export interface BanksResponse {
  success: boolean;
  data: Bank[];
  message: string;
}
