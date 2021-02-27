import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../../models';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() products: Product[];
  constructor() { }

  ngOnInit(): void {
  }

}
