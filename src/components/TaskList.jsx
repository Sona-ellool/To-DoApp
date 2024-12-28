import React from 'react';
import TaskItem from './TaskItem';
import { Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, onDeleteTask, onEditTask, onCompleteTask }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <AnimatePresence>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
            onCompleteTask={onCompleteTask}
          />
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default TaskList;
