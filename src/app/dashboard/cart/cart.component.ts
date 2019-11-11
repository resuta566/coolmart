import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { CartService } from '@app/_service/cart/cart-service.service';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  carts: any;
  subtotal = 0;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  sum = 0;
  apiUrl = `${environment.apiUrl}`;
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.getCart();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  getCart(){
    this.cartService.carts().pipe(first(), takeUntil(this.destroy$)).subscribe((data: any)=>{
      this.carts = data.data;
      //Compute the subtotal of all the items
      this.carts.forEach( item =>{
        this.subtotal += parseFloat(item.attributes.subtotal_per_item);
      })
    });
  }


  removeItem(id: number) {
    if(confirm("Are you sure to delete this item?")){
      this.cartService.removeItemCartQty(id).pipe(first(), takeUntil(this.destroy$)).subscribe(data=> {});
    }

  }

  addQty(cartId: number) {
    this.cartService.updateItemCartQty(cartId, "addQty").pipe(first(), takeUntil(this.destroy$)).subscribe(data=> {});

  }

  decreaseQty(cartId: number) {
    this.cartService.updateItemCartQty(cartId, "deductQty").pipe(first(), takeUntil(this.destroy$)).subscribe( data=> {});
  }

  subTotal(){
    this.sum = 0;
    for( let oneCart of this.carts ){
      this.sum += oneCart.price * oneCart.qty;
   }
   return this.sum;
  }

}
