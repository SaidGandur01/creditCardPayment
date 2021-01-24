import { CreditCard } from './../../model/card.model';
import * as DtoActions from '../actions/dto.actions';

/* 
  This is an initial state, in case it is needed.
*/
const initialState: CreditCard = {
  cardNumber : 'card Number Test',
  cardHolder : 'card Holder Test',
  expDate : new Date(),
  ccvCode : 'ccvCode Test',
  amount : 1234
};

export function reducer(state: CreditCard[] = [], action: DtoActions.Actions) {
  switch (action.type) {
    case DtoActions.ADD_PAYMENT:
      return [...state, action.payload];
    default:
      return state;
  }
}