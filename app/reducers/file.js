var _=require('underscore');
import { PING_MESSAGE,RECEIVE_FILES,RECEIVE_KEYS } from '../actions/file';

function initState() {
  return {
    dir: '',
    files: [],
    dictionaries: [],
    keys: []
  };
}

export default function counter(state = initState(), action) {
  switch (action.type) {
    case RECEIVE_FILES:
      console.log('reducer RECEIVE_FILES');
      return _.extend({}, state, {
        dictionaries: action.dictionaries,
        dir: action.dir
      });
    case RECEIVE_KEYS:
      console.log('reducer RECEIVE_KEYS');
      return _.extend({}, state, {
        keys: action.keys
      });
    default:
      return state;
  }
}
