const RECEIVE_WORD = 'RECEIVE_WORD';
const RECEIVE_ADD_WORD = 'RECEIVE_ADD_WORD';

const initialState = {};

const actionHandler = {};

actionHandler[RECEIVE_WORD] = (state, action) => {
  return Object.assign({}, state, action.word);
}

actionHandler[RECEIVE_ADD_WORD] = (state, action) => {
  return Object.assign({}, state, action.word);
}

export default function word(state = initialState, action) {

	if(actionHandler[action.type] && typeof actionHandler[action.type] === 'function') {
		return actionHandler[action.type].call(null, state, action);
	}

	return state;
}

