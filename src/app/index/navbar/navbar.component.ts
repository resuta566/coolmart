import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/_service';
import { User } from '@app/_models';
import { CartService } from '@app/_service/cart-service.service';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  isLogged = false;
  carts: any;
  apiUrl = `${environment.apiUrl}`;
  count = 0;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    if(this.currentUser){
      this.cartService.carts().pipe(first()).subscribe((data: any)=>{
        this.carts = data.data;
        this.count = data.with.count;
        // console.log(this.carts)
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
          // console.log(this.carts)
        });
      }, 5000);
    }
  }

  removeItem(id: number) {
    if(confirm("Are you sure to delete this item?")){
      this.cartService.removeItemCartQty(id).pipe(first()).subscribe(data=> null);
    }

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

  search() {
    
  }
}
