import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, ResetPassword } from '@app/_service';
import { MustMatch } from '@app/_helpers';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  data: any;
  userForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.route.paramMap.pipe().subscribe(param=>{
        console.log(param);
        this.token = param.get('token')
        if(param){
          this.resetDetails();
        }else{
          this.router.navigate(['/pages/not-found']);
        }
      });
     }

  ngOnInit() {
    this.resetForm();
    console.log(this.userForm);
   }

  resetForm(){
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      cpassword:['',[Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    }, {
      validator: MustMatch('password', 'cpassword')
    })
  }

  resetDetails(){
    this.authenticationService.resetDetails(this.token).pipe().subscribe((data:any)=>{
      this.data = data;
      console.log(this.data);
      setTimeout(()=>{
        this.userForm.patchValue({
          email: this.data.email
        })
      },500)
    });
  }

  get re() { return this.userForm.controls; }

  resetPassword(){
    if (this.userForm.invalid) {
      return;
    }
    let resetData: ResetPassword = {
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      token: this.token
    }
    this.authenticationService.resetNewPassword(resetData).pipe().subscribe(response=>{});
  }
}
