import React from 'react';

const TaskItem = ({ task, onDeleteTask, onEditTask, onCompleteTask }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.details}</p>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
      <button onClick={() => onEditTask(task.id)}>Edit</button>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onCompleteTask(task.id)}
      />
      {task.reminder && <p>Reminder: {new Date(task.reminder).toLocaleString()}</p>}
    </div>
  );
};

export default TaskItem;
