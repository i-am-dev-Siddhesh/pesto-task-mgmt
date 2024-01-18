import { useEffect, useState } from 'react';
import TaskService from '../services/Task';
import { setUsersTask } from '../store/reducers/user.reducer';
import { useDispatch } from 'react-redux';

export const useFetchTasks = () => {
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

  useEffect(() => {
    fetchTasks();
  }, []);

  return { isLoading, fetchTasks };
};
