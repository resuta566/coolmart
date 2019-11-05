import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { CartService } from '@app/_service/cart-service.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  carts: any;
  subtotal = 0;
  sum = 0;
  apiUrl = `${environment.apiUrl}`;
  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.getCart();
  }

  getCart(){
    this.cartService.carts().pipe(first()).subscribe((data: any)=>{
      this.carts = data.data;
      //Compute the subtotal of all the items
      this.carts.forEach( item =>{
        this.subtotal += parseFloat(item.attributes.subtotal_per_item);
      })
    });
  }


  removeItem(id: number) {
    if(confirm("Are you sure to delete this item?")){
      this.cartService.removeItemCartQty(id).pipe(first()).subscribe(data=> null);
    }

  }

  addQty(cartId: number) {
    this.cartService.updateItemCartQty(cartId, "addQty").pipe(first()).subscribe(data=> {   });

  }

  decreaseQty(cartId: number) {
    this.cartService.updateItemCartQty(cartId, "deductQty").pipe(first()).subscribe( data=> {
     });
  }

  subTotal(){
    this.sum = 0;
    for( let oneCart of this.carts ){
      this.sum += oneCart.price * oneCart.qty;
   }
   return this.sum;
  }

}
