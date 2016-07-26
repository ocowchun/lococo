var FileActions = {};
var Dispatcher = require('../distpatcher.js');
var EVENTS = require('../constatns/events.js');

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



module.exports = FileActions;
