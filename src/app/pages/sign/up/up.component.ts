import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, takeUntil } from 'rxjs/operators';
import { MustMatch } from '@app/_helpers';

import { AuthenticationService, AlertService } from '@app/_service';
import { Subject } from 'rxjs';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';

@Component({
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
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cpassword: ['', [Validators.required, Validators.minLength(8)]]
      }, {
        validator: MustMatch('password', 'cpassword')
      });

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard'
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
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

    this.loading = true;
    // console.log(this.registerForm.value.email)
    this.authenticationService.register(this.registerForm.value)
        .pipe(first(),takeUntil(this.destroy$))
        .subscribe(
            data => {
              this.authenticationService.login(this.registerForm.value.email, this.registerForm.value.password)
              .pipe(first())
              .subscribe(data => {
                  if(data){
                    this.router.navigate([this.returnUrl]);
                    this.notyf.success('Successfully Registered!');
                  }
            }),
            error => {
                this.alertService.error(error);
                this.notyf.error(error);
                // console.log(error);
            }
          });
    }

}
