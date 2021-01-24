import { CreditCard } from './../../model/card.model';
import { Action } from '@ngrx/store';


export const ADD_PAYMENT = '[PAYMENT] Add';

export class AddPayment implements Action {
  readonly type = ADD_PAYMENT;

  constructor(public payload: CreditCard) {}
}
export type Actions = AddPayment;