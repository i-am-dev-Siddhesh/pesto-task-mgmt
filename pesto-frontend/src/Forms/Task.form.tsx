import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CustomInput from '../components/FormControls';
import TaskService from '../services/Task';
import { errorFormatter } from '../utils';
import { useRouter } from 'next/router';
import Spinner from '@/components/Loader/Spinner';
import { toast } from 'react-toastify';

const TaskForm: React.FC<{ onClose: () => void; task?: any }> = ({
  onClose,
  task,
}) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-2xl">{task?.id ? 'Update' : 'Add'} Task</h2>
      {fields.map((input, index) => {
        return (
          <div key={index}>
            <CustomInput
              label={input.label}
              name={input.name}
              type={input.type}
              register={register}
            />
          </div>
        );
      })}
      <div className="flex items-center  justify-center mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex gap-2 items-center"
        >
          {isSubmitting && <Spinner />} Submit
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
