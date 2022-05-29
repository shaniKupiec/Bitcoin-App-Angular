import { Component, Input, OnInit } from '@angular/core';

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
  @Input() historyData!: any;
  @Input() color!: string;

  data = [
    {
      "name": "Bitcoin history",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        },
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        }
      ]
    }
  ]

  view: [number, number] = [400, 300];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = false;
  yAxis: boolean = true;
  timeline: boolean = true;

  colorScheme: any = {
    domain: []
  };

  ngOnInit(): void {
    this.colorScheme.domain.push(this.color)
    console.log('this.historyData',this.historyData)
    console.log('this.historyData.series',this.historyData.series)
    console.log('this.historyData.series[0]',this.historyData.series[0])

    console.log(JSON.parse(JSON.stringify(this.historyData).replace(/^\{(.*)\}$/,"[ { $1 }]")));

    this.historyData = JSON.parse(JSON.stringify(this.historyData).replace(/^\{(.*)\}$/,"[ { $1 }]"))
  }

}
