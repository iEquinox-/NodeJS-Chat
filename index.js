var fs = require('fs');
var http = require('http').createServer(function (req,res){
	fs.readFile(__dirname+'/index.html', function(err,data) {
		res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length':data.length});
		res.write(data);
		res.end();
	});	
}).listen(3000,'127.0.0.1');
var io = require('socket.io')(http);

var usernames = [],
		users = 0,
		open  = {};

io.on('connection', function(socket){
	users += 1;
	io.emit('recountUsers', users);
	socket.on('_Message', function(data) {
		io.emit('_Message', data);
	});
	
	socket.on('_SetUser', function(username){
		if(usernames.indexOf(username) != -1) {
			open[socket.id].emit('_Return', false);
		} else {
			usernames.push(username);
			sidi[socket.id] = username;
			open[socket.id].emit('_Return', true);
		}
	});
	
	socket.on('disconnect', function(){
		users -= 1;
		io.emit('recountUsers', users);
	});
});
