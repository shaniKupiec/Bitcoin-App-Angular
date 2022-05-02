import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Move } from 'src/app/models/move.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
})
export class TransactionsPageComponent implements OnInit {
  constructor(private userService: UserService) {}
  count: number = 50;
  loggedInUser!: User;
  loggedInUser$!: Observable<User>;
  moves: Move[] = [];
  filterBy: string = 'all';

  ngOnInit(): void {
    this.userService.getLoggedInUser();
    this.userService.loggedInUser$.subscribe((data) => {
      this.loggedInUser = data;
    });
  }

  get movesToDisplay(): Move[] {
    if (this.filterBy === 'all') {
      return this.loggedInUser.moves;
    } else if(this.filterBy === 'sent'){
      return this.loggedInUser.moves.filter(m => m.isToContact)
    }
    //sort
    return this.loggedInUser.moves.slice(0, 5)
  }
}
