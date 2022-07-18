import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log('%c here', 'color:red ;font-weight: bold');
    const isLoggedIn = await this.userService.getLoggedInUser();
    console.log('isLoggedIn', isLoggedIn);
    return !!isLoggedIn;
  }
}
