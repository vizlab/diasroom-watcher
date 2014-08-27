var gpio = require('pi-gpio');
var Q = require('q');

function open(pin, option) {
  var deferred = Q.defer();
  gpio.open(pin, option, function(err) {
    if (err) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function close(pin) {
  var deferred = Q.defer();
  gpio.close(pin, function(err) {
    if (err) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function readGPIO(pin) {
  var deferred = Q.defer();
  gpio.read(pin, function(err, value) {
    if (err) {
      deferred.reject();
    } else {
      deferred.resolve(value);
    }
  });
  return deferred.promise;
}

function write(pin, value) {
  var deferred = Q.defer();
  gpio.write(pin, value, function(err) {
    if (err) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function timeout(delay) {
  var deferred = Q.defer();
  setTimeout(function() {
    deferred.resolve();
  }, delay);
  return deferred.promise;
}

function byteToBits(value) {
  var bits = [];
  var bitLength = 16;
  var mask = 1 << (bitLength - 1);
  var i;
  for (i = 0; i < bitLength; ++i, mask >>= 1) {
    bits.push((value & mask) > 0 ? 1 : 0);
  }
  return bits;
}

function bitsToByte(bits) {
  var value = 0;
  var bitLength = 16;
  var i;
  for (i = 0; i < bitLength; ++i) {
    value <<= 1;
    value ^= bits[i];
  }
  return value;
}


module.exports = function(value) {
  var pinMOSI = 19;
  var pinMISO = 21;
  var pinSCLK = 23;
  var pinCS = 24;
  var bits = byteToBits(value);
  var result = [];
  var promise = Q.all([
      open(pinCS, 'output'),
      open(pinMISO, 'input'),
      open(pinMOSI, 'output'),
      open(pinSCLK, 'output')])
    .then(function() {
      return write(pinMOSI, 0);
    })
    .then(function() {
      return write(pinCS, 1);
    })
    .then(function() {
      return timeout(0.001);
    })
    .then(function() {
      return write(pinSCLK, 1);
    })
    .then(function() {
      return timeout(0.001);
    })
    .then(function() {
      return write(pinCS, 0);
    })
    .then(function() {
      return write(pinSCLK, 0);
    });

  promise = promise
    .then(function() {
      return clock(bits[0]);
    })
    .then(function() {
      return clock(bits[1]);
    })
    .then(function() {
      return clock(bits[2]);
    })
    .then(function() {
      return clock(bits[3]);
    })
    .then(function() {
      return clock(bits[4]);
    })
    .then(function() {
      return clock(bits[5]);
    })
    .then(function() {
      return clock(bits[6]);
    })
    .then(function() {
      return clock(bits[7]);
    })
    .then(function() {
      return clock(bits[8]);
    })
    .then(function() {
      return clock(bits[9]);
    })
    .then(function() {
      return clock(bits[10]);
    })
    .then(function() {
      return clock(bits[11]);
    })
    .then(function() {
      return clock(bits[12]);
    })
    .then(function() {
      return clock(bits[13]);
    })
    .then(function() {
      return clock(bits[14]);
    })
    .then(function() {
      return clock(bits[15]);
    })

  return promise
    .then(function() {
      return Q.all([
        close(pinCS),
        close(pinMISO),
        close(pinMOSI),
        close(pinSCLK)]);
    })
    .then(function() {
      return bitsToByte(result);
    });

  function clock(output) {
    return write(pinMOSI, output)
      .then(function() {
        return timeout(0.001);
      })
      .then(function() {
        return write(pinSCLK, 1);
      })
      .then(function() {
        return timeout(0.001);
      })
      .then(function() {
        return readGPIO(pinMISO);
      })
      .then(function(input) {
        result.push(input);
        return write(pinSCLK, 0);
      });
  }
};
