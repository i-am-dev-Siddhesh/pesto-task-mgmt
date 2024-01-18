import Spinner from '@/components/Loader/Spinner';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomInput from '../components/FormControls';
import { useFetchTasks } from '../hooks/useFetchTasks';
import TaskService from '../services/Task';
import { errorFormatter } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/selectors/user';
import { IUser } from '../types/author';
import AuthService from '../services/Auth';
import { setUser } from '../store/reducers/user.reducer';

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser) as IUser;
  const { register, handleSubmit, reset, getValues } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    reset({
      name: user?.name,
      email: user?.email,
    });
  }, [user]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsSubmitting(true);
      await AuthService.updateUser({
        ...data,
      } as any);
      await AuthService.getLoggedInUser().then((resp: any) => {
        dispatch(setUser({ data: resp.data }));
      });
      toast('Profile Updated Successfully', { type: 'success' });
    } catch (error) {
      const message = errorFormatter(error);
      toast(message, { type: 'error' });
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="p-4 bg-white rounded-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 w-96 !important"
      style={{ width: '400px' }}
    >
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <h2 className="font-bold text-2xl text-white">Update Profile</h2>
        {fields.map((input, index) => {
          return (
            <div key={index}>
              <CustomInput
                label={input.label}
                name={input.name}
                type={input.type}
                register={register}
                required={false}
              />
            </div>
          );
        })}
        <div className="flex items-center  justify-center mt-4">
          <button
            type="submit"
            className=" flex gap-2 items-center text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {isSubmitting && <Spinner />} Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;

const fields = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
  },

  {
    label: 'Password',
    name: 'password',
    type: 'password',
  },
];
