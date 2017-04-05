"use strict";

var path = require('path');  
var http = require('http');

var staticBasePath = './static';

var staticServe = function(req, res) { 
	console.log(req + " : " + res); 
    var fileLoc = path.resolve(staticBasePath);
    fileLoc = path.join(fileLoc, req.url);

    res.statusCode = 200;

    res.write(fileLoc);
    return res.end();
};

var httpServer = http.createServer(staticServe);

httpServer.listen(8080);  