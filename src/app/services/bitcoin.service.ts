import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { storageService } from './storageService';

const RATE_KEY = 'rates';
const MARKET_PRICES_KEY = 'market-prices';
const HISTORY_BTC = 'history-btc'
const CONF_TRANS_KEY = 'confirmed-transactions';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  constructor(private http: HttpClient) {}

  private gRatesCache = storageService.loadFromStorage(RATE_KEY) || null;
  private gHistoryBTCCache = storageService.loadFromStorage(HISTORY_BTC) || null;
  private gMarketPricesCache =
    storageService.loadFromStorage(MARKET_PRICES_KEY) || [];
  private gConfirmedTransactionsCache =
    storageService.loadFromStorage(CONF_TRANS_KEY) || [];

  public getRates() {
    console.log('this.gRatesCache', this.gRatesCache);
    if (this.gRatesCache) return from([this.gRatesCache]);
    console.log('not from cache');
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD`
      )
      .pipe(
        map((res: any) => {
          for (const coin in res) {
            res[coin] = res[coin]['USD'];
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
        `https://min-api.cryptocompare.com/data/exchange/histoday?e=Coinbase&tsym=BTC&limit=120`
      )
      .pipe(
        map((res: any) => {
          // for (const coin in res) {
          //   res[coin] = res[coin]['USD'];
          // }
          res = res.Data.map((d: { volume: any }) => Math.floor(d.volume))
          // console.log('res',res)
          storageService.saveToStorage(MARKET_PRICES_KEY, res);
          return res;
        })
      );
  }

  public getMarketPrice() {
    if (this.gMarketPricesCache) return from([this.gMarketPricesCache]);
    return this.http
      .get(
        `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=2000`
      )
      .pipe(
        map((res: any) => {
          // for (const coin in res) {
          //   res[coin] = res[coin]['USD'];
          // }
          // storageService.saveToStorage(RATE_KEY, res);
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
