import { PING_MESSAGE,RECEIVE_FILES } from '../actions/file';

function initState(){
  return [];
}

export default function counter(state = initState(), action) {
  switch (action.type) {
    case RECEIVE_FILES:
console.log('reducer RECEIVE_FILES');
      return state.concat(action.files);
    default:
      return state;
  }
}
