var _=require('underscore');
import { PING_MESSAGE, RECEIVE_FILES, RECEIVE_KEYS } from '../actions/file';
import { 
          READ_WORD_GROUP,
          READ_WORD,
          RECEIVE_WORD_GROUP,
          ADD_WORD,
          SAVE_DICTIONARY,
          ERROR
       }
from '../actions/dictionary.js';

function initState() {
  return {
    dictionaries: [],
    keys: [],
    currentDir:'',
    current:''
  };
}

const simpleLogger = (msg) => {
  console.log.call(console, `%c(reducer) ${msg}`,'font-weight: bold;');
};

const log = simpleLogger;

export default function dictionary(state = initState(), action) {
  switch (action.type) {
    case RECEIVE_FILES:
      log('RECEIVE_FILES');
      
      return _.extend({}, state, {
        dictionaries: action.dictionaries
      });
    case RECEIVE_KEYS:
      log('RECEIVE_FILES');
      return _.extend({}, state, {
        keys: action.keys,
        current:action.currentDictionary,
        currentDir:action.currentDir
      });
    case READ_WORD:
      log('READWORD');

      return _.extend({}, state, {
        currentWord: action.word
      });

    case RECEIVE_WORD_GROUP:
      log('receive word group');

      return _.extend({}, state, {
        keys: action.wordGroupKeys
      });
    case READ_WORD_GROUP:
      log('READ_WORD_GROUP');
      return state;

    default:
      return state;
  }
}
