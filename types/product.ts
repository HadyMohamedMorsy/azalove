export interface Product {
  id: string | number;
  name: string;
  image: string;
  author: string;
  price: number;
  category: {
    name: string;
  };
  slug: string;
}
