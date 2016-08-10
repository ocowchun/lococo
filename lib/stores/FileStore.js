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

  /* [TODO] Refactor 這裡的架構 */
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

  handles[EVENTS.READ_WORD] = function() {
    const { word } = action;
    const dictionary = FileStore.getCurrentDictionary();
    const value      = dictionary.listValueLocales(word);
    console.log(value);
    console.log('handle READ WORD');

    FileStore.emit(EVENTS.READ_WORD, value);
  }

  handles[EVENTS.ADD_WORD] = function() {
    const { wordDefination } = action;
    const { word, defination, locale } = wordDefination;
    const dictionary = FileStore.getCurrentDictionary();

    dictionary.addValue(word, defination, locale);
    
  }

  handles[EVENTS.READ_WORD_GROUP] = function() {
    const { wordGroup } = action;
    const dictionary    = FileStore.getCurrentDictionary();

    const keys = dictionary.listKeys(wordGroup);

    FileStore.emit(EVENTS.READ_WORD_GROUP, keys);
  }

  if (handles[action.actionType] && typeof handles[action.actionType] === 'function') {
    handles[action.actionType]();
  }

});

module.exports = FileStore;
