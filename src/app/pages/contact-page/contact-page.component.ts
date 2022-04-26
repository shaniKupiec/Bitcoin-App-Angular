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
  contacts$: Observable<Contact[]>;
  selectedContactId: string;

  ngOnInit(): void {
    this.contactService.query();
    this.contacts$ = this.contactService.contacts$;
  }
}

// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Observable, Subscription } from 'rxjs';
// import { Pet } from 'src/app/models/pet.model';
// import { PetService } from 'src/app/services/pet.service';

//     constructor(private petService: PetService) { }
//     subscription: Subscription
//     pets: Pet[]
//     pets$: Observable<Pet[]>
//     selectedPetId: string
//     prm = new Promise((resolve) => {
//         setTimeout(() => {
//             resolve('resolved')
//         }, 800);
//     })

//     ngOnInit(): void {
//         this.petService.query()
//         this.pets$ = this.petService.pets$

//         // this.subscription = this.petService.pets$.subscribe(pets => {
//         //     this.pets = pets
//         // })
//     }

//     ngOnDestroy(): void {
//         // this.subscription.unsubscribe()
//     }

// }
