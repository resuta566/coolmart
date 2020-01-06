import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from '@app/pages/forgot-password/forgot-password.component';
import { SendEmailComponent } from '@app/pages/forgot-password/send-email/send-email.component';
import { ResetPasswordComponent } from '@app/pages/forgot-password/reset-password/reset-password.component';
import { MaterialModule } from '@app/_modules/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    SendEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ForgotPasswordModule { }
