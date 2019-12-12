import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_service';
import { User } from '@app/_models';
import { Observable } from 'rxjs';
import { CheckOutService } from '@app/_service/checkout/checkout.service';

@Component({
  selector: 'dashboard-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  currentUser: any;
  addressInfo: any;
  loading = true;
  constructor(
    private authenticationService: AuthenticationService,
    private checkOutService: CheckOutService
    ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue.user;
    this.checkOutService.checkoutAddress().pipe().subscribe((address: any)=>{
      this.addressInfo = address;
      console.log(this.addressInfo);
      if(this.addressInfo){
        setTimeout(()=>{
          this.loading = false;
        },500)
      }else{
        this.loading = false;
      }
    });
  }

}
