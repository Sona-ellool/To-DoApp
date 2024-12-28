import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import { Editor } from '@tinymce/tinymce-react';
import { categories } from './config/categories';

const AddTaskForm = ({ onAddTask, editingTask }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [reminder, setReminder] = useState(null);
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDetails(editingTask.details || '');
      setReminder(editingTask.reminder ? new Date(editingTask.reminder) : null);
      setCategory(editingTask.category || '');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      details,
      reminder: reminder ? reminder.toISOString() : null,
      category: category || Object.values(categories)[1].id
    };

    if (editingTask) {
      // Preserve existing fields that we don't want to update
      onAddTask({
        ...editingTask,
        ...taskData
      });
    } else {
      onAddTask(taskData);
    }
  };

  return (
    <Paper elevation={3} sx={{ 
      p: { xs: 2, sm: 3 }, 
      mb: { xs: 2, sm: 3 },
      width: '100%'
    }}>
      <Box component="form" onSubmit={handleSubmit} sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1.5, sm: 2 }
      }}>
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          size="small"
        />
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {Object.values(categories)
              .filter(cat => cat.id !== 'all') // Exclude 'all' from selection
              .map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Editor
          apiKey="yta6i90ov3ycjfrdq4adsqy1c9m04shz6tyhlxbletoc0ulc"
          value={details}
          init={{
            height: { xs: 200, sm: 300 },
            menubar: false,
            plugins: [
              'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
              'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
            ],
            toolbar: window.innerWidth < 600 ? 
              'undo redo | bold italic | bullist numlist' :
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            mobile: {
              menubar: false,
              toolbar: 'undo redo | bold italic | bullist numlist'
            },
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 14px }'
          }}
          onEditorChange={(content) => setDetails(content)}
        />
        <DateTimePicker
          label="Due Date"
          value={reminder}
          onChange={setReminder}
          slotProps={{ 
            textField: { 
              fullWidth: true,
              size: "small"
            } 
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ mt: { xs: 1, sm: 2 } }}
          fullWidth
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AddTaskForm;
