import { Move } from "./move.model";

export class User {
  constructor(
    public name: string = '',
    public coins: number = 100,
    public moves: Move[] = []
  ) {}

  setCoins?(coins: number) {
    this.coins = coins;
  }

  addMove?(move: Move) {
    this.moves.unshift(move);
  }
}
