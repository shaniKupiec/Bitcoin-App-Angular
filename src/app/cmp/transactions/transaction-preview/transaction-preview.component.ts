import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'transaction-preview',
  templateUrl: './transaction-preview.component.html',
  styleUrls: ['./transaction-preview.component.scss']
})
export class TransactionPreviewComponent implements OnInit {

  constructor() { }
  @Input() move!: Move
  
  ngOnInit(): void {
  }

}
