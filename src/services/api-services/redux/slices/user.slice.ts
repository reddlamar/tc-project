import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userReducer',
  initialState: {
    user: {},
    isFetching: false,
    failure: false,
    errorMessage: undefined,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = {};
    },
    request: state => {
      state.isFetching = true;
    },
    success: (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
      state.failure = false;
      state.errorMessage = undefined;
    },
    failure: (state, action) => {
      state.isFetching = false;
      state.failure = true;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {login, logout, request, success, failure} = userSlice.actions;

export default userSlice.reducer;
