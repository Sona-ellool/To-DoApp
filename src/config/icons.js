import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import FlightIcon from '@mui/icons-material/Flight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PetsIcon from '@mui/icons-material/Pets';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BrushIcon from '@mui/icons-material/Brush';
import CodeIcon from '@mui/icons-material/Code';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export const availableIcons = {
  work: WorkIcon,
  home: HomeIcon,
  school: SchoolIcon,
  flight: FlightIcon,
  shopping: ShoppingCartIcon,
  fitness: FitnessCenterIcon,
  food: RestaurantIcon,
  entertainment: LocalMoviesIcon,
  health: FavoriteIcon,
  finance: AttachMoneyIcon,
  pets: PetsIcon,
  gaming: SportsEsportsIcon,
  art: BrushIcon,
  coding: CodeIcon,
  music: MusicNoteIcon,
};

export const getIconComponent = (iconName) => {
  return availableIcons[iconName] || null;
};
