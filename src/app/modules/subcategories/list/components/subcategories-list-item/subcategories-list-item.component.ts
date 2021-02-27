import {Component, Input} from '@angular/core';
import {Subcategory} from '../../../../../models';

@Component({
  selector: 'app-subcategory-list-item',
  templateUrl: './subcategories-list-item.component.html',
  styleUrls: ['./subcategories-list-item.component.css']
})
export class SubcategoriesListItemComponent {
  @Input() subcategory: Subcategory;
  @Input() categoryId: string;

  constructor() {
  }

}
