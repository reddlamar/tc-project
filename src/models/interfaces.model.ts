export interface orderState {
  cart: any[];
  totalPrice: number;
  customerEmail: string;
  customerID: string;
  createdAt: Date;
  updatedAt: Date;
  deliveryAddress: object;
  status: string;
  deliveryDate: Date;
  estimatedTime: number;
  deliveryBoyTrackingLocation: object;
}

export interface ordersState {
  orders: orderState[];
  order: orderState;
  creatingOrders: boolean;
  gettingOrders: boolean;
  updatingOrders: boolean;
  failure: boolean;
  errorMessage: string;
}
