import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from '@app/dashboard/account/address-book/address/address.component';


const routes: Routes = [
  {
    path: '',
    component: AddressComponent,
    data: {
      num: 19,
      title:'View My Address'
    }
  },
  {
    path: 'update/:addressId',
    component: AddressComponent,
    data: {
      num: 19,
      title:'Update Address'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
