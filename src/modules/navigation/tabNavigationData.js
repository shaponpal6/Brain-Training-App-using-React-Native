import HomeScreen from '../home/HomeViewContainer';
import GameCategoryContainer from '../gameCategory/GameCategoryContainer';
import CalendarScreen from '../calendar/CalendarViewContainer';
import GridsScreen from '../grids/GridsViewContainer';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Play Game',
    component: GameCategoryContainer,
    icon: iconGrids,
  },
  {
    name: 'My Task',
    component: CalendarScreen,
    icon: iconCalendar,
  },
  {
    name: 'Profile',
    component: ComponentsScreen,
    icon: iconPages,
  },
  {
    name: 'Shop',
    component: PagesScreen,
    icon: iconComponents,
  },
];

export default tabNavigationData;
