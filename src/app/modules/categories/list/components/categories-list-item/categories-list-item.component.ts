import {Component, Input} from '@angular/core';
import {Category} from '../../../../../models';

@Component({
  selector: 'app-categories-list-item',
  templateUrl: './categories-list-item.component.html',
  styleUrls: ['./categories-list-item.component.css']
})
export class CategoriesListItemComponent {
  @Input() category: Category;
  constructor() { }

}
