// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');	// parse the json data
var basic = require('./flashcard.js');		//constructor for basic flashcards
var cloze = require('./cloze.js');			// constructor for cloze flashcards

var mysql = require('mysql');				// call mysql
var AST = require('node-sqlparser');		// call node sql parser
// fix cors errors
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

//----------------------------------------------
// set up mySQL
var connection = mysql.createConnection({
 host: "localhost",
 port: 3306,

 // Your username
 user: 'root',

 // Your password
 password: '',
 database: 'musicDB'
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR API
// =============================================================================
var router = express.Router();// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res, next) {
    res.json({ message: 'hooray! welcome to our api!' }); 
     

});
// ----------------------------------------------------
// on routes that end in /basic
router.route('/basic')

// create a basic card (accessed at POST http://localhost:8080/api/basic)
    .post(function(req, res) {
        console.log(req.query);
        // create a new instance of the Basic model
       	basic.basicCard(req.query.front, req.query.back);      
        // save the card and check for errors
            res.json({ message: 'Card created!' });
 	});
// on routes that end in /cloze
router.route('/cloze')

// create a cloze card (accessed at POST http://localhost:8080/api/cloze)
    .post(function(req, res) {
        console.log(req.query);
       	cloze.clozeCard(req.query.front, req.query.back);      // create a new instance of the Basic model
       
        // save the bear and check for errors

            res.json({ message: 'Card created!' });
    });

//basic.basicCard("whos is the first President", "george washington");

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// var sql = 'select * from table a where field 1 = 1';
// var parse = require('node-sqlparser').parse;
// var stringify = require('node-sqlparser').stringify;
// var astObj = parse(sql);
 
// var sqlstr = stringify(astObj);
var genre = "all";

function runMysql(){
	connection.connect();
	connection.query('SHOW TABLES;', function (error, results, fields){
	if (error) throw error;
	console.log('THE SOLUTION IS ', JSON.stringify(results));
	});

	

	if (genre === "all") {
		connection.query("SELECT `title` FROM `music`;", function (error, results, fields){
			if (error) throw error;
			console.log('THE SOLUTION IS ', JSON.stringify(results));
			for (i=0; i < results.length; i++) {
				console.log(results[i].title);
			}
		});
	} else 
	connection.query("SELECT `title` FROM `music` WHERE genre=?", [genre], function (error, results, fields){
		if (error) throw error;
		console.log('THE SOLUTION IS ', JSON.stringify(results));
		for (i=0; i < results.length; i++) {
			console.log(results[i].title);
		}
	});
	connection.end();
}
runMysql();
// var ast = new AST();
// console.log(sqlstr);
 

// ast.parse(sql);
 
// ast.stringify();

