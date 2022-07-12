import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Move } from '../models/move.model';
import { User } from '../models/user.model';

const dev = false;

const BASE_URL = dev ? 'http://localhost:3030/api' : 'api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //mock the server
  // private _usersDb: User[] = USERS;
  // private _loggedInUser: User = USERS[0];

  private _loggedInUser$ = new BehaviorSubject<User>(<User>{});
  public loggedInUser$ = this._loggedInUser$.asObservable();

  constructor(private http: HttpClient) {}

  public async getLoggedInUser(): Promise<void> {
    // let loggedInUser = this._loggedInUser;
    // this._loggedInUser$.next(loggedInUser);

    const loggedInUser = await this.http
      .get<User>(`${BASE_URL}auth`)
      .toPromise();
    this._loggedInUser$.next(loggedInUser);
  }

  public async login() {
    const email = 'shanikupiec@gmail.com';
    const password = '123';
    const body = { email, password };
    // const options =  { body: new HttpParams().set('term', filterBy.term) };

    return this.http.post<User>(`${BASE_URL}auth/login`, body).toPromise();
  }

  public async transfer(contact: Contact, amount: number, type: string, user: User) {
    const move: Move = {
      id: this._makeId(),
      contactId: contact._id,
      contactName: contact.name,
      at: Date.now(),
      amount,
      isToContact: true,
      type,
    };
    user.coins[type] -= amount;
    user.total -= amount;
    user.moves.unshift(move);
    await this.http.put<User>(`${BASE_URL}user`, user).toPromise();
    this.getLoggedInUser();
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
