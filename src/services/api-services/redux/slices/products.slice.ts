import {createSlice} from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'productsReducer',
  initialState: {
    products: [],
    isFetching: false,
    failure: false,
    errorMessage: undefined,
  },
  reducers: {
    getStoreItems: state => {
      state.isFetching = true;
    },
    setStoreItems: (state, action) => {
      state.products = action.payload;
      state.isFetching = false;
    },
    failure: (state, action) => {
      state.isFetching = false;
      state.failure = true;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {getStoreItems, setStoreItems, failure} = productsSlice.actions;

export default productsSlice.reducer;
