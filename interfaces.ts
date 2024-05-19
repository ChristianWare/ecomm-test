export interface CollectionType {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
}

export interface ProductType {
  _id: string;
  title: string;
  description: string;
  media: string[];
  category: string;
  collections: CollectionType[];
  tags: string[];
  sizes: string[];
  colors: string[];
  price: number;
  expense: number;
  createdAt: Date;
  updatedAt: Date;
}
