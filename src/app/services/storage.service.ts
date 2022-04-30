import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public saveToStorage(key: string, val: any): void {
    const str = JSON.stringify(val);
    localStorage.setItem(key, str);
  }

  // public loadFromStorage(key: string): void {
  //   const str: string = localStorage.getItem(key);
  //   const val: any = JSON.parse(str);
  //   return val;
  // }
}
