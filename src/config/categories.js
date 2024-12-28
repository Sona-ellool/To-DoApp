import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import FlightIcon from '@mui/icons-material/Flight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

export const categories = {
  all: {
    id: 'all',
    name: 'All Tasks',
    icon: AllInclusiveIcon,
    color: '#9E9E9E',
    lightColor: '#F5F5F5'
  },
  work: {
    id: 'work',
    name: 'Work',
    icon: WorkIcon,
    color: '#FF9B9B',
    lightColor: '#FFE2E2'
  },
  home: {
    id: 'home',
    name: 'Home',
    icon: HomeIcon,
    color: '#9BEBB4',
    lightColor: '#DEFFEB'
  },
  study: {
    id: 'study',
    name: 'Study',
    icon: SchoolIcon,
    color: '#9BB0FF',
    lightColor: '#E2E7FF'
  },
  travel: {
    id: 'travel',
    name: 'Travel',
    icon: FlightIcon,
    color: '#FFD89B',
    lightColor: '#FFF2DE'
  },
  shopping: {
    id: 'shopping',
    name: 'Shopping',
    icon: ShoppingCartIcon,
    color: '#D49BFF',
    lightColor: '#F2E2FF'
  },
  fitness: {
    id: 'fitness',
    name: 'Fitness',
    icon: FitnessCenterIcon,
    color: '#9BE8FF',
    lightColor: '#E2F8FF'
  }
};
