import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CartService } from '@app/_service/cart/cart-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.scss']
})
export class AddtocartComponent implements OnInit, OnDestroy {
  @Input('itemId') itemId: number;
  @Input('qty') qty: number;
  @Input('label') label: string;
  @Input('btnclass') btnclass: string;
  @Input('option') option?: false;

  cartForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

  addtocart(){
    let currentUser = this.authenticationService.currentUserValue;
    this.cartForm = this.formBuilder.group({
      //this.itemId is a string so + would make it an integer
      itemId: [+this.itemId, Validators.required],
      authId: [currentUser.auth_id, Validators.required],
      qty: [this.qty, Validators.required]
    });
    this.cartService.addToDataBaseCart(this.cartForm.value);
  }

}
