import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ResendVerficationService } from '@app/_service/core/resend-verfication.service';
import { takeUntil } from 'rxjs/operators';
import { NOTYF } from '@app/_helpers/notyf.token';
import { Notyf } from 'notyf';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  btnclicked = false;
  resendtimer: number;
  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    private resendService: ResendVerficationService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();
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
    this.resendtimer = 360000;
    this.btnclicked = true;
    this.timer();
    this.resendService.resendverification()
    .pipe(takeUntil(this.destroy$)).subscribe((data: any)=>{
        console.log(data);
        if(data){
          this.notyf.success('Verification Email Successfully Resend!')
        }
      })
  }
}
