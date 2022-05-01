import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CmpNameResolverService implements Resolve<string> {
// export class CmpNameResolverService implements Resolve<Promise<string>> {
  constructor() {}

  async resolve(router: ActivatedRouteSnapshot) {
    console.log('router',router)
    // if (id) {
    //   return await this.contactService.getContactById(id).toPromise();
    // }
    // return this.contactService.getEmptyContact() as Contact;
    return '678'
  }
}
