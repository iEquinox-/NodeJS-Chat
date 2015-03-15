var Settings = require('./files/configuration.json');
var fs = require('fs'),
	ps = require('child_process'),
	http = require('http').createServer(function (req,res){
		fs.readFile(__dirname+'/files/index.html', function(err,data) {
			res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length':data.length});
			res.write(data);
			res.end();
		});	
	}).listen(Settings.Config.port,Settings.Config.addr);
var io = require('socket.io')(http),
	usernames = [Settings.Botsettings.Botuser],
	users = 0,
	open  = {};

io.on('connection', function(socket){
	users += 1;
	open[socket.id] = socket;
	io.emit('recountUsers', users);
	socket.on('_Message', function(data) {
		io.emit('_Message', data);
	});
	
	socket.on('_SetUser', function(username){
		if(usernames.indexOf(username) != -1) {
			open[socket.id].emit('_Return', false);
		} else {
			usernames.push(username);
			open[socket.id].emit('_Return', true);
		}
	});
	
	socket.on('_Command', function(data){
		ps.spawn('python', [__dirname+'/files/bot.py', data]).stdout.on('data', function(rdata) {
			open[socket.id].emit('_CMDReturn', {BOTname: "<span style=\""+Settings.Botsettings.Botstyle+"\">"+Settings.Botsettings.Botuser+"</span>", Data: rdata.toString('utf8')});
		});
	});
	
	socket.on('disconnect', function(){
		users -= 1;
		io.emit('recountUsers', users);
	});
});
