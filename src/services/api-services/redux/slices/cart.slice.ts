import {createSlice} from '@reduxjs/toolkit';
import {
  decrementCartItemQuantity,
  incrementCartItemQuantity,
} from '../../../utils/index.util';

interface cartState {
  cart: any[];
  totalPrice: number;
  failure: boolean;
  errorMessage: string;
}

const initialState: cartState = {
  cart: [],
  totalPrice: 0,
  failure: false,
  errorMessage: '',
};

export const cartSlice = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.product;
      const index = state.cart.findIndex(i => i.product.id === product.id);
      if (index > -1) {
        state.cart[index].quantity = incrementCartItemQuantity(
          state.cart[index],
        );
      } else {
        state.cart.push(action.payload);
      }
      state.totalPrice = state.totalPrice + product.price;
    },
    incrementQuantity: (state, action) => {
      const cartItem = action.payload;
      const index = state.cart.findIndex(
        ci => ci.product.id === cartItem.product.id,
      );
      if (index > -1) {
        const quantity = incrementCartItemQuantity(cartItem);
        state.cart[index].quantity = quantity;
        state.totalPrice = state.totalPrice + cartItem.product.price;
      }
    },
    decrementQuantity: (state, action) => {
      const cartItem = action.payload;
      const index = state.cart.findIndex(
        ci => ci.product.id === cartItem.product.id,
      );
      if (index > -1) {
        const quantity = decrementCartItemQuantity(cartItem);
        if (quantity === 0) {
          state.cart = state.cart.filter(
            ci => ci.product.id !== cartItem.product.id,
          );
        } else {
          state.cart[index].quantity = quantity;
        }
        state.totalPrice = state.totalPrice - cartItem.product.price;
      }
    },
    clearCart: state => {
      state.cart = [];
      state.totalPrice = 0;
    },
    failure: (state, action) => {
      state.failure = true;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  failure,
} = cartSlice.actions;

export default cartSlice.reducer;
