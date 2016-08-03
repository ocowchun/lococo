// receive message from render procress
import {
  ipcMain
} from 'electron';
var FileStore = require('./stores/FileStore.js');
var EVENTS = require('./constants/events.js');
var FileActions = require('./actions/FileActions.js');

ipcMain.on('clickDictionary', (event, dic) => {
  console.log('ipc on clickDictionary')
  FileActions.clickDictionary(dic);
});

ipcMain.on('clickFile', (event, file) => {
  console.log('click file action.');
  FileActions.clickFile(file);
});
