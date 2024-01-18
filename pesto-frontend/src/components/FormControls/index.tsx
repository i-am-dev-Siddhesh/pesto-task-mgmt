import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type TProps = {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<FieldValues>
  error: string;
  helperText: string
};

const CustomInput: React.FC<TProps> = ({ label, name, type, register }) => {
  return (
    <div className="mb-4">
      <label className="block text-inherit text-sm  mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
      />
    </div>
  );
};

export default CustomInput;
