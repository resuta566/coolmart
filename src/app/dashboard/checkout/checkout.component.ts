import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '@app/_service/cart/cart-service.service';
import { environment } from '@environments/environment';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '@app/_components/confirmation-dialog/confirmation-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressesService } from '@app/_service/addresses/addresses.service';
import { Address } from '@app/_models/address/address';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  type = 1;
  provinces: any;
  provinceCities: any;
  cityBarangays: any;
  addressForm: FormGroup;
  selected = false;
  placeorderForm: FormGroup;
  carts: any;
  subtotal = 0;
  sum = 0;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  thereIsItem = true;
  apiUrl = `${environment.apiUrl}`;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private router: Router,
    private cartService: CartService,
    private confirmDialog: MatDialog,
    private formBuilder: FormBuilder,
    private formBuilderAddress: FormBuilder,
    private addressesService: AddressesService
    ) { }

  ngOnInit() {
    this.selected = true;
    this.addressForms();
    this.provinceList();
    this.acceptForm();
    this.getCart();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  provinceList(){
    this.addressesService.province().subscribe((data: any) => {
      this.provinces = data;
      this.selected = false;
    });
  }

  getProvinceId(provinceid: number){
    this.selected = true;
    this.addressesService.selected_province_cities(provinceid).subscribe((data: any)=>{
      this.provinceCities = data;
      if(this.provinceCities.length > 0){
        this.addressForm.get('city').enable();
        this.selected = false;
      }
    },err => {
      this.selected = false;
    })
    this.addressForm.get('brgy').disable();
    this.addressForm.controls['brgy'].reset();
  }
  getCityId(cityId: number){
    this.selected = true;
    this.addressesService.selected_city_barangays(cityId).subscribe((data: any)=> {
      this.cityBarangays = data;
      if(this.cityBarangays.length > 0 ){
        this.addressForm.get('brgy').enable();
        this.selected = false;
      }
    },err => {
      this.selected = false;
    })
  }

  saveAddress(){
    // console.log(this.a);
    let newAddress: Address = {
      fullname: this.a.fullname.value,
      mobilenumber: this.a.mobilenumber.value,
      other_notes: this.a.other_notes.value,
      building: this.a.building.value,
      province: this.a.province.value,
      city: this.a.city.value,
      brgy: this.a.brgy.value,
      type: this.a.type.value,
    }
    if (this.addressForm.invalid) {
      return;
    }
    this.addressesService.saveAddress(newAddress)
        .pipe(first(),takeUntil(this.destroy$))
        .subscribe(data=>{
          this.notyf.success(data);
        })
  }

  // convenience getter for easy access to form fields
  get a() { return this.addressForm.controls; }

  addressForms(){
    this.addressForm = this.formBuilderAddress.group({
      fullname: ['', Validators.required],
      mobilenumber: ['', [Validators.required, Validators.minLength(11),Validators.maxLength(15)]],
      other_notes: [''],
      building: ['', Validators.required],
      province: ['', Validators.required],
      city: [{value: '', disabled: true}, Validators.required],
      brgy: [{value: '', disabled: true}, Validators.required],
      type: [this.type]
    });
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
