import React from 'react';
import { Paper, Typography, IconButton, Box, Checkbox, Chip, Stack, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EventIcon from '@mui/icons-material/Event';
import CategoryIcon from '@mui/icons-material/Folder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion } from 'framer-motion';
import { categories } from '../config/categories';
import { format } from 'date-fns';

const TaskItem = ({ task, onDeleteTask, onEditTask, onCompleteTask }) => {
  const category = categories[task.category] || categories.all;
  
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy hh:mm a');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Paper sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        gap: 2,
        backgroundColor: task.completed ? 'action.hover' : 'background.paper',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Checkbox
          checked={task.completed}
          onChange={() => onCompleteTask(task.id)}
          sx={{ alignSelf: 'flex-start' }}
        />
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'text.secondary' : 'text.primary',
              mb: 1
            }}
          >
            {task.title}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip
              icon={<CategoryIcon />}
              label={category.name}
              size="small"
              sx={{
                backgroundColor: category.lightColor,
                color: category.color,
                '& .MuiChip-icon': { color: category.color }
              }}
            />
          </Stack>

          {task.details && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                mb: 2
              }}
            >
              {task.details}
            </Typography>
          )}

          <Divider sx={{ my: 1 }} />

          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            {task.createdAt && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  Created: {formatDate(task.createdAt.toDate())}
                </Typography>
              </Box>
            )}
            {task.reminder && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <EventIcon fontSize="small" color="error" />
                <Typography variant="caption" color="error">
                  Due: {formatDate(task.reminder)}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>

        <Stack direction="row" spacing={1} sx={{ alignSelf: 'flex-start' }}>
          <IconButton 
            size="small" 
            onClick={() => onEditTask(task)}
            disabled={task.completed}
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={() => onDeleteTask(task.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Paper>
    </motion.div>
  );
};

export default TaskItem;
