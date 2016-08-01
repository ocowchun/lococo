var _=require('underscore');
import { PING_MESSAGE,RECEIVE_FILES,RECEIVE_KEYS } from '../actions/file';

function initState() {
  return {
    dir: '',
    files: []
  };
}

export default function counter(state = initState(), action) {
  switch (action.type) {
    case RECEIVE_FILES:
      console.log('reducer RECEIVE_FILES');
      return _.extend({}, state, {
        dir: action.dir
      });
    default:
      return state;
  }
}
