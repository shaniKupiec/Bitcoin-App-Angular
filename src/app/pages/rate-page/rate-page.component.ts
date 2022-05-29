import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rates } from 'src/app/models/rates.model';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'rate-page',
  templateUrl: './rate-page.component.html',
  styleUrls: ['./rate-page.component.scss'],
})
export class RatePageComponent implements OnInit {
  constructor(private cryptoService: CryptoService) {}

  rates!: Rates;
  ratesSub!: Subscription;
  historyBTCSub!: Subscription;
  historyETHSub!: Subscription;
  historyLTCSub!: Subscription;
  historyXRPSub!: Subscription;
  historyDASHSub!: Subscription;

  helpArray: {
    [key: string]: string;
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

  shaniData = [
    {
      name: 'Bitcoin history',
      series: [
        {
          name: '1990',
          value: 62000000,
        },
        {
          name: '2010',
          value: 73000000,
        },
        {
          name: '2011',
          value: 89400000,
        },
      ],
    },
  ]

  coinDatas = [
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1652273953/cryptonites/Group_zqaaoj.png',
      shortName: 'btc',
      historyData: [
        {
          name: 'Bitcoin history',
          series: [
            {
              name: '1990',
              value: 62000000,
            },
            {
              name: '2010',
              value: 73000000,
            },
            {
              name: '2011',
              value: 89400000,
            },
          ],
        },
      ],
      color: '#F2921B',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1652273940/cryptonites/Group_5_rvkdqt.png',
      shortName: 'eth',
      historyData: 5,
      color: '#939ABE',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1652273946/cryptonites/Group_2_yu5m3j.png',
      shortName: 'ltc',
      historyData: 5,
      color: '#838383',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1652279398/cryptonites/Group_4_y2hafp.png',
      shortName: 'xrp',
      historyData: 5,
      color: '#4A90E2',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1652279394/cryptonites/Group_5-1_ybb9ki.png',
      shortName: 'dash',
      historyData: 5,
      color: '#494AA7',
    },
  ];

  ngOnInit(): void {
    this.ratesSub = this.cryptoService.rates().subscribe((res: any) => {
      this.rates = res;
    });

    this.historyBTCSub = this.cryptoService
      .exchangeHistoryBTC()
      .subscribe((res: any) => {
        // this.coinDatas[0].historyData = res;
        this.shaniData = res
      });

    this.historyETHSub = this.cryptoService
      .exchangeHistoryETH()
      .subscribe((res: any) => {
        this.coinDatas[1].historyData = res;
      });

    this.historyLTCSub = this.cryptoService
      .exchangeHistoryLTC()
      .subscribe((res: any) => {
        this.coinDatas[2].historyData = res;
      });

    this.historyXRPSub = this.cryptoService
      .exchangeHistoryXRP()
      .subscribe((res: any) => {
        this.coinDatas[3].historyData = res;
      });

    this.historyDASHSub = this.cryptoService
      .exchangeHistoryDASH()
      .subscribe((res: any) => {
        this.coinDatas[4].historyData = res;
      });
  }

  ngOnDestroy(): void {
    this.ratesSub.unsubscribe();
    this.historyBTCSub.unsubscribe();
    this.historyETHSub.unsubscribe();
    this.historyLTCSub.unsubscribe();
    this.historyXRPSub.unsubscribe();
    this.historyDASHSub.unsubscribe();
  }
}
