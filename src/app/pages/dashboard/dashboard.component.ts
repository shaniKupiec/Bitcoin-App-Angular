import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { CryptoService } from 'src/app/services/crypto.service';
import { UserService } from 'src/app/services/user.service';
import { AnimationOptions } from 'ngx-lottie';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import 'chartjs-chart-financial';
import { BaseChartDirective } from 'ng2-charts';
import { enUS } from 'date-fns/locale';
import { add, parseISO } from 'date-fns';
import {
  CandlestickController,
  CandlestickElement,
  OhlcController,
  OhlcElement,
} from 'chartjs-chart-financial';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cryptoService: CryptoService 
  ) {
    Chart.register(
      CandlestickController,
      OhlcController,
      CandlestickElement,
      OhlcElement
    );
  }

  loggedInUser!: User;
  loggedInUser$!: Observable<User>;
  rates = { BTC: 0, ETH: 0, LTC: 0 };
  openedRate: string = 'btc';
  currPeriod: string = 'year';
  marketPriceData!: any;
  options: AnimationOptions = {
    path: '../../../assets/animations/ani3.json',
  };

  ngOnInit(): void {
    this.userService.getLoggedInUser();
    this.userService.loggedInUser$.subscribe((data) => {
      this.loggedInUser = data;
    });

    this.cryptoService.rates().subscribe((res: any) => {
      this.rates = res;
    });

    this.cryptoService.fullHistoryBTC().subscribe((res: any) => {
      this.financialChartData.datasets[0].data = res
      this.chart?.update();
    });

    this.cryptoService.exchangeHistoryBTC().subscribe((res: any) => {
      this.lineChartData.datasets[0].data = res;
      this.chart?.update();
    });

    this.cryptoService.exchangeHistoryETH().subscribe((res: any) => {
      this.lineChartData.datasets[1].data = res;
      this.chart?.update();
    });
    
    this.cryptoService.exchangeHistoryLTC().subscribe((res: any) => {
      this.lineChartData.datasets[2].data = res;
      this.chart?.update();
    });
  }

  onOpenedRate(coin: string) {
    this.openedRate = coin;
  }

  //PIE
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Bitcoin', 'Ethereum ', 'Litecoin'],
    datasets: [
      {
        data: [90, 7, 3],
        backgroundColor: ['#bebebe', '#639c29', '#1e2024'],
        hoverBackgroundColor: ['#bebebe', '#639c29', '#1e2024'],
        borderColor: '#868686',
        hoverBorderColor: '#868686',
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  //Financial
  public financialChartLegend = true;
  public financialChartType: ChartType = 'candlestick';

  public financialChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'Bitcoin Market Price',
        data: [],
        borderColor: '#ffffff',
      },
    ],
  };

  public financialChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        time: {
          unit: 'day',
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
        ticks: {
          source: 'auto',
        },
      },
    },
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration['data'] = {
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
      {
        data: [],
        label: 'Litecoin Rate',
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#838383',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    }
  };

  public lineChartType: ChartType = 'line';

}



// public lineChartData: ChartConfiguration['data'] = {
//   datasets: [
//     {
//       data: [65, 59, 80, 81, 56, 55, 40],
//       label: 'Series A',
//       backgroundColor: 'rgba(148,159,177,0.2)',
//       borderColor: 'rgba(148,159,177,1)',
//       pointBackgroundColor: 'rgba(148,159,177,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(148,159,177,0.8)',
//       fill: 'origin',
//     },
//     {
//       data: [28, 48, 40, 19, 86, 27, 90],
//       label: 'Series B',
//       backgroundColor: 'rgba(77,83,96,0.2)',
//       borderColor: 'rgba(77,83,96,1)',
//       pointBackgroundColor: 'rgba(77,83,96,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(77,83,96,1)',
//       fill: 'origin',
//     },
//     {
//       data: [180, 480, 770, 90, 1000, 270, 400],
//       label: 'Series C',
//       yAxisID: 'y-axis-1',
//       backgroundColor: 'rgba(255,0,0,0.3)',
//       borderColor: 'red',
//       pointBackgroundColor: 'rgba(148,159,177,1)',
//       pointBorderColor: '#fff',
//       pointHoverBackgroundColor: '#fff',
//       pointHoverBorderColor: 'rgba(148,159,177,0.8)',
//       fill: 'origin',
//     },
//   ],
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
// };

// public lineChartType: ChartType = 'line';
