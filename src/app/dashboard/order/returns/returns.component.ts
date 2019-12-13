import { Component, OnInit } from '@angular/core';
import { ReturnService } from '@app/_service/order/return/return.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit {

  apiUrl = `${environment.apiUrl}`;
  returnDetails: any;
  constructor(
    private returnService: ReturnService
  ) { }

  ngOnInit() {
    this.returns();
  }

  returns(){
    this.returnService.returnOrders().pipe().subscribe(data=>{
      this.returnDetails = data;
      console.log(this.returnDetails);
    });
  }
  changePageReturns(){

  }
}
