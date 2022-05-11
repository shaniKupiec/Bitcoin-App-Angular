import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin.service';
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
    private bitcoinService: BitcoinService
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

    this.bitcoinService.getRates().subscribe((res: any) => {
      this.rates = res;
    });

    // this.bitcoinService
    //   .getMarketPrice(this.currPeriod)
    //   .subscribe((res: any) => {
    //     this.marketPriceData = res;
    //   });
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
  barCount = 60;
  initialDateStr = '2017-04-01T00:00:00';

  public financialChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'Bitcoin Market Price',
        data: this.getRandomData(this.initialDateStr, this.barCount),
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

  public financialChartLegend = true;
  public financialChartType: ChartType = 'candlestick';
  public financialChartPlugins = [];

  randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  randomBar(
    date: Date,
    lastClose: number
  ): { c: number; x: number; h: number; l: number; o: number } {
    const open = this.randomNumber(lastClose * 0.95, lastClose * 1.05);
    const close = this.randomNumber(open * 0.95, open * 1.05);
    const high = this.randomNumber(
      Math.max(open, close),
      Math.max(open, close) * 1.1
    );
    const low = this.randomNumber(
      Math.min(open, close) * 0.9,
      Math.min(open, close)
    );
    return {
      x: +date,
      o: open,
      h: high,
      l: low,
      c: close,
    };
  }

  getRandomData(
    dateStr: string,
    count: number
  ): { c: number; x: number; h: number; l: number; o: number }[] {
    let date = parseISO(dateStr);
    const data = [this.randomBar(date, 30)];
    while (data.length < count) {
      date = add(date, { days: 1 });
      if (date.getDay() <= 5) {
        data.push(this.randomBar(date, data[data.length - 1].c));
      }
    }
    return data;
  }
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
