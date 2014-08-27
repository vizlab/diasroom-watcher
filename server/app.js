var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs')
	gpio = require('pi-gpio');
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

var temp = function(){
	
};

io.sockets.on('connection',function(socket){
	socket.on('emit_from_client',function(data){
		console.log(data);
		console.log(data.name);
		var name = data.name;
			
		// socket.set('client_name',data.name);
		// socket.get('client_name',function(err,name){
			io.sockets.emit('emit_from_server','[' + name +'] : ' + data.msg);
		// });
		
		
		//only the connected socket
		//socket.emit('emit_from_server','hello from server: ' + data);
		//all socket except theconnected socket
		//socket.broadcast.emit('emit_from_server','hello from server: ' + data);
		//all socket connected
		// io.sockets.emit('emit_from_server','[' + socket.id +'] : ' + data);

	});
});

io.sockets.emit('emit_from_server_temp',function(socket){
	};

