import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product, ResponseProduct, ResponseProducts} from '../../../../models';
import {environment} from '../../../../../environments/environment';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<ResponseProducts> {
    return this.http.get<ResponseProducts>(`${environment.apiUrl}/api/products`);
  }

  getProductById(productId: string): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(`${environment.apiUrl}/api/products/${productId}`);
  }

  createProduct(product: Product): Observable<ResponseProduct> {
    return this.http.post<ResponseProduct>(`${environment.apiUrl}/api/products`, product);
  }

  updateProduct(productId: string, product: Product): Observable<ResponseProduct> {
    return this.http.patch<ResponseProduct>(`${environment.apiUrl}/api/products/${productId}`, product);
  }

  deleteProduct(productId: string): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/api/products/${productId}`);
  }

}
