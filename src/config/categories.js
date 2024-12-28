import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import FlightIcon from '@mui/icons-material/Flight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { getIconComponent } from './icons';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const defaultCategories = {
  all: {
    id: 'all',
    name: 'All Tasks',
    icon: AllInclusiveIcon,
    color: '#9E9E9E',
    lightColor: '#F5F5F5'
  }
};

export const loadCategories = async () => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const loadedCategories = { ...defaultCategories };
    
    categoriesSnapshot.forEach(doc => {
      const categoryData = doc.data();
      loadedCategories[doc.id] = {
        ...categoryData,
        id: doc.id,
        icon: getIconComponent(categoryData.icon)
      };
    });
    
    return loadedCategories;
  } catch (error) {
    console.error('Error loading categories:', error);
    return defaultCategories;
  }
};

export const addCategory = async (categoryData) => {
  try {
    const docRef = await addDoc(collection(db, 'categories'), {
      name: categoryData.name,
      icon: categoryData.icon,
      color: categoryData.color,
      lightColor: categoryData.lightColor
    });
    
    return {
      id: docRef.id,
      ...categoryData
    };
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};
