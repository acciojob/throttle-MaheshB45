//your JS code here. If required.
function throttle(callback, delay) {
  let lastCallTime = 0;
  let scheduledCallback;
  let lastArgs;

  const throttled = function (...args) {
    const currentTime = Date.now();

    if (currentTime - lastCallTime >= delay) {
      // If enough time has passed, call the callback immediately
      callback.apply(this, args);
      lastCallTime = currentTime;
    } else {
      // Schedule the callback to be called after the remaining delay
      clearTimeout(scheduledCallback);
      lastArgs = args;
      scheduledCallback = setTimeout(() => {
        callback.apply(this, lastArgs);
        lastCallTime = Date.now();
      }, delay - (currentTime - lastCallTime));
    }
  };

  // Add a cancel method to the throttled function
  throttled.cancel = function () {
    clearTimeout(scheduledCallback);
  };

  return throttled;
}

module.exports = throttle;
