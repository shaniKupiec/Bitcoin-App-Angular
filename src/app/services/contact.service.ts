import { Injectable, isDevMode } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ContactFilter } from '../models/contact-filter.model';
import { Contact } from '../models/contact.model';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

const dev = true;

const BASE_URL = dev ? 'http://localhost:3030/api/contact/' : 'api/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this._contacts$.asObservable();

  private _contactFilter$ = new BehaviorSubject<ContactFilter>({ term: '' });
  public contactFilter$ = this._contactFilter$.asObservable();

  constructor(private http: HttpClient) {}

  public async query(): Promise<void> {
    const filterBy: ContactFilter = this._contactFilter$.getValue();
    const options = filterBy.term
      ? { params: new HttpParams().set('term', filterBy.term) }
      : {};
    const contacts = await this.http
      .get<Contact[]>(BASE_URL, options)
      .toPromise();
    this._contacts$.next(contacts);
  }

  public getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${BASE_URL}/${id}`);
  }

  public async deleteContact(id: string | undefined) {
    await this.http.delete(`${BASE_URL}/${id}`).toPromise();
    this.query();
  }

  public saveContact(contact: Contact) {
    return contact._id
      ? this._updateContact(contact)
      : this._addContact(contact);
  }

  public setFilterBy(filterBy: ContactFilter) {
    this._contactFilter$.next({ ...filterBy });
    this.query();
  }

  public getEmptyContact() {
    return {
      name: '',
      email: '',
      phone: '',
    };
  }

  private async _updateContact(contact: Contact) {
    await this.http.put<Contact>(`${BASE_URL}/${contact._id}`, contact).toPromise();
    this.query();
  }

  private async _addContact(contact: Contact) {
    await this.http.post<Contact>(BASE_URL, contact).toPromise();
    this.query();
  }
}
