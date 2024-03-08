import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userReducer',
  initialState: {
    user: null,
    isSigningIn: false,
    isSigningOut: false,
    failure: false,
    errorMessage: undefined,
  },
  reducers: {
    login: state => {
      state.isSigningIn = true;
    },
    logout: state => {
      state.isSigningOut = true;
    },
    request: state => {
      state.isSigningIn = true;
    },
    loginSuccess: (state, action) => {
      state.isSigningIn = false;
      state.user = action.payload;
      state.failure = false;
      state.errorMessage = undefined;
    },
    logoutSuccess: state => {
      state.user = null;
      state.isSigningOut = false;
    },
    failure: (state, action) => {
      state.isSigningIn = false;
      state.failure = true;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {login, logout, request, loginSuccess, logoutSuccess, failure} =
  userSlice.actions;

export default userSlice.reducer;
