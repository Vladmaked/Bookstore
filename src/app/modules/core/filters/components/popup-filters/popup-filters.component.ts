import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {CategoryService} from '../../../../../services';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-popup-filters',
  templateUrl: './popup-filters.component.html',
  styleUrls: ['./popup-filters.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('350ms ease', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('350ms ease', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class PopupFiltersComponent implements OnInit {
  @HostBinding('@slideInOut')
  @Input() categories;
  @Input() subcategories;

  constructor(
    public categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
  }
}
