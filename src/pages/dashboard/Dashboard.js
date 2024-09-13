import TaskModal from '../../components/taskModal/TaskModal';
import {Layout, Menu, Button, Input, Form, Avatar, Empty} from 'antd';
import './Dashboard.scss';
import { useState, useEffect } from 'react';
import TaskList from '../../components/taskList/TaskList';
import {MailOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";

const { Content, Sider } = Layout;

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [form] = Form.useForm();
    const [editingTask, setEditingTask] = useState(null);
    const [showCompleted, setShowCompleted] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMenu, setSelectedMenu] = useState('My Day'); // Default selected menu

    const [user, setUser] = useState({ name: '', email: '' });

    useEffect(() => {
        // Get user data from local storage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser({ name: storedUser.name, email: storedUser.email });
        }
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleAddTask = (values) => {
        if (editingTask) {
            const updatedTasks = tasks.map((task) => {
                if (task.id === editingTask.id) {
                    return { ...task, ...values };
                }
                return task;
            });
            setTasks(updatedTasks);
            setEditingTask(null);
        } else {
            setTasks([...tasks, { ...values, id: Date.now(), completed: false }]);
        }

        form.resetFields();
        setIsModalOpen(false);
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setEditingTask(null);
        setIsModalOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filtering tasks based on the selected menu
    const filteredTasks = tasks.filter(task => {
        if (selectedMenu === 'Completed') {
            return task.completed && task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (selectedMenu === 'Important') {
            return task.isImportant && task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());
    });


    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    const incompleteTasks = filteredTasks.filter(task => !task.completed);
    const completedTasks = filteredTasks.filter(task => task.completed);

    const handleMenuClick = (menuKey) => {
        setSelectedMenu(menuKey); // Update the selected menu item
    };

    const handleDeleteTask = (taskId) =>
        setTasks(tasks.filter(task => task.id !== taskId)
        );

    const handleToggleComplete = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleToggleImportant = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, isImportant: !task.isImportant } : task
        ));
    };

    return (
        <>
            <Layout>

                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    style={{ height: '100vh', backgroundColor: '#0C111D',width:'360px'}}
                    breakpoint="lg"
                >
                    <div style={{padding: '10px'}}>
                        <div className={`user-info ${collapsed ? 'collapsed' : ''}`}>
                            {collapsed ? (
                                <div className="user-avatar">
                                    <Avatar size="small" icon={<UserOutlined/>}/>
                                    <p className="user-email"><MailOutlined size={14} style={{
                                        color: 'white',
                                        marginTop: '15px',
                                        textAlign:'center'
                                    }}/></p>
                                </div>
                            ) : (
                                <div className="user-details">
                                    <div className="user-avatar-details">
                                        <span className="user-name">{user.name}</span>
                                    </div>
                                    <p className="user-email">{user.email}</p>
                                </div>
                            )}
                        </div>

                        <div className="search-container"
                             style={{gap: "8px", textAlign:'center'}}>
                            {collapsed ? (
                                <SearchOutlined
                                    size={14}
                                    style={{color: 'white',marginBottom:'15px' ,
                                }}/>
                            ) : (
                                <Input
                                    placeholder="Search tasks..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    style={{
                                        marginBottom: '10px',
                                    }}
                                />
                            )}
                        </div>

                        <Menu
                            selectedKeys={[selectedMenu]}
                            mode="inline"
                            onClick={(e) => handleMenuClick(e.key)}
                        >
                            <Menu.Item key="My Day">My Day</Menu.Item>
                            <Menu.Item key="Important">Important</Menu.Item>
                            <Menu.Item key="Completed">Completed</Menu.Item>
                        </Menu>
                    </div>
                </Sider>

                <Layout>
                    <Content style={{padding: 40}} className="dashboard-container">
                        <div className="dashboard-title">
                            <div className="title-date">
                                <h1>{selectedMenu}</h1>
                                <span>{today}</span>
                            </div>
                            <Button onClick={showModal}>
                                Add Task
                            </Button>
                        </div>

                        {filteredTasks.length > 0 ? (
                            <TaskList
                                tasks={{ incompleteTasks, completedTasks }}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                onToggleComplete={handleToggleComplete}
                                onToggleImportant={handleToggleImportant}
                                showCompleted={showCompleted}
                                selectedMenu={selectedMenu}
                                onToggleCompletedVisibility={() => setShowCompleted(!showCompleted)}
                            />
                        ) : (
                            <Empty description="No tasks found" />
                        )}

                        <TaskModal
                            isModalOpen={isModalOpen}
                            handleCancel={handleCancel}
                            handleAddTask={handleAddTask}
                            editingTask={editingTask}
                            form={form}
                        />
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default Dashboard;
