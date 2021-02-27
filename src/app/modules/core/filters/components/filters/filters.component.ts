import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../../../../services';
import {FormGroup} from '@angular/forms';
import {Observable, ReplaySubject} from 'rxjs';
import {Category} from '../../../../../models';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  filtersItem: any = false;
  filtersForm;
  categories$: Observable<Category[]>;

  @ViewChild('filters') el: ElementRef;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.filtersItem = false;
    }
  }

  constructor(
    public categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.createFiltersForm();
    this.categories$ = this.categoryService.getAllCategories();
  }

  private createFiltersForm() {
    this.filtersForm = new FormGroup({});
  }
}
