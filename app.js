var express = require('express');
var path = require('path');
var app = express();

var basic = require('./flashcard.js');
var cloze = require('./cloze.js');

// Define the port to run on
app.set('port', 8080);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function(data) {
	var port = server.address().port;
	console.log('Magic happens on port ' + port);
	console.log(data);

	// GET method route
	app.get('/', function (data) {
	  res.send('GET request to the homepage');
	  console.log(data);
	});

	// POST method route
	app.post('/', function (data) {
	  res.send('POST request to the homepage');
	  console.log(data);
	});

});