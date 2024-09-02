export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  like: boolean;
}

interface Rating {
  rate: number;
  count: number;
}