import React, { useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [reminder, setReminder] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ 
      title, 
      details, 
      reminder: reminder ? reminder.toISOString() : null 
    });
    setTitle('');
    setDetails('');
    setReminder(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Details"
          multiline
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
        <DateTimePicker
          label="Reminder"
          value={reminder}
          onChange={(newValue) => setReminder(newValue)}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          fullWidth
        >
          Add Task
        </Button>
      </Stack>
    </Box>
  );
};

export default AddTaskForm;
