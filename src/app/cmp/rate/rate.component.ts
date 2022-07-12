import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
})
export class RateComponent implements OnChanges {
  constructor() {}
  @Input() img!: string;
  @Input() fullName!: string;
  @Input() shortName!: string;
  @Input() rate!: number;
  @Input() historyData!: any;
  @Input() color!: string;
  @Input() period!: string;

  @Output() onChangePeriod = new EventEmitter<{period: string, name: string}>();

  data!: any[];
  view: [number, number] = [400, 300];

  colorScheme: any = {
    domain: [],
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.colorScheme.domain.push(this.color);
    this.data = JSON.parse(
      JSON.stringify(this.historyData).replace(/^\{(.*)\}$/, '[ { $1 }]')
    );
    if(this.period === 'month'){
      this.data[0].series = this.data[0]?.series.slice(-90)
    } else if(this.period === 'week'){
      this.data[0].series = this.data[0]?.series.slice(-21)
    }
  }
}
