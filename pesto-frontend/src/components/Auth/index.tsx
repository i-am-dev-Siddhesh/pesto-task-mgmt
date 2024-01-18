import { useYupValidationResolver } from '@/utils/index';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CustomInput from '../FormControls';


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
    <form
      className="flex gap-5 bg-ButtonShadow w-full min-h-screen overflow-y-scroll overflow-x-scroll items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <div className="flex flex-col gap-5 w-full md:w-96 mx-10 md:mx-auto px-20 md:px-0 py-10 md:py-40 bg-white rounded-10">
        <h1 className="text-center font-bold text-xl text-black">{isSignin ? "Signin" : "Signup"} to dashboard</h1>
        {!isSignin && <CustomInput
          register={register}
          error={(errors['name']?.message as string) || ''}
          type="text"
          helperText="Enter name here"
          label="Name"
          name="name"
        />}
        <CustomInput
          register={register}
          error={(errors['email']?.message as string) || ''}
          type="email"
          helperText="Enter email here"
          label="Email"
          name="email"
        />
        <CustomInput
          register={register}
          error={(errors['password']?.message as string) || ''}
          type="password"
          helperText="Enter password here"
          label="Password"
          name="password"
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded focus:outline-none"
          type="submit"
          disabled={isSubmitting}
        >
          Submit
        </button>
        <div>
          <Link href={isSignin ? "/signup" : "/signin"}>
            {!isSignin ? "Signin" : "Create User"}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
