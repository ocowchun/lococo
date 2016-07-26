// import {
//   ipcMain
// } from 'electron';
var FileStore = require('./stores/FileStore.js');
var EVENTS = require('./constatns/events.js');
var FileActions = require('./actions/FileActions.js');
// FileStore.on(EVENTS.OPEN_FILES, function() {
//   FileStore.getFiles();
// })


ipcMain.on('clickFile', (event, file) => {
  FileActions.clickFile(file);
  // fileManager.openItem(file);

  // event.sender.send('asynchronous-reply', 'pong');
});
