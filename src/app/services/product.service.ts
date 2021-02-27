import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {fbDbEnvironment} from '../../environments/environment';
import {catchError, map, shareReplay, take} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {FbResponse, Product} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products$: Observable<Product[]>;

  constructor(private http: HttpClient) {
  }

  createProduct(product) {
    return this.http.post(`${fbDbEnvironment.fbDbUrl}/products.json`, product)
      .pipe(map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        };
      }));
  }

  getAllProducts(): Observable<Product[]> {
    if (!this.products$) {
      this.products$ = this.http.get<Product[]>(`${fbDbEnvironment.fbDbUrl}/products.json`)
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
          shareReplay(1),
          take(1),
          catchError(err => {
            return throwError(err);
          }));
    }
    return this.products$;
  }

  getAllProductsByCategoryId(id: string): Observable<Product[]> {
    return this.http.get<Product>(`${fbDbEnvironment.fbDbUrl}/products.json`)
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
        map(products => {
            return products.filter(product => {
              return product.category.includes(id);
            });
          }
        ),
        shareReplay(1),
        take(1),
        catchError(err => throwError(err)));
  }

  getProductById(id): Observable<Product> {
    return this.http.get(`${fbDbEnvironment.fbDbUrl}/products/${id}.json`)
      .pipe(map((res: Product) => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        };
      }));
  }

  removeProduct(id) {
    return this.http.delete(`${fbDbEnvironment.fbDbUrl}/products/${id}.json`);
  }

  updateProduct(product: Product) {
    console.log('product', product);
    return this.http.patch(`${fbDbEnvironment.fbDbUrl}/products/${product.id}.json`, product);
  }


  getAllProductsBySubcategoryId(id: string): Observable<Product[]> {
    return this.http.get<Product>(`${fbDbEnvironment.fbDbUrl}/products.json`)
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
        map(products => {
            return products.filter(product => {
              if (product.subcategory) {
                return product.subcategory.includes(id);
              }
            });
          }
        ));
  }

}
