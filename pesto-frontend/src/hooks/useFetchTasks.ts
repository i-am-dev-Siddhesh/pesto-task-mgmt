import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TaskService from '../services/Task';
import { setUsersTask } from '../store/reducers/user.reducer';

export const useFetchTasks = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

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
