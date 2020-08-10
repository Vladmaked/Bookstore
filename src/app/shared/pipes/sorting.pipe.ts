import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../interfaces';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {
  transform(products: Product[], category?: string, subcategory?: string): any {
    return products.filter(product => {
      return category ? product.category === category : subcategory ? product.subcategory === subcategory : false;
    });
  }

}
