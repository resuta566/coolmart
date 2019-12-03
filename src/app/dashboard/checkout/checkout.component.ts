import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/_service/cart/cart-service.service';
import { environment } from '@environments/environment';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '@app/_components/confirmation-dialog/confirmation-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  placeorderForm: FormGroup;
  carts: any;
  subtotal = 0;
  sum = 0;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  thereIsItem = true;
  apiUrl = `${environment.apiUrl}`;

  constructor(
    private router: Router,
    private cartService: CartService,
    private confirmDialog: MatDialog,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.acceptForm();
    this.getCart();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  acceptForm(){
    this.placeorderForm = this.formBuilder.group({
      accept:[false, Validators.required]
    });
  }
  placeOrder(){
    this.router.navigate(['/checkout/payment-options'], { queryParams:{ acceptedTermsCondition: this.placeorderForm.valid}});
  }

  getCart(){
    this.cartService.carts().pipe(first(), takeUntil(this.destroy$)).subscribe((data: any)=>{
      this.carts = data.data;
      console.log(this.carts);
      if(this.carts.length <= 0) this.thereIsItem = false;

      //Compute the subtotal of all the items
      this.carts.forEach( item =>{
        this.subtotal += parseFloat(item.attributes.subtotal_per_item);
      })
    });
  }

  removeItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: '180px'
    });
    dialogRef.componentInstance.message = 'Are you sure to delete this item(s)?';
    dialogRef.componentInstance.title = 'Remove from cart?';

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.cartService.removeItemCartQty(id).pipe(first(), takeUntil(this.destroy$)).subscribe(data=> {});
      }
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
