import { Component, OnInit, Input } from '@angular/core';
import { environment } from '@environments/environment';
import { CartService } from '@app/_service/cart-service.service';
import { tap, catchError, map } from "rxjs/operators";

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.scss']
})
export class AddtocartComponent implements OnInit {
  @Input() slug: string;
  @Input() label: string;
  @Input() btnclass: string;

  cart = `${environment.apiUrl}/cart`;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    // console.log(this.cart);
  }

  addtocart(){
    console.log(this.slug);
    alert('Added to Cart!');
    return this.cartService.addQty(this.slug);
  }

}
