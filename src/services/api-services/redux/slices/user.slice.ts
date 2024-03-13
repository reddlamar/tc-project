import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userReducer',
  initialState: {
    user: null,
    deviceToken: '',
    notifications: [],
    isSigningIn: false,
    isSigningOut: false,
    failure: false,
    errorMessage: undefined,
  },
  reducers: {
    login: (state, action) => {
      state.isSigningIn = false;
      state.user = action.payload;
      state.failure = false;
      state.errorMessage = undefined;
    },
    logout: state => {
      state.user = null;
      state.isSigningOut = false;
    },
    getNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    getDeviceToken: (state, action) => {
      state.deviceToken = action.payload;
    },
    updateNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    failure: (state, action) => {
      state.isSigningIn = false;
      state.failure = true;
      state.errorMessage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  failure,
  getNotifications,
  updateNotifications,
  getDeviceToken,
} = userSlice.actions;

export default userSlice.reducer;
