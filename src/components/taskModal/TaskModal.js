import {Modal, Form, Input, Button, Select, DatePicker, Slider} from 'antd';
import {useEffect, useState} from 'react';
import moment from 'moment';
import './TaskModal.scss'


const {Option} = Select;

const TaskModal = ({ isModalOpen, handleCancel, handleAddTask, editingTask, form }) => {

    const [percent, setPercent] = useState(0);

    const TASK_CATEGORIES = [
        { label: 'WORK', value: 'work' },
        { label: 'PERSONAL', value: 'personal' },
        { label: 'OTHERS', value: 'others' }
    ];

    const disablePastDates = (current) => {
        return current && current < moment().startOf('day');
    };

    const handleSliderChange = (value) => {
        setPercent(value);
    };
    const increase = () => {
        setPercent((prevPercent) => {
            const newPercent = prevPercent + 10;
            return newPercent > 100 ? 100 : newPercent;
        });
    };

    const decline = () => {
        setPercent((prevPercent) => {
            const newPercent = prevPercent - 10;
            return newPercent < 0 ? 0 : newPercent;
        });
    };

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

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select a category!' }]}
                >
                    <Select placeholder="Select task category">
                        {TASK_CATEGORIES.map(category => (
                            <Option key={category.value} value={category.value}>
                                {category.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Progress"
                    name="progress"
                >
                    <Slider
                        min={0}
                        max={100}
                        value={percent}
                        onChange={handleSliderChange}
                        style={{ width: '100%'}}
                    />
                </Form.Item>

                <Form.Item
                    label="Due Date"
                    name="dueDate"
                    rules={[{ required: true, message: 'Please select a due date!' }]}
                >
                    <DatePicker placeholder="Select due date" style={{ width: '100%' }} disabledDate={disablePastDates}/>
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
