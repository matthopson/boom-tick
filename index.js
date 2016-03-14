if(window) {
  require('./customEvent.js');
}

var TimedEvent = function() {
  this.time = 0;
  this.handler = null;
  this.customEvent = null;
}

// Looks for events in the `timedEvents` Array and fires them at the apporpriate time.
var fireEvents = function(timer){
  var evs = timer.timedEvents;
  var currentTime = timer.currentTime;
  if(evs.hasOwnProperty(currentTime)){
    evs[currentTime].forEach(function(ev){
      ev.handler.call(timer);
      if(ev.customEvent){
        window.dispatchEvent(ev.customEvent);
      }
    });
  }
}

module.exports = {
  interval: null,
  currentTime: null,
  timedEvents: [],

  // Creates a new event
  create: function(options){
    var defaults = {
      startTime: 0,
      isCountdown: false
    }
    if(typeof options === 'undefined'){
      options = defaults;
    }

    if(!options.hasOwnProperty('startTime')){
      options.startTime = defaults.startTime;
    }

    if(!this.isCountdown){
      if(!options.hasOwnProperty('endTime')){
        throw 'When not using a countdown, you must provide an `endTime`.';
      }
      this.endTime = parseInt(options.endTime);
    }

    this.currentTime = parseInt(options.startTime);
    this.isCountdown = options.isCountdown;
    return this;
  },

  // Get time for current timer
  time: function() {
    return this.currentTime;
  },

  // Start the current timer.
  start: function() {
    var _this = this;
    this.interval = setInterval(function() {
      if(_this.isCountdown){
        _this.currentTime = _this.currentTime - 1;
      }else{
        _this.currentTime = _this.currentTime + 1;
      }

      fireEvents(_this);

      if(_this.currentTime == 0 || (_this.isCountdown && _this.currentTime == _this.endTime)){
        _this.done();
      }
    }, 1000)
  },

  // Stop the current timer
  stop: function() {
    clearInterval(this.interval);
  },

  // Stops and resets the current timer.
  reset: function() {
      this.stop();
      this.currentTime = null;
  },

  // Stops timer and fires callback
  done: function() {
    this.stop();
  },

  // Create a timed event
  createEvent: function(time, handler, eventName) {
    var ev = new TimedEvent();
    ev.time = parseInt(time);
    ev.handler = handler;
    if(eventName){
      event = new window.CustomEvent(eventName);
      ev.customEvent = event;
    }

    if(!this.timedEvents.hasOwnProperty(ev.time)){
      this.timedEvents[ev.time] = [];
    }
    this.timedEvents[ev.time].push(ev);
  }

}
