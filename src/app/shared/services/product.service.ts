import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {FbResponse, Product} from '../interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productName;

  constructor(private http: HttpClient) {
  }

  createProduct(product) {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
      .pipe(map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        };
      }));
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product>(`${environment.fbDbUrl}/products.json`)
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
      }));
  }

  getAllProductsByCategoryId(id: string): Observable<Product[]> {
    return this.http.get<Product>(`${environment.fbDbUrl}/products.json`)
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
        ));
  }

  getProductById(id): Observable<Product> {
    return this.http.get(`${environment.fbDbUrl}/products/${id}.json`)
      .pipe(map((res: Product) => {
        return {
          ...res,
          id,
          date: new Date(res.date)
        };
      }));
  }

  removeProduct(id) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`);
  }

  updateProduct(product: Product) {
    console.log('product', product);
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product);
  }


  getAllProductsBySubcategoryId(id: string): Observable<Product[]> {
    return this.http.get<Product>(`${environment.fbDbUrl}/products.json`)
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
