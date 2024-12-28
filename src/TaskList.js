import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDeleteTask, onEditTask, onCompleteTask }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <TaskItem task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask} onCompleteTask={onCompleteTask} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
