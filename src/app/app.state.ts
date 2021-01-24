import { CreditCard } from './model/card.model';

export interface AppState {
  readonly dtoPayment: CreditCard[];
}