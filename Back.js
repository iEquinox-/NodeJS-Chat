var Express = require('express')(),
	HttpServer = require('http').Server(Express),
	Term = require('child_process'),
	Settings = require('./package.json').settings;

function Python(action, argv) {
	Term.spawn('python', [
			__dirname + '/files/process.py',
			action,
			argv
		]).stdout.on('data', function(response){
			return response;
		});
}

Express.get('/', function(request, response){
	response.sendFile(__dirname+'/files/index.html');
	Python('ret', 'test')
});

HttpServer.listen(Settings.port, function(){
	console.log('Webserver listening on port ' + Settings.port);
});
