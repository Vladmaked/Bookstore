import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseCategories, ResponseCategory} from '../../../../models';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<ResponseCategories> {
    return this.http.get<ResponseCategories>(`${environment.apiUrl}/api/categories`);
  }

  getCategoryById(categoryId: string): Observable<ResponseCategory> {
    return this.http.get<ResponseCategory>(`${environment.apiUrl}/api/categories${categoryId}`);
  }

  createCategory(categoryName: string): Observable<ResponseCategory> {
    return this.http.post<ResponseCategory>(`${environment.apiUrl}/api/categories`, {name: categoryName});
  }

  updateCategory(categoryId: string, categoryName: string): Observable<ResponseCategory> {
    return this.http.patch<ResponseCategory>(`${environment.apiUrl}/api/categories/${categoryId}`, {name: categoryName});
  }

  deleteCategory(categoryId: string): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/api/categories/${categoryId}`);
  }
}
