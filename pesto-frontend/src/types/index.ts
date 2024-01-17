import { IUser } from './author';

export interface ITask {
  id: number;
  title: string;
  description: string;
  dueDate: string | Date;
  userId: number;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}
