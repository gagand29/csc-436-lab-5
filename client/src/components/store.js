// store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoReducer'; // Import your todoReducer

const store = configureStore({
  reducer: todoReducer,
});

export default store;
