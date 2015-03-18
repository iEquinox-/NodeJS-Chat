var Express = require('express')(),
	HttpServer = require('http').Server(Express),
	Term = require('child_process').spawn,
	Settings = require('./package.json').settings;

Express.get('/', function(request, response){
	response.sendFile(__dirname+'/files/index.html');
	Term('python', [__dirname + '/files/process.py','test','action']).stdout.on('data', function(response){
		console.log( response.toString('utf8') );
	});
});

HttpServer.listen(Settings.port, function(){
	console.log('Webserver listening on port ' + Settings.port);
});
