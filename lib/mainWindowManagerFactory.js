// send message to render procress
var FileStore = require('./stores/FileStore.js');
var EVENTS = require('./constants/events.js');

console.log(FileStore.__proto__);

function mainWindowManagerFactory(mainWindow) {
  let mainWindowManager = {};

  FileStore.on(EVENTS.OPEN_DIRECTORY, function() {
    let dictionaries = FileStore.getDictionaries();
    let dir = FileStore.getDir();

    console.log('@@');
    console.log(dir);

    mainWindow.send('receiveFiles', {
      dictionaries: dictionaries,
      dir: dir
    });
  })

  FileStore.on(EVENTS.CLICK_DICTIONARY, function() {
    let keys = FileStore.getKeys();
    let dic = FileStore.getCurrentDictionary();

    let data = {
      keys: keys,
      currentDictionary: dic.name,
      currentDir:''
    };
    mainWindow.send('receiveKeys', data);
  });

  FileStore.on(EVENTS.READ_WORD, (value) => {
    mainWindow.send('readWord', value);
  });

  FileStore.on(EVENTS.READ_WORD_GROUP, (value) => {
    mainWindow.send('receiveWordGroup', value);
  });

}

module.exports = mainWindowManagerFactory;
