import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Address } from '@app/_models/address/address';
import { first, takeUntil } from 'rxjs/operators';
import { AddressesService } from '@app/_service/addresses/addresses.service';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { Subject } from 'rxjs/internal/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '@app/_components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  provinces: any;
  provinceId = 0;
  provinceCities: any;
  provinceCityId = 0;
  cityBarangays: any;
  cityBrgyId = 0;
  addressForm: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  selected = false;

  addressData: any;
  type = 1;
  isAddressUpdate = false;
  addressIdEdit: string;
  constructor(
      @Inject(NOTYF) private notyf: Notyf,
      private formBuilderAddress: FormBuilder,
      private addressesService: AddressesService,
      private route: Router,
      private router: ActivatedRoute,
      private confirmDialog: MatDialog
    ) {
     }

  ngOnInit(){
    this.addressForms();
    this.router.paramMap.subscribe(addressId => {
      this.addressIdEdit = addressId.get('addressId')
      console.log(this.addressIdEdit);

      if(this.addressIdEdit){
        this.getOneUserAddress(+this.addressIdEdit);
      }
    });
    this.selected = true;
    this.provinceList();

  }

  getOneUserAddress(addressId: number){
    this.addressesService.oneUserAddress(addressId).pipe().subscribe(data => {
      this.isAddressUpdate = true;
      this.addressData = data;
      console.log(this.addressData);
      this.getCities(+data.province[0]);
      this.getBrgys(+data.city[0]);
      setTimeout(()=>{
        this.provinceCityId = +data.city[0];
        this.cityBrgyId = +data.brgy[0];
        this.a.city.setValue(data.city[1]);
        this.a.brgy.setValue(data.brgy[1]);
      },500)
      this.addressForm.patchValue({
        fullname: data.fullname,
        mobilenumber: data.contact,
        other_notes: data.other_notes,
        building: data.building,
        province: data.province[1],
        city: data.city[1],
        brgy: data.brgy[1],
        type: data.type
      })
      // console.log(this.addressForm);

    })
  }

  provinceList(){
    this.addressesService.province().subscribe((data: any) => {
      this.provinces = data;
      this.selected = false;
    });
  }

  getCities(provinceid: number){

    this.provinceId = provinceid;
    this.selected = true;
    this.addressesService.selected_province_cities(provinceid).subscribe((data: any)=>{
      this.provinceCities = data;
      if(this.provinceCities.length > 0){
        this.provinceCityId = 0;
        this.addressForm.get('city').enable();
        this.a['city'].reset();
        this.selected = false;
      }
    },err => {
      this.selected = false;
    })
    this.cityBrgyId = 0;
    this.addressForm.get('brgy').disable();
    this.a['brgy'].reset();
  }
  getBrgys(cityId: number){
    this.provinceCityId = cityId;
    this.selected = true;
    this.addressesService.selected_city_barangays(cityId).subscribe((data: any)=> {
      this.cityBarangays = data;
      if(this.cityBarangays.length > 0 ){
        this.cityBrgyId = 0;
        this.addressForm.get('brgy').enable();
        this.a['brgy'].reset();
        this.selected = false;
      }
    },err => {
      this.selected = false;
    })
  }
  getBrgyId(brgyid: number){
    this.cityBrgyId = brgyid;
  }

  saveAddress(){
    // console.log(this.a);
    console.log(this.addressForm);
    let newAddress: Address;
    if(this.addressIdEdit){
      console.log(this.addressIdEdit);

      newAddress = {
        id: +this.addressIdEdit,
        fullname: this.a.fullname.value,
        mobilenumber: this.a.mobilenumber.value,
        other_notes: this.a.other_notes.value,
        building: this.a.building.value,
        province: this.provinceId.toString()+ '--' + this.a.province.value,
        city: this.provinceCityId.toString() + '--' +this.a.city.value,
        brgy: this.cityBrgyId.toString() + '--' + this.a.brgy.value,
        type: this.a.type.value,
      }

      if (this.addressForm.invalid) {
        return;
      }
      console.log(newAddress);

      this.addressesService.updateAddress(newAddress)
          .pipe(first(),takeUntil(this.destroy$))
          .subscribe(data=>{
            if(data){
              console.log(data);

              this.notyf.success(data);
              this.route.navigate(['/dashboard/account/address-book']);
            }
          },err=>{
            this.notyf.error('Error');
          })
    }else{
      newAddress = {
        fullname: this.a.fullname.value,
        mobilenumber: this.a.mobilenumber.value,
        other_notes: this.a.other_notes.value,
        building: this.a.building.value,
        province: this.provinceId.toString()+ '--' + this.a.province.value,
        city: this.provinceCityId.toString() + '--' +this.a.city.value,
        brgy: this.cityBrgyId.toString() + '--' + this.a.brgy.value,
        type: this.a.type.value,
      }

      if (this.addressForm.invalid) {
        return;
      }
      this.addressesService.saveAddress(newAddress)
          .pipe(first(),takeUntil(this.destroy$))
          .subscribe(data=>{
            if(data){
              this.notyf.success(data);
              this.route.navigate(['/dashboard/account/address-book']);
            }
          },err=>{
            this.notyf.error('Error');
          })
    }

  }

  deleteAddress(){
    const dialogRef = this.confirmDialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: '199px'
    });
    dialogRef.componentInstance.message = 'Are you sure to delete this address?';
    dialogRef.componentInstance.title = 'Remove from Address Book?';

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addressesService.deleteAddress(+this.addressIdEdit).pipe().subscribe(response=>{});
      }
    });


  }
  // convenience getter for easy access to form fields
  get a() { return this.addressForm.controls; }

  addressForms(){
    this.addressForm = this.formBuilderAddress.group({
      fullname: ['', Validators.required],
      mobilenumber: ['', [
        Validators.required,
        Validators.pattern(/^[+]?(09|\+639)\d{9}$/)]],
      other_notes: [''],
      building: ['', Validators.required],
      province: ['', Validators.required],
      city: [{value: '', disabled: false}, Validators.required],
      brgy: [{value: '', disabled: false}, Validators.required],
      type: [this.type]
    });
  }
}
