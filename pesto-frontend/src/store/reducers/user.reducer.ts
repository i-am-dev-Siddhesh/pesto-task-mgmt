import { IUser } from '@/src/types/author';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IState {
  isLoading: boolean;
  user: IUser | null;
}

const initialState: IState = {
  isLoading: true,
  user: null,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ data: IUser }>) => {
      state.isLoading = false;
      state.user = action.payload.data;
    },
    setUsersTask: (state, action: PayloadAction<{ data: IUser }>) => {
      state.isLoading = false;
      state.user = action.payload.data;
    },
  },
});

export const { setUser, setUsersTask } = user.actions;

export default user.reducer;
