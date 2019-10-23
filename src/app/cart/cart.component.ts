import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  sum = 0;

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
    this.subTotal();
  }

  removeItem(item) {
    const index = this.products.indexOf(item);
    this.products.splice(index, 1);
  }

  addQty(item) {
    const i = this.products.indexOf(item);
    if(this.products[i].stockQty !== this.products[i].qty){
    this.products[i].qty += 1;
    this.subTotal();
    }else {
      alert('Stock Limit');
    }
  }

  decreaseQty(item) {
    const i = this.products.indexOf(item);
    if(this.products[i].qty !== 1){
    this.products[i].qty -= 1;
    this.subTotal();
    }else {
      alert('Minimum.');
    }
  }

  subTotal(){
    this.sum = 0;
    for( let product of this.products  ){
      this.sum += product.price * product.qty;
   }
   return this.sum;
  }

}
