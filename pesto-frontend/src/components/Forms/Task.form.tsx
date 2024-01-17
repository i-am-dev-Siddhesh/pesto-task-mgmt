import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CustomInput from '../FormControls';

const TaskForm: React.FC = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
            {fields.map((input, index) => {
                return <div key={index}>
                    <CustomInput label={input.label} name={input.name} type={input.type} register={register} />
                </div>
            })}
            <div className="flex items-center justify-end mt-4">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default TaskForm;

const fields = [
    {
        label: 'Title',
        name: 'title',
        type: "text"
    },
    {
        label: 'Description',
        name: 'description',
        type: "text"
    },
    {
        label: 'Due Date',
        name: 'dueDate',
        type: "date"
    },
];
