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
            <div>
                <TaskForm onClose={onClose} task={task} />
            </div>
        </Modal>
    );
};

export default CreateUpdateTaskModal;
