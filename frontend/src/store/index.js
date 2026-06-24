import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { authApi } from './actions/authActions';
import { productApi } from './actions/productActions';
import { cartApi } from './actions/cartActions';
import { userApi } from './actions/userActions';
import { paymentApi } from './actions/paymentActions';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      userApi.middleware,
      paymentApi.middleware
    ),
});

export default store;
