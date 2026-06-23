import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL;

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (cartData) => ({
        url: '/cart',
        method: 'POST',
        body: cartData,
      }),
    }),
  }),
});

export const { useAddToCartMutation } = cartApi;
