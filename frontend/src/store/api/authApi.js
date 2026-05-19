import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = 'http://localhost:8000/api/users';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    registration: builder.mutation({
      query: (credentials) => ({
        url: 'registration',
        method: 'POST',
        body: credentials,
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'DELETE',
      })
    })
  }),
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation } = authApi;