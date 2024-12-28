import React from 'react';
import { Paper, Typography, IconButton, Checkbox, Box, useTheme, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TaskItem = ({ task, onDeleteTask, onEditTask, onCompleteTask }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: { xs: 1.5, sm: 2 }, 
        mb: { xs: 1, sm: 2 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 1, sm: 2 },
        opacity: task.completed ? 0.7 : 1,
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 1,
        width: '100%'
      }}>
        <Checkbox
          checked={task.completed}
          onChange={() => onCompleteTask(task.id)}
        />
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant={isMobile ? "body1" : "h6"}
            sx={{ 
              textDecoration: task.completed ? 'line-through' : 'none',
              mb: 0.5
            }}
          >
            {task.title}
          </Typography>
          <div 
            dangerouslySetInnerHTML={{ __html: task.details }}
            style={{ 
              marginBottom: '0.5rem',
              fontSize: isMobile ? '0.875rem' : '1rem',
              '& img': { maxWidth: '100%', height: 'auto' },
              '& table': { width: '100%', overflowX: 'auto', display: 'block' }
            }}
          />
          {task.reminder && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 0.5,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}>
              <AccessTimeIcon fontSize="small" color="primary" />
              <Typography variant="caption" color="primary">
                {new Date(task.reminder).toLocaleString()}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ 
        display: 'flex',
        gap: 1,
        justifyContent: { xs: 'flex-end', sm: 'center' }
      }}>
        <IconButton onClick={() => onEditTask(task)} size={isMobile ? "small" : "medium"}>
          <EditIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
        <IconButton onClick={() => onDeleteTask(task.id)} size={isMobile ? "small" : "medium"} color="error">
          <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default TaskItem;
