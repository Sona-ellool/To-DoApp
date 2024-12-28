import React from 'react';
import { Box, Typography } from '@mui/material';
import TaskCard from './TaskCard';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, onDeleteTask, onEditTask, onCompleteTask }) => {
  if (!tasks.length) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="text.secondary">
          No tasks found in this category
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <AnimatePresence mode="wait">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default TaskList;
