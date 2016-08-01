import { combineReducers } from 'redux';
import counter from './counter';
import files from './files';
import dictionary from './dictionary';
import route from './route';

const rootReducer = combineReducers({
  counter,
  files,
  dictionary,
  route
});

export default rootReducer;
