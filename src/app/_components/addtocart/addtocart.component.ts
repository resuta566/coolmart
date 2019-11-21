import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { CartService } from '@app/_service/cart/cart-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_service';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtocart',
  template: `<button [disabled]="option" (click)="addtocart()" class="{{ btnclass }}">{{ label }}</button>`,
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
    @Inject(NOTYF) private notyf: Notyf,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

  addtocart(){
    let currentUser = this.authenticationService.currentUserValue;
    if(currentUser){
     if(currentUser.user.email_verified_at){
      this.cartForm = this.formBuilder.group({
        //this.itemId is a string so + would make it an integer
        itemId: [+this.itemId, Validators.required],
        authId: [currentUser.user.id, Validators.required],
        qty: [this.qty, Validators.required]
      });
      this.cartService.addToDataBaseCart(this.cartForm.value);
    }else{

      this.router.navigate(['/pages/email-verification']);
      this.notyf.error('Please Verify your email!');
    }

    }else{
      this.router.navigate(['dashboard']);
      this.notyf.error('Please Log In to Add this Item to Cart!');
    }
  }

}
