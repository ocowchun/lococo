const RECEIVE_SAVED_MESSAGE = 'RECEIVE_SAVED_MESSAGE';

const messages = {
	type: '',
	text: ''
};

const actionHandler = {};

actionHandler[RECEIVE_SAVED_MESSAGE] = (state, action) => {
  return Object.assign({}, state, {
  	type: 'information',
  	text: '儲存成功'
  });
}

export default function message(state = messages, action) {

	if(actionHandler[action.type] && typeof actionHandler[action.type] === 'function') {
		return actionHandler[action.type].call(null, state, action);
	}

	return state;
}


