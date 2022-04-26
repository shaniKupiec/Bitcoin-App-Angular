import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user.model';

const USERS = [
  {
    name: 'Shani Kupiec',
    coins: 100,
    moves: [],
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //mock the server
  private _usersDb: User[] = USERS;

  // private _users$ = new BehaviorSubject<User[]>([]);
  // public users$ = this._users$.asObservable();

  private _loggedInUser$ = new BehaviorSubject<User>(<User>{});
  public loggedInUser$ = this._loggedInUser$.asObservable();

  constructor() {}


  public getLoggedInUser(filterBy = null): void {
    let loggedInUser = this._usersDb[0];
    this._loggedInUser$.next(loggedInUser);
  }
}
