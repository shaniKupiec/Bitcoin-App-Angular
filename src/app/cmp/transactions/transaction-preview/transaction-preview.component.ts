import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'transaction-preview',
  templateUrl: './transaction-preview.component.html',
  styleUrls: ['./transaction-preview.component.scss'],
})
export class TransactionPreviewComponent implements OnInit {
  constructor(public sanitizer: DomSanitizer) {}
  @Input() move!: Move;
  imgSrc!: string;

  ngOnInit(): void {
    switch (this.move.type) {
      case 'btc':
        this.imgSrc = 'https://res.cloudinary.com/trellox/image/upload/v1651413997/cryptonites/bitcoin-icon_hlx8lq.png';
        break;
      case 'eth':
        this.imgSrc = 'https://res.cloudinary.com/trellox/image/upload/v1651505774/cryptonites/e-icon_c8dgvy.png';
        break;
      case 'ltc':
        this.imgSrc = 'https://res.cloudinary.com/trellox/image/upload/v1651505774/cryptonites/l-icon_qppbxk.png';
        break;
      case 'xrp':
        this.imgSrc = 'https://res.cloudinary.com/trellox/image/upload/v1653822932/cryptonites/ripple_jlkddr.png';
        break;
      case 'dash':
        this.imgSrc = 'https://res.cloudinary.com/trellox/image/upload/v1653822932/cryptonites/dash_mhpaze.png';
        break;
      default:
        break;
    }
  }
}
