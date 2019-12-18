<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, Inject } from '@angular/core';
import { ResendVerficationService } from '@app/_service/core/resend-verfication.service';
import { takeUntil } from 'rxjs/operators';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
>>>>>>> development

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }
=======
  btnclicked = false;
  resendtimer: number;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private resendService: ResendVerficationService
  ) { }
>>>>>>> development

  ngOnInit() {
  }

<<<<<<< HEAD
=======
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }
  timer(){
    let timer = setInterval(()=>{
      this.resendtimer -= 1;
      if(this.resendtimer == 0){
        clearInterval(timer);
        this.btnclicked = false;
      }
    },1000)
  }
  resendVerificationEmail(){
    this.resendtimer = 60;
    this.btnclicked = true;
    this.timer();
    this.resendService.resendverification()
      .pipe().subscribe((data: any)=>{
        console.log(data);
        if(data){
          this.notyf.success('Verification Email Successfully Resend!')
        }
      })
  }
>>>>>>> development
}
