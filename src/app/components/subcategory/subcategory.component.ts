import {Component, Input, OnInit} from '@angular/core';
import {Subcategory} from '../../shared/interfaces';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  @Input() subcategory: Subcategory;

  constructor() {
  }

  ngOnInit(): void {
  }

}
