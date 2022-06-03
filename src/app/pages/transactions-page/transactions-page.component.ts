import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Move } from 'src/app/models/move.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import * as XLSX from 'xlsx';

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
  filterBy: string = 'all';
  userServicesSub!: Subscription;

  ngOnInit(): void {
    this.userService.getLoggedInUser();
    this.userServicesSub = this.userService.loggedInUser$.subscribe((data) => {
      this.loggedInUser = data;
    });
  }

  get movesToDisplay(): Move[] {
    if (this.filterBy === 'all') {
      return this.loggedInUser.moves;
    } else if (this.filterBy === 'sent') {
      return this.loggedInUser.moves.filter((m) => m.isToContact);
    }
    //sort
    return this.loggedInUser.moves.slice(0, 5);
  }

  fileName = 'ExportHistory.xlsx';
  userList = [];
  exportExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  ngOnDestroy(): void {
    this.userServicesSub.unsubscribe()
  };
}
