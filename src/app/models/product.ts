export interface Product {
  category?: string;
  subcategory?: string;
  title?: string;
  author?: string;
  photo?: string;
  info?: string;
  price?: string;
  date?: Date;
  id?: string;
  quantityInStock?: number;
}

export interface Data {
  docs: Product[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface ResponseProducts {
  data: Data;
  status: string;
}

export interface ResponseProduct {
  data: Product;
  status: string;
}
