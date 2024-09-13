import { Popconfirm, Checkbox } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import './TaskItem.scss';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete, onToggleImportant }) => (
    <div className="task-item">
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
            />
            <div style={{ marginLeft: "10px" }}>
                <h3
                    style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        marginBottom: 0
                    }}
                >
                    {task.taskTitle}
                </h3>
                <span className="task-description"
                    style={{
                        textDecoration: task.completed ? 'line-through' : 'none'
                    }}
                >
                    {task.description}
                </span>
            </div>
        </div>
        <div>
            {task.isImportant ? (
                <StarFilled
                    style={{ marginRight: '10px', cursor: 'pointer', color: '#ee9a08' }}
                    onClick={() => onToggleImportant(task.id)}
                />
            ) : (
                <StarOutlined
                    style={{ marginRight: '10px', cursor: 'pointer', color: '#ee9a08' }}
                    onClick={() => onToggleImportant(task.id)}
                />
            )}
            <EditOutlined
                style={{ marginRight: '10px', cursor: 'pointer', color: '#7F56D9' }}
                onClick={() => onEdit(task)}
            />
            <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => onDelete(task.id)}
                okText="Yes"
                cancelText="No"
            >
                <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} />
            </Popconfirm>
        </div>
    </div>
);

export default TaskItem;
