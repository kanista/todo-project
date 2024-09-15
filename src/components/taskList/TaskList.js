import TaskItem from '../taskItem/TaskItem';
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import './TaskList.scss';
import {Pagination} from "antd";
import {useEffect, useState} from "react";

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete, onToggleImportant, showCompleted, selectedMenu ,onToggleCompletedVisibility }) => {

    // Incomplete tasks pagination state
    const [currentIncompletePage, setCurrentIncompletePage] = useState(1);
    const [incompletePageSize, setIncompletePageSize] = useState(5);

    // Completed tasks pagination state
    const [currentCompletedPage, setCurrentCompletedPage] = useState(1);
    const [completedPageSize, setCompletedPageSize] = useState(5);

    // Handler for incomplete tasks pagination change
    const handleIncompletePaginationChange = (page, size) => {
        setCurrentIncompletePage(page);
        setIncompletePageSize(size);
    };

    // Handler for completed tasks pagination change
    const handleCompletedPaginationChange = (page, size) => {
        setCurrentCompletedPage(page);
        setCompletedPageSize(size);
    };

    // Get paginated incomplete tasks
    const paginatedIncompleteTasks = tasks.incompleteTasks
        .sort((a,b)=>{
            if(a.isImportant && !b.isImportant) return -1;
            if(!a.isImportant && b.isImportant) return 1;
            return 0;
        })
        .slice(
        (currentIncompletePage - 1) * incompletePageSize,
        currentIncompletePage * incompletePageSize
    );

    // Get paginated completed tasks
    const paginatedCompletedTasks = tasks.completedTasks.slice(
        (currentCompletedPage - 1) * completedPageSize,
        currentCompletedPage * completedPageSize
    );

    // Reset page when task count changes
    useEffect(() => {
        const totalIncompleteTasks = tasks.incompleteTasks.length;
        const maxIncompletePages = Math.ceil(totalIncompleteTasks / incompletePageSize);

        if (currentIncompletePage > maxIncompletePages && maxIncompletePages > 0) {
            setCurrentIncompletePage(maxIncompletePages);
        } else if (maxIncompletePages === 0) {
            setCurrentIncompletePage(1);
        }

        const totalCompletedTasks = tasks.completedTasks.length;
        const maxCompletedPages = Math.ceil(totalCompletedTasks / completedPageSize);

        if (currentCompletedPage > maxCompletedPages && maxCompletedPages > 0) {
            setCurrentCompletedPage(maxCompletedPages);
        } else if (maxCompletedPages === 0) {
            setCurrentCompletedPage(1);
        }
    }, [tasks.incompleteTasks.length, incompletePageSize, currentIncompletePage, tasks.completedTasks.length, completedPageSize, currentCompletedPage]);

    return (
        <div className="task-list">
            {/* Incomplete Tasks */}
            <div>

                <>
                </>
                {paginatedIncompleteTasks.map((task) => (
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

            {/* Incomplete Tasks Pagination */}
            {tasks.incompleteTasks.length > 5 && (
                <Pagination
                    current={currentIncompletePage} // Set current page
                    pageSize={incompletePageSize} // Set page size
                    onChange={handleIncompletePaginationChange} // Handle page change
                    total={tasks.incompleteTasks.length} // Total number of incomplete tasks
                    showSizeChanger // Allow changing page size
                    pageSizeOptions={['5', '10', '20', '50']} // Options for page size
                    align="end"
                />
            )}

            {/* Completed Tasks */}
            {tasks.completedTasks.length > 0 && (
                <div>
                    {selectedMenu === "My Day" && (
                        <div className="completed-task" onClick={onToggleCompletedVisibility}
                             style={{cursor: 'pointer'}}>
                            {showCompleted ? <UpOutlined/> : <DownOutlined/>}
                            <span style={{marginLeft: 8}}>Completed {tasks.completedTasks.length}</span>
                        </div>
                    )}

                    {showCompleted && (
                        <div>
                            {paginatedCompletedTasks.map((task) => (
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

                    {/* Completed Tasks Pagination */}
                    {tasks.completedTasks.length > 5 && showCompleted && (
                        <Pagination
                            current={currentCompletedPage} // Set current page
                            pageSize={completedPageSize} // Set page size
                            onChange={handleCompletedPaginationChange} // Handle page change
                            total={tasks.completedTasks.length} // Total number of completed tasks
                            showSizeChanger // Allow changing page size
                            pageSizeOptions={['5', '10', '20', '50']} // Options for page size
                            align="end"
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default TaskList;


