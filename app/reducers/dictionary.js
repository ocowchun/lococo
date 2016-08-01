var _=require('underscore');
import { PING_MESSAGE,RECEIVE_FILES,RECEIVE_KEYS } from '../actions/file';

function initState() {
  return {
    dictionaries: [],
    keys: [],
    currentDir:'',
    current:''
  };
}

export default function counter(state = initState(), action) {
  console.log('action')
  console.log(action)
  switch (action.type) {
    case RECEIVE_FILES:
      console.log('reducer RECEIVE_FILES');
      return _.extend({}, state, {
        dictionaries: action.dictionaries
      });
    case RECEIVE_KEYS:
      console.log('reducer RECEIVE_KEYS');
      return _.extend({}, state, {
        keys: action.keys,
        current:action.currentDictionary,
        currentDir:action.currentDir
      });
    default:
      return state;
  }
}
