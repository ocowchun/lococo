var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../distpatcher.js');
var EVENTS = require('../constatns/events.js');

let _files = [];
let _currentFile = '';
var FileStore = _.extend(new EventEmitter(), {
  getFiles: function() {
    return _files;
  },
  getCurrentFile: function() {
    return _currentFile;
  }
});

Dispatcher.register(function(action) {
  var handles = {};

  handles[EVENTS.OPEN_FILES] = function() {
    _files = action.files;
    console.log('store OPEN_FILES')
    FileStore.emit(EVENTS.OPEN_FILES);
  }

  if (handles[action.actionType]) {
    handles[action.actionType]();
  }

});

module.exports = FileStore;
