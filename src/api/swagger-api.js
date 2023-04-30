import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const swaggerApi = createApi({
  reducerPath: 'swaggerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      } else headers.delete('authorization');
      return headers;
    },
  }),
  tagTypes: ['User', 'Contacts'],
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `users/login`,
        method: 'POST',
        body: { email: email, password: password },
      }),
      invalidatesTags: ['User'],
    }),
    signUp: builder.mutation({
      query: ({ name: userName, email, password }) => ({
        url: `users/signup`,
        method: 'POST',
        body: { name: userName, email: email, password: password },
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
      query: () => ({ url: `users/logout`, method: 'POST' }),
      invalidatesTags: ['User'],
    }),
    getCurrentUser: builder.query({
      query: () => `users/current`,
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = swaggerApi;
