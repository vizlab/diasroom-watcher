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
var Temperature = require('./temperature');

io.listen(9000);

io.on('connection', function(socket) {
  socket.on('request minitely', function(opt) {
    Temperature.find()
      .sort('-datetime')
      .limit(opt.n || 20)
      .exec(function(err, data) {
        socket.emit('response minitely', data.reverse());
      });
  });
});

var updated = new Date();
setInterval(function() {
  log('getting temperature');
  gpio(0x68 << 8)
    .then(function(result){
      var level = result & 0x3ff;
      var volt = 3300 * level / 1024;
      var temperature = new Temperature({
        temperature: (volt - 500) / 10,
        datetime: +Date.now()
      });
      log(temperature.temperature);
      io.emit('update temperature', temperature);

      var now = new Date();
      if (updated.getMinutes() !== now.getMinutes()) {
        updated = now;
        temperature.save(function(err) {
          log('saved');
          io.emit('update minitely temperature', temperature);
        });
      }
    });
}, interval);

function log(message) {
  if (verbose) {
    console.log(message);
  }
}
