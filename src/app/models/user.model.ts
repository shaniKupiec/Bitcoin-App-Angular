import { Move } from './move.model';
import { Rates } from './rates.model';

export interface User {
  name: string;
  coins: Rates;
  total: number;
  moves: Move[];
  email: string;
}

