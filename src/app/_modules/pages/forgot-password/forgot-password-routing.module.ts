import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from '@app/pages/forgot-password/forgot-password.component';
import { LoggedInGuard } from '@app/_helpers';
import { SendEmailComponent } from '@app/pages/forgot-password/send-email/send-email.component';
import { ResetPasswordComponent } from '@app/pages/forgot-password/reset-password/reset-password.component';

const htmlTitle = " | Cool Mart : Online Aircon Shopping with Great Prices!";

const routes: Routes = [
  { path: '' , component: ForgotPasswordComponent,
        canActivate: [LoggedInGuard],
        children:[
          {path: '',pathMatch: 'full',redirectTo: 'send-email'},
          {path: 'send-email', component: SendEmailComponent, data: {num: 99, title: 'Forgot Password' + htmlTitle}},
          {path: 'reset/:token', component: ResetPasswordComponent, data: {num: 99, title: 'Reset Password' + htmlTitle}}
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
