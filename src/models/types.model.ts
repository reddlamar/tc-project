export type coordinates = {latitude: number; longitude: number};

export type message = {
  text: string;
  sender: string;
  createdAt: Date;
};

export type order = {
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
  deliveryClerkTrackingLocation: object;
  deliveryClerkName: string;
};
