import { Component, OnInit, Input, OnDestroy, Inject } from '@angular/core';
import { CartService } from '@app/_service/cart/cart-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_service';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';
import { Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-addtocart',
  template: '<button [disabled]="option" (click)="addtocart()" class="{{ btnclass }}">{{ label }}</button>',
  styles: ['']
})
export class AddtocartComponent implements OnInit, OnDestroy {
  // tslint:disable: no-input-rename
  @Input('itemId') itemId: number;
  @Input('qty') qty: number;
  @Input('label') label: string;
  @Input('btnclass') btnclass: string;
  @Input('option') option ? = false;
  @Input('redirect') redirect ? = false;
  @Input('service_name') serviceName?: string;
  @Input('value') value?: number;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  cartForm: FormGroup;
  returnUrl: string;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // console.log(JSON.stringify(router.url));
    this.returnUrl = router.url;
  }

  ngOnInit() {}

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
          qty: [this.qty, Validators.required],
          service_name: [this.serviceName],
          value: [this.value]
        });
        this.cartService.addToDataBaseCart(this.cartForm.value, this.redirect);
      } else {
        this.notyf.error('Sorry the Item is currently out of stock.');
      }
    } else {
      window.location.href = `/sign_in?returnUrl=${this.returnUrl}`;
      // this.router.navigate(['sign_in'], { queryParams: { returnUrl: this.returnUrl } }); // Router Bug or my Bug lol
      this.notyf.error('Please Log In to Add this Item to Cart!');
    }
  }

}
