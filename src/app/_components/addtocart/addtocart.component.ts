import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { CartService } from '@app/_service/cart/cart-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_service';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';
<<<<<<< HEAD

@Component({
  selector: 'app-addtocart',
  template: `<button [disabled]="option" (click)="addtocart()" class="{{ btnclass }}">{{ label }}</button>`,
  styleUrls: ['./addtocart.component.scss']
=======
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-addtocart',
  template:
    `
      <button [disabled]="option" (click)="addtocart()" class="{{ btnclass }}">{{ label }}</button>
    `,
  styles: [``]
>>>>>>> development
})
export class AddtocartComponent implements OnInit, OnDestroy {
  @Input('itemId') itemId: number;
  @Input('qty') qty: number;
  @Input('label') label: string;
  @Input('btnclass') btnclass: string;
<<<<<<< HEAD
  @Input('option') option?: false;
=======
  @Input('option') option? = false;
  @Input('redirect') redirect? = false;
  @Input('service_name') service_name?: string;
  @Input('value') value?: number;
  private destroy$: Subject<boolean> = new Subject<boolean>();
>>>>>>> development

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
<<<<<<< HEAD
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
=======
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();

  }

  addtocart() {
    let currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      if (currentUser.user.email_verified_at) {
        if(this.qty !== 0){
          this.cartForm = this.formBuilder.group({
            //this.itemId is a string so + would make it an integer
            itemId: [+this.itemId, Validators.required],
            qty: [this.qty, Validators.required],
            service_name: [this.service_name],
            value: [this.value]
          });
          this.cartService.addToDataBaseCart(this.cartForm.value, this.redirect);
        }else{
          this.notyf.error('Sorry the Item is currently out of stock.');
        }
      } else {
        this.router.navigate(['/pages/email-verification']);
        this.notyf.error('Please Verify your email!');
      }
    } else {
>>>>>>> development
      this.router.navigate(['dashboard']);
      this.notyf.error('Please Log In to Add this Item to Cart!');
    }
  }

}
