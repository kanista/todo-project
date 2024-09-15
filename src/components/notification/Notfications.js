import {useEffect, useRef, useState} from "react";
import moment from "moment/moment";
import {List, notification} from "antd";
import './Notification.scss'

const Notfications =({tasks,onNotificationsViewed})=>{
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const notifiedTasks = useRef(new Set()); // Store already notified tasks

    useEffect(() => {
        const today = moment();
        const upcoming = tasks.filter(task => {
            const dueDate = moment(task.dueDate);
            return dueDate.isValid() && dueDate.diff(today, 'days') <= 2 && !task.completed;
        });

        setUpcomingTasks(upcoming);

        let newNotificationCount = 0;

        upcoming.forEach(task => {
            const dueDate = moment(task.dueDate);
            const timeRemaining = dueDate.diff(today, 'hours');

            // Check if it's a new task that hasn't been notified yet
            if (timeRemaining <= 24 && !notifiedTasks.current.has(task.id)) {
                notification.warning({
                    message: `Task Reminder`,
                    description: `Your task "${task.taskTitle}" is due in less than 24 hours!`,
                });

                // Add the task to notified set to avoid future notifications
                notifiedTasks.current.add(task.id);
                newNotificationCount++; // Increment the count of new notifications
                console.log("newNotificationCount", newNotificationCount);
            }
        });

        // Notify the parent component to update the notification status
        onNotificationsViewed(newNotificationCount > 0); // true if new notifications exist
        console.log(onNotificationsViewed(newNotificationCount));
    }, [tasks, onNotificationsViewed]); // Ensure useEffect runs when tasks change


    return (
        <div className="notification-list">
            {upcomingTasks.length > 0 ? (
                <div>
                    <h3>Upcoming Tasks</h3>
                    <List
                        dataSource={upcomingTasks}
                        renderItem={task => (
                            <List.Item style={{ marginBottom: "10px" }} key={task.id}>
                                <span style={{ fontWeight: "bold" }}>{task.taskTitle}</span> - <span>{moment(task.dueDate).fromNow()}</span>
                            </List.Item>
                        )}
                    />
                </div>
            ) : (
                <div>No upcoming tasks.</div>
            )}
        </div>
    );
}

export default Notfications;