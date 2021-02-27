export interface Category {
  name?: string;
  photo?: string;
  id?: string;
  isSubcategory?: boolean;
}

export interface ResponseCategories {
  categories: Category[];
  status: string;
}

export interface ResponseCategory {
  category: Category;
  status: string;
}
