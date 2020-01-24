import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService, ResetPassword } from '@app/_service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '@app/_helpers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>(); // Destroy Subscription to avoid memory leaks
  btnChangePass = true;
  currentUser: any;
  userChangePassForm: FormGroup;
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.passwordForm();
    this.currentUser = this.authenticationService.currentUserValue.user;
  }

  ngOnDestroy() {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  passwordForm() {
    this.userChangePassForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      newpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmnewpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    }, {
      validator: MustMatch('newpassword', 'confirmnewpassword')
    });
  }

  get p() { return this.userChangePassForm.controls;}

  submitChangePass() {
    if (!this.userChangePassForm.valid) return;
    const changepassword: ResetPassword = {
      current_password: this.userChangePassForm.value.password,
      new_password: this.userChangePassForm.value.newpassword
    };
    console.log(changepassword);
    this.authenticationService.resetUserPassword(changepassword).pipe(takeUntil(this.destroy$)).subscribe(_ => _);
  }

  changePassBtn() {
    this.btnChangePass = !this.btnChangePass;
  }
}
