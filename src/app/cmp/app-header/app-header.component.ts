import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Event } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  currentCmpName!: string;

  ngOnInit(): void {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationEnd) {
        switch (routerEvent.url.split('/')[1]) {
          case '':
            this.currentCmpName = 'Home';
            break;
          case 'dashboard':
            this.currentCmpName = 'Dashboard';
            break;
          case 'contact':
            this.currentCmpName = 'My Contacts';
            break;
          case 'trans':
            this.currentCmpName = 'Transactions';
            break;
          default:
            this.currentCmpName = 'Unknown';
            break;
        }
      }
    });
  }
}
