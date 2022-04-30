import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
})
export class ContactDetailsPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  contact!: Contact;

  async ngOnInit() {
    this.route.data.subscribe((data) => {
      this.contact = data['contact'];
    });
  }

  onBack(): void {
    this.router.navigate(['contact']);
  }

  onDelete(): void {
    this.contactService.deleteContact(this.contact._id);

    this.onBack();
  }
}
