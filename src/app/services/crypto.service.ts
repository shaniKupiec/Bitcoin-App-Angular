import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { storageService } from './storageService';
const RATE_KEY = 'rates';
const HISTORY_BTC = 'history-btc';
const HISTORY_ETH = 'history-eth';
const HISTORY_LTC = 'history-ltc';
const HISTORY_XRP = 'history-xrp';
const HISTORY_DASH = 'history-dash';
const FULL_HISTORY_BTC = 'full-history-btc';

const MARKET_PRICES_KEY = 'market-prices';
const CONF_TRANS_KEY = 'confirmed-transactions';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private http: HttpClient) {}

  private gRatesCache = storageService.loadFromStorage(RATE_KEY) || null;
  private gHistoryBTCCache =
    storageService.loadFromStorage(HISTORY_BTC) || null;
  private gHistoryETHCache =
    storageService.loadFromStorage(HISTORY_ETH) || null;
  private gHistoryLTCCache =
    storageService.loadFromStorage(HISTORY_LTC) || null;
  private gHistoryXRPCache =
    storageService.loadFromStorage(HISTORY_XRP) || null;
  private gHistoryDASHCache =
    storageService.loadFromStorage(HISTORY_DASH) || null;
  private gFullHistoryBTCCache =
    storageService.loadFromStorage(FULL_HISTORY_BTC) || null;

  private gMarketPricesCache =
    storageService.loadFromStorage(MARKET_PRICES_KEY) || [];
  private gConfirmedTransactionsCache =
    storageService.loadFromStorage(CONF_TRANS_KEY) || [];

  public rates() {
    if (this.gRatesCache) return from([this.gRatesCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,XRP,DASH&tsyms=USD`
      )
      .pipe(
        map((res: any) => {
          for (const coin in res) {
            res[coin.toLowerCase()] = res[coin]['USD'];
          }
          storageService.saveToStorage(RATE_KEY, res);
          return res;
        })
      );
  }

  public exchangeHistoryBTC() {
    if (this.gHistoryBTCCache) return from([this.gHistoryBTCCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=BTC&limit=4`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.map((d: { time: number; volume: number }) => {
            return {
              name: new Date(d.time * 1000).toDateString(),
              value: Math.floor(d.volume),
            };
          });
          const data = {
            name: 'Bitcoin exchange history',
            series: res,
          };
          storageService.saveToStorage(HISTORY_BTC, data);
          return data;
        })
      );
  }

  public exchangeHistoryETH() {
    if (this.gHistoryETHCache) return from([this.gHistoryETHCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=ETH&limit=120`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.map((d: { volume: any }) => Math.floor(d.volume));
          storageService.saveToStorage(HISTORY_ETH, res);
          return res;
        })
      );
  }

  public exchangeHistoryLTC() {
    if (this.gHistoryLTCCache) return from([this.gHistoryLTCCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=LTC&limit=120`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.map((d: { volume: any }) => Math.floor(d.volume));
          storageService.saveToStorage(HISTORY_LTC, res);
          return res;
        })
      );
  }

  public exchangeHistoryXRP() {
    if (this.gHistoryXRPCache) return from([this.gHistoryXRPCache]);
    console.log('getting from http');

    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=XRP&limit=120`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.map((d: { volume: any }) => Math.floor(d.volume));
          storageService.saveToStorage(HISTORY_XRP, res);
          return res;
        })
      );
  }

  public exchangeHistoryDASH() {
    if (this.gHistoryDASHCache) return from([this.gHistoryDASHCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=DASH&limit=120`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.map((d: { volume: any }) => Math.floor(d.volume));
          storageService.saveToStorage(HISTORY_DASH, res);
          return res;
        })
      );
  }

  public fullHistoryBTC() {
    if (this.gFullHistoryBTCCache) return from([this.gFullHistoryBTCCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100`
      )
      .pipe(
        map((res: any) => {
          res = res.Data.Data.map((d: any) => {
            return {
              x: d.time * 1000,
              h: d.high,
              c: d.close,
              l: d.low,
              o: d.open,
            };
          });
          storageService.saveToStorage(FULL_HISTORY_BTC, res);
          return res;
        })
      );
  }

  // public getMarketPrice(period: string) {
  //   if (this.gMarketPriceCache) return from([this.gMarketPriceCache]);
  //   return this.http
  //     .get(
  //       `https://api.blockchain.info/charts/market-price?timespan=1${period}&format=json&cors=true`
  //     )
  //     .pipe(
  //       map((res) => {
  //         storageService.saveToStorage(MARKET_PRICE_KEY, res);
  //         return res;
  //       })
  //     );
  // }
}
