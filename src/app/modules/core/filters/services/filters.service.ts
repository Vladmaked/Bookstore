import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FiltersService {
  isActivePopupFilters$: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  activatePopupFilters() {
    this.isActivePopupFilters$.next(true);
  }

  hidePopupFilters() {
    this.isActivePopupFilters$.next(false);
  }
}
