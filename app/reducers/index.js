import { combineReducers } from 'redux';
import counter from './counter';
import files from './files';
import dictionary from './dictionary';
import route from './route';
import word from './word';

const rootReducer = combineReducers({
  counter,
  files,
  dictionary,
  route,
  word
});

export default rootReducer;
