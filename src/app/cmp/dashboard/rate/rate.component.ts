import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  constructor() { }
  @Input() img!: string;
  @Input() fullName!: string;
  @Input() shortName!: string;
  @Input() rate!: number;
  @Input() lineChartData!: ChartConfiguration['data'];
  @Input() lineChartOptions!: ChartConfiguration['options'];
  @Input() lineChartType!: ChartType;

  ngOnInit(): void {
    console.log('this.lineChartData',this.lineChartData)
  }

}
