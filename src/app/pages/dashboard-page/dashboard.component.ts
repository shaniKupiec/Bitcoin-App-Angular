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
import { Rates } from 'src/app/models/rates.model';
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial'

Chart.register(OhlcElement, OhlcController, CandlestickElement, CandlestickController)

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private userService: UserService,
    private cryptoService: CryptoService
  ) {}

  loggedInUser!: User;
  loggedInUser$!: Observable<User>;
  rates: Rates = { btc: 0, eth: 0, ltc: 0, xrp: 0, dash: 0 };
  openedRate: string = 'btc';
  currPeriod: string = 'year';
  marketPriceData!: any;
  options: AnimationOptions = {
    path: '../../../assets/animations/ani3.json',
  };

  helpArray: {
    [key: string]: string,
    btc: string;
    eth: string;
    ltc: string;
    xrp: string;
    dash: string;
  } = {
    btc: 'Bitcoin',
    eth: 'Ethereum',
    ltc: 'Litecoin',
    xrp: 'Ripple',
    dash: 'Dash',
  };

  // coin-data
  coinDatas = [
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1651511375/cryptonites/b-coin_hneefw.png',
      shortName: 'btc',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1651505774/cryptonites/e-icon_c8dgvy.png',
      shortName: 'eth',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1651505774/cryptonites/l-icon_qppbxk.png',
      shortName: 'ltc',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1653822932/cryptonites/ripple_jlkddr.png',
      shortName: 'xrp',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1653822932/cryptonites/dash_mhpaze.png',
      shortName: 'dash',
    },
  ];

  // percents
  percentsColor: any = {
    domain: ['#F2921B', '#939ABE', '#838383', '#4A90E2', '#494AA7'],
  };
  percentsData!: any[];

  // exchange-chart
  exchangeData: any[] = [];
  exchangeColor: any = {
    domain: ['#F2921B', '#939ABE', '#838383', '#4A90E2', '#494AA7'],
  };

  ngOnInit(): void {
    this.userService.getLoggedInUser();
    this.userService.loggedInUser$.subscribe((data) => {
      this.loggedInUser = data;
      var newData: any[] = [];
      Object.entries(data.coins).forEach(([key, value]) => {
        newData.push({
          name: this.helpArray[key],
          value: value,
        });
      });
      this.percentsData = newData;
    });

    this.cryptoService.rates().subscribe((res: any) => {
      this.rates = res;
    });

    this.cryptoService.fullHistoryBTC().subscribe((res: any) => {
      this.financialChartData.datasets[0].data = res;
      this.chart?.update();
    });

    this.cryptoService.exchangeHistoryBTC().subscribe((res: any) => {
      res.series = res.series.slice(-21)
      this.exchangeData.push(res)
    });
    
    this.cryptoService.exchangeHistoryETH().subscribe((res: any) => {
      res.series = res.series.slice(-21)
      this.exchangeData.push(res)
    });
    
    this.cryptoService.exchangeHistoryLTC().subscribe((res: any) => {
      res.series = res.series.slice(-21)
      this.exchangeData.push(res)
    });
    
    this.cryptoService.exchangeHistoryXRP().subscribe((res: any) => {
      res.series = res.series.slice(-21)
      // this.exchangeData.push(res)
    });

    this.cryptoService.exchangeHistoryDASH().subscribe((res: any) => {
      res.series = res.series.slice(-21)
      this.exchangeData.push(res)
    });
  }

  onOpenedRate(coin: string) {
    this.openedRate = coin;
  }

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
}
