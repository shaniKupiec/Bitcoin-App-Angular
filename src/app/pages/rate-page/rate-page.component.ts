import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BitcoinService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'rate-page',
  templateUrl: './rate-page.component.html',
  styleUrls: ['./rate-page.component.scss'],
})
export class RatePageComponent implements OnInit {
  constructor(private bitcoinService: BitcoinService) {}
  BTCHistory: number[] = [
    82683, 82509, 76352, 75070, 42185, 43458, 72543, 75601, 74698,
  ];

  ngOnInit(): void {
    this.bitcoinService.exchangeHistoryBTC().subscribe((res: any) => {
      this.BTCHistory = res.slice(0, 2);
      console.log('this.BTCHistory', this.BTCHistory);
      this.lineChartData.datasets[0].data = res.slice(0, 2);
      this.chart?.update();
    });
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        // data: [82683, 82509, 76352, 49, 95, 96, 79, 98, 99],
        data: this.BTCHistory,
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0': {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },
  };
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartType: ChartType = 'line';
}
