import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userReducer',
  initialState: {
    user: null,
    notifications: [],
    unreadNotifications: [],
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
    getUnreadNotifications: (state, action) => {
      state.unreadNotifications = action.payload;
    },
    updateNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    updateUnreadNotifications: (state, action) => {
      state.unreadNotifications = action.payload;
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
  getUnreadNotifications,
  updateNotifications,
  updateUnreadNotifications,
} = userSlice.actions;

export default userSlice.reducer;
