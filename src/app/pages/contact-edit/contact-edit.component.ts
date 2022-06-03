import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  contact!: Contact;
  routerDataSub!: Subscription

  ngOnInit(): void {
    this.routerDataSub = this.route.data.subscribe(({ contact }) => {
      this.contact = contact;
    });
  }

  onBack(isForced: boolean = false): void {
    if (this.contact._id && !isForced) {
      this.router.navigate(['contact', this.contact._id]);
    } else {
      this.router.navigate(['contact']);
    }
  }

  onDelete(): void {
    if (this.contact._id) {
      this.contactService.deleteContact(this.contact._id);
    }
    this.onBack(true);
  }

  onSubmit(): void {
    this.contactService.saveContact(this.contact);
    this.onBack();
  }

  ngOnDestroy(): void {
    this.routerDataSub.unsubscribe()
  };
}
