import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root',
})
export class ContactResolverService implements Resolve<Promise<Contact>> {
  constructor(private contactService: ContactService) {}

  async resolve(router: ActivatedRouteSnapshot) {
    const { id } = router.params;
    const contact =  await this.contactService.getContactById(id).toPromise();
    return contact
  }
}
