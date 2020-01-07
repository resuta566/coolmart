import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_service/core/authentication.service';
import { CheckOutService } from '@app/_service/checkout/checkout.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

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
