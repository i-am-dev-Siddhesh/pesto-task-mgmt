import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type TProps = {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<FieldValues>
  error?: string;
  helperText?: string
  required: boolean
};

const CustomInput: React.FC<TProps> = ({ label, name, type, register, error, helperText, required }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={name}>
        {label}
      </label>
      {type === "textarea" ?
        <textarea  {...register(name)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          id={name}
          required={required}
        /> :
        <input
          {...register(name)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          id={name}
          type={type}
          required={required}
        />
      }
      <p className={`mt-2 text-sm text-${error ? "red" : "green"}-600 dark:text-green-500`}>{error ? error : helperText}</p>
    </div>
  );
};

export default CustomInput;
