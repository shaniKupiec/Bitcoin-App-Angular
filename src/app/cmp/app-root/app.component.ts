import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Event } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserMsg } from 'src/app/models/user-msg.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}
  currentCmpName: string = '';
  isFullApp: boolean = false;
  routerEventsSub!: Subscription;
  userServicesSub!: Subscription;
  userMsg: UserMsg | null = null;

  ngOnInit(): void {
    this.routerEventsSub = this.router.events.subscribe(
      (routerEvent: Event) => {
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
      }
    );

    this.userServicesSub = this.userService.userMsg$.subscribe((data) => {
      if (data.msg) {
        this.userMsg = data;
        setTimeout(() => {
          this.userMsg = null;
        }, 3000);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSub.unsubscribe();
    this.userServicesSub.unsubscribe();
  }
}
