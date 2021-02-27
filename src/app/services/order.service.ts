import {Injectable} from '@angular/core';
import {fbDbEnvironment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {FbResponse} from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient
  ) {
  }

  create(order) {
    return this.http.post(`${fbDbEnvironment.fbDbUrl}/orders.json`, order)
      .pipe(map((res: FbResponse) => {
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        };
      }));
  }

  getAll() {
    return this.http.get(`${fbDbEnvironment.fbDbUrl}/orders.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }));
      }));
  }

  remove(id) {
    return this.http.delete(`${fbDbEnvironment.fbDbUrl}/orders/${id}.json`);
  }
}
