export interface FbResponse {
  name: string;
}

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

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  name?: string;
  photo?: string;
  id?: string;
  iSubcategory?: boolean;
}

export interface Subcategory {
  name?: string;
  photo?: string;
  id?: string;
  categoryId?: string;
}

export interface Order {
  name?: string;
  surname?: string;
  street0?: string;
  street1?: string;
  phone?: string;
  city?: string;
  payment?: string;
  additionalInformation?: string;
  postcode?: string;
  price?: any;
  orders?: CartItem[];
  date?: any;
  id?: string;
}

export interface IBreadCrumb {
  label: string;
  url: string;
}