import { ITask } from ".";

export interface IUser {
  id: string;
  name: string;
  tasks: ITask[]
  profile_url: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
