var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../distpatcher.js');
var EVENTS = require('../constants/events.js');
var DicManager = require('../dicManager.js');

let _files = [];
let _currentFile = '';
let _dicManager;
var _keys = [];
// let key
// how to send dic data to render

var FileStore = _.extend(new EventEmitter(), {
  getFiles: function() {
    return _dicManager.files;
  },
  getDictionaries: function() {
    return _.keys(_dicManager.dictionaries);
  },
  getDir: function() {
    return _dicManager.dir;
  },
  getCurrentDictionary: function() {
    return _dicManager.currentDictionary;
  },
  getKeys: function() {
    return _keys;
  }
});

Dispatcher.register(function(action) {
  var handles = {};

  handles[EVENTS.OPEN_DIRECTORY] = function() {
    let dir = action.dir;
    let config = action.config;
    DicManager.buildDicManager(dir, config).then(function(dicManager) {
      _dicManager = dicManager;
      FileStore.emit(EVENTS.OPEN_DIRECTORY);
    });
  }

  handles[EVENTS.CLICK_DICTIONARY] = function() {
    let dic = action.dic;
    _dicManager.openDictionary(dic).then(function(dictionary) {
      _keys = dictionary.listKeys();
      FileStore.emit(EVENTS.CLICK_DICTIONARY);
    })
  }



  if (handles[action.actionType]) {
    handles[action.actionType]();
  }

});

module.exports = FileStore;
