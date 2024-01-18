import { delet, get, post, put } from '@/services/serverConfig';
import Services from '../serviceUrls';

function getUsersTask(): Promise<any> {
  return get(Services.getUsersTask);
}

function getTask(taskId: string): Promise<any> {
  return get(`${Services.getTask}${taskId}`);
}

function createTask(data: {
  title: string;
  description: string;
  dueDate: string;
}): Promise<any> {
  return post(Services.createTask, {}, data);
}

function updateTask(
  data: {
    title?: string;
    description?: string;
    dueDate?: Date;
    status?: string;
  },
  taskId: string
): Promise<any> {
  return put(`${Services.updateTask}${taskId}`, {}, data);
}

function deleteTask(taskId: string): Promise<any> {
  return delet(`${Services.deleteTask}${taskId}`);
}

const TaskService = {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getUsersTask,
};

export default TaskService;
