import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss'],
})
export class TransferFundComponent implements OnInit {
  constructor(private userService: UserService) {}
  @Input() contact!: Contact;
  @Input() loggedInUser!: User;
  @Output() onTransfer = new EventEmitter<{amount: number, coinType: string}>();
  amount: number = 0;
  coinType: 'btc' | 'eth' | 'ltc' | 'xrp' | 'dash' = 'btc';
  transMsg: boolean = false;
  transAni: boolean = false;

  options: AnimationOptions = {
    path: '../../../assets/animations/ani5.json',
  };

  ngOnInit(): void {}

  maxAmount(): number{
    return this.loggedInUser.coins[this.coinType]
  }

  transfer() {

    if(this.amount > this.maxAmount() || this.amount <= 0){
      this.userService.setUserMsg(false, 'invalid amount try again')
      this.amount = 0;
      return
    }
    this.transAni = true;
    const amount = this.amount
    const coinType = this.coinType
    this.amount = 0;
    this.coinType = 'btc';
    setTimeout(() => {
      this.onTransfer.emit({ amount, coinType });
      this.transAni = false;
      this.transMsg = true;
      setTimeout(() => {
        this.transMsg = false;
      }, 3000);
    }, 6000);
  }
}
