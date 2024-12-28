import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  TextField,
  Grid,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { availableIcons } from '../config/icons';
import { colorOptions } from '../config/colors';

const CategoryDialog = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !selectedIcon || !selectedColor) return;

    onSave({
      name,
      icon: selectedIcon,
      color: selectedColor,
      lightColor: `${selectedColor}33` // Adding transparency for light version
    });
    
    setName('');
    setSelectedIcon(null);
    setSelectedColor(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Category Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Box>
              <Typography variant="subtitle1" gutterBottom>Select Icon</Typography>
              <Grid container spacing={1}>
                {Object.entries(availableIcons).map(([key, Icon]) => (
                  <Grid item key={key}>
                    <IconButton
                      sx={{
                        border: selectedIcon === key ? 2 : 1,
                        borderColor: selectedIcon === key ? 'primary.main' : 'divider'
                      }}
                      onClick={() => setSelectedIcon(key)}
                    >
                      <Icon />
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>Select Color</Typography>
              <Grid container spacing={1}>
                {colorOptions.map((color) => (
                  <Grid item key={color}>
                    <IconButton
                      sx={{
                        backgroundColor: color,
                        width: 40,
                        height: 40,
                        border: selectedColor === color ? 2 : 1,
                        borderColor: selectedColor === color ? 'primary.main' : 'divider',
                        '&:hover': {
                          backgroundColor: color
                        }
                      }}
                      onClick={() => setSelectedColor(color)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={!name || !selectedIcon || !selectedColor}
          >
            Add Category
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryDialog;
