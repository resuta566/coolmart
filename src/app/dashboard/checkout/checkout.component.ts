import { Component, OnInit } from '@angular/core';
import { CartService } from '@app/_service/cart/cart-service.service';
import { environment } from '@environments/environment';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '@app/_components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  carts: any;
  subtotal = 0;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  thereIsItem = true;
  apiUrl = `${environment.apiUrl}`;

  constructor(
    private cartService: CartService,
    private confirmDialog: MatDialog
    ) { }

  ngOnInit() {
    this.getCart();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  getCart(){
    this.cartService.carts().pipe(first(), takeUntil(this.destroy$)).subscribe((data: any)=>{
      this.carts = data.data;
      console.log(this.carts);
      if(this.carts.length <= 0) this.thereIsItem = false;
      console.log(this.thereIsItem);

      //Compute the subtotal of all the items
      this.carts.forEach( item =>{
        this.subtotal += parseFloat(item.attributes.subtotal_per_item);
      })
    });
  }

  removeItem(id: number) {
    const dialogRef = this.confirmDialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: '180px'
    });
    dialogRef.componentInstance.message = 'Are you sure to delete this item(s)?';
    dialogRef.componentInstance.title = 'Remove from cart?';

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.cartService.removeItemCartQty(id).pipe(first(), takeUntil(this.destroy$)).subscribe(data=> {});
      }
    });

  }
}
