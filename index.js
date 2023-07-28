import { useState } from 'react';
import "./index.css";

const ToDoList = () => {
// TODO 1: Create array
// - create array of tasks
// - task name should be string
const [taskName, setTaskName] = useState('');
const [tasks, setTasks] = useState([]);
const [showCompleted, setShowCompleted] = useState(false);


// TODO 3: store task from task input textbox
// - cannot handle click even if there is nothing to store it in
// on signifies an event handler
const onTaskNameChange = (event) => {
    setTaskName(event.target.value);
}

// TODO 4: on click event of add task button
const onAddNewTask = (event) => {
    if (taskName === "") { 
        window.alert("Please enter the task name");
        return;
    }

    const newTasks = [...tasks, { id: Date.now(), name: taskName}];
    setTasks(newTasks);
    // change hook taskName
    setTaskName('');
}

// TODO: handle event for onDelete
// - find task index
// - array method to remove item (splice or filter)
// - call setTask with new array after deletion
const onDelete = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
}

const onComplete = (taskId) => {
    const newTasks = [...tasks];

    const index = newTasks.findIndex((task) => task.id === taskId);
    
    newTasks[index].completed = true;

    setTasks(newTasks);
}

const onShowCompleted = () => {
    setShowCompleted(!showCompleted);
    }

// TODO 2: render tasks on page
// - cant run tests until UI is established
const renderTaskItem = (task) => {
    return (
        <tr key={task.id}>
            <td>{task.name}</td>
            <td><button onClick={() => onComplete(task.id)} disabled={Boolean(task.completed)}>{Boolean(task.completed) ? 'Completed' : 'Mark as Complete'}</button></td>
            <td><button className="danger" onClick={() => onDelete(task.id)}>Delete</button></td>
        </tr>
    );
}

// or because it filters tasks based on showCompleted if true it'll show completed tasks or just tasks that aren't active
const filterTasks = (task) => {
    if (showCompleted) {
        return true;
    } else {
        return !Boolean(task.completed);
    }
}


    return (
        <div className="layout-column align-items-center justify-content-start">
            <section className="layout-row align-items-center justify-content-center mt-30">
                <input
                    placeholder="Task Name"
                    data-testid="input-task-name"
                    type="text"
                    value={taskName}
                    onChange={onTaskNameChange}
                />
                <button className="outlined" data-testid="add-task-button" onClick={onAddNewTask}>Add Task</button>

            </section>
            <div className="card w-40 pt-30 pb-8 mt-2">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Name</th>
                        </tr>
                    </thead>
                    <tbody data-testid="tasks-list">
                        {tasks.filter(filterTasks).map(renderTaskItem)}
                    </tbody>
                </table>
            </div>
            <section className="layout-row align-items-center justify-content-center mt-30">
                <input className="show-completed-tasks-checkbox" data-testid="show-completed-tasks-checkbox" placeholder="Show Completed Tasks" type="checkbox" checked={showCompleted} onChange={onShowCompleted} />
                <label className="show-completed-tasks-label">Show Completed Tasks</label>
            </section>

        </div>
    );
}

export default ToDoList;