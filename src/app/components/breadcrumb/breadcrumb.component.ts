import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumb = [];
  constructor(route: ActivatedRoute) {
    this.breadcrumb.push(route.snapshot.data.breadcrumb);
  }

  ngOnInit(): void {
  }

}
