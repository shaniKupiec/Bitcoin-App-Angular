import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
})
export class ContactDetailsPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private contactService: ContactService) {}

  contact: Contact;

  async ngOnInit() {
    console.log('init');
    
    this.route.data.subscribe((data) => {
      this.contact = data['contact'];
    });
  }
}

// constructor(
//   private petService: PetService,
//   private route: ActivatedRoute,
//   private router: Router
// ) { }

// pet: Pet

// msg: string
// msg$: Observable<string>

// async ngOnInit() {

//   this.route.data.subscribe(data=>{
//      this.pet = data.pet
//   })
