var express = require('express');
var path = require('path');
var app = express();

var basic = require('./flashcard.js');
var cloze = require('./cloze.js');

// Define the port to run on
app.set('port', 8080);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

