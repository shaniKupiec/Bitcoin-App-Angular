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

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  timeline: boolean = true;

  colorScheme: any = {
    domain: [],
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.colorScheme.domain.push(this.color);
    this.data = JSON.parse(
      JSON.stringify(this.historyData).replace(/^\{(.*)\}$/, '[ { $1 }]')
    );
    console.log('this.data', this.data);
    if(this.period === 'month'){
      this.data[0].series = this.data[0]?.series.slice(0, 90)
    } else if(this.period === 'week'){
      this.data[0].series = this.data[0]?.series.slice(0, 21)
    }
    // console.log('this.period',this.period)
    // console.log('this.historyData', this.historyData);
    // this.historyData[0].series = this.historyData[0].series.forEach(
    //   (element: any) => {
    //     return {
    //       name: new Date(element.name * 1000).getDay(),
    //       value: element.value,
    //     };
    //   }
    // );
    // console.log('this.historyData', this.historyData);
  }
}
