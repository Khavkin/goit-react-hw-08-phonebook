import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { swaggerApi } from 'api/swagger-api';
import { toast } from 'react-toastify';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(swaggerApi.endpoints.getCurrentUser.matchPending, state => {
        state.isRefreshing = true;
      })
      .addMatcher(
        swaggerApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.user = payload.user;
          state.isLoggedIn = true;
          state.isRefreshing = false;

          toast.success(`User ${state.user.name} logged in`);
        }
      )
      .addMatcher(
        swaggerApi.endpoints.signUp.matchFulfilled,
        (state, { payload }) => {
          console.log('SignUp', payload);
          state.user = payload.user;
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        swaggerApi.endpoints.getCurrentUser.matchFulfilled,
        (state, { payload }) => {
          console.log('GetCurrentUser', payload);
          //state.token = payload.token;
          state.user = payload;
          state.isLoggedIn = true;
          state.isRefreshing = false;
          toast.success(`User ${state.user.name} logged in`);
        }
      )
      .addMatcher(swaggerApi.endpoints.logout.matchFulfilled, state => {
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        // toast.success(`User ${state.user.name} logged in`);
      })
      .addMatcher(
        isAnyOf(
          swaggerApi.endpoints.getCurrentUser.matchRejected,
          swaggerApi.endpoints.signUp.matchRejected,
          swaggerApi.endpoints.login.matchRejected
        ),
        state => {
          if (state.token && state.isRefreshing)
            toast.error(`Authorisation Error . Try yet`);
          state.isLoggedIn = false;
          state.isRefreshing = false;
          state.user = null;
          state.token = null;
        }
      );
  },
});

export const authReducer = AuthSlice.reducer;

export const selectToken = state => {
  return state.auth.token;
};

export const selectIsLoggedIn = state => {
  return state.auth.isLoggedIn;
};

export const selectIsRefreshing = state => {
  return state.auth.isRefreshing;
};

export const selectUser = state => {
  return state.auth.user;
};
