import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  TextField,
  MenuItem,
  Stack
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { categories } from '../config/categories';

const TaskDialog = ({ open, onClose, onAddTask, editingTask }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [reminder, setReminder] = useState(null);
  const [category, setCategory] = useState('uncategorized');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDetails(editingTask.details || '');
      setReminder(editingTask.reminder ? new Date(editingTask.reminder) : null);
      setCategory(editingTask.category || 'uncategorized');
    } else {
      setTitle('');
      setDetails('');
      setReminder(null);
      setCategory('uncategorized');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({
      title,
      details,
      reminder: reminder?.toISOString(),
      category
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Details"
              fullWidth
              multiline
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <DateTimePicker
              label="Reminder"
              value={reminder}
              onChange={(newValue) => setReminder(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
            >
              {Object.values(categories).map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {editingTask ? 'Save Changes' : 'Add Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskDialog;
