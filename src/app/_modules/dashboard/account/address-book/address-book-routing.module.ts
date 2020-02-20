import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressBookComponent } from '@app/dashboard/account/address-book/address-book.component';


const routes: Routes = [
  {
    path: '',
    component: AddressBookComponent,
    data: {
      num: 8,
      title: 'My Address Book'
    }
  },
  {
    path: 'address' ,
    loadChildren: () =>
      import('@app/_modules/dashboard/account/address-book/address/address.module')
      .then(module => module.AddressModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressBookRoutingModule { }
