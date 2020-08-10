import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../shared/services/category.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {filter, switchMap} from 'rxjs/operators';
import {Subcategory} from '../../../shared/interfaces';

@Component({
  selector: 'app-subcategories-page',
  templateUrl: './subcategories-page.component.html',
  styleUrls: ['./subcategories-page.component.css']
})
export class SubcategoriesPageComponent implements OnInit {

  arrSubcategories: Subcategory[];
  paramsCategory;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getAllSubcategoriesByCategoryId();
  }


  getAllSubcategoriesByCategoryId() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.paramsCategory = params.category;
        return this.categoryService.getCategoryById(params.category);
      })
    ).subscribe(category => {
      this.categoryService.getAllSubcategories().subscribe(subcategories => {
        this.arrSubcategories = subcategories.filter(subcategory => subcategory.categoryId === category.id);
      });
    });
  }

}
