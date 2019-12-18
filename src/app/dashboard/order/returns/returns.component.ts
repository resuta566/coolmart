import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { ReturnService } from '@app/_service/order/return/return.service';
import { environment } from '@environments/environment';
>>>>>>> development

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit {

<<<<<<< HEAD
  constructor() { }

  ngOnInit() {
  }

=======
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
  changePageReturns(page: string){
    console.log(page);
  }
>>>>>>> development
}
