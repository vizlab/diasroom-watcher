var gpio = require('./gpio-wrapper');

gpio(0x68 << 8)
  .then(function(result) {
    var level = result & 0x3ff;
    var volt = 3300 * level / 1024;
    var temperature = (volt - 500) / 10;
    console.log(temperature);
  });
