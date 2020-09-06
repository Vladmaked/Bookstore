import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../../shared/services/category.service';
import {Category} from '../../../shared/interfaces';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {

  constructor(
    public categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
  }

  arrCategories: Category[] = [];
  cSub: Subscription;
  filtersItem: any = false;
  filtersForm: FormGroup;

  userListControl: FormGroup;

  @ViewChild('filters') el: ElementRef;

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.filtersItem = false;
    }
    //     else { Logic for click inside
    //     this.filtersItem = !this.filtersItem; }
  }

  ngOnInit(): void {
    this.getCategories();
    this.createFiltersForm();

    this.userListControl = this.formBuilder.group({
      categories: this.formBuilder.array([['one'], ['two'], ['thee']])
    });
    this.userListControl.valueChanges.subscribe(value => console.log(value));
  }

  getCategories() {
    this.cSub = this.categoryService.getAllCategories().subscribe(category => {
      this.arrCategories = category;
    });
  }

  createFiltersForm() {
    this.filtersForm = new FormGroup({});
  }


  filter() {
    console.log('Form:', this.filtersForm);
    const formData = {...this.filtersForm.value};
    console.log('Form Data:', formData);
  }


  ngOnDestroy() {
    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

  send() {
    console.log(this.filtersForm.value);
  }
}
