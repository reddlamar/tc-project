import {message, order} from './types.model';

export interface ordersState {
  orders: order[];
  order: order;
  creatingOrders: boolean;
  gettingOrders: boolean;
  updatingOrders: boolean;
  failure: boolean;
  errorMessage: string;
}

export interface chatState {
  chat: message[];
  success: boolean;
  failed: boolean;
  errorMessage: string;
}
