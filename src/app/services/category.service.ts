import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {fbDbEnvironment} from '../../environments/environment';
import {catchError, map, shareReplay, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Category, FbResponse, Subcategory} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories$: Observable<Category[]>;
  subcategories$: Observable<Subcategory[]>;

  constructor(private http: HttpClient) {
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${fbDbEnvironment.fbDbUrl}/categories.json`, category)
      .pipe(map((res: FbResponse) => {
        console.log(res);
        return {
          ...category,
          id: res.name
        };
      }));
  }

  getAllCategories(): Observable<Category[]> {
    if (!this.categories$) {
      this.categories$ = this.http.get<Category>(`${fbDbEnvironment.fbDbUrl}/categories.json`)
        .pipe(map((res: { [key: string]: any }) => {
            if (res === null) {
              return;
            }
            return Object.keys(res)
              .map(key => ({
                ...res[key],
                id: key
              }));
          }),
          shareReplay(1),
          take(1),
          catchError(err => {
            return throwError(err);
          }));
    }
    return this.categories$;
  }

  getAllSubcategories(): Observable<Subcategory[]> {
    if (!this.subcategories$) {
      this.subcategories$ = this.http.get<Subcategory>(`${fbDbEnvironment.fbDbUrl}/subcategories.json`)
        .pipe(map((res: { [key: string]: any }) => {
            if (res === null) {
              return;
            }
            return Object.keys(res)
              .map(key => ({
                ...res[key],
                id: key
              }));
          }),
          shareReplay(1),
          take(1),
          catchError(err => {
            return throwError(err);
          }));
    }
    return this.subcategories$;
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${fbDbEnvironment.fbDbUrl}/categories/${id}.json`)
      .pipe(map((category: Category) => {
        return {
          ...category,
          id
        };
      }));
  }

  getSubcategoryById(id: string): Observable<Subcategory> {
    return this.http.get<Subcategory>(`${fbDbEnvironment.fbDbUrl}/subcategories/${id}.json`)
      .pipe(map((subcategory: Subcategory) => {
        return {
          ...subcategory,
          id
        };
      }));
  }

  updateCategory(category: Category): Observable<Category> {
    console.log(category.id);
    return this.http.patch<Category>(`${fbDbEnvironment.fbDbUrl}/categories/${category.id}.json`, category);
  }

  updateSubcategory(subcategory: Subcategory): Observable<Subcategory> {
    return this.http.patch<Subcategory>(`${fbDbEnvironment.fbDbUrl}/subcategories/${subcategory.id}.json`, subcategory);
  }

  createSubcategory(subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(`${fbDbEnvironment.fbDbUrl}/subcategories.json`, subcategory)
      .pipe(map((res: FbResponse) => {
        return {
          ...subcategory,
          id: res.name
        };
      }));
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${fbDbEnvironment.fbDbUrl}/categories/${id}.json`);
  }

  deleteSubcategory(id: string): Observable<void> {
    return this.http.delete<void>(`${fbDbEnvironment.fbDbUrl}/subcategories/${id}.json`);
  }

  getAllSubcategoriesByCategoryId(id: string): Observable<Subcategory[]> {
    return this.http.get<Subcategory>(`${fbDbEnvironment.fbDbUrl}/subcategories.json`)
      .pipe(map(res => {
          if (res === null) {
            return;
          }
          return Object.keys(res)
            .map(key => ({
              ...res[key],
              id: key,
              date: new Date(res[key].date)
            }));
        }),
        map(subcategories => {
            return subcategories.filter(subcategory => {
              return subcategory.categoryId.includes(id);
            });
          }
        ),
        shareReplay(1),
        take(1),
        catchError(err => {
          return throwError(err);
        }));
  }
}
