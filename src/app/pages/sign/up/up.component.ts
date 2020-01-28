import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, takeUntil } from 'rxjs/operators';
import { MustMatch } from '@app/_helpers';

import { AuthenticationService, AlertService } from '@app/_service';
import { Subject } from 'rxjs';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';

import * as _moment from 'moment';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'sign-up',
  templateUrl: './up.component.html',
  styleUrls: ['./up.component.scss']
})
export class UpComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  messages: string;
  returnUrl: string;
  months = _moment.months();
  days = new Array(31);
  years: number[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
   }

  ngOnInit() {
    const startYear = 1900;
    const thisYear = new Date().getFullYear();
    for (let s = startYear; s <= thisYear ; s++) {
      this.years.push(s);
    }

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      cpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      month: ['', [Validators.required]],
      date: ['', [Validators.required]],
      year: ['', [Validators.required]],
      gender: ['', [Validators.required]]
      }, {
        validator: MustMatch('password', 'cpassword')
      });

    this.returnUrl = '/dashboard';
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // console.log(this.registerForm.value.email)
    this.authenticationService.register(this.registerForm.value)
        .pipe(first(), takeUntil(this.destroy$))
        .subscribe(
            data => {
              this.loading = true;
              console.log(data);
              this.notyf.success('Successfully Registered!');
              this.authenticationService.login(this.registerForm.value.email, this.registerForm.value.password)
              .pipe(first(), takeUntil(this.destroy$))
              .subscribe( ldata => {
                  if (ldata) {
                    this.router.navigate([this.returnUrl]);
                  }
            });
          });
    }

}
