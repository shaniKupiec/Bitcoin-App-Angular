import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'rate-page',
  templateUrl: './rate-page.component.html',
  styleUrls: ['./rate-page.component.scss'],
})
export class RatePageComponent implements OnInit {
  constructor(private cryptoService: CryptoService) {}

  rates!: any

  ngOnInit(): void {
    this.cryptoService.rates().subscribe((res: any) => {
      this.rates = res;
    });

    this.cryptoService.exchangeHistoryBTC().subscribe((res: any) => {
      this.lineChartDataBTC.datasets[0].data = res;
      this.chart?.update();
    });

    this.cryptoService.exchangeHistoryETH().subscribe((res: any) => {
      this.lineChartDataETH.datasets[0].data = res;
      this.chart?.update();
    });
    
    this.cryptoService.exchangeHistoryLTC().subscribe((res: any) => {
      this.lineChartDataLTC.datasets[0].data = res;
      this.chart?.update();
    });

    this.cryptoService.exchangeHistoryXRP().subscribe((res: any) => {
      this.lineChartDataXRP.datasets[0].data = res;
      this.chart?.update();
    });

    this.cryptoService.exchangeHistoryDASH().subscribe((res: any) => {
      this.lineChartDataDASH.datasets[0].data = res;
      this.chart?.update();
    });
  }

  public lineChartDataBTC: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Bitcoin Rate',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#F2921B',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.labels,
  };

  public lineChartDataETH: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Ethereum Rate',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#939ABE',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.labels,
  };

  public lineChartDataLTC: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Litecoin Rate',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#838383',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.labels,
  };

  public lineChartDataXRP: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Ripple Rate',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#4A90E2',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.labels,
  };

  public lineChartDataDASH: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Dash Rate',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#494AA7',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: this.labels,
  };

  private get labels() {
    //WORKON
    const months: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const start = new Date().getMonth() - 4;
    return months.slice(start, start + 5);
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    responsive: true,
    scales: {
      x: {},
      'y-axis-0': {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
      },
    },
  };
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartType: ChartType = 'line';
}
