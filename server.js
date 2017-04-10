// server.js

// BASE SETUP
// =============================================================================
var myData = {};
// call the packages we need
//var Promise = require("bluebird");
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');	// parse the json data
var basic = require('./flashcard.js');		// constructor for basic flashcards
var cloze = require('./cloze.js');			// constructor for cloze flashcards
var fs = require('fs');

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
var mybasicData = new basic.basicCard();
var myclozeData = new cloze.clozeCard();

//----------------------------------------------
// set up mySQL local
// var connection = mysql.createConnection({
//  host: "localhost",
//  port: 3306,
//  user: 'root',
//  password: '',
//  database: 'flashcard_db'
// });
//----------------------------------------------
// set up mysql for use on website
var connection = mysql.createConnection({
 host: "wvulqmhjj9tbtc1w.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
 port: 3306,
 user: "ogcd9hligymivxa7",
 password: "nom02ddbbpux8ox1",
 database: "y0cg1nb2b394wk40"
});
connection.connect();

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

router.get('/', function(req, res) {
	function runMysql(gtype){
		if (gtype === "basic") {
			connection.query("SELECT front, back FROM basic;", function (error, results, fields){
				if (error) {
					res.send(error);
				}
				console.log('THE SOLUTION IS ', JSON.stringify(results));

				res.send(results);
			});
		} else if (gtype === 'cloze') {
			connection.query("SELECT front, back, cloze FROM cloze;", function (error, results, fields){
				if (error) {
					res.send(error);}
				res.send(results);
			});
		}
}		
	var userChoice = req.query.deck;
	var response = req.query;
	console.log(userChoice + " first");
	
});
// ----------------------------------------------------
// on routes that end in /basic
router.route('/basic')

// create a basic card (accessed at POST http://localhost:8080/api/basic)
    .post(function(req, res) {
    	var front = req.query.front;
        var back = req.query.back;
    	function postbasicMysql(front, back){
    		console.log(front + " : " + back);
			connection.query("INSERT INTO y0cg1nb2b394wk40.basic (front, back) VALUES ('" + front + "','" + back + "');", function (error, results, fields){
				if (error) {res.send(error);}
		        // save the card and check for errors
		        res.json({ message: 'Card created!' });
			});
		}
		postbasicMysql(front, back);
        console.log(req.query);
        // create a new instance of the Basic model
       	basic.basicCard(req.query.front, req.query.back);      
 	});
// on routes that end in /cloze
router.route('/cloze')

// create a cloze card (accessed at POST http://localhost:8080/api/cloze)
    .post(function(req, res) {
        console.log(req.query);
        var front = req.query.front;
        var back = req.query.back;
        var mycloze = front.replace(back, " ... ");
        function postclozeMysql(front, back, mycloze){
    		console.log(front + " : " + back);
			connection.query("INSERT INTO y0cg1nb2b394wk40.cloze (front, back, cloze) VALUES ('" + front + "','" + back + "','" + mycloze + "');", function (error, results, fields){
				if (error) {res.send(error);
				} else {
					console.log('THE SOLUTION IS ', JSON.stringify(results));
					res.json({ message: 'Card created!' });
					return results;
				}
			});
		}
		// send new data to MySQL database
		postclozeMysql(front, back, mycloze);
		// create a new instance of the Basic model
       	cloze.clozeCard(front, back, mycloze);      

       
            
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
//console.log('Magic happens on port ' + port);


