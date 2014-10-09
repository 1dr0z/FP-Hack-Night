/* Exception to stop iteration */
function StopIteration() {};


// ------------------------------------------------------
// Generator Data Type
// ------------------------------------------------------


/* Create a generator object */
function generator(seed, current, step) {
  return {
    head: current(seed),
    tail: function() {
      return generator(step(seed), current, step);
    }
  };
}

/* Get the head of a generator object */
function genHead(generator) {
  return generator.head;
}

/* Get the tail of a generator object */
function genTail(generator) {
  return generator.tail();
}


// ------------------------------------------------------
// Looping Constructs
// ------------------------------------------------------


/* Get the next generator in the sequence or stop */
function _nextOrStop(number) {
  return function(generator) {
    if (number === 0) {
      throw new StopIteration();
    } else {
      number--;
      return generator.tail();
    }
  };
}

/* Decorate a generator so that it's total executions are limited */
function limit(number, gen) {
  return generator(gen, genHead, _nextOrStop(number - 1));
}

/* Build a basic looping construct that works with our generator */
function each(generator, callback) {
  var counter = 0;

  try {
    // Loop until a StopIteration exception is raised
    while (callback(generator.head, counter) !== false) {
      generator = generator.tail();
      counter++;
    }
  } catch (e) {
    // End iteration when StopIteration is raised
    if (!(e instanceof StopIteration)) {
      throw e;
    }
  }
}

/* Reduce a generator */
function reduce(generator, callback, accumulator) {
  each(generator, function(item) {
    accumulator = callback(accumulator, item);
  });
  return accumulator;
}

/* Filter a generator */
function filter(generator, callback) {
  return reduce(generator, function(collection, item) {
    if (callback(item)) {
      collection.push(item);
    }
    return collection;
  }, []);
}

/* Map a generator */
function map(generator, callback) {
  return reduce(generator, function(collection, item) {
    collection.push(callback(item));
    return collection;
  }, []);
}

/* Process the iterator for a certain number of steps */
function toArray(number, generator) {
  var result = [];
  each(generator, function(value, index) {
    if (number < index) {
      result.push(value);
    } else {
      return false; // stop iteration
    }
  });

  return result;
}


// ------------------------------------------------------
// Export
// ------------------------------------------------------

module.exports = {
  generator: generator,
  limit: limit,
  each: each,
  reduce: reduce,
  filter: filter,
  map: map,
  toArray: toArray
};