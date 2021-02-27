import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../models';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {
  transform(products: Product[]): Product[] {
    return products.reverse();
  }

}
