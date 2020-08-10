import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Category, FbResponse, Subcategory} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  arrSubcategories;

  constructor(private http: HttpClient) {
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${environment.fbDbUrl}/categories.json`, category)
      .pipe(map((res: FbResponse) => {
        return {
          ...category,
          id: res.name
        };
      }));
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category>(`${environment.fbDbUrl}/categories.json`)
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
        catchError(err => {
          return throwError(err);
        }));
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.fbDbUrl}/categories/${id}.json`)
      .pipe(map((category: Category) => {
        return {
          ...category,
          id
        };
      }));
  }

  getSubcategoryById(id: string): Observable<Subcategory> {
    return this.http.get<Subcategory>(`${environment.fbDbUrl}/subcategories/${id}.json`)
      .pipe(map((subcategory: Subcategory) => {
        return {
          ...subcategory,
          id
        };
      }));
  }

  updateCategory(category: Category): Observable<Category> {
    console.log(category.id);
    return this.http.patch<Category>(`${environment.fbDbUrl}/categories/${category.id}.json`, category);
  }

  updateSubcategory(subcategory: Subcategory): Observable<Subcategory> {
    return this.http.patch<Subcategory>(`${environment.fbDbUrl}/subcategories/${subcategory.id}.json`, subcategory);
  }

  createSubcategory(subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(`${environment.fbDbUrl}/subcategories.json`, subcategory)
      .pipe(map((res: FbResponse) => {
        return {
          ...subcategory,
          id: res.name
        };
      }));
  }

  getAllSubcategories() {
    return this.http.get<Subcategory>(`${environment.fbDbUrl}/subcategories.json`)
      .pipe(map((res: { [key: string]: any }) => {
        if (res === null) {
          return;
        }
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key
          }));
      }));
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/categories/${id}.json`);
  }

  deleteSubcategory(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/subcategories/${id}.json`);
  }

  rus_to_latin(str) {
    const ru = {
      а: 'a', б: 'b', в: 'v', г: 'g', д: 'd',
      е: 'e', ё: 'e', ж: 'j', з: 'z', и: 'i',
      к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
      п: 'p', р: 'r', с: 's', т: 't', у: 'u',
      ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh',
      щ: 'shch', ы: 'y', э: 'e', ю: 'u', я: 'ya',
      ' ': '-'
    };
    const nStr = [];

    str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

    for (const i of str) {
      nStr.push(
        ru[i]
        || ru[i.toLowerCase()] === undefined && i
        || ru[i.toLowerCase()].replace(/^(.)/, (match) => {
          return match.toUpperCase();
        })
      );
    }

    return nStr.join('');
  }
}
