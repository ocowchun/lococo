var FileActions = {};
var Dispatcher = require('../distpatcher.js');
var EVENTS = require('./events.js');


FileActions.openDirectory = function(dir,config) {
  let action = {};
  action.actionType = EVENTS.OPEN_DIRECTORY;
  action.dir = dir;
  action.config = config;
  Dispatcher.handleAction(action);
}


FileActions.getFiles = function(files) {
  let action = {};
  action.actionType = EVENTS.OPEN_FILES;
  action.files = files;
  console.log('acition getFiles');
  Dispatcher.handleAction(action);
}

FileActions.clickFile = function(file) {
  let action = {};
  action.actionType = EVENTS.CLICK_FILE;
  action.file = file;
  console.log('acition clickFile');
  Dispatcher.handleAction(action);
}

FileActions.clickDictionary = function(dic) {
  let action = {};
  action.actionType = EVENTS.CLICK_DICTIONARY;
  action.dic = dic;
  console.log('acition clickDictionary');
  Dispatcher.handleAction(action);
}


module.exports = FileActions;
