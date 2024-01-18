// CreateTaskModal.tsx
import { FC } from 'react';
import Modal from './index';
import TaskForm from '@/src/Forms/Task.form';
import { ITask } from '@/src/types';

interface ICreateUpdateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: ITask | string
}

const CreateUpdateTaskModal: FC<ICreateUpdateTaskModalProps> = ({ isOpen, onClose, task }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
                <TaskForm onClose={onClose} task={task} />
        </Modal>
    );
};

export default CreateUpdateTaskModal;
