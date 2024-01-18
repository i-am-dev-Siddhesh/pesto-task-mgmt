import Spinner from '@/components/Loader/Spinner';
import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import CustomInput from '../components/FormControls';
import { useFetchTasks } from '../hooks/useFetchTasks';
import TaskService from '../services/Task';
import { errorFormatter } from '../utils';

const TaskForm: React.FC<{ onClose: () => void; task?: any }> = ({
    onClose,
    task,
}) => {
    const { register, handleSubmit, reset, getValues } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { fetchTasks } = useFetchTasks();

    useEffect(() => {
        reset({
            title: task?.title,
            description: task?.description,
            dueDate: task?.dueDate
                ? new Date(task?.dueDate)?.toISOString()?.split('T')[0]
                : '',
        });
    }, [task]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsSubmitting(true);
            task
                ? await TaskService.updateTask(
                    { ...data, dueDate: new Date(data.dueDate) },
                    task.id
                )
                : await TaskService.createTask({
                    ...data,
                    dueDate: new Date(data.dueDate),
                    status: 'in_progress',
                } as any);
            await fetchTasks();
            onClose();
            toast('Task Updated Successfully', { type: 'success' });
        } catch (error) {
            const message = errorFormatter(error);
            toast(message, { type: 'error' });
            return;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 w-[650px] !important" style={{ width: "400px" }} >
            <form
                className="space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                }}
            >
                <h2 className="font-bold text-2xl text-white">
                    {task?.id ? 'Update' : 'Add'} Task
                </h2>
                {fields.map((input, index) => {
                    return (
                        <div key={index}>
                            <CustomInput
                                label={input.label}
                                name={input.name}
                                type={input.type}
                                register={register}
                                required={task ? false : true}
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

export default TaskForm;

const fields = [
    {
        label: 'Title',
        name: 'title',
        type: 'text',
    },
    {
        label: 'Description',
        name: 'description',
        type: 'textarea',
    },
    {
        label: 'Due Date',
        name: 'dueDate',
        type: 'date',
    },
];
