import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  constructor(private contactService: ContactService) {}
  // contacts: Contact[];
  contacts$!: Observable<Contact[]>;
  selectedContactId!: string;

  ngOnInit(): void {
    this.contactService.query();
    this.contacts$ = this.contactService.contacts$;
  }
}
