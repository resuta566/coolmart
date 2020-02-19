import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { ActivatedRoute, Router } from '@angular/router';
import { ReturnService } from '@app/_service/order/return/return.service';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-return-order',
  templateUrl: './return-order.component.html',
  styleUrls: ['./return-order.component.scss']
})
export class ReturnOrderComponent implements OnInit, OnDestroy {

  reasons = [
    'Defective',
    'Not as advertised',
    'Wrong Item',
    'Missing Accessories',
    'Missing Item',
    'Wrong size',
    'Damaged',
    'Conterfeit',
    'Gwapo Ko'
  ];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  submitted = false;
  returnForm: FormGroup;
  cartId: number;
  itemDetails: any;
  refundAmt: any;
  apiUrl = `${environment.apiUrl}`;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private returnService: ReturnService
    ) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(param => {
      this.cartId = +param.get('cartId');
      this.showItem();
    });
    this.returnOrderForm();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();
  }


  showItem() {
    this.returnService.returnShowItem(this.cartId).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      const max = data.attributes.subtotal_with_service_total.toFixed(2);
      this.a.refund_amount.setValidators(Validators.max(+max));
      setTimeout(() => {
        this.a.cartId.setValue(this.cartId);
        this.a.refund_amount.setValue(data.attributes.subtotal_with_service_total);
      }, 500);
      this.itemDetails = data;
      if (!this.itemDetails.attributes.returnable) {
        this.router.navigate(['/pages/not-found']);
      }
      console.log(this.itemDetails);

    });
  }

  get a() { return this.returnForm.controls; }

  returnOrderForm() {
    this.returnForm = this.formBuilder.group({
      cartId: [this.cartId, Validators.required],
      refund_amount: ['', Validators.required],
      thereason: ['', Validators.required],
      additional_info: ['', Validators.required],
      accept: [false, Validators.required]
    });
  }
  submit() {
    console.log(this.returnForm);
    this.submitted = true;

  }
}
