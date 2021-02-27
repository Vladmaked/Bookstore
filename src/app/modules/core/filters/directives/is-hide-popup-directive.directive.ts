import {Directive, ElementRef, HostListener} from '@angular/core';
import {FiltersService} from '../services';

@Directive({
  selector: '[appIsHidePopupDirective]'
})
export class IsHidePopupDirectiveDirective {

  constructor(private el: ElementRef, private filtersService: FiltersService) {
  }

  @HostListener('click', ['$event.target']) onClick($event: Event) {
    if (!this.el.nativeElement.firstChild.contains($event)) {
      this.filtersService.hidePopupFilters();
    }
  }
}
