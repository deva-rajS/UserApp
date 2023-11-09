// store.js
import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../app/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  // Add middleware, dev tools, or other store configurations as needed
});

export default store;
