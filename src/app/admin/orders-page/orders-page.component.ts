import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {routingAnimation} from '../../shared/animations/routing-animation';
import {Order} from '../../models';
import {OrderService} from '../../services';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
  animations: [routingAnimation]
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  @HostBinding('@routingAnimation') private routing;

  orders: Order [] = [];
  pSub: Subscription;
  rSub: Subscription;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.pSub = this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  remove(id) {
    this.rSub = this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter(order => order.id !== id);
    });
  }

}
