import { Move } from './move.model';
import { Rates } from './rates.model';

export class User {
  constructor(
    public name: string,
    public coins: Rates,
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
