import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  products = [
    {
      img: 'assets/images/products/3.jpg',
      name: 'White Solo 2 Wireless',
      price: 248.99,
      stockStatus: 'In Stock'
    },
    {
      img: 'assets/images/products/3.jpg',
      name: 'Tablet Red EliteBook Revolve 810 G2',
      price: 1200,
      stockStatus: 'In Stock'
    },
    {
      img: 'assets/images/products/3.jpg',
      name: 'GameConsole Destiny Special Edition',
      price: 789,
      stockStatus: 'In Stock'
    }
  ];


  removeItem(item) {
    const index = this.products.indexOf(item);
    this.products.splice(index, 1);
  }
}
