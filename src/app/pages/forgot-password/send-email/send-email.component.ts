import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@app/_service';
import { first, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit, OnDestroy {

  submitted = false;
  emailForm: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  get e() { return this.emailForm.controls; }

  sendEmail() {
    this.submitted = true;
    if (this.emailForm.invalid) {
      return;
    }

    this.authenticationService.forgotPassword(this.e.email.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
          this.submitted = false;
        });
  }
}
