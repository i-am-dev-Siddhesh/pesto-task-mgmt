import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const selectUserState = (state: RootState) => state.user;

export const selectCattles = createSelector(
  selectUserState,
  (user) => user.user?.tasks
);

export const selectSingleTask = (taskId: number) =>
  createSelector(selectUserState, (user) => {
    user?.user?.tasks?.find((item) => {
      return item?.id === taskId;
    }) || null;
  });