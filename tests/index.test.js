var bank = require('../');
var test = require('tape');
var boom = require('../index');
var timer;

test('Create a new timer.', function(t) {
  timer = boom.create({endTime: 5});
  t.equal(typeof timer, 'object', 'Timer created');
  t.true(timer.hasOwnProperty('currentTime'), 'Has `currentTime` property.');
  t.end();
});

test('Validate options.', function(t){
  if(!timer.isCountdown){
    t.true(timer.endTime > 0, 'Timer should have an end time.');
  }else{
    t.true(timer.isCountdown, 'Timer is countdown.')
  }
  t.end();
});

test('Return current time.', function(t){
  t.equal(timer.time(), 0, 'Current time should be 0');
  t.end();
});

test('Start timer.', function(t){
  t.plan(1);
  var currentTime = timer.time();
  timer.start();
  setTimeout(function(){
    if(timer.isCountdown){
      t.true(timer.time() < currentTime, 'Start the timer.');
    }else{
      t.true(timer.time() > currentTime, 'Start the timer.');
    }
  }, 1100);
});

test('Stop timer.', function(t){
  t.plan(1);
  timer.stop();
  var currentTime = timer.time();
  setTimeout(function(){
    t.true(timer.time() == currentTime, 'Stop the timer.');
  }, 1100);
});
