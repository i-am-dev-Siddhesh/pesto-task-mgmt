import { IUser } from './author';

export interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: string | Date;
  userId: number;
  user: IUser;
  status: 'in_progress' | 'to_do' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}
