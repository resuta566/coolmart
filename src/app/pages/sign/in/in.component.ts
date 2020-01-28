import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, takeUntil } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '@app/_service';
import { Subject } from 'rxjs';

import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { NavbarService } from '@app/_service/navbar/navbar.service';

@Component({
  selector: 'sign-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.scss']
})
export class InComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private navbarService: NavbarService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
  }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';

  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first(), takeUntil(this.destroy$))
        .subscribe(
            data => {
              if (data) {
                  this.notyf.success('Successfully Loggedin!');
                  window.location.href = this.returnUrl;
                  // this.router.navigateByUrl(this.returnUrl);
                  // Bug NgAfterViewInit Navbar Doesn't update the count when use router.
                  this.navbarService.reload();
                }
            },
            error => {
              // console.log(error);
              this.alertService.error(error);
              this.notyf.error(error);
              this.submitted = false;
            });
}
}
