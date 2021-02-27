import {Component, Input} from '@angular/core';
import {Category} from '../../../../../models';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {
  @Input() categories: Category[];

  constructor() {
  }

}
