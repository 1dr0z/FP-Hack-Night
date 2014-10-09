// Index accessors
function nth(x, i) { return x[i]; }
function first(x) { return nth(x, 0); }
function second(x) { return nth(x, 1); }

// Functional helpers
function noop() {}
function not(x) { return !x; }
function always(x) { return function() { return x; }; }
function identity(x) { return x; }
function increment(x) { return x + 1; }
function decrement(x) { return x - 1; }
function isEven(x) { return x % 2 === 0; }
function isOdd(x) { return !isEven(x); }


// Exports
module.exports = {
  nth: nth,
  first: first,
  second: second,
  not: not,
  always: always,
  identity: identity,
  increment: increment,
  decrement: decrement,
  isEven: isEven,
  isOdd: isOdd,
};