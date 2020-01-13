import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CancelService, CancelOrder } from '@app/_service/order/cancel/cancel.service';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.scss']
})
export class CancelOrderComponent implements OnInit, OnDestroy {

  reasons = [
    'Decided for alternative Product',
    'Fees - shipping cost',
    'Found cheaper',
    'Change payment method',
    'Change/Combine Order',
    'Delivery is too long',
    'Duplicate Order Item',
    'Change Delivery Address',
    'Incorrect Contact Details'
  ];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  apiUrl = `${environment.apiUrl}`;
  cancelForm: FormGroup;
  cartId: number;
  itemDetails: any;
  returnUrl = '';
  loading = false;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cancelService: CancelService
  ) {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(param=>{
      console.log(param.get('cartId'));
      this.cartId = +param.get('cartId');
      this.cancelService.cancelShowItem(this.cartId).pipe(takeUntil(this.destroy$)).subscribe((data:any)=>{
        this.itemDetails = data;
        console.log(this.itemDetails);
        if(!this.itemDetails.attributes.cancellable){
          this.router.navigate(['/pages/not-found']);
        }
      })
    });
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(param=>{
      this.returnUrl = param.returnUrl;
      console.log(this.returnUrl);
    });
   }

  ngOnInit() {
    this.cancellationForm();
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  cancellationForm(){
    this.cancelForm = this.formBuilder.group({
      cart_id:[this.cartId ,Validators.required],
      reason:['',Validators.required],
      additional_info:[''],
      accept:[false, Validators.required]
    })
  }
  get a() { return this.cancelForm.controls; }

  submitCancell(){
    this.loading = true;
    let cancelOrder: CancelOrder = {
      cartId: this.cancelForm.value.cart_id,
      reason: this.cancelForm.value.reason,
      optional: this.cancelForm.value.additional_info
    }
    this.cancelService.cancelOrder(cancelOrder).pipe(takeUntil(this.destroy$)).subscribe((response: any)=>{
      this.router.navigate([this.returnUrl]);
      this.notyf.success(response.message);
      this.loading = false;
    },err=>{
      this.notyf.error(err.message);
      this.loading = false;
    });
  }
}
