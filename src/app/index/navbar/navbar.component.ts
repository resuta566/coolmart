import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_service';
import { User } from '@app/_models';
import { CartService } from '@app/_service/cart/cart-service.service';
import { first, takeUntil } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '@app/_components/confirmation-dialog/confirmation-dialog.component';
import { Subject } from 'rxjs';

export interface Regions{
  id: number;
  name: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  regions: Regions[] =[
    {id: 0,name: 'NCR'},
    {id: 1, name: 'CAR'},
    {id: 2, name: 'ARMM'},
    {id: 3, name: 'Region I'},
    {id: 4, name: 'Region II'},
    {id: 5, name: 'Region III'},
    {id: 6, name: 'Region IV-A'},
    {id: 7, name: 'Region IV-B'},
    {id: 8, name: 'Region V'},
    {id: 9, name: 'Region VI'},
    {id: 10, name: 'Region VII'},
    {id: 11, name: 'Region VIII'},
    {id: 12, name: 'Region IX'},
    {id: 13, name: 'Region X'},
    {id: 14, name: 'Region XI'},
    {id: 15, name: 'Region XII'},
    {id: 16, name: 'Region XIII'}
  ];

  currentUser: User;
  isLogged = false;
  carts: any;
  apiUrl = `${environment.apiUrl}`;
  count = 0;
  value: string;
  slug: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private confirmDialog: MatDialog,
    private route: ActivatedRoute
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    if(this.currentUser){
      this.cartService.carts().pipe(first()).subscribe((data: any)=>{
        this.carts = data.data;
        this.count = data.with.count;
      });
    }
    this.isLoggedIn();
  }

  ngAfterViewInit(): void {
    if(this.currentUser){
      setInterval(()=>{
        this.cartService.carts().pipe(first()).subscribe((data: any)=>{
          this.carts = data.data;
          this.count = data.with.count;
        });
      }, 10000);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true); //For Memory Leaks same below
    this.destroy$.unsubscribe();
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

  isLoggedIn(){
    if(this.currentUser) return true;
  }

  logout() {
    if(!this.authenticationService.logout()){
      alert('Server Error Please wait.');
    }
    this.router.navigate(['/sign_in']);
  }

  search(keyword: string) {
    this.value = keyword;
    this.router.navigate([`/shop/${this.value}`]);
  }
}
