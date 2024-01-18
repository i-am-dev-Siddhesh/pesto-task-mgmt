import { useEffect, useState } from 'react';
import TaskService from '../services/Task';
import { setUsersTask } from '../store/reducers/user.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from '../store/selectors/user';

export const useFetchTasks = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async (filters?: any) => {
    try {
      setIsLoading(true);
      const response = await TaskService.fetchUsersTask(filters || {});
      dispatch(setUsersTask({ data: response.data }));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchTasks };
};
