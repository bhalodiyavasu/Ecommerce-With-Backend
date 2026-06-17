import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { authApi } from './actions/authActions';
import { productApi } from './actions/productActions';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
});

export default store;
