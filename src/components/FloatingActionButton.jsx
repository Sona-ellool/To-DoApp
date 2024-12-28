import React from 'react';
import { Fab, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// import { categories } from "./config/categories.js";

const FloatingActionButton = ({ onClick }) => {
  return (
    <Zoom in={true}>
      <Fab
        color="primary"
        aria-label="add"
        onClick={onClick}
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
        }}
      >
        <AddIcon />
      </Fab>
    </Zoom>
  );
};

export default FloatingActionButton;