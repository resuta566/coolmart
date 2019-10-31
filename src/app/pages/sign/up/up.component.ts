import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MustMatch } from '@app/_helpers';

import { AuthenticationService, AlertService } from '@app/_service';

@Component({
  selector: 'sign-up',
  templateUrl: './up.component.html',
  styleUrls: ['./up.component.scss']
})
export class UpComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  messages: string;


  constructor(
    private formBuilder: FormBuilder,
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
        .pipe(first())
        .subscribe(
            data => {
                this.authenticationService.login(this.registerForm.value.email, this.registerForm.value.password)
                .pipe(first())
                .subscribe(data => {
                      this.router.navigate(['/dashboard']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });;
            },
            error => {
                this.alertService.error(error);
                // console.log(error);
                this.loading = false;
            });
    }

}
