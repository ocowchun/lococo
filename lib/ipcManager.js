// receive message from render procress
import {
  ipcMain
} from 'electron';
var FileStore = require('./stores/FileStore.js');
var EVENTS = require('./constatns/events.js');
var FileActions = require('./actions/FileActions.js');
// FileStore.on(EVENTS.OPEN_FILES, function() {
//   FileStore.getFiles();
// })


ipcMain.on('clickDictionary', (event, dic) => {
  console.log('ipc on clickDictionary')
  FileActions.clickDictionary(dic);
  // fileManager.openItem(file);

  // event.sender.send('asynchronous-reply', 'pong');
});
