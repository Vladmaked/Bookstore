import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseSubcategories, ResponseSubcategory} from '../../../../models';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class SubcategoriesService {

  constructor(private http: HttpClient) {
  }

  getAllSubcategories(): Observable<ResponseSubcategories> {
    return this.http.get<ResponseSubcategories>(`${environment.apiUrl}/api/subcategories`);
  }

  getAllSubcategoriesByCategoryId(categoryId: string): Observable<ResponseSubcategories> {
    return this.http.get<ResponseSubcategories>(`${environment.apiUrl}/api/categories/${categoryId}/subcategories`);
  }

  getSubcategoryById(subcategoryId: string): Observable<ResponseSubcategory> {
    return this.http.get<ResponseSubcategory>(`${environment.apiUrl}/api/subcategories/${subcategoryId}`);
  }

  updateSubcategoryById(subcategoryId: string, subcategoryName: string): Observable<ResponseSubcategory> {
    return this.http.patch<ResponseSubcategory>(`${environment.apiUrl}/api/subcategories/${subcategoryId}`, {name: subcategoryName});
  }

  createSubcategory(categoryId: string, subcategoryName: string): Observable<ResponseSubcategory> {
    return this.http.post<ResponseSubcategory>(`${environment.apiUrl}/api/subcategories`, {
      categoryId: `${categoryId}`,
      name: subcategoryName
    });
  }

  createSubcategoryByCategoryId(categoryId: string, subcategoryName: string): Observable<ResponseSubcategory> {
    return this.http.post<ResponseSubcategory>(`${environment.apiUrl}/api/categories/${categoryId}/subcategories`, {name: subcategoryName});
  }

  deleteSubcategory(SubcategoryId: string): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/api/subcategories/${SubcategoryId}`);
  }
}
