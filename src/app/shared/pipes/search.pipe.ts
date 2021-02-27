import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../models';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  constructor() {
  }

  transform(products: Product[], productName = ''): Product[] {
    if (!productName.trim()) {
      return products;
    }

    products = products.filter(product => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });

    return products;

  }
}
