import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressesService } from '@app/_service/addresses/addresses.service';
import { Address } from '@app/_models/address/address';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {

  isSelectionShipping = false;
  isSelectionBilling = false;
  addresslist: Address[];
  addressId: number;
  displayedColumns: string[] = ['name', 'address','postcode', 'mobile', 'info', 'edit'];
  constructor(
    private addressService: AddressesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userAddress();
  }

  userAddress(){
    this.addressService.userAddress().pipe().subscribe(data=>{
      this.addresslist = data;
    })
  }
  getUserAddressId(addressid: number){
    this.addressId = addressid;
    console.log(this.addressId);

  }
  clickShipping(){
    this.isSelectionShipping = !this.isSelectionShipping;
  }
  clickBilling(){
    this.isSelectionBilling = !this.isSelectionBilling;
  }
 saveDefaults(){
   if(this.isSelectionShipping){
    this.addressService.setDefaultShipping(this.addressId).pipe().subscribe(data=> {
      alert('Success');
      this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/dashboard/account/address-book']);
      });
    });
   }else if(this.isSelectionBilling){
    this.addressService.setDefaultBilling(this.addressId).pipe().subscribe(data=> {
      alert('Success');
      this.router.navigateByUrl('/not-found', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/dashboard/account/address-book']);
      });
    });
   }
 }

}
