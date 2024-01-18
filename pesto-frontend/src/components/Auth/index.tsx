import { useYupValidationResolver } from '@/utils/index';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomInput from '../FormControls';
import Spinner from '../Loader/Spinner';

const AuthForm = ({ onSubmit, isSubmitting, isSignin }: any) => {
  const validationSchema = yup.object({
    email: yup.string().email('Enter email').required('Required'),
    password: yup.string().required('Required'),
  });

  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  return (
    <div className="flex w-full min-h-[100vh] items-center justify-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            {isSignin ? 'Sign in' : 'Sign up'} to our platform
          </h5>
          {!isSignin && (
            <CustomInput
              register={register}
              error={(errors['name']?.message as string) || ''}
              type="text"
              helperText="Enter name here"
              label="Name"
              name="name"
              required
            />
          )}
          <CustomInput
            register={register}
            error={(errors['email']?.message as string) || ''}
            type="email"
            helperText="Enter email here"
            label="Email"
            name="email"
            required
          />
          <CustomInput
            register={register}
            error={(errors['password']?.message as string) || ''}
            type="password"
            helperText="Enter password here"
            label="Password"
            name="password"
            required
          />
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  flex gap-3 items-center"
          >
            {isSubmitting && <Spinner />} {isSignin ? 'Signin' : 'Signup'} to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{' '}
            <Link
              href={isSignin ? '/signup' : '/signin'}
              className="text-blue-500"
            >
              {!isSignin ? 'Signin' : 'Create account'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
