import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReturnService } from '@app/_service/order/return/return.service';
import { environment } from '@environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  apiUrl = `${environment.apiUrl}`;
  returnDetails: any;
  constructor(
    private returnService: ReturnService
  ) { }

  ngOnInit() {
    this.returns();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  returns(){
    this.returnService.returnOrders().pipe(takeUntil(this.destroy$)).subscribe(data=>{
      this.returnDetails = data;
      console.log(this.returnDetails);
    });
  }
  changePageReturns(page: string){
    console.log(page);
  }
}
