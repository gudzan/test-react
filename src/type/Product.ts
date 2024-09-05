export interface Product {
    id: string;
    title: string;
    price: number | null;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    like: boolean;
}

export interface Rating {
    rate: number | null;
    count: number | null;
}
