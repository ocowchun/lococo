var FileStore = require('./stores/FileStore.js');
var EVENTS = require('./constatns/events.js');

function mainWindowManagerFactory(mainWindow) {
  let mainWindowManager = {};

  FileStore.on(EVENTS.OPEN_FILES, function() {
    let files = FileStore.getFiles();
    console.log('@@');
    mainWindow.send('receiveFiles', files)
  })

}

module.exports = mainWindowManagerFactory;
