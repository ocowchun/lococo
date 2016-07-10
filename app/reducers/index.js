import { combineReducers } from 'redux';
import counter from './counter';
import file from './file';

const rootReducer = combineReducers({
  counter,
  file
});

export default rootReducer;
