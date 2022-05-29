import { Move } from './move.model';

export class User {
  constructor(
    public name: string,
    public coins: {
      btc: number;
      eth: number;
      ltc: number;
      xrp: number;
      dash: number;
    },
    public total: number,
    public moves: Move[],
  ) {}

  // setCoins?(coins: number) {
  //   this.coins = coins;
  // }

  // addMove?(move: Move) {
  //   this.moves.unshift(move);
  // }
}
