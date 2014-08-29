var interval = 10000;

var io = require('socket.io')();
var opt = require('node-getopt')
  .create([
    ['', 'mock', 'mock getting temperature'],
    ['v', 'verbose', 'console output']
  ])
  .bindHelp()
  .parseSystem();

var mock = opt.options.mock;
var verbose = opt.options.verbose;
var gpio = mock ? require('./gpio-wrapper-mock') : require('./gpio-wrapper');

io.listen(9000);

setInterval(function() {
  log('getting temperature');
  gpio(0x68 << 8)
    .then(function(result){
      var level =result & 0x3ff;
      var volt = 3300 * level / 1024;
      var temperature = (volt - 500) / 10;
      log(temperature);
      io.emit('emit_from_server', '' + temperature);
    });
}, interval);

function log(message) {
  if (verbose) {
    console.log(message);
  }
}
