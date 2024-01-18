import { ITask } from ".";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string
  tasks: ITask[]
  profile_url: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
