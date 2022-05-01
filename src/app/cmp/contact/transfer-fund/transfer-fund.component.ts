import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent implements OnInit {

  constructor(private userService: UserService) {}
  @Input() contact!: Contact
  loggedInUser!: User;
  loggedInUser$!: Observable<User>;
  amount: number = 0
  showMsg: boolean = false;


  ngOnInit(): void {
    this.userService.getLoggedInUser();
    this.userService.loggedInUser$.subscribe(data =>{
      this.loggedInUser = data
    });
  }

  transfer(){
    this.userService.transfer(this.contact, this.amount)
    this.amount = 0
    this.showMsg = true;
    setTimeout(() => {
        this.showMsg = false;
      }, 3000);
  }

}
