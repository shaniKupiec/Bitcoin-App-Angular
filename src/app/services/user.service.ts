import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Move } from '../models/move.model';
import { User } from '../models/user.model';

const USERS: User[] = [
  {
    name: 'shani',
    coins: 100,
    moves: [
      {
        id: 'ytrdvb',
        contactId: '626e84d5cc2a3647230043ef',
        contactName: 'Shana Pope',
        at: 1650274560000,
        amount: 7,
        isToContact: false,
      },
      {
        id: '567ujh',
        contactId: '626e84d5cc2a3647230043ee',
        contactName: 'Dominique Soto',
        at: 1650002760000,
        amount: 10,
        isToContact: false,
      },
      {
        id: '5rfg',
        contactId: '626e84d5cc2a3647230043ed',
        contactName: 'Rachel Lowe',
        at: 1649603580000,
        amount: 5,
        isToContact: true,
      },
      {
        id: 'xfgnh',
        contactId: '626e84d5cc2a3647230043ea',
        contactName: 'Ochoa Hyde',
        at: 1649307312000,
        amount: 40,
        isToContact: true,
      },
      {
        id: '456yhg',
        contactId: '626e84d5cc2a3647230043eb',
        contactName: 'Hallie Mclean',
        at: 1648981332000,
        amount: 20,
        isToContact: false,
      },
      {
        id: 'jhgv b',
        contactId: '626e84d5cc2a3647230043ec',
        contactName: 'Parsons Norris',
        at: 1648760400000,
        amount: 100,
        isToContact: true,
      },
    ],
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
    const move: Move = {
      id: this._makeId(),
      contactId: contact._id,
      contactName: contact.name,
      at: Date.now(),
      amount,
      isToContact: true,
    };

    this._loggedInUser.coins -= amount;
    this._loggedInUser.moves.unshift(move);

    const idx = this._usersDb.findIndex(
      (u) => u.name === this._loggedInUser.name
    );
    this._usersDb[idx] = this._loggedInUser;
  }

  private _makeId(length = 5) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
