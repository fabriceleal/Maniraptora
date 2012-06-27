#!/usr/bin/node

var parser = require('./grammar.js');
var fs = require('fs');

fs.readFile(process.argv[2], 'utf-8', function(err, data){
	if(err) throw err;

	console.log(JSON.stringify(parser.parse(data), null, 3));
});
