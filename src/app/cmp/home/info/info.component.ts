import { Component, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  selectedSentence!: string;
  options: string[] = [
    'Exchange between all popular currencies with a couple of clicks',
    'The leading platform for professional cryptocurrency traders',
    'Multi-Currency Wallet That Actually Works',
    'Unlimited free transfers between Cryptonites account holders',
  ];

  ngOnInit(): void {
    this.selectedSentence = this.options[this.getRandomInt(0, 4)];
  }

  async tryDemo() {
    // set demo user
    await this.userService.login()
    this.router.navigate(['/about']);
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
}
