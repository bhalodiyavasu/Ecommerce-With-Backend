import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { authApi } from './actions/authActions';
import { productApi } from './actions/productActions';
import { cartApi } from './actions/cartActions';
import { userApi } from './actions/userActions';
import { paymentApi } from './actions/paymentActions';

export const resetAllApiStates = () => (dispatch) => {
  dispatch(userApi.util.resetApiState());
  dispatch(cartApi.util.resetApiState());
  dispatch(authApi.util.resetApiState());
  dispatch(paymentApi.util.resetApiState());
};

const unauthorizedMiddleware = (store) => (next) => (action) => {
  const status = action.payload?.status || action.error?.status;
  if (status === 401 || status === 500) {
    localStorage.removeItem('userToken');
    if (window.location.pathname !== '/auth') {
      window.location.href = '/auth';
    }
  }
  return next(action);
};

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
      paymentApi.middleware,
      unauthorizedMiddleware
    ),
});

export default store;
