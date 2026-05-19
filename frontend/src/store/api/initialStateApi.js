import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_URL = 'http://localhost:8000/api/users';

export const initialStateApi = createApi({
  reducerPath: "initialStateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    initialState: builder.query({
      query: (userId) => ({ url: `getInitialState/${userId}` }),
      providesTags: (_result, _error, arg) => [{ type: 'initialState', id: arg }],
    }),
  }),
});

export const { useInitialStateQuery } = initialStateApi;