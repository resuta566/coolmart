import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertService } from '@app/_service';
import { CartService } from '@app/_service/cart-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  r: any;

  products = [
    {
      id: 1,
      img: 'assets/images/products/2.jpg',
      name: 'Wireless Audio System Multiroom 360',
      price: 1999,
      qty: 2,
      stockQty: 10
    },
    {
      id:2,
      img: 'assets/images/products/2.jpg',
      name: 'Tablet White EliteBook  Revolve 810 G2',
      price: 1300,
      qty: 3,
      stockQty: 10
    }
  ];

  constructor(
    private alertService: AlertService,
    private cd: ChangeDetectorRef,
    private cartService: CartService
    ) { }

  ngOnInit() {
    // this.cartService.addToDataBaseCart("architectoiynyf", 8, 1);
    // localStorage.setItem('cart', JSON.stringify(this.products));
    // this.r = JSON.parse(localStorage.getItem('cart'));
  }


}
