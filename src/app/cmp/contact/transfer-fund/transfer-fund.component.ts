import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
})
export class TransferFundComponent implements OnInit {
  constructor(private userService: UserService) {}
  @Input() contact!: Contact;
  @Input() loggedInUser!: User;
  @Output() onTransfer = new EventEmitter<number>()
  amount: number = 0;
  transMsg: boolean = false;
  amountMsg: boolean = false;

  ngOnInit(): void {
  }

  transfer() {
    this.onTransfer.emit(this.amount)
    this.amount = 0;
    this.transMsg = true;
    setTimeout(() => {
      this.transMsg = false;
    }, 3000);
  }
}
