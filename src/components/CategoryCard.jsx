import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, tasks, onClick, isSelected }) => {
  const taskCount = category.id === 'all' 
    ? tasks.length  // For 'all' category, count all tasks
    : tasks.filter(task => task.category === category.id).length;  // For other categories, filter by category
  const Icon = category.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Paper
        onClick={onClick}
        sx={{
          p: 2,
          cursor: 'pointer',
          bgcolor: theme => theme.palette.mode === 'dark' 
            ? (isSelected ? 'primary.dark' : 'background.paper') 
            : (isSelected ? category.color : category.lightColor),
          borderRadius: 4,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 3,
          },
          border: isSelected ? '2px solid' : 'none',
          borderColor: 'primary.main',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              bgcolor: category.color,
              borderRadius: 2,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ color: 'white' }} />
          </Box>
        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default CategoryCard;
