import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


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

  constructor() { }

  ngOnInit() {
  }

}
