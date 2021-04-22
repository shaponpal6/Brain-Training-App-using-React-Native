import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import games from '../modules/games/GameState';
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';

export default combineReducers({
  // ## Generator Reducers
  games,
  gallery,
  app,
  calendar,
});
