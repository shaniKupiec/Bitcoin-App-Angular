import { Move } from './move.model';
import { Rates } from './rates.model';

export class User {
  constructor(
    public name: string,
    public coins: Rates,
    public total: number,
    public moves: Move[],
  ) {}
}
