var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs')
	gpio = require('./gpio-wrapper');
app.listen(9000);
console.log("server listening ..." );
function handler(req, res){	//hundler
	fs.readFile(__dirname + '/index.html', function(err, data){	//dirname is directly name.
		if(err){
			res.writeHead(500);
			console.log("error");
			return res.end('Error');
		}
		res.writeHead(200);
		res.write(data);
		res.end();
	})
}


setTimeout(function(){
	console.log('read temperature');
	gpio(0x68 <<8)
	 .then(function(result){
		var level =result & 0x3ff;
		var volt = 3300 *level/1024;
		var temprature = (volt - 500) /10;
		io.sockets.emit(temperature);
		console.log(temprature); 
	}, function(){console.log('error');});
},10000);	

