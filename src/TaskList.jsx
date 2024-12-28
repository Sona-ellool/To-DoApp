import React from 'react';
import TaskItem from './TaskItem.jsx';

const TaskList = ({ tasks, onDeleteTask, onEditTask, onCompleteTask }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          onCompleteTask={onCompleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;