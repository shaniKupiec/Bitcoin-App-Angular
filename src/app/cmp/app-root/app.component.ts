import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Event } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  currentCmpName: string = "";
  isFullApp: boolean = false;
  routerEventsSub!: Subscription;

  ngOnInit(): void {
    this.routerEventsSub = this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationEnd) {
        switch (routerEvent.url.split('/')[1]) {
          case 'about':
            this.currentCmpName = '';
            this.isFullApp = true;
            break;
          case 'dashboard':
            this.currentCmpName = 'Dashboard';
            this.isFullApp = true;
            break;
          case 'contact':
            this.currentCmpName = 'My Contacts';
            this.isFullApp = true;
            break;
          case 'trans':
            this.currentCmpName = 'My Transactions';
            this.isFullApp = true;
            break;
          case 'rate':
            this.currentCmpName = 'Transactions History By Coin Type';
            this.isFullApp = true;
            break;
          case 'signin':
            this.isFullApp = false;
            break;
          default:
            this.currentCmpName = 'Unknown';
            this.isFullApp = false;
            break;
        }
      }
    });
  };

  ngOnDestroy(): void {
    this.routerEventsSub.unsubscribe()
  };
}
