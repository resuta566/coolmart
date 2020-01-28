import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '@app/_service';
import { CheckOutService } from '@app/_service/checkout/checkout.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '@app/_models';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>(); // Destroy Subscription to avoid memory leaks
  currentUser: any;
  addressInfo: any;
  loading = true;
  profile: User;
  constructor(
    private authenticationService: AuthenticationService,
    private checkOutService: CheckOutService
    ) { }

  ngOnInit() {

    this.authenticationService.profile().pipe(takeUntil(this.destroy$)).subscribe((userProfile: User) => {
      this.profile = userProfile;
    });

    this.checkOutService.checkoutAddress().pipe(takeUntil(this.destroy$)).subscribe((address: any) => {
      this.addressInfo = address;
      if (this.addressInfo) {
        setTimeout(() => {
          this.loading = false;
        }, 500 );
      } else {
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

}
