import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  contact!: Contact

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.contact = data['contact'];
    });
  }

  onBack() {
    this.router.navigate(['contact']);
  }
}
