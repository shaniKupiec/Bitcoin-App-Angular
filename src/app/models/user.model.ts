import { Move } from './move.model';

export class User {
  constructor(
    public name: string,
    public coins: {
      Bitcoin: number;
      Ethereum: number;
      Litecoin: number;
      Ripple: number;
      Dash: number;
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
