import React from 'react';
import { 
  List, 
  IconButton, 
  ListItemText,
  Checkbox,
  Paper,
  Chip,
  Box,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; // Fixed import path
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { format, isAfter, isBefore, isToday, parseISO } from 'date-fns';

const TaskList = ({ tasks, onDeleteTask, onEditTask, onCompleteTask, categories }) => {
  const { t } = useTranslation();

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return 'inherit';
    const date = parseISO(dueDate);
    if (isBefore(date, new Date()) && !isToday(date)) return '#ff4444';
    if (isToday(date)) return '#ffbb33';
    if (isAfter(date, new Date())) return '#00C851';
    return 'inherit';
  };

  const renderDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = parseISO(dueDate);
    const color = getDueDateColor(dueDate);
    
    return (
      <Chip
        icon={<AccessTimeIcon />}
        label={format(date, 'MMM dd, yyyy')}
        size="small"
        sx={{
          backgroundColor: color,
          color: 'white',
          '& .MuiSvgIcon-root': {
            color: 'white'
          }
        }}
      />
    );
  };

  if (!tasks.length) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="text.secondary">
          {t('noTasks')}
        </Typography>
      </Box>
    );
  }

  return (
    <List>
      <AnimatePresence mode="wait">
        {tasks.map((task) => {
          const category = categories[task.category];
          
          return (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Paper 
                sx={{ 
                  mb: 2,
                  p: 2,
                  position: 'relative',
                  overflow: 'visible'
                }}
              >
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2 
                }}>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => onCompleteTask(task.id)}
                  />
                  
                  {/* Category chip moved inline */}
                  {category && (
                    <Chip
                      icon={category.icon}
                      label={category.name}
                      size="small"
                      sx={{
                        backgroundColor: category.color,
                        color: 'white',
                        minWidth: 100,
                        '& .MuiSvgIcon-root': {
                          color: 'white'
                        }
                      }}
                    />
                  )}

                  <Box sx={{ flex: 1, mx: 2 }}>
                    <ListItemText
                      primary={task.title}
                      secondary={task.details}
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        opacity: task.completed ? 0.7 : 1,
                        m: 0
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Due date chip */}
                    {task.reminder && (
                      <Box>
                        {renderDueDate(task.reminder)}
                      </Box>
                    )}
                    
                    <IconButton 
                      edge="end" 
                      onClick={() => onEditTask(task)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      onClick={() => onDeleteTask(task.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </List>
  );
};

export default TaskList;
