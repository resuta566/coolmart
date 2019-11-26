import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    let currentUser = this.authenticationService.currentUserValue;
    if(currentUser){
      this.router.navigateByUrl('/dashboard');
    }
  }

  ngAfterViewInit() {
    let currentUser = this.authenticationService.currentUserValue;
    setTimeout(()=>{
      if(currentUser){
        this.router.navigateByUrl('/dashboard');
      }
    }, 500);
  }
}
