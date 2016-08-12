import { ipcRenderer } from 'electron';

export const READ_WORD_GROUP = 'READ_WORD_GROUP';
export const READ_WORD = 'READ_WORD';
export const ADD_WORD = 'ADD_WORD';
export const SAVE_DICTIONARY = 'SAVE_DICTIONARY';

export const RECEIVE_WORD = 'RECEIVE_WORD';
export const RECEIVE_ADD_WORD = 'RECEIVE_ADD_WORD';
export const RECEIVE_WORD_GROUP = 'RECEIVE_WORD_GROUP';

export const ERROR    = 'ERROR';

/**
 * [readWordGroup 讀取 yml 檔的 key]
 * @param  {wordGroup: string}
 * @return {} [description]
 */
export function readWordGroup(wordGroup) {

	ipcRenderer.send(READ_WORD_GROUP, wordGroup)
  
  return {
  	type: READ_WORD_GROUP,
  	wordGroup
  };
}


export function receiveWordGroup(wordGroupKeys) {
  return {
    type: RECEIVE_WORD_GROUP,
    wordGroupKeys
  }
}


/**
 * [readWord description]
 * @param  {string} word [讀取的 word，e.g: controller.home.index]
 * @return {object}
 *
 * e.g readWord('controller.home.index');
 */
export function readWord(word) {
  ipcRenderer.send(READ_WORD, word);

  return {
  	type: READ_WORD,
  	word
  };
}

/**
 * [receiveWord description]
 * @param  {[string]} word [description]
 * @return {[type]}      [description]
 */
export function receiveWord(word) {
  return {
    type: RECEIVE_WORD,
    word
  }
}

/**
 * [addWord 加入 word 到字典裡]
 * @param {[string]} word       [e.g: controller.home.index]
 * @param {[type]} defination [description]
 */
export function addWord(word, defination, locale) {

  const wordDefination = {
    word,
    defination,
    locale
  };
  
  ipcRenderer.send(ADD_WORD, wordDefination);

  return {
  	type: ADD_WORD,
  	wordDefination
  }
}

export function receiveAddWord(newWord) {
  return {
    type: RECEIVE_ADD_WORD,
    word: newWord
  }
}

/**
 * [saveDictionary save current dictionary]
 * @return {[type]} [description]
 */
export function saveDictionary() {
  ipcRenderer.send(SAVE_DICTIONARY);

  return {
  	type: SAVE_DICTIONARY,
  }
}

export function receiveSavedMessage() {
  return {
    type: 'RECEIVE_SAVED_MESSAGE',
  } 
}