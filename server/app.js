var interval = 10000;
var gpio = require('./gpio-wrapper');
var io = require('socket.io')();
io.listen(9000)

setInterval(function(){
	console.log('read temperature');
	gpio(0x68 <<8)
		.then(function(result){
			var level =result & 0x3ff;
			var volt = 3300 *level/1024;
			var temperature = (volt - 500) /10;
			console.log(temperature); 
			io.emit('emit_from_server', '' + temperature);
		});
}, interval);	
// io.on('connect', function() {
// 	console.log(arguments);
// });
