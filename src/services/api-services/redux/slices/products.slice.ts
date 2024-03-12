import {createSlice} from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'productsReducer',
  initialState: {
    products: [],
    successful: false,
    failed: false,
    errorMessage: undefined,
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    success: state => {
      state.successful = true;
    },
    failure: (state, action) => {
      state.failed = true;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {getProducts, success, failure} = productsSlice.actions;

export default productsSlice.reducer;
