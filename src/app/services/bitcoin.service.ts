import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  constructor(private http: HttpClient) {}
  public getBtcRate() {
    return this.http
      .get('https://blockchain.info/tobtc?currency=USD&value=1')
      .pipe(map((res) => res));
  }

  public getMarketPrice(period: string) {
    return this.http
      .get(
        `https://api.blockchain.info/charts/market-price?timespan=1${period}&format=json&cors=true`
      )
      .pipe(map((res) => res));
  }
}
