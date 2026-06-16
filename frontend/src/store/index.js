import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { authApi } from './actions/authActions';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
