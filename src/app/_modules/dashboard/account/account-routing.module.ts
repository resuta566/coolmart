import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from '@app/dashboard/account/account.component';
import { ProfileComponent } from '@app/dashboard/account/profile/profile.component';
import { AddressBookComponent } from '@app/dashboard/account/address-book/address-book.component';
import { AddressComponent } from '@app/dashboard/account/address-book/address/address.component';
import { PaymentOptionsComponent } from '@app/dashboard/account/payment-options/payment-options.component';
import { SummaryComponent } from '@app/dashboard/account/summary/summary.component';


const routes: Routes = [
  { path: '', component: AccountComponent,
    data: { num: 6, title: 'Manage My Account'},
    children:[
      { path: '', pathMatch: 'full', redirectTo: 'summary' },
      { path: 'summary', component: SummaryComponent, data: { num: 7, title: 'My Profile'}  },
      { path: 'profile', component: ProfileComponent, data: { num: 7, title: 'My Profile'}  },
      { path: 'address-book' ,
          loadChildren: () =>
          import(`@app/_modules/dashboard/account/address-book/address-book.module`).then(
            module => module.AddressBookModule
          )
        },
      { path: 'payment-options', component: PaymentOptionsComponent, data:{ num: 9, title: 'Select Payment Option'} }
    ]
   }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
