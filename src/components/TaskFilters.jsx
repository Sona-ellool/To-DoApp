import React from 'react';
import { 
  Box, 
  ToggleButton, 
  ToggleButtonGroup, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Stack
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const TaskFilters = ({ filter, onFilterChange, sortBy, onSortChange }) => {
  const { t } = useTranslation();

  return (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      spacing={2} 
      alignItems="center" 
      sx={{ mb: 3 }}
    >
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(e, newFilter) => onFilterChange(newFilter || 'all')}
        size="small"
      >
        <ToggleButton value="all">
          {t('all')}
        </ToggleButton>
        <ToggleButton value="active">
          {t('active')}
        </ToggleButton>
        <ToggleButton value="completed">
          {t('completed')}
        </ToggleButton>
      </ToggleButtonGroup>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>{t('sortBy')}</InputLabel>
        <Select
          value={sortBy}
          label={t('sortBy')}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <MenuItem value="name">{t('name')}</MenuItem>
          <MenuItem value="dueDate">{t('dueDate')}</MenuItem>
          <MenuItem value="category">{t('category')}</MenuItem>
          <MenuItem value="created">{t('created')}</MenuItem>
          <MenuItem value="status">{t('status')}</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default TaskFilters;
