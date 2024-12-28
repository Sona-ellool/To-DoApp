import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, IconButton, Box, Alert, CircularProgress, Grid, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { collection, addDoc, deleteDoc, updateDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, testConnection, initializeCollections } from './firebase.js';
import { loadCategories, addCategory } from './config/categories';
import CategoryCard from './components/CategoryCard';
import FloatingActionButton from './components/FloatingActionButton';
import { AnimatePresence, motion } from 'framer-motion';
import TaskDialog from './components/TaskDialog';
import CategoryDialog from './components/CategoryDialog';
import { getIconComponent } from './config/icons'; // Add this import

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [categories, setCategories] = useState({});
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#646cff',
      },
      background: {
        default: darkMode ? '#242424' : '#f5f5f5',
        paper: darkMode ? '#1a1a1a' : '#ffffff',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h6: {
        fontWeight: 500,
      },
    },
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  });

  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      try {
        if (!import.meta.env.VITE_FIREBASE_API_KEY) {
          throw new Error('Firebase configuration is missing. Please check your .env file.');
        }
        
        await testConnection();
        setIsConnected(true);
        setError(null);
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err.message);
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (!isConnected) {
      console.log('Not connected, skipping task listener'); // Debug log
      return;
    }

    try {
      console.log('Setting up task listener...'); // Debug log
      const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log('Received task update:', snapshot.size, 'tasks'); // Debug log
        const tasksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(tasksData);
      }, (error) => {
        console.error('Task listener error:', error); // Debug log
        setError('Error loading tasks: ' + error.message);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Task listener setup error:', error); // Debug log
      setError('Error setting up task listener: ' + error.message);
    }
  }, [isConnected]);

  useEffect(() => {
    const fetchCategories = async () => {
      const loadedCategories = await loadCategories();
      setCategories(loadedCategories);
    };
    fetchCategories();
  }, []);

  const addTask = async (task) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        completed: false,
        createdAt: new Date()
      });
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
      await updateDoc(doc(db, 'tasks', id), updatedTask);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const toggleCompleted = async (id) => {
    const task = tasks.find(t => t.id === id);
    try {
      await updateDoc(doc(db, 'tasks', id), {
        completed: !task.completed
      });
    } catch (error) {
      console.error("Error toggling task: ", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskDialogOpen(true); // Open dialog when editing
  };

  const handleSaveTask = async (task) => {
    try {
      const taskData = {
        ...task,
        category: task.category || selectedCategory || 'all',
        updatedAt: new Date(),
        completed: editingTask ? editingTask.completed : false,
        createdAt: editingTask ? editingTask.createdAt : new Date()
      };

      if (editingTask) {
        await editTask(editingTask.id, taskData);
      } else {
        await addTask(taskData);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving task: ", error);
    }
  };

  const getFilteredTasks = (categoryId) => {
    if (!categoryId || categoryId === 'all') {
      return tasks;
    }
    return tasks.filter(task => task.category === categoryId);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleAddNewTask = () => {
    setEditingTask(null);
    setIsTaskDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsTaskDialogOpen(false);
    setEditingTask(null);
  };

  const handleAddCategory = async (categoryData) => {
    try {
      const newCategory = await addCategory(categoryData);
      setCategories(prev => ({
        ...prev,
        [newCategory.id]: {
          ...newCategory,
          icon: getIconComponent(newCategory.icon)
        }
      }));
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleOpenCategoryDialog = () => {
    setIsCategoryDialogOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
          {loading ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh',
              gap: 2
            }}>
              <CircularProgress />
              <div>Loading application...</div>
            </Box>
          ) : error ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh' 
            }}>
              <Alert severity="error" sx={{ mt: 4 }}>
                {error}
              </Alert>
            </Box>
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              minHeight: '100vh',
              py: { xs: 2, sm: 3, md: 4 }
            }}>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: { xs: 2, sm: 3, md: 4 },
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 0 }
                }}>
                  <h1 style={{ margin: 0 }}>Todo App</h1>
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={handleOpenCategoryDialog}
                      sx={{ mr: 2 }}
                    >
                      Add Category
                    </Button>
                    <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                  </Box>
                </Box>
              </motion.div>
              
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {Object.values(categories).map(category => (
                  <Grid item xs={12} sm={6} md={4} key={category.id}>
                    <CategoryCard
                      category={category}
                      tasks={getFilteredTasks(category.id)}
                      onClick={() => handleCategoryClick(category.id)}
                      isSelected={selectedCategory === category.id}
                    />
                  </Grid>
                ))}
              </Grid>

              <AnimatePresence mode="wait">
                {selectedCategory && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                  >
                    <TaskList 
                      tasks={getFilteredTasks(selectedCategory)}
                      onDeleteTask={deleteTask}
                      onEditTask={handleEditTask}
                      onCompleteTask={toggleCompleted}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <FloatingActionButton onClick={handleAddNewTask} />
              <TaskDialog
                open={isTaskDialogOpen}
                onClose={handleCloseDialog}
                onAddTask={handleSaveTask}
                editingTask={editingTask}
                categories={categories} // Add this prop
                selectedCategory={selectedCategory}
              />
              <CategoryDialog
                open={isCategoryDialogOpen}
                onClose={() => setIsCategoryDialogOpen(false)}
                onSave={handleAddCategory}
              />
            </Box>
          )}
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
