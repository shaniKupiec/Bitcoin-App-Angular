import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  constructor(private http: HttpClient) {}
  public getRate() {
    return this.http
      .get(
        'https://blockchain.info/tobtc?currency=USD&value=1'
      )
      .pipe(map((res) => res));
  }
}
