import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
})
export class ContactDetailsPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
    private userService: UserService
  ) {}

  contact!: Contact;
  loggedInUser!: User;
  loggedInUser$!: Observable<User>;
  routerDataSub! : Subscription;
  userServiceSub! : Subscription;

  async ngOnInit() {
    this.routerDataSub = this.route.data.subscribe((data) => {
      this.contact = data['contact'];
    });
    
    this.userService.getLoggedInUser();
    this.userServiceSub = this.userService.loggedInUser$.subscribe((data) => {
      this.loggedInUser = data;
    });
  }

  onBack(): void {
    this.router.navigate(['contact']);
  }

  onDelete(): void {
    this.contactService.deleteContact(this.contact._id);
    this.onBack();
  }

  onTransfer($event: {amount: number, coinType: string}): void{
    this.userService.transfer(this.contact, $event.amount, $event.coinType);
  }

  get movesForDisplay(): Move[]{
    var moves = this.loggedInUser.moves
    return moves.filter(m => m.contactId === this.contact._id)
  }

  ngOnDestroy(): void {
    this.routerDataSub.unsubscribe()
    this.userServiceSub.unsubscribe()
  };
}
