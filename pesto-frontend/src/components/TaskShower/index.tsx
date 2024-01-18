import TaskService from '@/src/services/Task';
import { ITask } from '@/src/types';
import { errorFormatter, formatDate } from '@/src/utils';
import React, { useEffect, useState } from 'react';
import CreateUpdateTaskModal from '../Modal/CreateUpdateTaskModal';
import CustomModal from '../Modal';
import FullScreenLoader from '../Loader/FullScreenLoader';
import { toast } from 'react-toastify';

const TaskShower: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [task, setTask] = useState<ITask | string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await TaskService.getUsersTask();
      setTasks(response.data);
    } catch (error) {
      
    }finally{
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate: any = async (task: any) => {
    setTask(task);
  };

  const handleTaskComplete: any = async (taskId: string) => {
    try {
      setIsOpen(true);
      await TaskService.updateTask({ status: 'done' }, taskId);
      fetchData();
      toast('Task Done Successfully', { type: 'success' });
    } catch (error) {
      const message = errorFormatter(error);
      toast(message, { type: 'error' });
    } finally {
      setIsOpen(false);
    }
  };

  const handleTaskDelete: any = async (taskId: string) => {
    try {
      setIsOpen(true);
      await TaskService.deleteTask(taskId);
      fetchData();
      toast('Task Deleted Successfully', { type: 'success' });
    } catch (error) {
      const message = errorFormatter(error);
      toast(message, { type: 'error' });
    } finally {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    handleUpdate('');
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex gap-10 flex-wrap">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`mb-4 bg-white border border-${
                task.status === 'completed'
                  ? 'green'
                  : task?.status === 'in_progress'
                  ? 'yellow'
                  : task?.status === 'to_do'
                  ? 'red'
                  : 'yellow'
              }-300 rounded-md p-6 shadow-md min-w-[250px] flex flex-col justify-between gap-2`}
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {task.title}
              </h2>

              <div>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(new Date(task.dueDate))}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 justify-between items-center">
                {task.status !== 'completed' && (
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={() => handleTaskComplete(task.id)}
                  >
                    Done
                  </button>
                )}

                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={() => handleUpdate(task)}
                >
                  Update
                </button>

                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => handleTaskDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <CreateUpdateTaskModal
        isOpen={task ? true : false}
        onClose={handleClose}
        task={task}
      />
      <CustomModal isOpen={isOpen} onClose={handleCloseModal}>
        <FullScreenLoader />
      </CustomModal>
    </div>
  );
};

export default TaskShower;
