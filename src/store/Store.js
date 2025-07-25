// store.js
import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './TableSlice'; // adjust the path if needed

const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});

export default store;
