import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'coin-data',
  templateUrl: './coin-data.component.html',
  styleUrls: ['./coin-data.component.scss']
})
export class CoinDataComponent implements OnInit {

  constructor() { }

  @Input() img!: string;
  @Input() fullName!: string;
  @Input() shortName!: string;
  @Input() rate!: number;
  @Input() isOpened!: boolean;

  @Output() onClick = new EventEmitter<string>();

  ngOnInit(): void {
  }

}
