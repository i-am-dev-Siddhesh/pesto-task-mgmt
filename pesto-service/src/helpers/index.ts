import { nanoid } from 'nanoid';

export const isObjectEmpty = (obj: any) => {
  return Object.getOwnPropertyNames(obj).length === 0;
};

export const generateNanoId = () => {
  return nanoid();
};

