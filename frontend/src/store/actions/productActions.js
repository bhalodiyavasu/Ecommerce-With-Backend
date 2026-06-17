import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL;

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: '/products',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useCreateProductMutation } = productApi;
