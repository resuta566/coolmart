import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { CartService } from '@app/_service/cart-service.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  carts: any;
  sum = 0;
  cart = `${environment.apiUrl}/cart`;
  new ={
      id: 1,
      img: "assets/images/products/2.jpg",
      name: "Wireless Audio System Multiroom 360",
      price: 1999,
      qty: 3,
      stockQty: 10
    };
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {

    this.getLocalStorageCart();
  }

  getLocalStorageCart(){
    this.carts = JSON.parse(localStorage.getItem('cart'));
    console.log(this.carts);
    this.subTotal();
  }

  updateLocalStorageCart(carts: Object){
    localStorage.setItem('cart', JSON.stringify(carts));
    console.log(carts);
  }

  removeItem(index: number) {
    this.carts.splice(index, 1);
    this.updateLocalStorageCart(this.carts);
  }

  addQty(index: number) {
    const i = index;
    this.carts.push(this.new);
    if(this.carts[i].stockQty !== this.carts[i].qty){
    this.carts[i].qty += 1;
    this.updateLocalStorageCart(this.carts);

    this.subTotal();
    }else {
      alert('Stock Limit');
    }
  }

  decreaseQty(index: number) {
    const i = index;
    if(this.carts[i].qty !== 1){
    this.carts[i].qty -= 1;
    this.updateLocalStorageCart(this.carts);

    this.subTotal();
    }else {
      alert('Minimum.');
    }
  }

  subTotal(){
    this.sum = 0;
    for( let oneCart of this.carts ){
      this.sum += oneCart.price * oneCart.qty;
   }
   return this.sum;
  }

}
