import { combineReducers } from 'redux';
import session from './sessionReducer';
import forecast from './forecastReducer';
import error from './errorReducer';

const rootReducer = combineReducers({
  session,
  forecast,
  error
});

export default rootReducer;
