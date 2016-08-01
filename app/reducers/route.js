var _=require('underscore');
import { PING_MESSAGE,RECEIVE_FILES,RECEIVE_KEYS } from '../actions/file';

function initState() {
  return {
    currentRoute: 'main'
  };
}

export default function counter(state = initState(), action) {
  switch (action.type) {
    case RECEIVE_KEYS:
      console.log('reducer RECEIVE_KEYS');
      return _.extend({}, state, {
        currentRoute: 'dictionaryShow'
      });
    default:
      return state;
  }
}
