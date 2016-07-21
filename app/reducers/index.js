import { combineReducers } from 'redux';
import counter from './counter';
import files from './file';

const rootReducer = combineReducers({
  counter,
  files
});

export default rootReducer;
