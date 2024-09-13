import TaskItem from '../taskItem/TaskItem';
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import './TaskList.scss';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete, onToggleImportant, showCompleted, selectedMenu ,onToggleCompletedVisibility }) => (
    <div className="task-list">
        <div>
            {tasks.incompleteTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                    onToggleImportant={onToggleImportant}
                />
            ))}
        </div>

        {tasks.completedTasks.length > 0 && (
            <div>
                {selectedMenu === "My Day" && (
                    <div className="completed-task" onClick={onToggleCompletedVisibility} style={{ cursor: 'pointer' }}>
                        {showCompleted ? <UpOutlined /> : <DownOutlined />}
                        <span style={{ marginLeft: 8 }}>Completed {tasks.completedTasks.length}</span>
                    </div>
                )}

                {showCompleted && (
                    <div>
                        {tasks.completedTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onToggleComplete={onToggleComplete}
                                onToggleImportant={onToggleImportant}
                            />
                        ))}
                    </div>
                )}
            </div>
        )}
    </div>
);

export default TaskList;


