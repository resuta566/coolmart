import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthenticationService, ResetPassword, Profile } from '@app/_service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '@app/_helpers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '@app/_models';

import * as _moment from 'moment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>(); // Destroy Subscription to avoid memory leaks
  btnChangePass = true;
  btnEditProfile = true;
  currentUser: User;
  userChangePassForm: FormGroup;
  userEditProfile: FormGroup;
  birthDateFormat = 'MMMM dd, yyyy';

  months = _moment.months();
  days = new Array(31);
  years: number[] = [];

  birthdate: Array<string>;

  hide = true;
  hidenew = true;
  hidenewconfirm = true;
  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private formBuilderProfile: FormBuilder
    ) { }

  ngOnInit() {
    const startYear = 1900;
    const thisYear = new Date().getFullYear();
    for (let s = startYear; s <= thisYear ; s++) {
      this.years.push(s);
    }

    this.profileForm();
    this.profile();
    this.passwordForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  profile() {
    this.authenticationService.profile().pipe(takeUntil(this.destroy$)).subscribe((profile: User) => {
      this.currentUser = profile;
      this.birthdate = profile.birthdate.split('-');
      // Set The Form Value
      setTimeout(() => {
        this.pr.name.setValue(this.currentUser.name);
        this.pr.year.setValue(+this.birthdate[0]);
        this.pr.month.setValue(+this.birthdate[1]);
        this.pr.date.setValue(+this.birthdate[2]);
        this.pr.gender.setValue(this.currentUser.genderId);
      }, 500);
    });
  }

  profileForm() {
    this.userEditProfile = this.formBuilderProfile.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      month: ['', [Validators.required]],
      date: ['', [Validators.required]],
      year: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
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

  get p() { return this.userChangePassForm.controls; }
  get pr() { return this.userEditProfile.controls; }

  submitChangePass() {
    if (!this.userChangePassForm.valid) { return; }
    const changepassword: ResetPassword = {
      current_password: this.userChangePassForm.value.password,
      new_password: this.userChangePassForm.value.newpassword
    };
    console.log(changepassword);
    this.authenticationService.resetUserPassword(changepassword).pipe(takeUntil(this.destroy$)).subscribe(_ => _);
  }

  submitEditProfile() {
    if (!this.userEditProfile.valid) { return; }
    console.log(this.userEditProfile.value);

    this.authenticationService.editProfile(this.userEditProfile.value).pipe().subscribe(_ => _);
  }

  changePassBtn() {
    this.btnChangePass = !this.btnChangePass;
  }
  editProfileBtn() {
    this.btnEditProfile = !this.btnEditProfile;
  }
}
