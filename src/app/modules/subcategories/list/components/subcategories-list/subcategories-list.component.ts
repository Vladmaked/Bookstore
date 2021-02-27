import {Component, Input} from '@angular/core';
import {Subcategory} from '../../../../../models';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.css']
})
export class SubcategoriesListComponent {
  @Input() subcategories: Subcategory[];
  categoryId;

  constructor(route: ActivatedRoute) {
    route.params.pipe(switchMap(params => {
      this.categoryId = params[`category`];
      console.log(this.categoryId);
      return this.categoryId;
    })).subscribe();
  }

}
