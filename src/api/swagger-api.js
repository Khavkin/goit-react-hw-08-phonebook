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
      invalidatesTags: ['User', 'Contacts'],
    }),
    signUp: builder.mutation({
      query: ({ name: userName, email, password }) => ({
        url: `users/signup`,
        method: 'POST',
        body: { name: userName, email: email, password: password },
      }),
      invalidatesTags: ['User', 'Contacts'],
    }),
    logout: builder.mutation({
      query: () => ({ url: `users/logout`, method: 'POST' }),
      invalidatesTags: ['User'],
    }),
    getCurrentUser: builder.query({
      query: () => `users/current`,
    }),
    getContacts: builder.query({
      query: () => `contacts`,
      providesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: ({ name, number }) => ({
        url: `contacts`,
        method: 'POST',
        body: { name, number },
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: ({ id }) => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
    updateContact: builder.mutation({
      query: ({ id, name, number }) => ({
        url: `contacts/${id}`,
        method: 'PATH',
        body: { name, number },
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = swaggerApi;
