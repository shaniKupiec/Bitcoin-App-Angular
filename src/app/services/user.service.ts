import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Move } from '../models/move.model';
import { UserMsg } from '../models/user-msg.model';
import { User } from '../models/user.model';
import { guestPasswords } from '../../../passwords';

const dev = false;

const BASE_URL = dev ? 'http://localhost:3030/api/' : '/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _loggedInUser$ = new BehaviorSubject<User>(<User>{});
  public loggedInUser$ = this._loggedInUser$.asObservable();

  private _userMsgr$ = new BehaviorSubject<UserMsg>(<UserMsg>{});
  public userMsg$ = this._userMsgr$.asObservable();

  constructor(private http: HttpClient) {}

  public async getLoggedInUser(): Promise<boolean> {
    const loggedInUser = await this.http
      .get<User>(`${BASE_URL}auth`)
      .toPromise();
    console.log('loggedInUser', loggedInUser);
    this._loggedInUser$.next(loggedInUser);
    return !!loggedInUser;
  }

  public setUserMsg(isSuccess: boolean, msg: string) {
    this._userMsgr$.next({ isSuccess, msg });
  }

  public async login(
    email: string = guestPasswords.email,
    password: string = guestPasswords.password
  ) {
    try {
      const body = { email, password };
      console.log('body',body)
      return this.http.post<User>(`${BASE_URL}auth/login`, body).toPromise();
    } catch (err) {
      throw err;
    }
  }

  public async signIn(name: string, email: string, password: string) {
    try {
      const body = { name, email, password };
      return this.http.post<User>(`${BASE_URL}auth/signup`, body).toPromise();
    } catch (err) {
      throw err;
    }
  }

  public async logout() {
    await this.http.post<void>(`${BASE_URL}auth/logout`, {}).toPromise();
    this.getLoggedInUser();
  }

  public async transfer(
    contact: Contact,
    amount: number,
    type: string,
    user: User
  ) {
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
