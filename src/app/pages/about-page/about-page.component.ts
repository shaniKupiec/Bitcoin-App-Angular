import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Data } from 'src/app/models/data.model';

@Component({
  selector: 'about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit {
  constructor() {}

  dataArray: Data[] = [
    {

      imgSrc: 'https://res.cloudinary.com/trellox/image/upload/v1657111905/cryptonites/icon4_v7icny.png',
      title: 'Multiple security',
      info: 'The private key under control Multiple signature technical support and two-step authorization verification Multiple verification methods to ensure the safety of digital assets',
    },
    {

      imgSrc: 'https://res.cloudinary.com/trellox/image/upload/v1657111905/cryptonites/icon2_xbuuph.png',
      title: 'All in one',
      info: 'Support the one-stop management of blockchain assets such as BTC, ETH , ACT and etc Compatibility for decentralization and centralization, assets under control      ',
    },
    {

      imgSrc: 'https://res.cloudinary.com/trellox/image/upload/v1657111905/cryptonites/icon3_eors0s.png',
      title: 'Technology innovation',
      info: 'Before starting Greenhouse, I spent a couple months traveling around the country, talking with CEOs about the things that kept them up at night.',
    },
    {

      imgSrc: 'https://res.cloudinary.com/trellox/image/upload/v1657111906/cryptonites/icon1_spaudx.png',
      title: 'Cryptonites Card',
      info: 'Seamless connection between the digital assets and the bank card, supporting global card consumption Cryptonites network, transfer payment second level confirmation Consumption with cashback and discount for every expenditure',
    },
  ]

  ngOnInit(): void {}

  options: AnimationOptions = {
    path: '../../../assets/animations/ani1.json',
  };

  get titles(): string{
    return this.dataArray.map(data => data.title).join('  ▪️  ')
  }

}
