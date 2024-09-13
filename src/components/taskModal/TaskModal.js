import { Modal, Form, Input, Button } from 'antd';
import { useEffect } from 'react';
import './TaskModal.scss'

const TaskModal = ({ isModalOpen, handleCancel, handleAddTask, editingTask, form }) => {

    useEffect(() => {
        if (editingTask) {
            form.setFieldsValue(editingTask);
        } else {
            form.resetFields();
        }
    }, [editingTask, form]);

    return (
        <Modal
            title={editingTask ? 'Edit Task' : 'Add Task'}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                className="task-form"
                layout="vertical"
                onFinish={handleAddTask}
            >
                <Form.Item
                    label="Task Title"
                    name="taskTitle"
                    rules={[{ required: true, message: 'Please enter your task title!' }]}
                >
                    <Input placeholder="Enter your task title" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter task description!' }]}
                >
                    <Input placeholder="Enter task description" />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit">
                        {editingTask ? 'Update Task' : 'Add Task'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskModal;
