import React, { useState } from 'react';
import { 
  IconButton, 
  InputBase, 
  Paper,
  Fade,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClose = () => {
    setSearchTerm('');
    onSearch('');
    setIsOpen(false);
  };

  return (
    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      {!isOpen && (
        <IconButton onClick={() => setIsOpen(true)} color="inherit">
          <SearchIcon />
        </IconButton>
      )}
      
      <Fade in={isOpen}>
        <Paper
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            width: isOpen ? 300 : 40,
            transition: 'width 0.3s',
            zIndex: 1000,
          }}
          elevation={1}
        >
          <InputBase
            autoFocus
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{ ml: 2, flex: 1 }}
          />
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Paper>
      </Fade>
    </Box>
  );
};

export default SearchBar;
