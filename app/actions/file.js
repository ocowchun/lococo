const {  ipcRenderer} = require('electron');
export const PING_MESSAGE = 'PING_MESSAGE';
export const PONG_MESSAGE = 'PONG_MESSAGE';
export const RECEIVE_FILES = 'RECEIVE_FILES';
export const CLICK_DICTIONARY = 'CLICK_DICTIONARY';
export const CLICK_FILE = 'CLICK_FILE';
export const RECEIVE_KEYS = 'RECEIVE_KEYS';

export function ping() {
  ipcRenderer.send('asynchronous-message', 'ping');
  return {
    type: PING_MESSAGE
  };
}

export function pong() {
  console.log('@@')
  return {
    type: PONG_MESSAGE
  };
}

export function receiveFiles(data) {
  let {dictionaries,dir}=data;
  return {
    type: RECEIVE_FILES,
    dictionaries,
    dir
  };
}

export function receiveKeys(data) {
  let {keys,currentDictionary,currentDir}=data;
  return {
    type: RECEIVE_KEYS,
    keys,
    currentDictionary,
    currentDir
  };
}


export function clickDictionary(dic) {
  console.log('@@')
  ipcRenderer.send('clickDictionary', dic);
  return {
    type: CLICK_DICTIONARY,
    dic:dic
  };
}

export function clickFile(file) {
  ipcRenderer.send('clickFile', file);
  return {
    type: CLICK_FILE,
    file:file
  };
}
