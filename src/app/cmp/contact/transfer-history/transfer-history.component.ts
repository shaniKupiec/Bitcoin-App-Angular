import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.scss'],
})
export class TransferHistoryComponent implements OnInit {
  constructor() {}
  @Input() move!: Move;

  ngOnInit(): void {}
}
