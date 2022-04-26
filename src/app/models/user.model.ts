export class User {
  constructor(
    public name: string = '',
    public coins: number = 100,
    public moves: any[] = []
  ) {}

  setCoins?(coins: number) {
    this.coins = coins;
  }

  addMove?(move: any) {
    this.moves.unshift(move);
  }
}
