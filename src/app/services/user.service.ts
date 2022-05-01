import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Move } from '../models/move.model';
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
  private _loggedInUser: User = USERS[0];

  // private _users$ = new BehaviorSubject<User[]>([]);
  // public users$ = this._users$.asObservable();

  private _loggedInUser$ = new BehaviorSubject<User>(<User>{});
  public loggedInUser$ = this._loggedInUser$.asObservable();

  constructor() {}

  public getLoggedInUser(): void {
    let loggedInUser = this._loggedInUser;
    this._loggedInUser$.next(loggedInUser);
  }

  public transfer(contact: Contact, amount: number): void {
    const move = {
      toId: contact._id,
      to: contact.name,
      at: Date.now(),
      amount,
    };

    this._loggedInUser.coins -= amount;
    this._loggedInUser.moves.push(move);

    const idx = this._usersDb.findIndex((u) => u.name === this._loggedInUser.name);
    this._usersDb[idx] = this._loggedInUser;
  }

}
