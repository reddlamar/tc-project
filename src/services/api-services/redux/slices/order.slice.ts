import {createSlice} from '@reduxjs/toolkit';
import {ordersState} from '../../../../models/interfaces.model';

const initialState: ordersState = {
  orders: [],
  pendingOrders: [],
  inProgressOrders: [],
  cancelledOrders: [],
  rejectedOrders: [],
  order: {
    cart: [],
    totalPrice: 0,
    customerEmail: '',
    customerID: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    deliveryAddress: {},
    status: '',
    deliveryDate: new Date(),
    estimatedTime: 0,
    deliveryClerkTrackingLocation: {},
    deliveryClerkName: '',
  },
  creatingOrders: false,
  gettingOrders: false,
  updatingOrders: false,
  failure: false,
  errorMessage: '',
};

export const cartSlice = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      state.creatingOrders = false;
      state.order.cart = action.payload.cart;
      state.order.customerEmail = action.payload.email;
      state.order.customerID = action.payload.customerID;
      state.order.createdAt = action.payload.createdAt;
      state.order.updatedAt = action.payload.updatedAt;
      state.order.deliveryAddress = action.payload.deliveryAddress;
      state.order.status = action.payload.status;
      state.order.deliveryDate = action.payload.deliveryDate;
      state.order.estimatedTime = action.payload.estimatedTime;
      state.order.deliveryClerkName = '';
      state.order.deliveryClerkTrackingLocation =
        action.payload.deliveryBoyTrackingLocation;
      state.order.totalPrice = action.payload.totalPrice;
    },
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
    getPendingOrders: (state, action) => {
      state.pendingOrders = action.payload;
    },
    getInProgressOrders: (state, action) => {
      state.inProgressOrders = action.payload;
    },
    getCancelledOrders: (state, action) => {
      state.cancelledOrders = action.payload;
    },
    getRejectedOrders: (state, action) => {
      state.rejectedOrders = action.payload;
    },
    updateOrderStatus: (state, action) => {
      state.updatingOrders = false;
      state.order.status = action.payload.status;
      state.order.updatedAt = action.payload.updatedAt;
    },
    failure: (state, action) => {
      state.failure = true;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createOrder,
  updateOrderStatus,
  getOrders,
  getPendingOrders,
  getInProgressOrders,
  getCancelledOrders,
  getRejectedOrders,
  failure,
} = cartSlice.actions;

export default cartSlice.reducer;
