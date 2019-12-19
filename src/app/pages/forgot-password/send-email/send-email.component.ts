import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@app/_service';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

  submitted = false;
  emailForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
  get e() { return this.emailForm.controls; }

  sendEmail(){
    this.submitted = true;
    if (this.emailForm.invalid) {
      return;
    }

    this.authenticationService.forgotPassword(this.e.email.value)
        .pipe()
        .subscribe(response=>{
          this.submitted = false;
        });
  }
}
