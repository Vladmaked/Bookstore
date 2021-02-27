export interface Subcategory {
  name?: string;
  photo?: string;
  id?: string;
  categoryId?: string;
}

export interface ResponseSubcategories {
  subcategories: Subcategory[];
  status: string;
}

export interface ResponseSubcategory {
  subcategory: Subcategory;
  status: string;
}
