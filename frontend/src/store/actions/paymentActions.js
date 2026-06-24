import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL;

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (body) => ({ url: '/payment/create-checkout-session', method: 'POST', body }),
    }),
    verifySession: builder.query({
      query: (sessionId) => `/payment/verify-session/${sessionId}`,
    }),
  }),
});

export const { useCreateCheckoutSessionMutation, useVerifySessionQuery } = paymentApi;
