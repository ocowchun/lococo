const {  ipcRenderer} = require('electron');
export const PING_MESSAGE = 'PING_MESSAGE';
export const PONG_MESSAGE = 'PONG_MESSAGE';
export const RECEIVE_FILES = 'RECEIVE_FILES';
export const CLICK_FILE = 'CLICK_FILE';

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

export function receiveFiles(files) {
  return {
    type: RECEIVE_FILES,
    files:files
  };
}

export function clickFile(file) {
  ipcRenderer.send('clickFile', file);
  return {
    type: CLICK_FILE,
    file:file
  };
}
