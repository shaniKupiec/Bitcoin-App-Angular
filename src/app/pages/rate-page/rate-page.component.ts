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

  coinDatas = [
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1652273953/cryptonites/Group_zqaaoj.png',
      shortName: 'btc',
      historyData: [],
      color: '#F2921B',
      period: 'year',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1652273940/cryptonites/Group_5_rvkdqt.png',
      shortName: 'eth',
      historyData: [],
      color: '#939ABE',
      period: 'year',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1652273946/cryptonites/Group_2_yu5m3j.png',
      shortName: 'ltc',
      historyData: [],
      color: '#838383',
      period: 'year',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1652279398/cryptonites/Group_4_y2hafp.png',
      shortName: 'xrp',
      historyData: [],
      color: '#4A90E2',
      period: 'year',
    },
    {
      img: 'https://res.cloudinary.com/trellox/image/upload/v1652279394/cryptonites/Group_5-1_ybb9ki.png',
      shortName: 'dash',
      historyData: [],
      color: '#494AA7',
      period: 'year',
    },
  ];

  changePeriod($event: { period: string; name: string }) {
    const idx = this.coinDatas.findIndex(
      (coinData) => coinData.shortName === $event.name
    );
    this.coinDatas[idx].period = $event.period;
  }

  ngOnInit(): void {
    this.ratesSub = this.cryptoService.rates().subscribe((res: any) => {
      this.rates = res;
    });

    this.historyBTCSub = this.cryptoService
      .exchangeHistoryBTC()
      .subscribe((res: any) => {
        console.log('res',res)
        this.coinDatas[0].historyData = res;
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
