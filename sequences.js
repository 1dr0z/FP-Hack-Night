var lazy = require('./lib/lazy.js'),
    helpers = require('./lib/functional.js');


// ------------------------------------------------
// EXAMPLES
// ------------------------------------------------


/**
 * Create a lazy fibonnaci sequence
 */
var fibonnaci = lazy.generator(
  [1, 1],           // Seed value
  helpers.first,    // Current value
  function(value) { // Step to next value
    return [
      helpers.second(value),
      helpers.first(value) + helpers.second(value)
    ];
  }
);


/**
 * Create an infinite number sequence
 */
var infinite = lazy.generator(
  0,                // Seed value
  helpers.identity, // Current value
  helpers.increment // Step to next value
);


/**
 * Create an infinite sequence of random numbers
 */
var random = lazy.generator(
  null,             // Doesn't actually matter
  Math.random,      // Random number
  helpers.identity  // Do nothing
);