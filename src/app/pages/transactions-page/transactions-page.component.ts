import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss']
})
export class TransactionsPageComponent implements OnInit {

  constructor(private userService: UserService) { }
  count: number = 50
  loggedInUser!: User;
  loggedInUser$!: Observable<User>;
  moves = 5;

  ngOnInit(): void {
    this.userService.getLoggedInUser();
    this.userService.loggedInUser$.subscribe(data =>{
      this.loggedInUser = data
    });
  }

}
