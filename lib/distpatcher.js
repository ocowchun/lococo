var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var ACTION_EVENT = 'ACTION_EVENT';
var Dispatcher = _.extend(new EventEmitter(), {
  register: function(cb) {
    this.on(ACTION_EVENT, cb);
  }
});


Dispatcher.handleAction = function(action) {
  this.emit(ACTION_EVENT, action);
}
module.exports = Dispatcher;
