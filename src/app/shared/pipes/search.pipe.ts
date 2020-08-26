import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../interfaces';
import {ProductService} from '../services/product.service';
import {isEmpty} from 'rxjs/operators';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  constructor(private productService: ProductService) {
  }

  transform(products: Product[], productName = ''): Product[] {
    if (!productName.trim()) {
      return products;
    }

    products = products.filter(product => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });

    if (products.length === 0) {
      this.productService.isEmpty = true;
    } else {
      this.productService.isEmpty = false;
    }

    return products;

  }
}
