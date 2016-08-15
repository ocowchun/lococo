// receive message from render procress

/*
 * [Note] ipcManager 
 * ipc 按照不同類型的方式來管理，不然這邊的架構會變得越來越肥。
 * 
 */
import {
  ipcMain
} from 'electron';

var FileStore = require('./stores/FileStore.js');
var events = require('./constants/events.js');
var FileActions = require('./actions/FileActions.js');

ipcMain.on('clickDictionary', (event, dic) => {
  console.log('ipc on clickDictionary')
  FileActions.clickDictionary(dic);
});

ipcMain.on('clickFile', (event, file) => {
  console.log('click file action.');
  FileActions.clickFile(file);
});

ipcMain.on(events.READ_WORD_GROUP, (e, wordGroup) => {
  FileActions.readWordGroup(wordGroup);
});

ipcMain.on(events.READ_WORD, (e, word) => {
  FileActions.readWord(word);
});

ipcMain.on(events.ADD_WORD, (e, wordDefination) => {
  FileActions.addWord(wordDefination);
});

ipcMain.on(events.SAVE_DICTIONARY, (e) => {
  FileActions.saveDictionary();
});