import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  constructor(private contactService: ContactService) {}
  contacts!: Contact[];
  contacts$!: Observable<Contact[]>;
  contactServiceSub!: Subscription;

  ngOnInit(): void {
    this.contactService.query();
    this.contactServiceSub = this.contactService.contacts$.subscribe(data =>{
      this.contacts = data
    });
    // this.contactService
    //   .query()
    //   .subscribe((data: Contact[]) => (this.contacts = data));
  }

  ngOnDestroy(): void {
    this.contactServiceSub.unsubscribe()
  };
}
