import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AddressesService } from '@app/_service/addresses/addresses.service';
import { Address } from '@app/_models/address/address';
import { Router } from '@angular/router';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>(); //Destroy Subscription to avoid memory leaks
  isSelectionShipping = false;
  isSelectionBilling = false;
  addresslist: Address[];
  selectedAddress: Address[];
  addressId: number;
  displayedColumns: string[] = ['name', 'address','postcode', 'mobile', 'info', 'edit'];
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private addressService: AddressesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userAddress();
  }

  ngOnDestroy() {
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  userAddress(){
    this.addressService.userAddress().pipe(takeUntil(this.destroy$)).subscribe(data=>{
      this.addresslist = data;
      console.log(this.addresslist);

    })
  }
  getUserAddressId(addressid: number){
    this.addressId = addressid;
    console.log(this.addressId);

  }
  clickShipping(){
    this.selectedAddress = this.addresslist.filter(address =>
      address.is_shipping == 1
    );
    this.addressId = this.selectedAddress[0].id;
    this.isSelectionShipping = !this.isSelectionShipping;
  }
  clickBilling(){
    this.selectedAddress = this.addresslist.filter(address =>
      address.is_billing == 1
    );
    this.addressId = this.selectedAddress[0].id;
    this.isSelectionBilling = !this.isSelectionBilling;
  }

  cancel(){
    this.isSelectionBilling = false;
    this.isSelectionShipping = false;
  }
 saveDefaults(){
   if(this.isSelectionShipping){
    this.addressService.setDefaultShipping(this.addressId).pipe(takeUntil(this.destroy$)).subscribe(data=> {
      this.notyf.success('Set Default Shipping Success');
      this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/dashboard/account/address-book']);
      });
    });
   }else if(this.isSelectionBilling){
    this.addressService.setDefaultBilling(this.addressId).pipe(takeUntil(this.destroy$)).subscribe(data=> {
      this.notyf.success('Set Default Billing Success');
      this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/dashboard/account/address-book']);
      });
    });
   }
 }

}
