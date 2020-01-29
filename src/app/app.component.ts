import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { routerAnimation } from './_animations/coolmart.animation';

import {
    Router, NavigationEnd, ActivatedRoute, NavigationStart,
    NavigationCancel, NavigationError, Event, RouterOutlet
  } from '@angular/router';

import {
} from '@angular/router';
@Component({
  selector: 'coolmart-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimation()]
})
export class AppComponent implements OnInit {
  title = 'coolmart';

  showLoadingIndicator = true;

  constructor(
    private titleService: Title,
    public routerNav: Router,
    private activatedRoute: ActivatedRoute
    ) {
      // Subscribe to the router events observable
    this.routerNav.events.subscribe((routerEvent: Event) => {

      // On NavigationStart, set showLoadingIndicator to ture
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      // On NavigationEnd or NavigationError or NavigationCancel
      // set showLoadingIndicator to false
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel) {
          setTimeout(() => {
            this.showLoadingIndicator = false;
          }, 500);
      }

    });
    }

  ngOnInit() {
    console.log(`If someone said that you could hack using console, THAT IS A SCAM! \nDon't believe them!`);
    const appTitle = this.titleService.getTitle();
    this.routerNav
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data.title) {
            return child.snapshot.data.title;
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }

  getRouteAnimation(outlet: RouterOutlet) {
    const res =
      outlet.activatedRouteData.num === undefined
        ? -1
        : outlet.activatedRouteData.num;

    return res;
  }

}
