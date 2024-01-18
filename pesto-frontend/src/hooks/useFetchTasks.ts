import { useEffect, useState } from 'react';
import TaskService from '../services/Task';
import { setUsersTask } from '../store/reducers/user.reducer';
import { useDispatch } from 'react-redux';

export const useFetchTasks = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await TaskService.getUsersTask();
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
