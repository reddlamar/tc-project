import {createSlice} from '@reduxjs/toolkit';
import {chatState} from '../../../../models/interfaces.model';

const initialState: chatState = {
  chat: [],
  success: false,
  failed: false,
  errorMessage: '',
};

export const chatSlice = createSlice({
  name: 'chatReducer',
  initialState,
  reducers: {
    getMessages: (state, action) => {
      state.chat = action.payload;
    },
    successful: state => {
      state.success = true;
    },
    failure: (state, action) => {
      state.failed = true;
      state.errorMessage = action.payload;
    },
  },
});

export const {getMessages, successful, failure} = chatSlice.actions;

export default chatSlice.reducer;
