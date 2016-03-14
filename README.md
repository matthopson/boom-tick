boom-tick
===

Creates a timer with scheduled events.

Usage
---
```javascript
// Require module
var boom = require('boom-tick');

// Creates a five second timer.
var timer = boom.create({endTime: 5});

// Register a timed event.
// ** Creates an event that fires at the three second mark.
// ** Also registering a custom event `twoSecondWarning` that we can listen for.
var customEventHandler = function() {
  console.log('Two seconds remaining!');
}
timer.createEvent(3, customEventHandler, 'twoSecondWarning');

// Start timer
timer.start();

// Stop timer
// ** Timer can be resumed with the `start()` method.
timer.stop();

// Rest timer
timer.reset();

```

todo
---
- `done()` callback for end of timer.
- Support multiple time units (currently only using secons).
- Better example usage.
- More tests.
