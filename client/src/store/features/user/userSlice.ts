import { getUserAuth, createUser } from './userThunks';
import { User } from '../../../models/user';
import { createSlice } from '@reduxjs/toolkit';

export interface LoadingState {
  pending: boolean;
  fetchMorePending?: boolean;
  rejected: boolean;
  resolved: boolean;
}

export const initialLoadingState: LoadingState = {
  pending: true,
  rejected: false,
  resolved: false,
};

interface UserState {
  user: User | null;
  loadingState: LoadingState;
}

const initialUserState: UserState = {
  user: null,
  loadingState: initialLoadingState,
};

export const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAuth.pending, (state) => {
        state.loadingState = {
          pending: true,
          rejected: false,
          resolved: false,
        };
      })
      .addCase(getUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadingState = {
          pending: false,
          rejected: false,
          resolved: true,
        };
      })
      .addCase(getUserAuth.rejected, (state) => {
        state.loadingState = {
          pending: false,
          rejected: true,
          resolved: false,
        };
      })
      .addCase(createUser.pending, (state) => {
        state.loadingState = {
          pending: true,
          rejected: false,
          resolved: false,
        };
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadingState = {
          pending: false,
          rejected: false,
          resolved: true,
        };
      })
      .addCase(createUser.rejected, (state) => {
        state.loadingState = {
          pending: false,
          rejected: true,
          resolved: false,
        };
      });
  },
});

export const userReducer = userSlice.reducer;
