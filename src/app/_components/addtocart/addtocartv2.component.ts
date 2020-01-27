import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { CartService } from '@app/_service/cart/cart-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_service';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-addtocart-v2',
  template: ` <a [attr.disabled]="option" (click)="addtocart()" class="{{ btnclass }}">{{ label }}</a>`,
  styles:
    [`
    a{cursor:pointer!important}
    a[disabled], a[disabled]:hover {
      cursor: not-allowed!important;
      pointer-events: none;
      color: #e1e1e1;
   }
  `]
})
export class AddtocartV2Component implements OnInit, OnDestroy {
  @Input('itemId') itemId: number;
  @Input('qty') qty: number;
  @Input('label') label: string;
  @Input('btnclass') btnclass: string;
  @Input('option') option?: false;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  cartForm: FormGroup;

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();

  }

  addtocart() {
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      if (this.qty !== 0) {
        this.cartForm = this.formBuilder.group({
          // this.itemId is a string so + would make it an integer
          itemId: [+this.itemId, Validators.required],
          qty: [this.qty, Validators.required]
        });
        this.cartService.addToDataBaseCart(this.cartForm.value);
      } else {
        this.notyf.error('Sorry the Item is currently out of stock.');
      }
    } else {
      this.router.navigate(['dashboard']);
      this.notyf.error('Please Log In to Add this Item to Cart!');
    }
  }

}
