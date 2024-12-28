import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Box, 
  Checkbox,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';

const TaskCard = ({ task, onDelete, onEdit, onComplete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleComplete = (e) => {
    e.stopPropagation();
    onComplete(task.id);
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        opacity: task.completed ? 0.7 : 1,
        transition: 'all 0.3s ease'
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <Checkbox
            checked={task.completed}
            onChange={handleComplete}
            sx={{ mt: 0.5 }}
          />
          <Box flex={1}>
            <Typography 
              variant="h6" 
              sx={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                wordBreak: 'break-word'
              }}
            >
              {task.title}
            </Typography>
            {task.details && (
              <Typography 
                color="text.secondary" 
                sx={{ 
                  mt: 1,
                  textDecoration: task.completed ? 'line-through' : 'none',
                  wordBreak: 'break-word'
                }}
              >
                {task.details}
              </Typography>
            )}
            {task.reminder && (
              <Typography 
                variant="caption" 
                color="primary"
                sx={{ display: 'block', mt: 1 }}
              >
                Reminder: {format(new Date(task.reminder), 'PPp')}
              </Typography>
            )}
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
