var FileActions = {};
var Dispatcher = require('../distpatcher.js');
var EVENTS = require('../constants/events.js');

FileActions.actionList = [];

FileActions.set = (method, implementation) => {
  this.actionList.push(method);
  this[method] = implementation;
};

FileActions.set('openDirectory', function(dir, config) {
  let action = {};

  action.actionType = EVENTS.OPEN_DIRECTORY;
  action.dir = dir;
  action.config = config;
  Dispatcher.handleAction(action);
});

FileActions.set('getFiles', function(files) {
  let action = {};
  action.actionType = EVENTS.OPEN_FILES;
  action.files = files;
  console.log('acition getFiles');
  Dispatcher.handleAction(action);
});

FileActions.set('clickFile', function(file) {
  let action = {};
  action.actionType = EVENTS.CLICK_FILE;
  action.file = file;
  console.log('acition clickFile');
  Dispatcher.handleAction(action);
});

FileActions.set('clickDictionary', function(dic) {
  let action = {};
  action.actionType = EVENTS.CLICK_DICTIONARY;
  action.dic = dic;
  console.log('acition clickDictionary');
  Dispatcher.handleAction(action);
});

module.exports = FileActions;
