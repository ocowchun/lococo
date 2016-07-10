import { PING_MESSAGE,PONG_MESSAGE } from '../actions/file';

function initState(){
  return [];
}

export default function counter(state = initState(), action) {
  switch (action.type) {
    case PING_MESSAGE:
      return state.concat('ping');
    case PONG_MESSAGE:
      return state.concat('pong');
    default:
      return state;
  }
}
