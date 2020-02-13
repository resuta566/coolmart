import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '@app/_service';
import { routerAnimation } from '@app/_animations/coolmart.animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { User } from '@app/_models';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerAnimation()]
})
export class DashboardComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>(); // Destroy Subscription to avoid memory leaks
  currentUser: string;
  r: any;
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.profile().pipe(takeUntil(this.destroy$)).subscribe((userProfile: User) => {
      this.currentUser = userProfile.name;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true); // For Memory Leaks same below
    this.destroy$.unsubscribe();
  }

  getRouteAnimation(outlet: RouterOutlet) {
    const res =
      outlet.activatedRouteData.num === undefined
        ? -1
        : outlet.activatedRouteData.num;

    return res;
  }
}
