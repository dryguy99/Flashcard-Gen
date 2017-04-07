var mysql = require('mysql');
var AST = require('node-sqlparser');

var connection = initializeConnection({
  host     : 'localhost:3306',
  user     : 'root',
  password : '',
  database : 'flashcard_db'
});
var gtype = "basic";


function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    var connection = mysql.createConnection(config);

    // Add handlers.
    addDisconnectHandler(connection);

    connection.connect();
    return connection;
}


function runMysql(type){
	
		

	connection.query('SHOW * TABLES;', function (error, results, fields){
		if (error) {console.log(error);}
		console.log('THE SOLUTION IS ', JSON.stringify(results));
	});

	

	if (gtype === "basic") {
		connection.query("SELECT front, back FROM `basic`;", function (error, results, fields){
			if (error) {console.log(error);}
			console.log('THE SOLUTION IS ', JSON.stringify(results));
			// for (i=0; i < results.length; i++) {
			// 	console.log(results[i].front + " : "  + results[i].back);
			// }
		return results;
		});
	} else if (gtype === "cloze") {
		connection.query("SELECT front, back, cloze FROM `cloze`", function (error, results, fields){
		if (error) throw error;
		console.log('THE SOLUTION IS ', JSON.stringify(results));
		for (i=0; i < results.length; i++) {
			console.log(results[i].front, results[i].cloze);
		}
		return results;
		});
	}
	// connection.end();
}
module.exports = runMysql;

