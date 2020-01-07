import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '@app/dashboard/dashboard.component';
import { AuthGuard } from '@app/_helpers';

const htmlTitle = " | Cool Mart : Online Aircon Shopping with Great Prices!";

const routes: Routes = [
    { path: '', component: DashboardComponent,
      canActivate: [AuthGuard],
      data: { num: 5, title: 'Dashboard' + htmlTitle},
      children:[
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'account'
        },
        {
          path: 'account' ,
          loadChildren: () =>
            import(`@app/_modules/dashboard/account/account.module`)
              .then(module => module.AccountModule)
        },
        {
          path: 'order' ,
          loadChildren: () =>
            import(`@app/_modules/dashboard/order/order.module`)
              .then(module => module.OrderModule)
        }
      ]
  }
];

@NgModule({
  declarations: [],
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
